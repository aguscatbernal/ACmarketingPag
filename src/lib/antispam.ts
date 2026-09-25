// ============================================================
//  Protección anti-bots del formulario de contacto.
//
//  El formulario NO envía nada a ningún servidor: solo abre WhatsApp con el
//  mensaje escrito y la persona tiene que pulsar "enviar" en su propio móvil.
//  Por eso un bot no puede mandarte mensajes a través de la web.
//  Aun así, estas capas frenan el uso automatizado del formulario:
//   1. Honeypot: campo invisible que solo rellenan los bots.
//   2. Tiempo mínimo: una persona tarda más de 3 s en rellenar el formulario.
//   3. Límite de envíos: máximo 3 cada 10 minutos por navegador.
//   4. Validación: longitudes máximas, máximo 1 enlace, sin caracteres raros.
// ============================================================

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SENDS = 3;
const STORAGE_KEY = "ac-contact-sends";

export const LIMITS = { name: 60, business: 80, message: 800 };

export type SpamCheck =
  | { ok: true }
  | { ok: false; reason: "honeypot" | "tooFast" | "name" | "links" | "long" }
  | { ok: false; reason: "cooldown"; waitSeconds: number };

function readSends(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(list) ? list.filter((n): n is number => typeof n === "number") : [];
  } catch {
    return [];
  }
}

export function recordSend() {
  const now = Date.now();
  const recent = readSends().filter((t) => now - t < WINDOW_MS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...recent, now]));
  } catch {
    /* ignore */
  }
}

/** Quita caracteres de control e invisibles y recorta espacios. */
export function clean(text: string, max: number) {
  return text
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F\u200B-\u200F\u2028-\u202E\u2060-\u206F\uFEFF]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, max);
}

const URL_RE = /(https?:\/\/|www\.)\S+/gi;
const HAS_URL = /(https?:\/\/|www\.)\S+/i;

export function checkSubmission(input: {
  honeypot: string;
  startedAt: number;
  name: string;
  message: string;
}): SpamCheck {
  if (input.honeypot.trim() !== "") return { ok: false, reason: "honeypot" };
  if (Date.now() - input.startedAt < MIN_FILL_MS) return { ok: false, reason: "tooFast" };

  const name = input.name.trim();
  if (name.length < 2 || name.length > LIMITS.name || HAS_URL.test(name)) return { ok: false, reason: "name" };
  if (input.message.length > LIMITS.message) return { ok: false, reason: "long" };
  if ((input.message.match(URL_RE) ?? []).length > 1) return { ok: false, reason: "links" };

  const now = Date.now();
  const recent = readSends().filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_SENDS) {
    const waitSeconds = Math.ceil((WINDOW_MS - (now - Math.min(...recent))) / 1000);
    return { ok: false, reason: "cooldown", waitSeconds };
  }
  return { ok: true };
}
