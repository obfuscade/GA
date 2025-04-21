import styled from "@emotion/styled";
import {
  Card as MUICard,
  CardContent as MUICardContent,
  Theme,
} from "@mui/material";
import { Link as RRLink } from "react-router";

export const Card = styled(MUICard)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const CardContent = styled(MUICardContent)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const Link = styled(RRLink)<{ theme?: Theme }>(({ theme }) => ({
  display: "block",
  fontSize: "1.2rem",
  color: theme.palette.secondary.light,
}));
