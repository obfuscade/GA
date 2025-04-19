import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./components/Root";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
