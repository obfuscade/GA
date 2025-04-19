import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Section = styled.section({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const Title = styled(Typography)({
  textAlign: "center",
});
