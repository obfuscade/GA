import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const EmptyTitle = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const SpinnerWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
