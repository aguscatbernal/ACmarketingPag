# AC Marketing — Web

Landing en React + TypeScript + Vite + framer-motion.

## Correr en local
```bash
npm install
npm run dev
```

## Editar contenido
Todo el texto, precios, ofertas, reels, links y el número de WhatsApp está en
`src/data/content.ts`. Lo marcado con `EDITAR` son datos de ejemplo.

- Foto de Cele: poné `public/cele.jpg` (si no existe, se muestra la inicial).
- Colores: variables al principio de `src/styles.css`.

## Deploy gratis (recomendado: Vercel)
1. Subí el proyecto a GitHub.
2. Entrá a vercel.com → "Add New Project" → elegí el repo.
3. Vite se detecta solo (build: `npm run build`, output: `dist`). Deploy.
Cada `git push` vuelve a publicar la web automáticamente.

Alternativas gratis: Netlify, Cloudflare Pages o Firebase Hosting
(`firebase init hosting` con public dir `dist`).
