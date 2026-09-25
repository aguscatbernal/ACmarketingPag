// ============================================================
//  TODO EL CONTENIDO DE LA PÁGINA ESTÁ ACÁ.
//  Cambiá textos, precios, links y ofertas sin tocar componentes.
//  Lo marcado con "EDITAR" son datos de ejemplo para reemplazar.
// ============================================================

export const brand = {
  name: "AC Marketing",
  short: "AC",
  tagline: "Marketing que se toca, se mira y se recomienda.",
  whatsapp: "5491100000000", // EDITAR: número con código de país, sin + ni espacios
  email: "hola@acmarketing.com", // EDITAR
  instagram: "https://www.instagram.com/celesslarocca/",
  tiktok: "https://www.tiktok.com/@celelarocca",
  city: "Argentina", // EDITAR
};

export const waLink = (text: string) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { id: "servicios", label: "Servicios" },
  { id: "nfc", label: "NFC" },
  { id: "colabs", label: "Colaboraciones" },
  { id: "sistemas", label: "Webs & Apps" },
  { id: "ofertas", label: "Ofertas" },
  { id: "faq", label: "Preguntas" },
];

export const heroWords = ["restaurante", "bar", "tienda", "estética", "hotel", "cafetería"];

// EDITAR: números reales
export const heroStats = [
  { value: 50, prefix: "+", suffix: "", label: "colaboraciones" },
  { value: 1, prefix: "+", suffix: "M", label: "vistas generadas" },
  { value: 300, prefix: "+", suffix: "", label: "tags NFC instalados" },
];

export const rubros = [
  "🍔 Restaurantes",
  "🍸 Bares",
  "🛍️ Tiendas",
  "💅 Estética",
  "🎳 Entretenimiento",
  "🏨 Hoteles",
  "☕ Cafeterías",
  "💪 Gimnasios",
  "🍦 Heladerías",
];

export type ServiceColor = "green" | "yellow" | "coral" | "mint";

export const services: {
  id: string;
  icon: "star" | "menu" | "video" | "code";
  color: ServiceColor;
  title: string;
  text: string;
  bullets: string[];
  href: string;
}[] = [
  {
    id: "nfc-resenas",
    icon: "star",
    color: "yellow",
    title: "NFC para reseñas de Google",
    text: "Tu cliente acerca el celu y deja 5 estrellas en segundos. Sin buscar, sin escribir links.",
    bullets: ["Diseño con tu logo", "QR de respaldo", "Más reseñas, mejor posicionamiento"],
    href: "#nfc",
  },
  {
    id: "nfc-carta",
    icon: "menu",
    color: "mint",
    title: "Carta en mesa con NFC",
    text: "La carta se abre con solo apoyar el teléfono. Chau cartas manchadas y QR borrosos.",
    bullets: ["Cambiás precios al instante", "Fotos de cada plato", "Ideal para bares y restós"],
    href: "#nfc",
  },
  {
    id: "colabs",
    icon: "video",
    color: "coral",
    title: "Colaboraciones pagas",
    text: "Reels y TikToks que muestran tu negocio de forma real, divertida y que la gente comparte.",
    bullets: ["Guion, grabación y edición", "Publicado en IG + TikTok", "Para todo tipo de rubro"],
    href: "#colabs",
  },
  {
    id: "sistemas",
    icon: "code",
    color: "green",
    title: "Webs y apps para restaurantes",
    text: "Sistema completo de admin, mozo y cocina conectados en tiempo real. También webs a medida.",
    bullets: ["Pedidos en tiempo real", "Panel con reportes", "React + Firebase"],
    href: "#sistemas",
  },
];

// ---------- COLABORACIONES ----------
export const creator = {
  name: "Cele La Rocca", // EDITAR si el nombre es otro
  handleIg: "@celesslarocca",
  handleTiktok: "@celelarocca",
  photo: "/cele.jpg", // Poné una foto en /public/cele.jpg y aparece sola
  bio: "Creadora de contenido. Muestro lugares, comidas y experiencias como si fueras vos el que está ahí.",
  // EDITAR: números reales
  stats: [
    { value: 50, prefix: "+", suffix: "", label: "colabs" },
    { value: 1, prefix: "+", suffix: "M", label: "vistas" },
    { value: 8, prefix: "", suffix: "%", label: "engagement" },
  ],
};

