import { useCallback, useEffect, useState } from "react";
import type { LegalPage } from "../data/legal-es";
import { fillLegal, legalLineVisible, legalOwner } from "../data/site";
import { useLang } from "../i18n";
import { Modal } from "./Modal";

const pages: LegalPage[] = ["aviso", "privacidad", "cookies"];

// Se abre con enlaces tipo #legal/privacidad, así se pueden compartir
function pageFromHash(): LegalPage | null {
  const m = window.location.hash.match(/^#legal\/(\w+)$/);
  return m && pages.includes(m[1] as LegalPage) ? (m[1] as LegalPage) : null;
}

export const legalHref = (page: LegalPage) => `#legal/${page}`;

export function LegalModal() {
  const { t } = useLang();
  const [page, setPage] = useState<LegalPage | null>(pageFromHash);

  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setPage(null);
  }, []);

  const content = page ? t.legal.pages[page] : null;

  return (
    <Modal open={!!content} onClose={close} title={content?.title ?? ""} closeLabel={t.legal.close}>
      {content && (
        <div className="legal-text">
          {content.sections.map((s) => (
            <section key={s.h}>
              <h3>{s.h}</h3>
              {s.p.filter(legalLineVisible).map((line, i) => (
                <p key={i} className={line.startsWith("• ") ? "legal-item" : undefined}>
                  {fillLegal(line)}
                </p>
              ))}
            </section>
          ))}
          <p className="legal-updated">
            {t.legal.updated}: {legalOwner.updated}
          </p>
        </div>
      )}
    </Modal>
  );
}
