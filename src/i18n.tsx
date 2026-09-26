import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./data/en";
import { es, type Content } from "./data/es";
import { currency } from "./data/site";

export type Lang = "es" | "en";
const dictionaries: Record<Lang, Content> = { es, en };
const STORAGE_KEY = "ac-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* sin acceso a localStorage */
  }
  // Por defecto español; inglés solo si el navegador no está en español
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : navigator.language ? "en" : "es";
}

type LangCtx = {
  lang: Lang;
  t: Content;
  setLang: (l: Lang) => void;
  money: (n: number, decimals?: number) => string;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const t = dictionaries[lang];

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  const money = useCallback(
    (n: number, decimals = 0) =>
      new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-IE", {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n),
    [lang]
  );

  const value = useMemo(() => ({ lang, t, setLang, money }), [lang, t, setLang, money]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
