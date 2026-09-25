# AC Marketing — Web

Landing en React + TypeScript + Vite + framer-motion, en español (España) e inglés.

## Correr en local
```bash
npm install
npm run dev          # desarrollo
npm run build        # compilar
npm run preview      # probar la versión compilada con las cabeceras de seguridad
```

## Editar contenido
| Qué | Dónde |
| --- | --- |
| Textos en español | `src/data/es.ts` |
| Textos en inglés | `src/data/en.ts` |
| Precios (€), links, WhatsApp, email, reels, estadísticas | `src/data/site.ts` |
| Colores y tamaños | `src/styles.css` (variables al principio) |

- En los títulos, lo que va entre `*asteriscos*` se resalta.
- Lo marcado con `EDITAR` son datos de ejemplo.
- Foto de Cele: pon `public/cele.jpg` (si no existe, se muestra la inicial).
- El teléfono y el email van codificados. Para generar uno nuevo, en la consola del navegador:
  `btoa("34611222333".split("").reverse().join(""))`

## Seguridad y anti-spam
La web es **100 % estática**: no hay servidor, base de datos, API ni claves. No hay nada que hackear
ni ningún endpoint al que un bot pueda mandar mensajes. El formulario solo **abre WhatsApp** con el
texto escrito, y es la persona quien tiene que pulsar "enviar" en su propio móvil.

Capas extra del formulario (`src/lib/antispam.ts`):
1. **Honeypot**: campo invisible; si un bot lo rellena, se le dice "enviado" pero no se abre nada.
2. **Tiempo mínimo**: rellenar el formulario en menos de 3 segundos se rechaza.
3. **Límite**: máximo 3 envíos cada 10 minutos por navegador.
4. **Validación**: longitudes máximas, máximo 1 enlace, se limpian caracteres invisibles.

Además:
- Teléfono y email no aparecen como texto plano en el código (frena a los bots que los recolectan).
- Cabeceras de seguridad (CSP, HSTS, anti-iframe, etc.) en `vercel.json` y `public/_headers`.

**Si algún día el formulario guarda o envía mensajes a un servidor** (Firebase, email…), la protección
de verdad tiene que estar en el servidor: Cloudflare Turnstile (captcha invisible y gratis) verificado
en el backend, Firebase App Check, reglas de Firestore que solo permitan crear documentos válidos y
límite de peticiones por IP. Lo del navegador solo frena a los bots básicos.

## Deploy gratis (recomendado: Vercel)
1. Sube el proyecto a GitHub.
2. En vercel.com → "Add New Project" → elige el repo.
3. Vite se detecta solo (build: `npm run build`, output: `dist`). Deploy.
Cada `git push` vuelve a publicar la web automáticamente. `vercel.json` ya añade las cabeceras de seguridad.

Alternativas gratis: Netlify o Cloudflare Pages (usan `public/_headers`), o Firebase Hosting
(`firebase init hosting` con public dir `dist`; las cabeceras se copian a `firebase.json`).
