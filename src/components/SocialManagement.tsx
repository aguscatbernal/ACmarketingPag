import { motion } from "framer-motion";
import { CalendarClock, Send, TrendingUp } from "lucide-react";
import { brand, socialDemo } from "../data/site";
import { useLang } from "../i18n";
import { selectInterest } from "../lib/interests";
import { Counter, InstagramIcon, Reveal, SectionTitle, ease } from "./Shared";

function growthPath(points: number[], w: number, h: number) {
  const max = Math.max(...points);
  const step = w / (points.length - 1);
  const xy = points.map((p, i) => [i * step, h - (p / max) * (h - 8) - 4] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w},${h} L0,${h} Z`, last: xy[xy.length - 1] };
}

export function SocialManagement() {
  const { t } = useLang();
  const s = t.social;
  const { line, area, last } = growthPath(socialDemo.growth, 220, 80);
  const gained = socialDemo.followersEnd - socialDemo.followersStart;

  return (
    <section className="section social-section" id="redes">
      <div className="container social-inner">
        <div className="social-copy">
          <SectionTitle eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

          <div className="social-features">
            {s.features.map((f, i) => (
              <motion.div
                key={f.title}
                className="social-feature"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
                whileHover={{ y: -4 }}
              >
                <span className="social-feature-emoji">{f.emoji}</span>
                <div>
                  <strong>{f.title}</strong>
                  <small>{f.text}</small>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal className="social-ctas" delay={0.2}>
            <button type="button" className="btn btn-primary" onClick={() => selectInterest({ id: "redes" })}>
              <Send size={18} /> {s.ctaWa}
            </button>
            <a className="btn btn-ghost" href={brand.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon size={18} /> {s.cta}
            </a>
          </Reveal>
        </div>

        <Reveal className="social-visual" delay={0.1}>
          <div className="profile-card">
            <div className="profile-head">
              <div className="profile-avatar">
                <motion.span className="profile-ring" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
                <span className="profile-badge">
                  <img src="/brand/logo-mark.png" alt={brand.name} />
                </span>
              </div>
              <div className="profile-stats">
                <div>
                  <strong>
                    <Counter from={96} to={148} />
                  </strong>
                  <small>{s.posts}</small>
                </div>
                <div>
                  <strong>
                    <Counter from={socialDemo.followersStart} to={socialDemo.followersEnd} duration={2.4} />
                  </strong>
                  <small>{s.followers}</small>
                </div>
                <div>
                  <strong>312</strong>
                  <small>{s.following}</small>
                </div>
              </div>
            </div>
            <div className="profile-name">
              <strong>{brand.instagramHandle.slice(1)}</strong>
              <p>{s.bio}</p>
            </div>
            <div className="profile-grid">
              {socialDemo.grid.map((tile, i) => (
                <motion.span
                  key={i}
                  className="profile-tile"
                  style={{ background: `linear-gradient(150deg, ${tile.colors[0]}, ${tile.colors[1]})` }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ scale: 1.08, zIndex: 2 }}
                >
                  {tile.emoji}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            className="float-card growth-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
          >
            <div className="bob growth-bob">
              <div className="growth-head">
                <TrendingUp size={18} />
                <div>
                  <strong>{s.growthTitle}</strong>
                  <small>{s.growthSub}</small>
                </div>
              </div>
              <svg viewBox="0 0 220 80" className="growth-svg" aria-hidden>
                <defs>
                  <linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#5fdcbf" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#5fdcbf" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={area}
                  fill="url(#growth-fill)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                />
                <motion.path
                  d={line}
                  fill="none"
                  stroke="#006b5e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
                />
                <motion.circle
                  cx={last[0]}
                  cy={last[1]}
                  r="5"
                  fill="#006b5e"
                  stroke="#fff"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.1, type: "spring" }}
                />
              </svg>
              <div className="growth-total">
                <strong>
                  +<Counter to={gained} duration={2.2} />
                </strong>
                <small>{s.newFollowers}</small>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="float-card scheduled-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
          >
            <div className="bob bob-2">
              <span className="nfc-icon-bubble">
                <CalendarClock size={20} />
              </span>
              <div>
                <strong>{s.scheduled} ✓</strong>
                <small>{s.scheduledText}</small>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
