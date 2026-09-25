import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { brand, navLinks } from "../data/content";

export function Navbar() {
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
          <span className="logo-badge">{brand.short}</span>
          <span className="logo-text">{brand.name.replace(brand.short + " ", "")}</span>
        </a>

        <nav className="nav-links">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="btn btn-primary btn-sm nav-cta">
          Hablemos
        </a>

        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menú">
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
            {[...navLinks, { id: "contacto", label: "Contacto" }].map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
