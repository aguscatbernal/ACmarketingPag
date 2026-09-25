import { motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Globe, Megaphone, Star, UtensilsCrossed, Video } from "lucide-react";
import { services } from "../data/site";
import { useLang } from "../i18n";
import { SectionTitle, ease } from "./Shared";

const icons = {
  star: Star,
  menu: UtensilsCrossed,
  video: Video,
  social: Megaphone,
  code: Code2,
  web: Globe,
};

export function Services() {
  const { t } = useLang();

  return (
    <section className="section" id="servicios">
      <div className="container">
        <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="services-grid">
          {services.map((s, idx) => {
            const Icon = icons[s.icon];
            const copy = t.services.items[s.id];
            return (
              <motion.a
                href={s.href}
                key={s.id}
                className={`service-card c-${s.color}`}
                initial={{ opacity: 0, y: 60, rotate: idx % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (idx % 3) * 0.1, ease }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon">
                  <Icon size={28} />
                </div>
                <h3>{copy.title}</h3>
                <p>{copy.text}</p>
                <ul>
                  {copy.bullets.map((b) => (
                    <li key={b}>
                      <Check size={16} /> {b}
                    </li>
                  ))}
                </ul>
                <span className="service-more">
                  {t.services.more} <ArrowUpRight size={16} />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
