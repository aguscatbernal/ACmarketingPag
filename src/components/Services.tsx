import { motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Star, UtensilsCrossed, Video } from "lucide-react";
import { services } from "../data/content";
import { SectionTitle, ease } from "./Shared";

const icons = {
  star: Star,
  menu: UtensilsCrossed,
  video: Video,
  code: Code2,
};

export function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <SectionTitle
          eyebrow="Lo que hacemos"
          title={
            <>
              Todo lo que tu negocio necesita para <span className="hl">hacer ruido</span>
            </>
          }
          subtitle="Tecnología que tus clientes tocan, contenido que miran y sistemas que te ordenan el día."
        />

        <div className="services-grid">
          {services.map((s, idx) => {
            const Icon = icons[s.icon];
            return (
              <motion.a
                href={s.href}
                key={s.id}
                className={`service-card c-${s.color}`}
                initial={{ opacity: 0, y: 60, rotate: idx % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon">
                  <Icon size={26} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>
                      <Check size={16} /> {b}
                    </li>
                  ))}
                </ul>
                <span className="service-more">
                  Ver más <ArrowUpRight size={16} />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
