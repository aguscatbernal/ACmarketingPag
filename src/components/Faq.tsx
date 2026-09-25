import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useLang } from "../i18n";
import { Reveal, SectionTitle } from "./Shared";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container faq-inner">
        <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="faq-list">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05} y={20}>
                <div className={`faq-item${isOpen ? " open" : ""}`}>
                  <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                    <span>{f.q}</span>
                    <motion.span className="faq-icon" animate={{ rotate: isOpen ? 45 : 0 }}>
                      <Plus size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
