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

export type ReelCat = "food" | "bars" | "shops" | "beauty" | "fun" | "hotels";
export const reelCats: ReelCat[] = ["food", "bars", "shops", "beauty", "fun", "hotels"];

// EDITAR: reemplazar por colaboraciones reales (url = link al reel)
export const reels: {
  id: string;
  cat: ReelCat;
  views: string;
  emoji: string;
  colors: [string, string];
  url?: string;
}[] = [
  { id: "hotel", cat: "hotels", views: "48K", emoji: "🏨", colors: ["#00695c", "#4fd1b5"] },
  { id: "foodIntro", cat: "food", views: "120K", emoji: "🥘", colors: ["#ff7a6b", "#ffc94d"] },
  { id: "drink", cat: "bars", views: "67K", emoji: "🍹", colors: ["#6c4cf1", "#ff7ac6"] },
  { id: "beauty", cat: "beauty", views: "35K", emoji: "💅", colors: ["#ff9ec7", "#ffd6e7"] },
  { id: "outfit", cat: "shops", views: "52K", emoji: "🛍️", colors: ["#1f2937", "#00a88f"] },
  { id: "bowling", cat: "fun", views: "88K", emoji: "🎳", colors: ["#0ea5e9", "#6ee7b7"] },
  { id: "breakfast", cat: "hotels", views: "29K", emoji: "🥐", colors: ["#f59e0b", "#fde68a"] },
  { id: "burger", cat: "food", views: "210K", emoji: "🍔", colors: ["#dc2626", "#fb923c"] },
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
