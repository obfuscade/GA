import styled from "@emotion/styled";
import { Box, Theme } from "@mui/material";

export const Wrapper = styled(Box)({
  width: 48,
  height: 48,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const Spinner = styled.p<{ theme?: Theme }>(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: `5px solid ${theme.palette.primary.main}`,
  borderBottomColor: theme.palette.secondary.main,
  borderRadius: "50%",
  display: "inline-block",
  animation: "rotation 1s linear infinite",

  "@keyframes rotation": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));
