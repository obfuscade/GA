import styled from "@emotion/styled";
import { Box, Theme, Typography } from "@mui/material";

export const Wrapper = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  width: 450,
  display: "flex",
  flexDirection: "column",
  gap: "1.4rem",
  padding: "1.3rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.primary.main}`,

  "@media (max-width: 630px)": {
    width: "100%",
  },
}));

export const Title = styled(Typography)({
  fontSize: "2rem",
  textAlign: "center",
});
