import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Play } from "lucide-react";
import { useState } from "react";
import { brand, creatorStats, reelCats, reels, waLink, type ReelCat } from "../data/site";
import { useLang } from "../i18n";
import { Counter, InstagramIcon, Reveal, SectionTitle, TikTokIcon, ease } from "./Shared";

const creatorName = "Cele La Rocca"; // EDITAR si el nombre es otro

function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="creator-avatar">
      <motion.div className="creator-ring" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
      {failed ? (
        <span className="creator-initial">{creatorName[0]}</span>
      ) : (
        <img src={brand.creatorPhoto} alt={creatorName} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export function Collabs() {
  const { t } = useLang();
  const c = t.collabs;
  const [cat, setCat] = useState<ReelCat | "all">("all");
  const list = cat === "all" ? reels : reels.filter((r) => r.cat === cat);

  return (
    <section className="section collabs-section" id="colabs">
      <div className="container">
        <SectionTitle light eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="collabs-top">
          <Reveal className="creator-card">
            <Avatar />
            <h3>{creatorName}</h3>
            <p className="creator-bio">{c.bio}</p>
            <div className="creator-stats">
              {creatorStats.map((s) => (
                <div key={s.key}>
                  <strong>
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </strong>
                  <span>{c.stats[s.key]}</span>
                </div>
              ))}
            </div>
            <div className="creator-links">
              <motion.a href={brand.creatorInstagram} target="_blank" rel="noreferrer" className="social-btn ig" whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                <InstagramIcon /> {brand.creatorInstagramHandle}
              </motion.a>
              <motion.a href={brand.creatorTiktok} target="_blank" rel="noreferrer" className="social-btn tt" whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                <TikTokIcon /> {brand.creatorTiktokHandle}
              </motion.a>
            </div>
          </Reveal>

          <Reveal className="includes-card" delay={0.15}>
            <h3>{c.includesTitle}</h3>
            <ul>
              {c.includes.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, ease }}
                >
                  <span className="check-bubble">
                    <Check size={14} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <a className="btn btn-light" href={waLink(c.waMsg)} target="_blank" rel="noreferrer">
              {c.cta}
            </a>
          </Reveal>
        </div>

        <Reveal className="chips" delay={0.1}>
          {(["all", ...reelCats] as const).map((k) => (
            <button key={k} className={`chip${cat === k ? " active" : ""}`} onClick={() => setCat(k)}>
              {cat === k && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="chip-label">{k === "all" ? c.all : c.cats[k]}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="reels-grid">
          <AnimatePresence mode="popLayout">
            {list.map((r) => (
              <motion.a
                layout
                key={r.id}
                href={r.url ?? brand.creatorInstagram}
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
                <span className="reel-cat">{c.cats[r.cat]}</span>
                <motion.span className="reel-card-emoji" variants={{ hover: { scale: 1.25, rotate: -8 } }}>
                  {r.emoji}
                </motion.span>
                <motion.span className="reel-card-play" initial={{ scale: 0.8, opacity: 0.85 }} variants={{ hover: { scale: 1.1, opacity: 1 } }}>
                  <Play size={22} fill="currentColor" />
                </motion.span>
                <div className="reel-card-info">
                  <strong>{c.reelTitles[r.id]}</strong>
                  <span>
                    <Eye size={14} /> {r.views} {c.views}
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
