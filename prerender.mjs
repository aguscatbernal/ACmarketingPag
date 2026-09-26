// Pre-arma la web: genera el HTML de la página con todos los textos y lo mete
// en dist/index.html. Así Google y los que abren la web desde el móvil ven el
// contenido de entrada, sin esperar a JavaScript; después React "engancha" ese
// HTML (hydrateRoot en src/main.tsx) para las animaciones y los botones.
import { readFile, rm, writeFile } from "node:fs/promises";

const { render } = await import("./dist-ssr/entry-server.js");
const html = render();

const file = "dist/index.html";
const template = await readFile(file, "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error('No se encontró <div id="root"></div> en dist/index.html');
await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
await rm("dist-ssr", { recursive: true, force: true });

console.log(`Web pre-armada: ${Math.round(html.length / 1024)} KB de HTML en ${file}`);
