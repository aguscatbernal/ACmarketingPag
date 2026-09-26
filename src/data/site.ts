// ============================================================
//  DATOS QUE NO DEPENDEN DEL IDIOMA: links, precios, números.
//  Los textos están en es.ts (español) y en.ts (inglés).
//  Lo marcado con "EDITAR" son datos de ejemplo.
// ============================================================

// El teléfono y el email van codificados (base64 del texto al revés) para que
// los bots que rastrean webs buscando contactos no los encuentren como texto plano.
// Para generar uno nuevo, en la consola del navegador:
//   btoa("34611222333".split("").reverse().join(""))
const decode = (s: string) => [...atob(s)].reverse().join("");

export const brand = {
  name: "AC Marketing",
  short: "AC",
  whatsapp: () => decode("MDAwMDAwMDA2NDM="), // EDITAR: +34 600 000 000
  email: () => decode("c2UuZ25pdGVrcmFtY2FAYWxvaA=="), // EDITAR: hola@acmarketing.es
  instagram: "https://www.instagram.com/acmarketing.es/",
  instagramHandle: "@acmarketing.es",
  creatorInstagram: "https://www.instagram.com/celesslarocca/",
  creatorInstagramHandle: "@celesslarocca",
  creatorTiktok: "https://www.tiktok.com/@celelarocca",
  creatorTiktokHandle: "@celelarocca",
  creatorPhoto: "/cele.jpg", // Pon una foto en /public/cele.jpg y aparece sola
};

export const waLink = (text: string) =>
  `https://wa.me/${brand.whatsapp()}?text=${encodeURIComponent(text)}`;

export const currency = "EUR";

// EDITAR: números reales
export const heroStats = [
  { key: "collabs", value: 50, prefix: "+", suffix: "" },
  { key: "views", value: 1, prefix: "+", suffix: "M" },
  { key: "tags", value: 300, prefix: "+", suffix: "" },
] as const;

export const creatorStats = [
  { key: "collabs", value: 50, prefix: "+", suffix: "" },
  { key: "views", value: 1, prefix: "+", suffix: "M" },
  { key: "engagement", value: 8, prefix: "", suffix: "%" },
] as const;

export type ServiceId = "nfcReviews" | "nfcMenu" | "collabs" | "social" | "systems" | "web";

export const services: {
  id: ServiceId;
  icon: "star" | "menu" | "video" | "social" | "code" | "web";
  color: "green" | "yellow" | "coral" | "mint" | "purple" | "blue";
  href: string;
}[] = [
  { id: "nfcReviews", icon: "star", color: "yellow", href: "#nfc" },
  { id: "nfcMenu", icon: "menu", color: "mint", href: "#nfc" },
  { id: "collabs", icon: "video", color: "coral", href: "#colabs" },
  { id: "social", icon: "social", color: "purple", href: "#redes" },
  { id: "systems", icon: "code", color: "green", href: "#sistemas" },
  { id: "web", icon: "web", color: "blue", href: "#ofertas" },
];

export type ReelCat = "food" | "beauty" | "fashion" | "brands" | "fun";
export const reelCats: ReelCat[] = ["food", "beauty", "fashion", "brands", "fun"];

