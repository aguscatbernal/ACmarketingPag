import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { seo } from "./seo.ts";

// Las mismas cabeceras de seguridad que en vercel.json y public/_headers, para probarlas con "npm run preview".
// El hash sha256-47DEQ... corresponde a un <style> vacío que usa framer-motion en algunas animaciones.
// style-src-attr 'unsafe-inline': la web llega pre-armada con los estilos iniciales de las animaciones
// en atributos style="..."; scripts y hojas de estilo siguen limitados a la propia web.
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='; style-src-attr 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://firestore.googleapis.com; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

export default defineConfig({
  plugins: [react(), seo()],
  preview: { headers: securityHeaders },
});
