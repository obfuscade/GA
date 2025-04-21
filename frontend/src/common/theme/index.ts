import { createTheme, Theme } from "@mui/material/styles";
import TYPOGRAPHY from "./typography";
import COMPONENTS from "./components";
import PALETTE from "./palette";

const theme: Theme = createTheme({
  typography: TYPOGRAPHY,
  components: COMPONENTS,
  palette: PALETTE,
});

export default theme;
