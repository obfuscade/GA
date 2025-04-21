import { JSX } from "react";
import { PATH } from "../../constants/";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../hooks/useRedux";

function ProtectedRoute(): JSX.Element {
  const { isLogged } = useAppSelector((state) => state.user);

  return isLogged ? <Outlet /> : <Navigate to={PATH.SIGN_UP} replace />;
}

export default ProtectedRoute;
