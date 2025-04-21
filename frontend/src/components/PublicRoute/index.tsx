import { Navigate, Outlet } from "react-router";
import { PATH } from "../../constants";
import { JSX } from "react";
import { useAppSelector } from "../../hooks/useRedux";

function PublicRoute(): JSX.Element {
  const { isLogged } = useAppSelector((state) => state.user);

  return isLogged ? <Navigate to={PATH.HOME} replace /> : <Outlet />;
}

export default PublicRoute;
