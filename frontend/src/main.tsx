import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error font package doesn't have types
import "@fontsource-variable/geist";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "@/components/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
