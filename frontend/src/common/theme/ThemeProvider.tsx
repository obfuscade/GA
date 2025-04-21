import { JSX, PropsWithChildren } from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import theme from ".";

const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
