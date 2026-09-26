// Punto de entrada para pre-armar la web al compilar (ver prerender.mjs).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
