import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { offers, promoActive } from "../data/site";
import { useLang } from "../i18n";
import { packLabel as packName, selectInterest } from "../lib/interests";
import { Reveal, SectionTitle, ease } from "./Shared";

type Offer = (typeof offers)[number];

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

function PromoBanner() {
  const { t } = useLang();
  const o = t.offers;
  const cd = useEndOfMonthCountdown();
  return (
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
  );
}

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const { t, money } = useLang();
  const o = t.offers;
  const copy = o.items[offer.id];
  const [packIdx, setPackIdx] = useState(0);

  const pack = offer.packs?.[packIdx];
  const price = pack ? pack.price : offer.price;
  const unitPrice = offer.packs?.[0].price ?? offer.price;
  const saving = pack ? unitPrice * pack.qty - pack.price : 0;
  const packLabel = (qty: number) => packName(o, qty);

  return (
    <motion.div
      className={`offer-card${offer.highlight ? " highlight" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease }}
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

        {offer.packs && (
          <div className="pack-picker" role="group">
            {offer.packs.map((p, i) => (
              <button key={p.qty} className={i === packIdx ? "active" : ""} onClick={() => setPackIdx(i)} aria-pressed={i === packIdx}>
                {i === packIdx && (
                  <motion.span
                    layoutId={`pack-bg-${offer.id}`}
                    className="pack-bg"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="pack-label">{packLabel(p.qty)}</span>
              </button>
            ))}
          </div>
        )}

        <div className="offer-price">
          {offer.separate && (
            <span className="offer-separate">
              <s>{money(offer.separate)}</s> {o.separately}
            </span>
          )}
          <strong>
            {offer.from && <span className="offer-from">{o.from} </span>}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                className="offer-amount"
                initial={{ y: -18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 18, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {money(price)}
              </motion.span>
            </AnimatePresence>
          </strong>
          <small>
            {pack && pack.qty > 1 ? (
              <>
                {money(pack.price / pack.qty, Number.isInteger(pack.price / pack.qty) ? 0 : 2)} {o.perTag} · <b className="offer-save">{o.save} {money(saving)}</b>
              </>
            ) : (
              copy.period
            )}
          </small>
          {offer.maintenance && (
            <span className="offer-maintenance">
              <Wrench size={14} />
              {offer.maintenance.from
                ? `${o.maintenanceFrom} ${money(offer.maintenance.price)}${o.perMonth}`
                : `+ ${money(offer.maintenance.price)}${o.perMonth} ${o.maintenance}`}
              {offer.maintenance.minMonths && ` (${o.minMonths} ${offer.maintenance.minMonths} ${o.months})`}
            </span>
          )}
        </div>

        <ul>
          {copy.features.map((f) => (
            <li key={f}>
              <Check size={16} /> {f}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`btn ${offer.highlight ? "btn-primary" : "btn-outline"} btn-block`}
          onClick={() => selectInterest({ id: offer.id, qty: pack?.qty })}
        >
          {o.want}
        </button>
      </div>
    </motion.div>
  );
}

export function Offers() {
  const { t } = useLang();
  const o = t.offers;

  return (
    <section className="section offers-section" id="ofertas">
      <div className="container">
        <SectionTitle eyebrow={o.eyebrow} title={o.title} subtitle={o.subtitle} />

        {promoActive && <PromoBanner />}

        <div className="offers-grid">
          {offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        <p className="offers-note">{o.note}</p>
      </div>
    </section>
  );
}
