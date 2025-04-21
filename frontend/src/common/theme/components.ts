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
        display: "flex",
        flexDirection: "column",
      },
      main: {
        height: "100%",
      },
    },
  },
};

export default COMPONENTS;
