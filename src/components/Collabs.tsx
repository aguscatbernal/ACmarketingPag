import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Play } from "lucide-react";
import { useState } from "react";
import { brand, collabCategories, collabIncludes, creator, reels, waLink } from "../data/content";
import { Counter, InstagramIcon, Reveal, SectionTitle, TikTokIcon, ease } from "./Shared";

function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="creator-avatar">
      <motion.div className="creator-ring" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
      {failed ? (
        <span className="creator-initial">{creator.name[0]}</span>
      ) : (
        <img src={creator.photo} alt={creator.name} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export function Collabs() {
  const [cat, setCat] = useState("Todos");
  const list = cat === "Todos" ? reels : reels.filter((r) => r.category === cat);

  return (
    <section className="section collabs-section" id="colabs">
      <div className="container">
        <SectionTitle
          light
          eyebrow="Colaboraciones pagas"
          title={
            <>
              Contenido que la gente <span className="hl-light">mira hasta el final</span>
            </>
          }
          subtitle="Reels y TikToks para restaurantes, bares, tiendas, estéticas, hoteles y lugares de entretenimiento."
        />

        <div className="collabs-top">
          <Reveal className="creator-card">
            <Avatar />
            <h3>{creator.name}</h3>
            <p className="creator-bio">{creator.bio}</p>
            <div className="creator-stats">
              {creator.stats.map((s) => (
                <div key={s.label}>
                  <strong>
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="creator-links">
              <motion.a href={brand.instagram} target="_blank" rel="noreferrer" className="social-btn ig" whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                <InstagramIcon /> {creator.handleIg}
              </motion.a>
              <motion.a href={brand.tiktok} target="_blank" rel="noreferrer" className="social-btn tt" whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                <TikTokIcon /> {creator.handleTiktok}
              </motion.a>
            </div>
          </Reveal>

          <Reveal className="includes-card" delay={0.15}>
            <h3>¿Qué incluye una colab?</h3>
            <ul>
              {collabIncludes.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, ease }}
                >
                  <span className="check-bubble">
                    <Check size={14} />
                  </span>
                  {c}
                </motion.li>
              ))}
            </ul>
            <a
              className="btn btn-light"
              href={waLink("¡Hola! Quiero una colaboración para mi negocio 🎬")}
              target="_blank"
              rel="noreferrer"
            >
              Quiero una colab 🎬
            </a>
          </Reveal>
        </div>

        <Reveal className="chips" delay={0.1}>
          {collabCategories.map((c) => (
            <button key={c} className={`chip${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="chip-label">{c}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="reels-grid">
          <AnimatePresence mode="popLayout">
            {list.map((r) => (
              <motion.a
                layout
                key={r.title}
                href={r.url ?? brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="reel-card"
                style={{ background: `linear-gradient(160deg, ${r.colors[0]}, ${r.colors[1]})` }}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease }}
                whileHover="hover"
              >
                <span className="reel-cat">{r.category}</span>
                <motion.span className="reel-card-emoji" variants={{ hover: { scale: 1.25, rotate: -8 } }}>
                  {r.emoji}
                </motion.span>
                <motion.span className="reel-card-play" initial={{ scale: 0.8, opacity: 0.85 }} variants={{ hover: { scale: 1.1, opacity: 1 } }}>
                  <Play size={22} fill="currentColor" />
                </motion.span>
                <div className="reel-card-info">
                  <strong>{r.title}</strong>
                  <span>
                    <Eye size={14} /> {r.views} vistas
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
