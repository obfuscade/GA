import { JSX, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Spinner from "./components/Spinner";
import { PATH } from "./constants";
import Layout from "./components/Layout";

const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));

function App(): JSX.Element {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={PATH.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={PATH.ALL} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
