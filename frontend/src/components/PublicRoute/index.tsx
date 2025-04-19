import { Navigate, Outlet } from "react-router";
import { PATH } from "../../constants";
import { JSX, useContext } from "react";
import { Context } from "../Root";

function PublicRoute(): JSX.Element {
  const { isUserLogged } = useContext(Context);

  return isUserLogged ? <Navigate to={PATH.HOME} replace /> : <Outlet />;
}

export default PublicRoute;
