import { Components } from "@mui/material";

const COMPONENTS: Components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        overscrollBehavior: "none",
      },
      "html, body, #root": {
        height: "100%",
        width: "100%",
      },
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        position: "relative",
        lineHeight: 1,
        fontSize: "1rem",
      },
      "#root": {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      },
      main: {
        flex: "1 1 auto",
        position: "relative",
      },
    },
  },
};

export default COMPONENTS;
