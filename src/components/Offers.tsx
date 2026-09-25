import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { offers, promo, waLink } from "../data/content";
import { Reveal, SectionTitle, ease } from "./Shared";

function useEndOfMonthCountdown() {
  const calc = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const diff = Math.max(0, end.getTime() - now.getTime());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

function Unit({ v, label }: { v: number; label: string }) {
  return (
    <div className="cd-unit">
      <motion.b key={v} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {String(v).padStart(2, "0")}
      </motion.b>
      <small>{label}</small>
    </div>
  );
}

export function Offers() {
  const t = useEndOfMonthCountdown();

  return (
    <section className="section offers-section" id="ofertas">
      <div className="container">
        <SectionTitle
          eyebrow="Ofertas"
          title={
            <>
              Packs pensados para <span className="hl">arrancar ya</span>
            </>
          }
          subtitle="Elegí uno o armamos uno a tu medida. Todos los precios se pueden adaptar."
        />

        {promo.active && (
          <Reveal className="promo-banner">
            <div className="promo-shine" />
            <div className="promo-text">
              <span className="promo-tag">
                <Sparkles size={16} /> {promo.title}
              </span>
              <strong>{promo.text}</strong>
            </div>
            <div className="countdown">
              <Unit v={t.d} label="días" />
              <Unit v={t.h} label="hs" />
              <Unit v={t.m} label="min" />
              <Unit v={t.s} label="seg" />
            </div>
          </Reveal>
        )}

        <div className="offers-grid">
          {offers.map((o, i) => (
            <motion.div
              key={o.id}
              className={`offer-card${o.highlight ? " highlight" : ""}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
              whileHover={{ y: -8 }}
            >
              {o.highlight && <div className="offer-glow" />}
              <div className="offer-inner">
                {o.badge && <span className="offer-badge">🔥 {o.badge}</span>}
                <motion.span className="offer-emoji" whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}>
                  {o.emoji}
                </motion.span>
                <h3>{o.name}</h3>
                <p className="offer-desc">{o.desc}</p>
                <div className="offer-price">
                  {o.oldPrice && <s>{o.oldPrice}</s>}
                  <strong>{o.price}</strong>
                  <small>{o.period}</small>
                </div>
                <ul>
                  {o.features.map((f) => (
                    <li key={f}>
                      <Check size={16} /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn ${o.highlight ? "btn-primary" : "btn-outline"} btn-block`}
                  href={waLink(`¡Hola! Me interesa el ${o.name} ${o.emoji}`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lo quiero
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