export const collabIncludes = [
  "Idea y guion pensado para tu negocio",
  "Grabación en el local",
  "Edición con música en tendencia",
  "Publicación en Instagram + TikTok",
  "Historias de apoyo",
  "Te pasamos las métricas",
];

export const collabCategories = [
  "Todos",
  "Restaurantes",
  "Bares",
  "Tiendas",
  "Estética",
  "Entretenimiento",
  "Hoteles",
];

// EDITAR: reemplazar por colaboraciones reales (podés poner link al reel)
export const reels: {
  title: string;
  category: string;
  views: string;
  emoji: string;
  colors: [string, string];
  url?: string;
}[] = [
  { title: "¿Hotel o entretenimiento?", category: "Hoteles", views: "48K", emoji: "🏨", colors: ["#00695c", "#4fd1b5"] },
  { title: "Tremenda idea de comienzo de video para gastronomía", category: "Restaurantes", views: "120K", emoji: "🍝", colors: ["#ff7a6b", "#ffc94d"] },
  { title: "El trago que tenés que probar este finde", category: "Bares", views: "67K", emoji: "🍹", colors: ["#6c4cf1", "#ff7ac6"] },
  { title: "Probé el tratamiento del que todas hablan", category: "Estética", views: "35K", emoji: "💅", colors: ["#ff9ec7", "#ffd6e7"] },
  { title: "Outfit completo por menos de lo que pensás", category: "Tiendas", views: "52K", emoji: "🛍️", colors: ["#1f2937", "#00a88f"] },
  { title: "Plan de sábado: bowling + birra", category: "Entretenimiento", views: "88K", emoji: "🎳", colors: ["#0ea5e9", "#6ee7b7"] },
  { title: "Desayuno de hotel 10/10", category: "Hoteles", views: "29K", emoji: "🥐", colors: ["#f59e0b", "#fde68a"] },
  { title: "La hamburguesa más grande de la ciudad", category: "Restaurantes", views: "210K", emoji: "🍔", colors: ["#dc2626", "#fb923c"] },
];

// ---------- SISTEMA RESTAURANTE ----------
export const systemRoles = [
  {
    id: "admin",
    emoji: "📊",
    title: "Admin",
    text: "Carta, precios, stock, mozos y reportes de ventas desde cualquier lugar.",
  },
  {
    id: "mozo",
    emoji: "🧑‍🍳",
    title: "Mozo",
    text: "Toma pedidos desde el celu, ve el estado de cada mesa y cierra la cuenta.",
  },
  {
    id: "cocina",
    emoji: "🔥",
    title: "Cocina",
    text: "Las comandas llegan al instante, con tiempos y aviso cuando está listo.",
  },
];

export const techStack = ["React", "TypeScript", "Firebase", "Tiempo real", "Web + móvil"];

export const demoMenu = [
  { name: "Milanesa napo", price: 9800 },
  { name: "Burger doble", price: 8500 },
  { name: "Papas cheddar", price: 5200 },
  { name: "Pinta IPA", price: 4200 },
  { name: "Limonada", price: 3100 },
  { name: "Tiramisú", price: 4600 },
  { name: "Ravioles", price: 8900 },
  { name: "Fernet", price: 4800 },
];

// ---------- OFERTAS ----------
export const promo = {
  active: true,
  title: "Promo de lanzamiento",
  text: "20% OFF en todos los packs contratando este mes",
};

