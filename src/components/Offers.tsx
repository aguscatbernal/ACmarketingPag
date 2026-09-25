import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { offers, promoActive, waLink } from "../data/site";
import { useLang } from "../i18n";
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
  const { t, money } = useLang();
  const o = t.offers;
  const cd = useEndOfMonthCountdown();

  return (
    <section className="section offers-section" id="ofertas">
      <div className="container">
        <SectionTitle eyebrow={o.eyebrow} title={o.title} subtitle={o.subtitle} />

        {promoActive && (
          <Reveal className="promo-banner">
            <div className="promo-shine" />
            <div className="promo-text">
              <span className="promo-tag">
                <Sparkles size={16} /> {o.promoTitle}
              </span>
              <strong>{o.promoText}</strong>
            </div>
            <div className="countdown">
              <Unit v={cd.d} label={o.days} />
              <Unit v={cd.h} label={o.hours} />
              <Unit v={cd.m} label={o.mins} />
              <Unit v={cd.s} label={o.secs} />
            </div>
          </Reveal>
        )}

        <div className="offers-grid">
          {offers.map((offer, i) => {
            const copy = o.items[offer.id];
            return (
              <motion.div
                key={offer.id}
                className={`offer-card${offer.highlight ? " highlight" : ""}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
                whileHover={{ y: -8 }}
              >
                {offer.highlight && <div className="offer-glow" />}
                <div className="offer-inner">
                  {copy.badge && <span className="offer-badge">🔥 {copy.badge}</span>}
                  <motion.span className="offer-emoji" whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}>
                    {offer.emoji}
                  </motion.span>
                  <h3>{copy.name}</h3>
                  <p className="offer-desc">{copy.desc}</p>
                  <div className="offer-price">
                    {offer.oldPrice && <s>{money(offer.oldPrice)}</s>}
                    <strong>
                      {offer.from && <span className="offer-from">{o.from} </span>}
                      {money(offer.price)}
                    </strong>
                    <small>{copy.period}</small>
                  </div>
                  <ul>
                    {copy.features.map((f) => (
                      <li key={f}>
                        <Check size={16} /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`btn ${offer.highlight ? "btn-primary" : "btn-outline"} btn-block`}
                    href={waLink(`${o.waMsg} ${copy.name} ${offer.emoji}`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {o.want}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="offers-note">{o.note}</p>
      </div>
    </section>
  );
}
