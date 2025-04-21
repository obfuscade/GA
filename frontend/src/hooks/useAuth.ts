import { useCallback, useState } from "react";
import { IUser } from "../types";
import { removeItemStorage, setItemStorage } from "../utils/localStorage";
import { setIsLogged, setIsLoggedOut } from "../store/slices/userSlice";
import { useAppDispatch } from "./useRedux";
import { signIn, signOut, signUp } from "../libs/http/auth";
import { AxiosError } from "axios";
import useErrorHandling from "./useErrorHandling";
import { removeProjects } from "../store/slices/projectSlice";

interface UseAuthReturnType {
  handleSignOut: () => Promise<void>;
  handleAuth: ({
    data,
    isSignUp,
    callback,
  }: {
    data: IUser;
    isSignUp: boolean;
    callback: () => void;
  }) => Promise<void>;
  isLoading: boolean;
}

function useAuth(): UseAuthReturnType {
  const dispatch = useAppDispatch();
  const { errorCall } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      errorCall(error as AxiosError<{ message: string }>);
    } finally {
      removeItemStorage("isLogged");
      dispatch(setIsLoggedOut());
      dispatch(removeProjects());
      setIsLoading(false);
    }
  }, [dispatch, errorCall]);

  const handleAuth = useCallback(
    async ({
      data,
      isSignUp,
      callback,
    }: {
      data: IUser;
      isSignUp: boolean;
      callback: () => void;
    }): Promise<void> => {
      setIsLoading(true);

      try {
        if (isSignUp) {
          await signUp(data);
        } else {
          await signIn(data);
        }

        setItemStorage({ key: "isLogged", value: "true" });
        dispatch(setIsLogged());
        callback();
      } catch (error) {
        errorCall(error as AxiosError<{ message: string }>);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, errorCall],
  );

  return { handleSignOut, handleAuth, isLoading };
}

export default useAuth;
