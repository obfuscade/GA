import { JSX, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { PATH } from "./constants";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import SpinnerWrapper from "./components/SpinnerWrapper";

const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App(): JSX.Element {
  return (
    <Suspense fallback={<SpinnerWrapper />}>
      <Routes>
        <Route path={PATH.HOME} element={<Layout />}>
          <Route element={<PublicRoute />}>
            <Route path={PATH.SIGN_IN} element={<SignIn />} />
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path={PATH.ALL} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
