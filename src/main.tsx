import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { routerBasename } from "./app/routes";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./features/home/home.css";
import "./features/research/research.css";
import "./features/console/console.css";
import "./features/cv/cv.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename(import.meta.env.BASE_URL)}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
