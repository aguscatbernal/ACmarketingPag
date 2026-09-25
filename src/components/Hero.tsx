import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Heart, Star, CheckCircle2, Play } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { heroStats, heroWords, waLink } from "../data/content";
import { Counter, NfcWaves, WhatsAppIcon, ease } from "./Shared";

function useParallax(v: MotionValue<number>, amount: number) {
  return useTransform(v, (n) => n * amount);
}

export function Hero() {
  const [i, setI] = useState(0);
  const [likes, setLikes] = useState(1284);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroWords.length), 2200);
    const l = setInterval(() => setLikes((v) => v + Math.ceil(Math.random() * 9)), 900);
    return () => {
      clearInterval(t);
      clearInterval(l);
    };
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const phoneX = useParallax(sx, -18);
  const phoneY = useParallax(sy, -18);
  const c1x = useParallax(sx, 40);
  const c1y = useParallax(sy, 40);
  const c2x = useParallax(sx, -50);
  const c2y = useParallax(sy, 30);
  const c3x = useParallax(sx, 30);
  const c3y = useParallax(sy, -45);

  const onMove = (e: MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section className="hero" id="top" onMouseMove={onMove}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="grid-bg" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.span
            className="pill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            <span className="pill-dot" /> Marketing que se toca ✨
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
          >
            Hacé que tu
            <span className="rotator">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroWords[i]}
                  className="rotator-word"
                  initial={{ y: "100%", opacity: 0, rotateX: -80 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: "-100%", opacity: 0, rotateX: 80 }}
                  transition={{ duration: 0.45, ease }}
                >
                  {heroWords[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            sea el que todos recomiendan
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
          >
            Tags NFC para reseñas de Google y carta en mesa, colaboraciones en Instagram y TikTok, y apps
            para manejar tu restaurante. Todo en un mismo lugar.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease }}
          >
            <a href="#ofertas" className="btn btn-primary">
              Ver ofertas <ArrowRight size={18} />
            </a>
            <a
              href={waLink("¡Hola! Quiero saber más sobre sus servicios 🙌")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <WhatsAppIcon size={18} /> Escribinos
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <strong>
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div
            className="phone hero-phone"
            style={{ x: phoneX, y: phoneY }}
            initial={{ opacity: 0, y: 80, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ delay: 0.4, duration: 1, ease }}
          >
            <div className="phone-notch" />
            <div className="phone-screen reel-screen">
              <div className="reel-top">
                <span className="reel-avatar">C</span>
                <span>celesslarocca</span>
                <span className="reel-follow">Seguir</span>
              </div>
              <motion.div
                className="reel-emoji"
                animate={{ scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                🍔
              </motion.div>
              <div className="reel-play">
                <Play size={26} fill="currentColor" />
              </div>
              <div className="reel-side">
                <motion.div
                  className="reel-heart"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  <Heart size={22} fill="#ff4d6d" color="#ff4d6d" />
                </motion.div>
                <small>{likes.toLocaleString("es-AR")}</small>
              </div>
              <div className="reel-caption">
                <strong>La burger más grande de la ciudad 🤯</strong>
                <span>#colab #gastronomia</span>
              </div>
              <div className="reel-progress">
                <motion.span
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="float-card fc-review"
            style={{ x: c1x, y: c1y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bob">
              <div className="stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + s * 0.12, type: "spring" }}
                  >
                    <Star size={16} fill="#ffc94d" color="#ffc94d" />
                  </motion.span>
                ))}
              </div>
              <strong>4.9 en Google</strong>
              <small>+86 reseñas este mes</small>
            </div>
          </motion.div>

          <motion.div
            className="float-card fc-nfc"
            style={{ x: c2x, y: c2y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bob bob-2">
              <span className="nfc-icon-bubble">
                <NfcWaves />
              </span>
              <div>
                <strong>Tap NFC</strong>
                <small>Carta abierta en 1 seg</small>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="float-card fc-order"
            style={{ x: c3x, y: c3y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bob bob-3">
              <CheckCircle2 size={22} color="#0f9d84" />
              <div>
                <strong>Mesa 4 · Listo</strong>
                <small>Cocina → Mozo</small>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#servicios" className="scroll-hint" aria-label="Bajar">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
      </a>
    </section>
  );
}
