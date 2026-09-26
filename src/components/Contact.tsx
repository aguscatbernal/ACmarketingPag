import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Copy, Loader2, Mail, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { brand, fillLegal, mailtoLink, offers, phoneDisplay, waLink, type OfferId } from "../data/site";
import { useLang } from "../i18n";
import { enviarConsulta } from "../lib/consultas";
import { INTEREST_EVENT, interestLabel, interestLabelEs, packLabel, type Interest } from "../lib/interests";
import { LIMITS, checkSubmission, clean, isValidContact, recordSend, type SpamCheck } from "../lib/antispam";
import { legalHref } from "./LegalModal";
import { InstagramIcon, Reveal, SectionTitle, TikTokIcon, WhatsAppIcon } from "./Shared";

const confetti = ["🎉", "✨", "💚", "⭐", "🚀", "🙌"];

// app = se guarda en Firestore y aparece en reels_manager
type Via = "app" | "wa" | "email";

export function Contact() {
  const { t, lang, money } = useLang();
  const c = t.contact;

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [sector, setSector] = useState(0);
  const [picked, setPicked] = useState<Interest[]>([]);
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState<false | Via>(false);
  const [sending, setSending] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<
    Exclude<SpamCheck, { ok: true }> | { ok: false; reason: "privacy" | "contact" | "network" } | null
  >(null);
  const startedAt = useRef(Date.now());
  const sentTimer = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState<string | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(sentTimer.current);
      window.clearTimeout(copiedTimer.current);
    },
    []
  );

  // Por si el visitante no tiene programa de correo configurado: copia el dato para pegarlo donde quiera
  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* sin permiso de portapapeles: el dato igual está visible */
    }
  };

  const isPicked = (id: Interest["id"]) => picked.some((p) => p.id === id);
  const toggle = (id: Interest["id"]) => {
    const firstPack = offers.find((o) => o.id === id)?.packs?.[0].qty;
    setPicked((p) => (p.some((x) => x.id === id) ? p.filter((x) => x.id !== id) : [...p, { id, qty: firstPack }]));
  };
  const setQty = (id: OfferId, qty: number) => setPicked((p) => p.map((x) => (x.id === id ? { ...x, qty } : x)));

  // "Lo quiero" en una oferta (u otros botones de la web) marca ese pack aquí
  useEffect(() => {
    const onInterest = (e: Event) => {
      const interest = (e as CustomEvent<Interest>).detail;
      setPicked((p) => [...p.filter((x) => x.id !== interest.id), interest]);
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const showSent = (via: Via) => {
    setSent(via);
    sentTimer.current = window.setTimeout(() => setSent(false), 3500);
  };

  const submit = async (e: FormEvent, via: Via = "app") => {
    e.preventDefault();
    if (sent || sending) return;

    const cleanName = clean(name, LIMITS.name);
    const cleanBusiness = clean(business, LIMITS.business);
    const cleanMsg = clean(msg, LIMITS.message + 1);
    const cleanContact = clean(contact, LIMITS.contact);

    const check = checkSubmission({ honeypot, startedAt: startedAt.current, name: cleanName, message: cleanMsg });
    if (!check.ok) {
      // Al bot le hacemos creer que salió bien, pero no se abre nada
      if (check.reason === "honeypot") {
        showSent(via);
        return;
      }
    }
    if (!accepted) {
      setError({ ok: false, reason: "privacy" });
      return;
    }
    if (!check.ok) {
      setError(check);
      return;
    }
    if (via === "app" && !isValidContact(cleanContact)) {
      setError({ ok: false, reason: "contact" });
      return;
    }

    if (via === "app") {
      setSending(true);
      try {
        await enviarConsulta({
          nombre: cleanName,
          negocio: cleanBusiness,
          sectorIndex: sector,
          intereses: picked.map(interestLabelEs),
          contacto: cleanContact,
          mensaje: cleanMsg,
          idioma: lang,
        });
        recordSend();
        setError(null);
        setName("");
        setBusiness("");
        setContact("");
        setMsg("");
        setPicked([]);
        showSent("app");
      } catch (err) {
        console.warn("No se pudo guardar la consulta en Firestore:", err);
        setError({ ok: false, reason: "network" });
      } finally {
        setSending(false);
      }
      return;
    }

    const text = [
      `${c.hello} ${cleanName}${cleanBusiness ? ` ${c.from} ${cleanBusiness}` : ""} (${c.sectors[sector]}).`,
      picked.length ? `${c.interested} ${picked.map((i) => interestLabel(t, i)).join(", ")}.` : "",
      cleanMsg,
    ]
      .filter(Boolean)
      .join("\n");

    recordSend();
    setError(null);
    if (via === "wa") window.open(waLink(text), "_blank", "noopener,noreferrer");
    else window.location.href = mailtoLink(`${c.emailSubject} · ${cleanName}`, text);
    showSent(via);
  };

  const errorText = !error
    ? ""
    : error.reason === "cooldown"
      ? `${c.errors.cooldown} ${error.waitSeconds} ${c.errors.seconds}.`
      : error.reason === "honeypot"
        ? ""
        : error.reason === "privacy"
          ? t.legal.form.required
          : c.errors[error.reason];

  // El email se arma al hacer clic para que no quede escrito en el HTML
  const openMail = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${brand.email()}`;
  };

  const channels = [
    { icon: <WhatsAppIcon size={22} />, label: "WhatsApp", value: `${phoneDisplay()} · ${c.waValue}`, href: waLink("👋"), cls: "wa", copy: phoneDisplay() },
    { icon: <Mail size={22} />, label: "Email", value: brand.email(), href: "#contacto", cls: "mail", onClick: openMail, copy: brand.email() },
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
              <div key={ch.label} className="channel-row">
                <motion.a
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
                {ch.copy && (
                  <button
                    type="button"
                    className={`channel-copy${copied === ch.label ? " done" : ""}`}
                    onClick={() => copyValue(ch.label, ch.copy)}
                    aria-label={`${c.copy} ${ch.label}`}
                  >
                    {copied === ch.label ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied === ch.label ? c.copied : c.copy}</span>
                  </button>
                )}
              </div>
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
                {c.contact}
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={c.contactPh}
                  maxLength={LIMITS.contact}
                  autoComplete="tel"
                  inputMode="email"
                  required
                />
              </label>

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
                {offers.map((offer) => {
                  const on = isPicked(offer.id);
                  const chosen = picked.find((p) => p.id === offer.id);
                  const pack = offer.packs?.find((pk) => pk.qty === chosen?.qty);
                  const price = money(pack?.price ?? offer.price);
                  const priceText = `${offer.from ? `${t.offers.from.toLowerCase()} ` : ""}${price}${offer.monthly ? t.offers.perMonth : ""}`;
                  return (
                    <span key={offer.id} className={`form-chip-group${on ? " on" : ""}`}>
                      <motion.button
                        type="button"
                        className={`form-chip${on ? " on" : ""}`}
                        onClick={() => toggle(offer.id)}
                        whileTap={{ scale: 0.9 }}
                        animate={on ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        aria-pressed={on}
                      >
                        {on ? "✓ " : "+ "}
                        {offer.emoji} {t.offers.items[offer.id].name} <span className="chip-price">{priceText}</span>
                      </motion.button>
                      {on && offer.packs && (
                        <span className="chip-packs" role="group" aria-label={c.pack}>
                          {offer.packs.map((pk) => (
                            <button
                              type="button"
                              key={pk.qty}
                              className={chosen?.qty === pk.qty ? "active" : ""}
                              onClick={() => setQty(offer.id, pk.qty)}
                              aria-pressed={chosen?.qty === pk.qty}
                            >
                              {packLabel(t.offers, pk.qty)}
                            </button>
                          ))}
                        </span>
                      )}
                    </span>
                  );
                })}
                <motion.button
                  type="button"
                  className={`form-chip${isPicked("unsure") ? " on" : ""}`}
                  onClick={() => toggle("unsure")}
                  whileTap={{ scale: 0.9 }}
                  aria-pressed={isPicked("unsure")}
                >
                  {isPicked("unsure") ? "✓ " : "? "}
                  {c.unsure}
                </motion.button>
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

              <label className="privacy-check">
                <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <span>
                  {t.legal.form.accept} <a href={legalHref("privacidad")}>{t.legal.form.policy}</a>
                </span>
              </label>
              <p className="privacy-info">{fillLegal(t.legal.form.info)}</p>

              <AnimatePresence>
                {errorText && (
                  <motion.p className="form-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <AlertCircle size={16} /> {errorText}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="submit-wrap">
                <motion.button
                  type="submit"
                  className="btn btn-primary btn-block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={!!sent || sending}
                >
                  {sending ? <Loader2 size={18} className="spin" /> : <Send size={18} />} {sending ? c.sending : c.sendApp}
                </motion.button>
                <div className="submit-alt">
                  <span>{c.orDirect}</span>
                  <button type="button" onClick={(e) => submit(e, "wa")} disabled={!!sent || sending}>
                    <WhatsAppIcon size={16} /> {c.send}
                  </button>
                  <button type="button" onClick={(e) => submit(e, "email")} disabled={!!sent || sending}>
                    <Mail size={16} /> {c.sendEmail}
                  </button>
                </div>
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
                    {sent === "app" ? c.sentApp : sent === "email" ? c.sentEmail : c.sent}
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
