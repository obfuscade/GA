import { JSX, PropsWithChildren } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import THEME from ".";

const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <MUIThemeProvider theme={THEME}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
