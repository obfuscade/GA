import styled from "@emotion/styled";
import { Box, Theme } from "@mui/material";
import { Link as RRLink } from "react-router";

export const Header = styled.header<{ theme?: Theme }>(({ theme }) => ({
  width: "100%",
  height: 64,
  padding: "0 1rem",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Actions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
});

export const Link = styled(RRLink)<{ theme?: Theme }>(({ theme }) => ({
  display: "block",
  color: theme.palette.primary.light,
  textDecoration: "none",
}));
