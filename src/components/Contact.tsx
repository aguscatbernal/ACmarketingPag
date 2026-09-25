import { AnimatePresence, motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { brand, contactRubros, contactServices, waLink } from "../data/content";
import { InstagramIcon, Reveal, SectionTitle, TikTokIcon, WhatsAppIcon } from "./Shared";

const confetti = ["🎉", "✨", "💚", "⭐", "🚀", "🙌"];

export function Contact() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [rubro, setRubro] = useState(contactRubros[0]);
  const [picked, setPicked] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `¡Hola! Soy ${name || "..."}${business ? ` de ${business}` : ""} (${rubro}).`,
      picked.length ? `Me interesa: ${picked.join(", ")}.` : "",
      msg,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener");
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  const channels = [
    { icon: <WhatsAppIcon size={22} />, label: "WhatsApp", value: "Respondemos rápido", href: waLink("¡Hola! 👋"), cls: "wa" },
    { icon: <Mail size={22} />, label: "Email", value: brand.email, href: `mailto:${brand.email}`, cls: "mail" },
    { icon: <InstagramIcon size={22} />, label: "Instagram", value: "@celesslarocca", href: brand.instagram, cls: "ig" },
    { icon: <TikTokIcon size={22} />, label: "TikTok", value: "@celelarocca", href: brand.tiktok, cls: "tt" },
  ];

  return (
    <section className="section contact-section" id="contacto">
      <div className="container">
        <SectionTitle
          light
          eyebrow="Contacto"
          title={
            <>
              ¿Arrancamos? <span className="hl-light">Escribinos</span> 👋
            </>
          }
          subtitle="Completá el formulario y te abrimos WhatsApp con el mensaje listo. Así de fácil."
        />

        <div className="contact-grid">
          <Reveal className="contact-channels">
            {channels.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`channel ${c.cls}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <span className="channel-icon">{c.icon}</span>
                <span>
                  <strong>{c.label}</strong>
                  <small>{c.value}</small>
                </span>
              </motion.a>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  Tu nombre
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan" required />
                </label>
                <label>
                  Tu negocio
                  <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Ej: La Parrilla de Juan" />
                </label>
              </div>

              <label>
                Rubro
                <select value={rubro} onChange={(e) => setRubro(e.target.value)}>
                  {contactRubros.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>

              <div className="form-label">¿Qué te interesa?</div>
              <div className="form-chips">
                {contactServices.map((s) => {
                  const on = picked.includes(s);
                  return (
                    <motion.button
                      type="button"
                      key={s}
                      className={`form-chip${on ? " on" : ""}`}
                      onClick={() => toggle(s)}
                      whileTap={{ scale: 0.9 }}
                      animate={on ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    >
                      {on ? "✓ " : "+ "}
                      {s}
                    </motion.button>
                  );
                })}
              </div>

              <label>
                Mensaje
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="Contanos un poco de lo que necesitás…" />
              </label>

              <div className="submit-wrap">
                <motion.button type="submit" className="btn btn-primary btn-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Send size={18} /> Enviar por WhatsApp
                </motion.button>
                <AnimatePresence>
                  {sent &&
                    Array.from({ length: 14 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="confetti"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                        animate={{
                          x: (Math.random() - 0.5) * 320,
                          y: -80 - Math.random() * 160,
                          opacity: 0,
                          scale: 1.3,
                          rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                      >
                        {confetti[i % confetti.length]}
                      </motion.span>
                    ))}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {sent && (
                  <motion.p className="sent-msg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    ¡Listo! Te abrimos WhatsApp 🎉
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
