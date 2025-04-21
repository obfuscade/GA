import { JSX, useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { PATH } from "../../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation, defaultValues } from "./form";
import { IUser } from "../../types";
import Input from "../Input";
import { Button, Typography } from "@mui/material";
import * as Styled from "./styles";
import useAuth from "../../hooks/useAuth";

function Auth(): JSX.Element {
  const { pathname } = useLocation();
  const { handleAuth, isLoading } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IUser>({
    resolver: yupResolver(validation),
    defaultValues,
  });

  const isSignUp = useMemo(() => pathname === PATH.SIGN_UP, [pathname]);

  const isButtonDisabled = useMemo(
    () => (isLoading || !isValid) && isSubmitted,
    [isValid, isLoading, isSubmitted],
  );

  const handleSubmitAction = useCallback(
    async (data: IUser) => {
      await handleAuth({ data, isSignUp, callback: reset });
    },
    [handleAuth, isSignUp, reset],
  );

  return (
    <Styled.Section>
      <Typography variant="h1">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

      <Styled.Form onSubmit={handleSubmit(handleSubmitAction)}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register}
          disabled={isLoading}
          error={errors?.email?.message}
          autocomplete="email"
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          disabled={isLoading}
          error={errors?.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isButtonDisabled}
          loading={isLoading}
          fullWidth
        >
          {isSignUp ? "Register" : "Login"}
        </Button>
      </Styled.Form>

      <Styled.ActionsWrapper>
        <Typography component="p">
          {isSignUp ? "Have an account? " : "New user? "}
        </Typography>

        <Styled.Link to={isSignUp ? PATH.SIGN_IN : PATH.SIGN_UP}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </Styled.Link>
      </Styled.ActionsWrapper>
    </Styled.Section>
  );
}

export default Auth;
