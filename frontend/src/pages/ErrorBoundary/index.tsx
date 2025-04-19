import { Component, JSX, PropsWithChildren, ReactNode } from "react";
import * as Styled from "./styles";

class ErrorBoundary extends Component<PropsWithChildren> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render(): JSX.Element | ReactNode {
    if (this.state.hasError) {
      return (
        <Styled.Section>
          <Styled.Title variant="h1">Something went wrong</Styled.Title>
        </Styled.Section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
