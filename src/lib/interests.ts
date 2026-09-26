// Lo que la persona marca en "¿Qué te interesa?": los packs y ofertas de la
// sección de precios. Las tarjetas de oferta (botón "Lo quiero") y otros botones
// de la web usan selectInterest() para bajar al formulario con el pack marcado.
import { es, type Content } from "../data/es";
import type { OfferId } from "../data/site";

export type Interest = { id: OfferId | "unsure"; qty?: number };

export const INTEREST_EVENT = "ac:interest";

export function selectInterest(interest: Interest) {
  window.dispatchEvent(new CustomEvent<Interest>(INTEREST_EVENT, { detail: interest }));
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const packLabel = (o: Content["offers"], qty: number) => (qty === 1 ? o.packUnit : `${o.packOf} ${qty}`);

export function interestLabel(t: Content, interest: Interest) {
  if (interest.id === "unsure") return t.contact.unsure;
  const name = t.offers.items[interest.id].name;
  return interest.qty ? `${name} (${packLabel(t.offers, interest.qty)})` : name;
}

/** Siempre en español: así se guarda en Firestore y así lo validan las reglas. */
export const interestLabelEs = (interest: Interest) => interestLabel(es, interest);
