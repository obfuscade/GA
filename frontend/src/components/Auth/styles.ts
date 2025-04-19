import styled from "@emotion/styled";
import { Box, Theme } from "@mui/material";
import { Link as RRLink } from "react-router";

export const Section = styled.section({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});

export const Form = styled.form({
  width: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.2rem",

  "@media (max-width: 768px)": {
    width: "100%",
  },
});

export const LinkWrapper = styled(Box)({
  fontSize: "1.2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.3rem",
});

export const Link = styled(RRLink)<{ theme?: Theme }>(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  textDecoration: "none",
}));
