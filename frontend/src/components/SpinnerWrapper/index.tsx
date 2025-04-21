import { CircularProgress } from "@mui/material";
import { JSX } from "react";
import * as Styled from "./styles";

function SpinnerWrapper(): JSX.Element {
  return (
    <Styled.SpinnerWrapper>
      <CircularProgress />
    </Styled.SpinnerWrapper>
  );
}

export default SpinnerWrapper;
