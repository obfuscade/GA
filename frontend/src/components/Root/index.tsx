/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { BrowserRouter } from "react-router";
import ThemeProvider from "../../common/theme/ThemeProvider";
import { SnackbarProvider } from "notistack";
import App from "../../App";
import ErrorBoundary from "../../pages/ErrorBoundary";
import { createContext, JSX, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Spinner from "../Spinner";
import { getItemStorage } from "../../utils/localStorage";

type ContextType = {
  isUserLogged: boolean;
  isGlobalLoading: boolean;
  setIsUserLogged: (value: boolean) => void;
  setIsGlobalLoading: (value: boolean) => void;
};

export const Context = createContext<ContextType>({
  isUserLogged: false,
  isGlobalLoading: false,
  setIsUserLogged: () => {},
  setIsGlobalLoading: () => {},
});

function Root(): JSX.Element {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  useEffect(() => {
    const isLogged = getItemStorage("isLogged");

    setIsUserLogged(Boolean(isLogged));
  }, [setIsUserLogged]);

  return (
    <>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <SnackbarProvider
              autoHideDuration={3000}
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              preventDuplicate
            >
              <Context.Provider
                value={{
                  isGlobalLoading,
                  isUserLogged,
                  setIsGlobalLoading,
                  setIsUserLogged,
                }}
              >
                <App />
              </Context.Provider>
            </SnackbarProvider>
          </BrowserRouter>
        </ErrorBoundary>
        {isGlobalLoading ? (
          <>{createPortal(<Spinner />, document.body)}</>
        ) : null}
      </ThemeProvider>
    </>
  );
}

export default Root;
