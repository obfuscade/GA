import { JSX } from "react";
import { Typography } from "@mui/material";
import * as Styled from "./styles";

function NotFound(): JSX.Element {
  return (
    <Styled.Section>
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">Page not found</Typography>
    </Styled.Section>
  );
}

export default NotFound;
