import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "../i18n";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Convierte "texto *resaltado*" en texto con <span> resaltado. */
export function Highlight({ text, light }: { text: string; light?: boolean }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <span key={i} className={light ? "hl-light" : "hl"}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={`section-title${light ? " light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        <Highlight text={title} light={light} />
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  );
}

export function Counter({
  to,
  from = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(from);
  const { lang } = useLang();

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, { duration, ease: "easeOut", onUpdate: setVal });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString(lang === "en" ? "en-GB" : "es-ES")}
      {suffix}
    </span>
  );
}

// ---------- Íconos de marcas (SVG propios) ----------
type IconProps = { size?: number };

export function InstagramIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.37-2.47V9.68a5.73 5.73 0 0 0-.78-.05A5.66 5.66 0 0 0 4.2 15.3 5.66 5.66 0 0 0 9.86 21a5.66 5.66 0 0 0 5.66-5.66V9.01a7.33 7.33 0 0 0 4.29 1.38V7.3a4.28 4.28 0 0 1-3.21-1.48Z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.86 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.93.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function NfcWaves({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 8.5a5 5 0 0 1 0 7" />
      <path d="M9.5 6a9 9 0 0 1 0 12" />
      <path d="M13 3.5a13 13 0 0 1 0 17" />
      <circle cx="3" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
