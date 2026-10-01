import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { brand } from "../data/site";
import { useLang, type Lang } from "../i18n";

export const navIds = ["servicios", "nfc", "colabs", "redes", "sistemas", "ofertas", "faq"] as const;

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t.nav.lang}>
      {(["es", "en"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} className={lang === l ? "active" : ""} aria-pressed={lang === l}>
          {lang === l && (
            <motion.span layoutId="lang-bg" className="lang-bg" transition={{ type: "spring", stiffness: 500, damping: 32 }} />
          )}
          <span className="lang-label">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 30));

  return (
    <motion.header
      className={`nav${scrolled ? " scrolled" : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav-inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <img className="logo-mark" src="/brand/logo-mark.png" alt="" width="60" height="44" />
          <span className="logo-name">
            <strong>{brand.wordTop}</strong>
            <span>{brand.wordBottom}</span>
          </span>
        </a>

        <nav className="nav-links">
          {navIds.map((id) => (
            <a key={id} href={`#${id}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <LangToggle />

        <a href="#contacto" className="btn btn-primary btn-sm nav-cta">
          {t.nav.cta}
        </a>

        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label={t.nav.menu} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {[...navIds, "contacto" as const].map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {t.nav[id]}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
