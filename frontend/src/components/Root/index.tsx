import { JSX } from "react";
import { BrowserRouter } from "react-router";
import ThemeProvider from "../../common/theme/ThemeProvider";
import { SnackbarProvider } from "notistack";
import App from "../../App";
import ErrorBoundary from "../../pages/ErrorBoundary";

function Root(): JSX.Element {
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
