// ============================================================
//  TEXTOS LEGALES Y DE COOKIES (español)
//  {name}, {nif}, {address}, {email}, {domain} y {updated} se rellenan solos
//  con los datos de legalOwner en site.ts.
//  Son plantillas: conviene que un gestor o abogado las revise.
// ============================================================

export const legalEs = {
  links: {
    aviso: "Aviso legal",
    privacidad: "Privacidad",
    cookies: "Cookies",
    settings: "Configurar cookies",
  },
  close: "Cerrar",
  updated: "Última actualización",
  form: {
    accept: "He leído y acepto la",
    policy: "política de privacidad",
    required: "Para continuar, acepta la política de privacidad.",
    info: "Responsable: {name}. Finalidad: responder a tu consulta y enviarte presupuesto. Guardamos tu consulta en nuestra base de datos (Google Firebase) solo para eso. Puedes ejercer tus derechos escribiendo a {email}.",
  },
  banner: {
    title: "Tu privacidad importa 🍪",
    text: "Usamos cookies propias necesarias para que la web funcione y, solo si nos dejas, cookies de análisis o publicidad.",
    accept: "Aceptar todas",
    reject: "Rechazar",
    configure: "Configurar",
  },
  settings: {
    title: "Configuración de cookies",
    intro:
      "Aquí puedes ver qué guarda esta web en tu navegador y elegir qué cookies opcionales permites. Puedes cambiarlo cuando quieras desde el pie de página.",
    technical: "Técnicas y de seguridad",
    technicalDesc: "Necesarias para que la web funcione. No se pueden desactivar y no necesitan tu permiso.",
    alwaysOn: "Siempre activas",
    storage: {
      lang: "Recuerda el idioma que elegiste.",
      antispam: "Protección anti-spam del formulario (se borra a los 10 minutos).",
      consent: "Guarda tu elección sobre las cookies.",
    },
    categories: {
      analytics: { title: "Análisis", desc: "Nos ayudan a saber cuántas personas visitan la web y qué secciones gustan más." },
      marketing: { title: "Publicidad", desc: "Permiten medir campañas y mostrarte anuncios relevantes en otras webs." },
    },
    none: "Ahora mismo esta web no usa cookies de análisis ni de publicidad. ✅",
    save: "Guardar selección",
    acceptAll: "Aceptar todas",
    rejectAll: "Rechazar todas",
  },
  pages: {
    aviso: {
      title: "Aviso legal",
      sections: [
        {
          h: "1. Datos del titular",
          p: [
            "En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:",
            "• Titular: {name}",
            "• NIF/CIF: {nif}",
            "• Domicilio: {address}",
            "• Email: {email}",
            "• Sitio web: {domain}",
          ],
        },
        {
          h: "2. Objeto",
          p: [
            "Esta web presenta los servicios de AceMedia Marketing: tags NFC para reseñas y carta en mesa, colaboraciones con creadores de contenido, gestión de redes sociales y desarrollo de webs y aplicaciones. Navegar por ella atribuye la condición de usuario e implica aceptar este aviso legal.",
          ],
        },
        {
          h: "3. Propiedad intelectual e industrial",
          p: [
            "Los textos, diseños, logotipos, imágenes y el código de esta web son titularidad de {name} o se usan con autorización. Queda prohibida su reproducción, distribución o transformación sin permiso expreso. Las marcas de terceros que se mencionan (Instagram, TikTok, WhatsApp, Google) pertenecen a sus respectivos titulares.",
          ],
        },
        {
          h: "4. Responsabilidad",
          p: [
            "Trabajamos para que la información sea correcta y esté actualizada, pero no garantizamos la ausencia de errores. Los precios que aparecen son orientativos y no constituyen una oferta vinculante hasta que se confirme un presupuesto por escrito.",
            "Esta web incluye enlaces a sitios de terceros (Instagram, TikTok, WhatsApp). No somos responsables de sus contenidos ni de sus políticas de privacidad.",
          ],
        },
        {
          h: "5. Legislación aplicable",
          p: [
            "Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente, incluida la de protección de consumidores cuando sea aplicable.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Política de privacidad",
      sections: [
        {
          h: "1. Responsable del tratamiento",
          p: ["• {name}", "• NIF/CIF: {nif}", "• Domicilio: {address}", "• Email: {email}"],
        },
        {
          h: "2. Qué datos tratamos",
          p: [
            "Cuando envías el formulario guardamos tu consulta (nombre, negocio, sector, servicios que te interesan, WhatsApp o email y mensaje) en nuestra base de datos de Google Firebase, a la que solo accede nuestro equipo. Si eliges enviarlo por WhatsApp o email, el formulario solo prepara el mensaje y eres tú quien decide enviarlo.",
            "Si nos contactas (por WhatsApp, email o redes sociales) trataremos los datos que nos facilites: nombre, negocio, sector, número de teléfono o email y el contenido de tu mensaje.",
          ],
        },
        {
          h: "3. Para qué los usamos",
          p: [
            "• Responder a tus consultas y enviarte presupuestos.",
            "• Gestionar la relación comercial si contratas nuestros servicios (facturación y obligaciones legales).",
            "No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.",
          ],
        },
        {
          h: "4. Base legal",
          p: [
            "• La aplicación de medidas precontractuales a petición tuya y, en su caso, la ejecución del contrato (art. 6.1.b RGPD).",
            "• Tu consentimiento al contactarnos (art. 6.1.a RGPD).",
            "• El cumplimiento de obligaciones legales, por ejemplo fiscales (art. 6.1.c RGPD).",
          ],
        },
        {
          h: "5. Cuánto tiempo los guardamos",
          p: [
            "Mientras sea necesario para atender tu consulta. Si no llegamos a trabajar juntos, los borramos como máximo en 12 meses. Si eres cliente, los conservamos durante la relación y los plazos legales (por ejemplo, 6 años para la documentación contable).",
          ],
        },
        {
          h: "6. Con quién los compartimos",
          p: [
            "No vendemos ni cedemos tus datos. Usamos proveedores que los tratan por cuenta nuestra: WhatsApp / Meta Platforms Ireland (mensajería), Google Ireland (correo electrónico y base de datos Firebase) y el proveedor de alojamiento de la web. Algunos pueden transferir datos a EE. UU. al amparo del Marco de Privacidad de Datos UE-EE. UU. o de cláusulas contractuales tipo aprobadas por la Comisión Europea.",
          ],
        },
        {
          h: "7. Tus derechos",
          p: [
            "Puedes pedir el acceso, la rectificación, la supresión, la oposición, la limitación del tratamiento y la portabilidad de tus datos, así como retirar tu consentimiento, escribiendo a {email}.",
            "Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).",
          ],
        },
        {
          h: "8. Seguridad",
          p: [
            "La web se sirve siempre por HTTPS, no carga contenido de terceros y aplica cabeceras de seguridad para proteger tu navegación.",
          ],
        },
      ],
    },
    cookies: {
      title: "Política de cookies",
      sections: [
        {
          h: "1. Qué son las cookies",
          p: [
            "Son pequeños archivos o datos que una web guarda en tu navegador para recordar información, como tu idioma o tus preferencias.",
          ],
        },
        {
          h: "2. Qué usa esta web",
          p: [
            "Esta web no usa cookies de análisis, de publicidad ni de terceros. Solo guarda en tu navegador (almacenamiento local) datos técnicos imprescindibles, exentos de consentimiento según el artículo 22.2 de la LSSI:",
            "• ac-lang: recuerda el idioma que elegiste. Se conserva hasta que lo borres.",
            "• ac-contact-sends: protección anti-spam del formulario. Caduca a los 10 minutos.",
            "• ac-cookie-consent: guarda tu elección sobre las cookies. Se conserva 12 meses.",
            "Las tipografías están alojadas en nuestro propio servidor, por lo que no se envía tu IP a Google ni a otros servicios al visitar la web.",
            "Solo si envías el formulario, el servicio Firebase de Google (que usamos para recibir tu consulta) puede guardar un dato técnico en tu navegador (firebase-heartbeat-database) para su funcionamiento.",
          ],
        },
        {
          h: "3. Enlaces a otras webs",
          p: [
            "Si pulsas en los enlaces a Instagram, TikTok o WhatsApp, esos servicios pueden instalar sus propias cookies según sus políticas, que te recomendamos consultar.",
          ],
        },
        {
          h: "4. Cómo gestionarlas",
          p: [
            "Puedes cambiar tu elección en cualquier momento desde «Configurar cookies», en el pie de página. También puedes borrar los datos de esta web desde la configuración de tu navegador (Chrome, Safari, Firefox o Edge).",
            "Si en el futuro añadimos cookies de análisis o publicidad, te lo pediremos antes con un aviso y podrás aceptarlas o rechazarlas con la misma facilidad.",
          ],
        },
      ],
    },
  },
};

export type LegalContent = typeof legalEs;
export type LegalPage = keyof LegalContent["pages"];
