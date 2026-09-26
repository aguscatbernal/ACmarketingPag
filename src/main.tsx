import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Tipografías alojadas en la propia web (sin pedir nada a Google: mejor privacidad y RGPD)
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
