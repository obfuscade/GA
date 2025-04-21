import { JSX, memo, useCallback, useState } from "react";
import { Button } from "@mui/material";
import { createProject } from "../../libs/http/projects";
import { AxiosError } from "axios";
import { IProjectCreation } from "../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import { useAppDispatch } from "../../hooks/useRedux";
import { addProject } from "../../store/slices/projectSlice";
import * as Styled from "./styles";
import { validation, defaultValues } from "./form";
import useErrorHandling from "../../hooks/useErrorHandling";

type Props = {
  handleCloseModal: () => void;
};

function ProjectForm({ handleCloseModal }: Props): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IProjectCreation>({
    resolver: yupResolver(validation),
    defaultValues,
  });
  const dispatch = useAppDispatch();
  const { errorCall } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitAction = useCallback(
    async ({ owner, repository }: IProjectCreation) => {
      setIsLoading(true);

      try {
        const data = await createProject({
          owner: owner.trim(),
          repository: repository.trim(),
        });
        dispatch(addProject(data));
        handleCloseModal();
        reset();
      } catch (error) {
        errorCall(error as AxiosError<{ message: string }>);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, errorCall, handleCloseModal, reset],
  );

  return (
    <form onSubmit={handleSubmit(handleSubmitAction)}>
      <Input
        type="text"
        name="owner"
        placeholder="Owner"
        register={register}
        disabled={isLoading}
        error={errors?.owner?.message}
        autofocus
      />

      <Input
        type="text"
        name="repository"
        placeholder="Repository"
        register={register}
        disabled={isLoading}
        error={errors?.repository?.message}
      />

      <Styled.Actions>
        <Button
          type="submit"
          variant="contained"
          color="success"
          loading={isLoading}
          fullWidth
        >
          Submit
        </Button>

        <Button
          type="reset"
          onClick={handleCloseModal}
          variant="contained"
          color="error"
          fullWidth
        >
          Cancel
        </Button>
      </Styled.Actions>
    </form>
  );
}

export default memo(ProjectForm);
