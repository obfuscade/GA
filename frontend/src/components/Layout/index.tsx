import { JSX } from "react";
import { Outlet } from "react-router";
import Container from "../Container";
import Header from "../Header";

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
