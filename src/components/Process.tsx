import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useLang } from "../i18n";
import { SectionTitle, ease } from "./Shared";

export function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scale = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section className="section process-section">
      <div className="container">
        <SectionTitle eyebrow={t.process.eyebrow} title={t.process.title} />
        <div className="steps" ref={ref}>
          <div className="steps-line">
            <motion.span style={{ scaleX: scale }} className="steps-line-h" />
            <motion.span style={{ scaleY: scale }} className="steps-line-v" />
          </div>
          {t.process.steps.map((s, i) => (
            <motion.div
              key={i}
              className="step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
            >
              <motion.div className="step-bubble" whileHover={{ scale: 1.15, rotate: 10 }}>
                <span>{s.emoji}</span>
                <b>{i + 1}</b>
              </motion.div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
