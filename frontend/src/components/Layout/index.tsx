import { JSX } from "react";
import { Outlet } from "react-router";
import Container from "../Container";

function Layout(): JSX.Element {
  return (
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>
  );
}

export default Layout;
