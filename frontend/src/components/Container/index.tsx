import { JSX, PropsWithChildren } from "react";
import * as Styled from "./styles";

function Container({ children }: PropsWithChildren): JSX.Element {
  return <Styled.Container>{children}</Styled.Container>;
}

export default Container;
