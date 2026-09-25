import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/content";
import { Reveal, SectionTitle } from "./Shared";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container faq-inner">
        <SectionTitle
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Lo que todos nos <span className="hl">preguntan</span>
            </>
          }
        />
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05} y={20}>
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
