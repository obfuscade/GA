import { JSX, useContext } from "react";
import { PATH } from "../../constants/";
import { Navigate, Outlet } from "react-router";
import { Context } from "../Root";

function ProtectedRoute(): JSX.Element {
  const { isUserLogged } = useContext(Context);

  return isUserLogged ? <Outlet /> : <Navigate to={PATH.SIGN_UP} replace />;
}

export default ProtectedRoute;
