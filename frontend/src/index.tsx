import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./components/Root";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
);
