import { rubros } from "../data/content";

export function Marquee() {
  const items = [...rubros, ...rubros];
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
