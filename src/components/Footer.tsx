import { brand, navLinks, waLink } from "../data/content";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./Shared";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#top" className="logo">
            <span className="logo-badge">{brand.short}</span>
            <span className="logo-text">{brand.name.replace(brand.short + " ", "")}</span>
          </a>
          <p>{brand.tagline}</p>
        </div>
        <nav className="footer-links">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="footer-social">
          <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={brand.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
            <TikTokIcon />
          </a>
          <a href={waLink("¡Hola! 👋")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} · {brand.city}
        </span>
        <span>Hecho con 💚 y mucho mate</span>
      </div>
    </footer>
  );
}
