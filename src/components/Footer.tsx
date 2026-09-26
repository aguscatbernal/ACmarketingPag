import { brand, waLink } from "../data/site";
import { useLang } from "../i18n";
import { useConsent } from "../lib/consent";
import { legalHref } from "./LegalModal";
import { navIds } from "./Navbar";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./Shared";

export function Footer() {
  const { t } = useLang();
  const { openSettings } = useConsent();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#top" className="footer-logo">
            <img src="/brand/logo-full-light.png" alt={brand.name} width="180" height="170" loading="lazy" />
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
        <nav className="footer-legal">
          <a href={legalHref("aviso")}>{t.legal.links.aviso}</a>
          <a href={legalHref("privacidad")}>{t.legal.links.privacidad}</a>
          <a href={legalHref("cookies")}>{t.legal.links.cookies}</a>
          <button onClick={openSettings}>{t.legal.links.settings}</button>
        </nav>
        <span>{t.meta.madeWith}</span>
      </div>
    </footer>
  );
}
