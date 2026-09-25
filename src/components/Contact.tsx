import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Mail, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { brand, waLink } from "../data/site";
import { useLang } from "../i18n";
import { LIMITS, checkSubmission, clean, recordSend, type SpamCheck } from "../lib/antispam";
import { InstagramIcon, Reveal, SectionTitle, TikTokIcon, WhatsAppIcon } from "./Shared";

const confetti = ["🎉", "✨", "💚", "⭐", "🚀", "🙌"];

export function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [sector, setSector] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [msg, setMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<Exclude<SpamCheck, { ok: true }> | null>(null);
  const startedAt = useRef(Date.now());
  const sentTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(sentTimer.current), []);

  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const showSent = () => {
    setSent(true);
    sentTimer.current = window.setTimeout(() => setSent(false), 3500);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (sent) return;

    const cleanName = clean(name, LIMITS.name);
    const cleanBusiness = clean(business, LIMITS.business);
    const cleanMsg = clean(msg, LIMITS.message + 1);

    const check = checkSubmission({ honeypot, startedAt: startedAt.current, name: cleanName, message: cleanMsg });
    if (!check.ok) {
      // Al bot le hacemos creer que salió bien, pero no se abre nada
      if (check.reason === "honeypot") {
        showSent();
        return;
      }
      setError(check);
      return;
    }

    const text = [
      `${c.hello} ${cleanName}${cleanBusiness ? ` ${c.from} ${cleanBusiness}` : ""} (${c.sectors[sector]}).`,
      picked.length ? `${c.interested} ${picked.map((i) => c.services[i]).join(", ")}.` : "",
      cleanMsg,
    ]
      .filter(Boolean)
      .join("\n");

    recordSend();
    setError(null);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    showSent();
  };

  const errorText = !error
    ? ""
    : error.reason === "cooldown"
      ? `${c.errors.cooldown} ${error.waitSeconds} ${c.errors.seconds}.`
      : error.reason === "honeypot"
        ? ""
        : c.errors[error.reason];

  // El email se arma al hacer clic para que no quede escrito en el HTML
  const openMail = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${brand.email()}`;
  };

  const channels = [
    { icon: <WhatsAppIcon size={22} />, label: "WhatsApp", value: c.waValue, href: waLink("👋"), cls: "wa" },
    { icon: <Mail size={22} />, label: "Email", value: brand.email().replace("@", " [at] "), href: "#contacto", cls: "mail", onClick: openMail },
    { icon: <InstagramIcon size={22} />, label: "Instagram", value: brand.instagramHandle, href: brand.instagram, cls: "ig" },
    { icon: <TikTokIcon size={22} />, label: "TikTok", value: brand.creatorTiktokHandle, href: brand.creatorTiktok, cls: "tt" },
  ];

  return (
    <section className="section contact-section" id="contacto">
      <div className="container">
        <SectionTitle light eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="contact-grid">
          <Reveal className="contact-channels">
            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                onClick={ch.onClick}
                target={ch.onClick ? undefined : "_blank"}
                rel="noreferrer"
                className={`channel ${ch.cls}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <span className="channel-icon">{ch.icon}</span>
                <span>
                  <strong>{ch.label}</strong>
                  <small>{ch.value}</small>
                </span>
              </motion.a>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <form className="contact-form" onSubmit={submit} noValidate>
              {/* Honeypot: invisible para personas, los bots lo rellenan */}
              <div className="hp-field" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  {c.name}
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={c.namePh}
                    maxLength={LIMITS.name}
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  {c.business}
                  <input
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder={c.businessPh}
                    maxLength={LIMITS.business}
                    autoComplete="organization"
                  />
                </label>
              </div>

              <label>
                {c.sector}
                <select value={sector} onChange={(e) => setSector(Number(e.target.value))}>
                  {c.sectors.map((r, i) => (
                    <option key={r} value={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-label">{c.interest}</div>
              <div className="form-chips">
                {c.services.map((s, i) => {
                  const on = picked.includes(i);
                  return (
                    <motion.button
                      type="button"
                      key={s}
                      className={`form-chip${on ? " on" : ""}`}
                      onClick={() => toggle(i)}
                      whileTap={{ scale: 0.9 }}
                      animate={on ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                      aria-pressed={on}
                    >
                      {on ? "✓ " : "+ "}
                      {s}
                    </motion.button>
                  );
                })}
              </div>

              <label>
                {c.message}
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={3}
                  placeholder={c.messagePh}
                  maxLength={LIMITS.message}
                />
                <span className="char-count">
                  {msg.length}/{LIMITS.message}
                </span>
              </label>

              <AnimatePresence>
                {errorText && (
                  <motion.p className="form-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <AlertCircle size={16} /> {errorText}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="submit-wrap">
                <motion.button type="submit" className="btn btn-primary btn-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} disabled={sent}>
                  <Send size={18} /> {c.send}
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
                    {c.sent}
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
