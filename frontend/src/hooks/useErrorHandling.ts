import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "./useRedux";
import { setIsLoggedOut } from "../store/slices/userSlice";
import { removeItemStorage } from "../utils/localStorage";
import { removeProjects } from "../store/slices/projectSlice";

function useErrorHandling(): {
  errorCall: (error: AxiosError<{ message: string }>) => void;
} {
  const dispatch = useAppDispatch();

  const errorCall = (error: AxiosError<{ message: string }>): void => {
    if (error?.response?.status === 401) {
      removeItemStorage("isLogged");
      dispatch(setIsLoggedOut());
      dispatch(removeProjects());
    }

    const errorMessage =
      error?.response?.data?.message || "Something went wrong";
    enqueueSnackbar(errorMessage, { variant: "error" });
  };

  return { errorCall };
}

export default useErrorHandling;
