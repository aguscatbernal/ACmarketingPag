import { brand, waLink } from "../data/site";
import { useLang } from "../i18n";
import { navIds } from "./Navbar";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./Shared";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#top" className="logo">
            <span className="logo-badge">{brand.short}</span>
            <span className="logo-text">{brand.name.replace(brand.short + " ", "")}</span>
          </a>
          <p>{t.meta.tagline}</p>
        </div>
        <nav className="footer-links">
          {navIds.map((id) => (
            <a key={id} href={`#${id}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="footer-social">
          <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${brand.instagramHandle}`}>
            <InstagramIcon />
          </a>
          <a href={brand.creatorTiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
            <TikTokIcon />
          </a>
          <a href={waLink("👋")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} · {t.meta.city} · {t.footer.rights}
        </span>
        <span>{t.meta.madeWith}</span>
      </div>
    </footer>
  );
}