// EDITAR: precios de ejemplo
export const offers: {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  price: string;
  oldPrice?: string;
  period: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
}[] = [
  {
    id: "resenas",
    emoji: "⭐",
    name: "Pack Reseñas",
    desc: "Más reseñas en Google sin pedirlas dos veces.",
    price: "$35.000",
    oldPrice: "$44.000",
    period: "pago único",
    features: ["5 tags NFC programados", "Diseño con tu logo", "QR de respaldo", "Instalación y prueba"],
  },
  {
    id: "combo",
    emoji: "🚀",
    name: "Combo Explosión",
    desc: "Colab + NFC: te conocen, vienen y te recomiendan.",
    price: "$150.000",
    oldPrice: "$190.000",
    period: "pago único",
    features: [
      "1 reel colaborativo IG + TikTok",
      "3 historias de apoyo",
      "Pack Reseñas incluido",
      "Métricas del contenido",
    ],
    badge: "Más elegido",
    highlight: true,
  },
  {
    id: "colab",
    emoji: "🎬",
    name: "Colab Reel",
    desc: "Contenido que la gente mira hasta el final.",
    price: "$90.000",
    oldPrice: "$112.000",
    period: "por colaboración",
    features: ["Guion + grabación + edición", "Publicado en IG y TikTok", "2 historias", "El video queda para tu cuenta"],
  },
  {
    id: "mesa",
    emoji: "🍽️",
    name: "Pack Carta en Mesa",
    desc: "La carta al toque en cada mesa.",
    price: "$60.000",
    oldPrice: "$75.000",
    period: "hasta 10 mesas",
    features: ["10 tags NFC de mesa", "Carta digital online", "Cambios de precios ilimitados", "QR de respaldo"],
  },
  {
    id: "sistema",
    emoji: "👨‍🍳",
    name: "Sistema Restaurante",
    desc: "Admin, mozo y cocina conectados.",
    price: "Desde $40.000",
    period: "por mes",
    features: ["App para mozos", "Pantalla de cocina en vivo", "Panel admin con reportes", "Soporte y actualizaciones"],
  },
  {
    id: "web",
    emoji: "💻",
    name: "Web a medida",
    desc: "Tu negocio con una web que da ganas de visitar.",
    price: "Desde $120.000",
    period: "pago único",
    features: ["Diseño personalizado", "Animaciones y carta online", "Botón de WhatsApp", "Hosting gratis incluido"],
  },
];

export const steps = [
  { emoji: "💬", title: "Nos escribís", text: "Contanos de tu negocio y qué querés lograr." },
  { emoji: "🧠", title: "Armamos la idea", text: "Te pasamos una propuesta a medida con precios claros." },
  { emoji: "🎬", title: "Manos a la obra", text: "Grabamos, instalamos los NFC o desarrollamos tu sistema." },
  { emoji: "📈", title: "Resultados", text: "Más gente, más reseñas y todo medido." },
];

export const faqs = [
  {
    q: "¿Cómo funciona el tag NFC?",
    a: "Es un sticker o placa con un chip. El cliente apoya el celular y se abre automáticamente tu página de reseñas de Google o tu carta. No necesita instalar ninguna app.",
  },
  {
    q: "¿Y si el celular no tiene NFC?",
    a: "Todos los tags llevan un QR de respaldo, así que cualquier celular puede usarlo igual.",
  },
  {
    q: "¿Las colaboraciones son pagas?",
    a: "Sí. Cada colaboración incluye idea, grabación, edición y publicación en Instagram y TikTok. Hay packs según lo que necesites.",
  },
  {
    q: "¿Trabajan con cualquier rubro?",
    a: "Restaurantes, bares, tiendas, estéticas, hoteles, entretenimiento y más. Si tu negocio se puede mostrar, lo hacemos brillar.",
  },
  {
    q: "¿Cuánto tarda una web o el sistema para el restaurante?",
    a: "Una web simple puede estar en 1 o 2 semanas. El sistema de admin, mozo y cocina ya está desarrollado, así que lo adaptamos a tu local rápido.",
  },
  {
    q: "¿Puedo cambiar la carta o los precios después?",
    a: "Sí, cuando quieras. El tag NFC sigue siendo el mismo, solo cambia el contenido al que apunta.",
  },
];

export const contactRubros = [
  "Restaurante",
  "Bar",
  "Tienda",
  "Estética",
  "Entretenimiento",
  "Hotel",
  "Otro",
];

export const contactServices = [
  "NFC reseñas",
  "NFC carta",
  "Colaboración",
  "Web",
  "Sistema restaurante",
];
