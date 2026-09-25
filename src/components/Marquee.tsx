import { useLang } from "../i18n";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.rubros, ...t.rubros];
  return (
    <div className="marquee-wrap" aria-hidden>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((r, i) => (
            <span key={i} className="marquee-item">
              {r} <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
