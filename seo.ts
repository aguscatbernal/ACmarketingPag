// ============================================================
//  SEO: se genera al compilar (npm run build) a partir de los datos
//  de la web, así los precios que ve Google nunca quedan viejos.
//   - robots.txt y sitemap.xml
//   - etiquetas para compartir (WhatsApp, Instagram, Google) en index.html
//   - datos de negocio local para Google (JSON-LD)
//
//  SITE_URL: la dirección pública de la web. Cambiadla aquí (o con la
//  variable de entorno SITE_URL en Cloudflare) cuando tengáis dominio propio.
// ============================================================
import type { Plugin } from "vite";
import { es } from "./src/data/es.ts";
import { brand, offers } from "./src/data/site.ts";

export const SITE_URL = (process.env.SITE_URL ?? "https://ac-marketing-malaga.pages.dev").replace(/\/$/, "");

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#negocio`,
    name: brand.name,
    description: es.meta.description,
    slogan: es.meta.tagline,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/apple-touch-icon.png`,
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "€€",
    address: { "@type": "PostalAddress", addressLocality: "Málaga", addressRegion: "Andalucía", addressCountry: "ES" },
    areaServed: ["Málaga", "Costa del Sol", "Madrid"].map((name) => ({ "@type": "Place", name })),
    knowsLanguage: ["es", "en"],
    sameAs: [brand.instagram, brand.creatorInstagram, brand.creatorTiktok],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: es.offers.eyebrow,
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        name: es.offers.items[o.id].name,
        description: es.offers.items[o.id].desc,
        priceCurrency: "EUR",
        ...(o.from || o.monthly
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: "EUR",
                ...(o.from ? { minPrice: o.price } : { price: o.price }),
                ...(o.monthly ? { unitText: "MONTH" } : {}),
              },
            }
          : { price: o.price }),
      })),
    },
  };
}

export function seo(): Plugin {
  return {
    name: "ac-seo",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return {
          html: html
            .replaceAll("%SITE_URL%", SITE_URL)
            .replaceAll("%TITLE%", escapeHtml(es.meta.title))
            .replaceAll("%DESCRIPTION%", escapeHtml(es.meta.description)),
          // Datos para Google: no se ejecutan, así que la CSP no los bloquea
          tags: [
            {
              tag: "script",
              attrs: { type: "application/ld+json" },
              children: JSON.stringify(localBusiness()).replace(/</g, "\\u003c"),
              injectTo: "head",
            },
          ],
        };
      },
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n` +
          `</urlset>\n`,
      });
    },
  };
}
