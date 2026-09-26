import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { optionalServices, technicalStorage, type CookieCategory } from "../data/site";
import { useLang } from "../i18n";
import { useConsent, usedCategories } from "../lib/consent";
import { legalHref } from "./LegalModal";
import { Modal } from "./Modal";

const allOff: Record<CookieCategory, boolean> = { analytics: false, marketing: false };
const allOn: Record<CookieCategory, boolean> = { analytics: true, marketing: true };

export function CookieBanner() {
  const { t } = useLang();
  const { bannerVisible, save, openSettings } = useConsent();
  const b = t.legal.banner;

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          className="cookie-banner"
          role="region"
          aria-label={b.title}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <div className="cookie-text">
            <strong>{b.title}</strong>
            <p>
              {b.text} <a href={legalHref("cookies")}>{t.legal.links.cookies}</a>
            </p>
          </div>
          <div className="cookie-actions">
            {/* Aceptar y rechazar con el mismo peso visual, como pide la AEPD */}
            <button className="btn btn-outline btn-sm" onClick={() => save(allOff)}>
              {b.reject}
            </button>
            <button className="btn btn-outline btn-sm" onClick={openSettings}>
              {b.configure}
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => save(allOn)}>
              {b.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={`switch${on ? " on" : ""}`} onClick={() => onChange(!on)}>
      <motion.span className="switch-knob" layout transition={{ type: "spring", stiffness: 500, damping: 30 }} />
    </button>
  );
}

export function CookieSettings() {
  const { t } = useLang();
  const { consent, settingsOpen, closeSettings, save } = useConsent();
  const s = t.legal.settings;
  const [choice, setChoice] = useState(allOff);

  useEffect(() => {
    if (settingsOpen) setChoice(consent ? { analytics: consent.analytics, marketing: consent.marketing } : allOff);
  }, [settingsOpen, consent]);

  const footer =
    usedCategories.length > 0 ? (
      <>
        <button className="btn btn-outline btn-sm" onClick={() => save(allOff)}>
          {s.rejectAll}
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => save(choice)}>
          {s.save}
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => save(allOn)}>
          {s.acceptAll}
        </button>
      </>
    ) : undefined;

  return (
    <Modal open={settingsOpen} onClose={closeSettings} title={s.title} closeLabel={t.legal.close} footer={footer}>
      <p className="cookie-intro">
        {s.intro} <a href={legalHref("cookies")} onClick={closeSettings}>{t.legal.links.cookies}</a>
      </p>

      <div className="cookie-cat">
        <div className="cookie-cat-head">
          <div>
            <strong>{s.technical}</strong>
            <small>{s.technicalDesc}</small>
          </div>
          <span className="always-on">{s.alwaysOn}</span>
        </div>
        <ul className="storage-list">
          {technicalStorage.map((item) => (
            <li key={item.key}>
              <code>{item.key}</code> {s.storage[item.purpose]}
            </li>
          ))}
        </ul>
      </div>

      {usedCategories.length === 0 ? (
        <p className="cookie-none">{s.none}</p>
      ) : (
        usedCategories.map((cat) => (
          <div className="cookie-cat" key={cat}>
            <div className="cookie-cat-head">
              <div>
                <strong>{s.categories[cat].title}</strong>
                <small>{s.categories[cat].desc}</small>
              </div>
              <Toggle on={choice[cat]} onChange={(v) => setChoice((c) => ({ ...c, [cat]: v }))} label={s.categories[cat].title} />
            </div>
            <ul className="storage-list">
              {optionalServices
                .filter((o) => o.category === cat)
                .map((o) => (
                  <li key={o.id}>
                    <strong>{o.name}</strong> · {o.provider}
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </Modal>
  );
}
