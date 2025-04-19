import { JSX, useCallback, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { PATH } from "../../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation, defaultValues } from "./form";
import { Context } from "../Root";
import { setItemStorage } from "../../utils/localStorage";
import { User } from "../../types";
import { signIn, signUp } from "../../libs/http/auth";
import Input from "../Input";
import { enqueueSnackbar } from "notistack";
import * as Styled from "./styles";
import { Button, Typography } from "@mui/material";

function Auth(): JSX.Element {
  const { setIsUserLogged } = useContext(Context);
  const { pathname } = useLocation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm<User>({
    resolver: yupResolver(validation),
    defaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = useMemo(() => pathname === PATH.SIGN_UP, [pathname]);

  const isButtonDisabled = useMemo(
    () => (isLoading || !isValid) && isSubmitted,
    [isValid, isLoading, isSubmitted],
  );

  const handleAuthSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      // if (isSignUp) {
      //   await signUp(data);
      // } else {
      //   await signIn(data);
      // }

      setItemStorage({ key: "isLogged", value: "true" });
      setIsUserLogged(true);
      reset();
    } catch (error) {
      const { message = "Error" } = error as Error;
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [isSignUp, signUp, signIn, reset, setIsLoading]);

  return (
    <Styled.Section>
      <Typography variant="h1">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

      <Styled.Form onSubmit={handleSubmit(handleAuthSubmit)}>
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

      <Styled.LinkWrapper>
        <Typography variant="body1">
          {isSignUp ? "Have an account? " : "New user? "}
        </Typography>

        <Styled.Link to={isSignUp ? PATH.SIGN_IN : PATH.SIGN_UP}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </Styled.Link>
      </Styled.LinkWrapper>
    </Styled.Section>
  );
}

export default Auth;
