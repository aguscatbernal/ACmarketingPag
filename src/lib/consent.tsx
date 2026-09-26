// ============================================================
//  Consentimiento de cookies (RGPD + LSSI + guía de la AEPD).
//  - Solo pide permiso si hay servicios opcionales en site.ts (optionalServices).
//  - Nada opcional se carga antes de que la persona acepte esa categoría.
//  - Aceptar y rechazar tienen la misma facilidad; la elección caduca a los 12 meses.
// ============================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { optionalServices, type CookieCategory } from "../data/site";

type Consent = Record<CookieCategory, boolean> & { date: number };

const STORAGE_KEY = "ac-cookie-consent";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const usedCategories = [...new Set(optionalServices.map((s) => s.category))];

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Partial<Consent>;
    if (typeof c.date !== "number" || Date.now() - c.date > MAX_AGE_MS) return null;
    return { analytics: c.analytics === true, marketing: c.marketing === true, date: c.date };
  } catch {
    return null;
  }
}

const loaded = new Set<string>();
function loadAccepted(consent: Consent) {
  for (const s of optionalServices) {
    if (consent[s.category] && !loaded.has(s.id)) {
      loaded.add(s.id);
      s.load();
    }
  }
}

type ConsentCtx = {
  consent: Consent | null;
  bannerVisible: boolean;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  save: (choice: Record<CookieCategory, boolean>) => void;
};

const Ctx = createContext<ConsentCtx | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(readConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (consent) loadAccepted(consent);
  }, [consent]);

  const save = useCallback(
    (choice: Record<CookieCategory, boolean>) => {
      const next: Consent = { ...choice, date: Date.now() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      // Un script ya cargado no se puede "descargar": si se retira un permiso, recargamos
      const withdrawn = consent && (["analytics", "marketing"] as const).some((k) => consent[k] && !next[k]);
      setConsent(next);
      setSettingsOpen(false);
      if (withdrawn && loaded.size > 0) window.location.reload();
    },
    [consent]
  );

  const value = useMemo(
    () => ({
      consent,
      bannerVisible: usedCategories.length > 0 && !consent && !settingsOpen,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      save,
    }),
    [consent, settingsOpen, save]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
