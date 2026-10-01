# AceMedia Marketing — Web

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

## Arquitectura de seguridad
```
Visitante / bot ──► Cloudflare (DDoS, Bot Fight Mode)
                        └─► Archivos estáticos (HTML, JS, CSS, fuentes) — sin servidor propio
Formulario ──► Firestore (colección "consultas") ──► app reels_manager, sección "Consultas"
          └──► o WhatsApp / email, como alternativa y respaldo
```
- **Consultas a reels_manager** (`src/lib/consultas.ts`): el formulario guarda la consulta en el
  Firestore de la app. Firebase solo se descarga al enviar. Las **reglas de Firestore**
  (`firestore.rules` en reels_manager) solo dejan **crear** consultas con campos, largos y valores
  válidos; nadie de fuera puede leer, editar ni borrar. Probadas con el emulador (23 casos).
- **Formulario** (`src/lib/antispam.ts`): honeypot, tiempo mínimo de 3 s, máx. 3 envíos cada 10 min,
  validación (longitud, WhatsApp o email válido, máx. 1 enlace) y casilla de privacidad obligatoria.
- **Contacto protegido**: teléfono y email codificados en el código para frenar a los recolectores.
- **Cabeceras de seguridad** (`vercel.json` y `public/_headers`): CSP estricta (solo código propio y
  conexión a Firestore), HSTS, anti-iframe (clickjacking), nosniff, Permissions-Policy.
- **Sin terceros al cargar**: las tipografías se sirven desde la propia web.
- **Dependencias**: `npm audit` sin vulnerabilidades y Dependabot (`.github/dependabot.yml`) avisa cada semana.
- **Siguiente paso recomendado**: activar Firebase App Check para que Firestore solo acepte
  consultas que vengan de la web (frena a bots que llamen a la API directamente).

### Lo más importante fuera del código
- **Verificación en dos pasos (2FA)** en GitHub, Cloudflare, el registrador del dominio, Instagram,
  TikTok y WhatsApp Business. Robar una de esas cuentas hace mucho más daño que cualquier bot.
- Si algún día el formulario guarda o envía mensajes a un servidor (Firebase, email…), la protección
  tiene que ir en el servidor: Cloudflare Turnstile verificado en el backend, Firebase App Check, reglas
  de Firestore estrictas y límite de peticiones por IP.

## Legal (España)
- Aviso legal, política de privacidad y política de cookies: `src/data/legal-es.ts` / `legal-en.ts`.
  Se abren en ventanas con enlaces tipo `#legal/privacidad`.
- **Titular**: mientras no haya alta figura el nombre comercial "AceMedia Marketing". Al darse de alta, poned
  nombre y apellidos (o razón social), NIF/NIE y dirección en `legalOwner` (`src/data/site.ts`); las
  líneas de NIF y domicilio aparecen solas cuando tienen valor.
- Son plantillas: conviene que un gestor o abogado las revise.
- **Cookies**: la web solo guarda datos técnicos (idioma, anti-spam, elección de cookies), exentos de
  consentimiento, así que no muestra aviso. Si añadís Google Analytics, el píxel de Meta, etc., añadidlos en
  `optionalServices` (`src/data/site.ts`): el aviso aparecerá solo y el script solo se cargará si la persona
  acepta. Recordad permitir su dominio en la CSP. Alternativa sin aviso: analítica sin cookies como
  Cloudflare Web Analytics.

## Visibilidad en Google (SEO)
Se genera solo al compilar (`seo.ts`), a partir de los mismos datos de la web:
- `robots.txt` y `sitemap.xml`.
- Vista previa al compartir el link (WhatsApp, Instagram…): título, descripción e imagen `public/og-image.jpg`.
- Datos de negocio local para Google (JSON-LD) con zona (Málaga, Costa del Sol, Madrid), redes y
  los packs con sus precios. No incluye teléfono ni email, para no exponerlos a los bots.

**Web pre-armada**: `npm run build` genera también el HTML completo de la página con todos los textos
(`src/entry-server.tsx` + `prerender.mjs`), así Google y los móviles ven el contenido de entrada. En el
navegador React "engancha" ese HTML (`hydrateRoot`) para las animaciones y botones. Por eso lo que dependa
del navegador (idioma guardado, tamaño de pantalla, localStorage…) se lee en un `useEffect`, no al dibujar.

**Al publicar**: la dirección de la web se configura en `SITE_URL` (`seo.ts`), o con la variable de
entorno `SITE_URL` en Cloudflare Pages. Ahora es `https://ac-marketing-malaga.pages.dev`.

Después de publicar:
1. **Perfil de Empresa de Google** (Google Maps) con el link a la web: es lo que más trae clientes locales.
2. **Google Search Console**: añadir la web y enviar `sitemap.xml`.
3. Poner el link en la bio de Instagram y TikTok.

## Deploy gratis (recomendado: Cloudflare Pages)
Cloudflare Pages es gratis también para uso comercial, no tiene límite de tráfico en webs estáticas e
incluye protección DDoS. (El plan gratis de Vercel solo permite uso personal, no comercial.)
1. Sube el proyecto a GitHub.
2. En dash.cloudflare.com → Workers & Pages → Create → Pages → conecta el repo.
3. Build command: `npm run build` · Output directory: `dist`. Deploy.
4. Añade vuestro dominio (Custom domains). Con el dominio en Cloudflare, activa en **Security**:
   - **Bot Fight Mode** (bloquea bots conocidos).
   - Security Level «Medium» y, si hay un ataque, el botón **Under Attack Mode**.
   - **SSL/TLS → Full (strict)** y «Always Use HTTPS».
Cada `git push` publica la web automáticamente. `public/_headers` ya añade las cabeceras de seguridad.

Alternativa: Netlify (también lee `public/_headers`).