// Colaboraciones reales de Cele. Para añadir una: copia una línea, cambia el enlace
// y añade su título en es.ts y en.ts (collabs.reelTitles, con el mismo id).
// Portada: imagen vertical en /public/reels/ (cover: "/reels/nombre.webp"). Sin portada se usa emoji + degradado.
export const reels: {
  id: string;
  cat: ReelCat;
  platform: "instagram" | "tiktok";
  url: string;
  place: string;
  emoji: string;
  colors: [string, string];
  cover?: string;
}[] = [
  { id: "pizza", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/Dcy4jeyI1UZ/", place: "Veridian Pizza · Málaga", emoji: "🍕", colors: ["#ff7a6b", "#ffc94d"], cover: "/reels/pizza.webp" },
  { id: "museum", cat: "fun", platform: "instagram", url: "https://www.instagram.com/p/DboZ7w5ITS2/", place: "Museum of Senses · Madrid", emoji: "🤯", colors: ["#6c4cf1", "#ff7ac6"], cover: "/reels/museum.webp" },
  { id: "spa", cat: "beauty", platform: "instagram", url: "https://www.instagram.com/p/DYm0aFno5Xe/", place: "Guinda Wellness Spa · Mijas", emoji: "🕯️", colors: ["#00564c", "#8ee8d2"], cover: "/reels/spa.webp" },
  { id: "outlet", cat: "fashion", platform: "instagram", url: "https://www.instagram.com/p/DTlHmoHCFtl/", place: "Last Price Outlet · Málaga", emoji: "🛍️", colors: ["#1f2937", "#00a88f"], cover: "/reels/outlet.webp" },
  { id: "loreal", cat: "brands", platform: "tiktok", url: "https://www.tiktok.com/@celelarocca/video/7681676956655439126", place: "L'Oréal Professionnel", emoji: "💇‍♀️", colors: ["#1f2937", "#d4a373"], cover: "/reels/loreal.webp" },
  { id: "casanostra", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/DcrPHR9I6jJ/", place: "A Casa Nostra · Torremolinos", emoji: "🍝", colors: ["#16a34a", "#dc2626"], cover: "/reels/casanostra.webp" },
  { id: "matcha", cat: "beauty", platform: "instagram", url: "https://www.instagram.com/p/DYsAKGYolc0/", place: "Japanese Head Spa · Málaga", emoji: "🍵", colors: ["#4d7c0f", "#bef264"], cover: "/reels/matcha.webp" },
  { id: "shoes", cat: "fashion", platform: "instagram", url: "https://www.instagram.com/p/DUJLJw5CDoA/", place: "Timbos · Málaga", emoji: "👠", colors: ["#ff9ec7", "#ffd6e7"], cover: "/reels/shoes.webp" },
  { id: "brunch", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/Dbd2iIwIAdQ/", place: "Billy Brunch · Madrid", emoji: "🥞", colors: ["#f59e0b", "#fde68a"], cover: "/reels/brunch.webp" },
  { id: "canva", cat: "brands", platform: "tiktok", url: "https://www.tiktok.com/@celelarocca/video/7578842410382380310", place: "Canva", emoji: "🎨", colors: ["#00c4cc", "#7d2ae8"], cover: "/reels/canva.webp" },
  { id: "kebab", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/Dc_uqGwJ4i6/", place: "Berliner Bros Döner · Marbella", emoji: "🥙", colors: ["#dc2626", "#fb923c"], cover: "/reels/kebab.webp" },
  { id: "optica", cat: "fashion", platform: "instagram", url: "https://www.instagram.com/p/DUTrpA_CP9V/", place: "Óptica Merkavision · Málaga", emoji: "👓", colors: ["#0ea5e9", "#6ee7b7"], cover: "/reels/optica.webp" },
  { id: "lahiedra", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/DdpJNe-IrFW/", place: "La Hiedra · Málaga", emoji: "🌿", colors: ["#00695c", "#4fd1b5"], cover: "/reels/lahiedra.webp" },
  { id: "icecream", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/DdcE6hZoDc0/", place: "Arkyn Ice Cream", emoji: "🍦", colors: ["#6366f1", "#c4b5fd"], cover: "/reels/icecream.webp" },
  { id: "swissbutter", cat: "food", platform: "instagram", url: "https://www.instagram.com/p/DbY9F4KI8G8/", place: "Swiss Butter · Madrid", emoji: "🥩", colors: ["#7c2d12", "#f59e0b"], cover: "/reels/swissbutter.webp" },
];

// Carta de ejemplo para las demos (precios en euros)
export type MenuId = "bravas" | "croquetas" | "tortilla" | "calamares" | "cana" | "tinto" | "tarta" | "paella";
export const demoMenu: { id: MenuId; price: number }[] = [
  { id: "bravas", price: 6.5 },
  { id: "croquetas", price: 8 },
  { id: "tortilla", price: 7.5 },
  { id: "calamares", price: 11.9 },
  { id: "cana", price: 2.5 },
  { id: "tinto", price: 3.5 },
  { id: "tarta", price: 5.9 },
  { id: "paella", price: 14.5 },
];

export type OfferId = "resenas" | "combo" | "colab" | "mesa" | "redes" | "sistema" | "web";

// EDITAR: precios orientativos en euros (sin IVA)
export const offers: {
  id: OfferId;
  emoji: string;
  price: number;
  oldPrice?: number;
  from?: boolean;
  highlight?: boolean;
}[] = [
  { id: "resenas", emoji: "⭐", price: 49, oldPrice: 69 },
  { id: "combo", emoji: "🚀", price: 249, oldPrice: 320, highlight: true },
  { id: "colab", emoji: "🎬", price: 150, oldPrice: 190 },
  { id: "mesa", emoji: "🍽️", price: 89, oldPrice: 119 },
  { id: "redes", emoji: "📱", price: 290, oldPrice: 350 },
  { id: "sistema", emoji: "👨‍🍳", price: 39, from: true },
  { id: "web", emoji: "💻", price: 390, from: true },
];

export const promoActive = true;

// Gestión de redes: perfil de ejemplo para la demo
export const socialDemo = {
  followersStart: 2480,
  followersEnd: 3720,
  growth: [12, 18, 15, 26, 30, 28, 41, 45, 52, 60, 71, 85], // curva del gráfico
  grid: [
    { emoji: "🥘", colors: ["#ff7a6b", "#ffc94d"] },
    { emoji: "✨", colors: ["#006b5e", "#5fdcbf"] },
    { emoji: "🍹", colors: ["#6c4cf1", "#ff7ac6"] },
    { emoji: "📍", colors: ["#0ea5e9", "#6ee7b7"] },
    { emoji: "🎬", colors: ["#1f2937", "#00a88f"] },
    { emoji: "⭐", colors: ["#f59e0b", "#fde68a"] },
    { emoji: "💅", colors: ["#ff9ec7", "#ffd6e7"] },
    { emoji: "🍔", colors: ["#dc2626", "#fb923c"] },
    { emoji: "🏨", colors: ["#00564c", "#8ee8d2"] },
  ] as { emoji: string; colors: [string, string] }[],
};

export const techStack = ["React", "TypeScript", "Firebase", "Realtime", "Web + Mobile"];

// ---------- DATOS LEGALES (obligatorios en España: LSSI y RGPD) ----------
// EDITAR: rellenad con vuestros datos reales antes de publicar
export const legalOwner = {
  name: "[EDITAR: Nombre y apellidos o razón social]",
  nif: "[EDITAR: NIF / CIF]",
  address: "[EDITAR: Dirección, código postal, ciudad]",
  domain: "acmarketing.es", // EDITAR: dominio de la web
  updated: "2026-09-26",
};

/** Rellena {name}, {nif}, {address}, {email}, {domain} y {updated} en los textos legales. */
export const fillLegal = (text: string) =>
  text
    .replaceAll("{name}", legalOwner.name)
    .replaceAll("{nif}", legalOwner.nif)
    .replaceAll("{address}", legalOwner.address)
    .replaceAll("{email}", brand.email())
    .replaceAll("{domain}", legalOwner.domain)
    .replaceAll("{updated}", legalOwner.updated);

// ---------- COOKIES OPCIONALES ----------
// Ahora mismo la web NO usa cookies de análisis ni de publicidad, así que el
// aviso de cookies no aparece (la ley no lo exige). Si algún día añadís
// Google Analytics, el píxel de Meta, etc., añadidlo aquí: el aviso aparecerá solo
// y el script se cargará únicamente si la persona acepta esa categoría.
// Ojo: también hay que permitir su dominio en la cabecera Content-Security-Policy.
export type CookieCategory = "analytics" | "marketing";

export const optionalServices: {
  id: string;
  category: CookieCategory;
  name: string;
  provider: string;
  load: () => void;
}[] = [
  // Ejemplo:
  // {
  //   id: "ga",
  //   category: "analytics",
  //   name: "Google Analytics",
  //   provider: "Google Ireland Ltd.",
  //   load: () => {
  //     const s = document.createElement("script");
  //     s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
  //     s.async = true;
  //     document.head.appendChild(s);
  //   },
  // },
];

// Lo que la web guarda en el navegador (técnico, exento de consentimiento)
export const technicalStorage = [
  { key: "ac-lang", purpose: "lang" },
  { key: "ac-contact-sends", purpose: "antispam" },
  { key: "ac-cookie-consent", purpose: "consent" },
] as const;
