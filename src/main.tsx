import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
// Tipografías alojadas en la propia web (sin pedir nada a Google: mejor privacidad y RGPD)
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./styles.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción la web llega pre-armada (prerender.mjs): React se engancha a
// ese HTML. En desarrollo (npm run dev) el contenedor viene vacío y se dibuja.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
