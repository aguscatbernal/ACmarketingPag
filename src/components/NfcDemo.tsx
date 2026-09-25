import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Star, Hand } from "lucide-react";
import { useEffect, useState } from "react";
import { demoMenu } from "../data/content";
import { NfcWaves, Reveal, SectionTitle, ease, money } from "./Shared";

type Mode = "review" | "menu";
type Phase = "idle" | "tapping" | "done";

export function NfcDemo() {
  const [mode, setMode] = useState<Mode>("review");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (phase !== "tapping") return;
    const t = setTimeout(() => setPhase("done"), 1300);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done" || mode !== "review") return;
    setStars(0);
    const timers = [1, 2, 3, 4, 5].map((n) => setTimeout(() => setStars(n), 350 + n * 220));
    return () => timers.forEach(clearTimeout);
  }, [phase, mode]);

  const tap = () => {
    setPhase("tapping");
    // En celular el escenario queda abajo del botón: lo traemos a la vista
    if (window.innerWidth < 860) {
      document.querySelector(".nfc-stage")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const reset = () => {
    setPhase("idle");
    setStars(0);
  };
  const switchMode = (m: Mode) => {
    setMode(m);
    reset();
  };

  const near = phase !== "idle";
  const idleX = typeof window !== "undefined" && window.innerWidth < 640 ? 50 : 90;

  return (
    <section className="section nfc-section" id="nfc">
      <div className="container nfc-inner">
        <div className="nfc-copy">
          <SectionTitle
            eyebrow="Tags NFC"
            title={
              <>
                Un toque y <span className="hl">listo</span>
              </>
            }
            subtitle="Tus clientes apoyan el celu en el tag y se abre tu página de reseñas o tu carta. Sin apps, sin buscar nada. Probalo acá 👇"
          />

          <Reveal delay={0.1}>
            <div className="segmented">
              {(["review", "menu"] as Mode[]).map((m) => (
                <button key={m} className={mode === m ? "active" : ""} onClick={() => switchMode(m)}>
                  {mode === m && (
                    <motion.span layoutId="seg-bg" className="segmented-bg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="segmented-label">{m === "review" ? "⭐ Reseñas Google" : "🍽️ Carta en mesa"}</span>
                </button>
              ))}
            </div>

            <div className="nfc-actions">
              {phase === "idle" ? (
                <motion.button className="btn btn-primary" onClick={tap} whileTap={{ scale: 0.94 }} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
                  <Hand size={18} /> Acercar el celu
                </motion.button>
              ) : (
                <button className="btn btn-ghost" onClick={reset}>
                  <RotateCcw size={18} /> Probar de nuevo
                </button>
              )}
            </div>

            <ul className="nfc-benefits">
              <li>📱 Funciona con iPhone y Android</li>
              <li>🔁 Podés cambiar el link cuando quieras</li>
              <li>🔲 QR de respaldo incluido</li>
              <li>🎨 Diseño personalizado con tu marca</li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="nfc-stage" delay={0.15}>
          <div className="nfc-table">
            <div className="nfc-tag">
              <AnimatePresence>
                {phase === "tapping" &&
                  [0, 1, 2].map((n) => (
                    <motion.span
                      key={n}
                      className="nfc-wave"
                      initial={{ scale: 0.4, opacity: 0.8 }}
                      animate={{ scale: 2.6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, delay: n * 0.3, repeat: Infinity }}
                    />
                  ))}
              </AnimatePresence>
              <NfcWaves size={34} />
              <span className="nfc-tag-label">{mode === "review" ? "¿Te gustó? Dejanos tu reseña" : "Mirá la carta"}</span>
              <span className="nfc-tag-brand">AC</span>
            </div>
          </div>

          <motion.div
            className="phone nfc-phone"
            animate={near ? { y: 150, rotate: 0, x: 0 } : { y: -10, rotate: 10, x: idleX }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            onClick={phase === "idle" ? tap : undefined}
          >
            <div className="phone-notch" />
            <div className="phone-screen nfc-screen">
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div key="idle" className="screen-idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="clock">21:37</span>
                    <small>Tocá el botón o el celu</small>
                  </motion.div>
                )}
                {phase === "tapping" && (
                  <motion.div key="tap" className="screen-tapping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="spinner" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                    <small>Leyendo tag…</small>
                  </motion.div>
                )}
                {phase === "done" && mode === "review" && (
                  <motion.div key="review" className="screen-review" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ease }}>
                    <div className="review-head">
                      <span className="review-logo">🍝</span>
                      <div>
                        <strong>Tu Restaurante</strong>
                        <small>Reseñas en Google</small>
                      </div>
                    </div>
                    <p>¿Cómo fue tu experiencia?</p>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <motion.span key={n} animate={stars >= n ? { scale: [1, 1.5, 1], rotate: [0, 20, 0] } : {}} transition={{ duration: 0.35 }}>
                          <Star size={26} fill={stars >= n ? "#ffc94d" : "transparent"} color={stars >= n ? "#ffc94d" : "#b8c9c4"} />
                        </motion.span>
                      ))}
                    </div>
                    <div className="review-text">
                      {stars === 5 ? "Increíble todo, volvemos seguro 😍" : <span className="typing" />}
                    </div>
                    <AnimatePresence>
                      {stars === 5 && (
                        <motion.div className="review-sent" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
                          ¡Reseña publicada! 🎉
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {phase === "done" && mode === "menu" && (
                  <motion.div key="menu" className="screen-menu" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="menu-head">
                      <strong>🍽️ Nuestra carta</strong>
                      <small>Mesa 7</small>
                    </div>
                    {demoMenu.slice(0, 5).map((item, n) => (
                      <motion.div key={item.name} className="menu-item" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + n * 0.08, ease }}>
                        <span>{item.name}</span>
                        <b>{money(item.price)}</b>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
