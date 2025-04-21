import { DeleteOutline, Refresh } from "@mui/icons-material";
import { CardActions, IconButton, Typography } from "@mui/material";
import { JSX, memo, useCallback, useState } from "react";
import { IProject } from "../../types";
import { deleteProject, refreshProject } from "../../libs/http/projects";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../hooks/useRedux";
import { removeProject, updateProject } from "../../store/slices/projectSlice";
import useErrorHandling from "../../hooks/useErrorHandling";
import * as Styled from "./style";

type Props = {
  item: IProject;
};

function Item({
  item: { name, stars, forks, issues, createdAt, url, owner, id },
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { errorCall } = useErrorHandling();

  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleDelete = useCallback(async (): Promise<void> => {
    setIsRemoveLoading(true);

    try {
      await deleteProject(id);
      dispatch(removeProject(id));
    } catch (error) {
      errorCall(error as AxiosError<{ message: string }>);
    } finally {
      setIsRemoveLoading(false);
    }
  }, [dispatch, errorCall, id]);

  const handleRefresh = useCallback(async (): Promise<void> => {
    setIsUpdateLoading(true);

    try {
      const data = await refreshProject(id);
      dispatch(updateProject(data));
    } catch (error) {
      errorCall(error as AxiosError<{ message: string }>);
    } finally {
      setIsUpdateLoading(false);
    }
  }, [id, dispatch, errorCall]);

  return (
    <Styled.Card>
      <Styled.CardContent>
        <Typography component="p">Project: {name}</Typography>
        <Typography component="p">Owner: {owner}</Typography>
        <Typography component="p">Stars: {stars}</Typography>
        <Typography component="p">Forks: {forks}</Typography>
        <Typography component="p">Issues: {issues}</Typography>
        <Typography component="p">
          Created At: {new Date(createdAt).getTime()}
        </Typography>
        <Styled.Link to={url} target="_blank">
          {url}
        </Styled.Link>
      </Styled.CardContent>

      <CardActions>
        <IconButton onClick={handleRefresh} loading={isUpdateLoading}>
          <Refresh fontSize="medium" />
        </IconButton>
        <IconButton onClick={handleDelete} loading={isRemoveLoading}>
          <DeleteOutline fontSize="medium" />
        </IconButton>
      </CardActions>
    </Styled.Card>
  );
}

export default memo(Item);
