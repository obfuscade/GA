import { BrowserRouter } from "react-router";
import ThemeProvider from "../../common/theme/ThemeProvider";
import { SnackbarProvider } from "notistack";
import App from "../../App";
import ErrorBoundary from "../../pages/ErrorBoundary";
import { JSX, useEffect } from "react";
import { getItemStorage } from "../../utils/localStorage";
import { useAppDispatch } from "../../hooks/useRedux";
import { setIsLogged, setIsLoggedOut } from "../../store/slices/userSlice";

function Root(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLogged = getItemStorage("isLogged");

    if (isLogged) {
      dispatch(setIsLogged());
    } else {
      dispatch(setIsLoggedOut());
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <SnackbarProvider
            autoHideDuration={3000}
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            preventDuplicate
          >
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default Root;
