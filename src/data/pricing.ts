/**
 * Prix publics de l'abonnement (une seule source pour la page d'accueil, la FAQ
 * et les conditions générales).
 * 99 € HT par agent et par mois depuis le 2026-10-08 (décision Victor ; 3D NUM
 * garde son abonnement en cours). Annuel = 10 mois (2 mois offerts).
 */

export const PRICE_PER_AGENT = 99;
export const PRICE_PER_AGENT_YEAR = PRICE_PER_AGENT * 10;
/** Frais d'intégration : à partir de 500 € HT par agent, une fois (décision Victor 2026-09-08). */
export const INTEGRATION_PER_AGENT = 500;
/** Offre de lancement : frais d'intégration offerts jusqu'au 31 octobre 2026 (décision Victor 2026-09-15, prolongée le 2026-10-01 ; remplace « 10 premiers clients »).
 *  Passer LAUNCH_OFFER_ACTIVE à false et redéployer à la fin de l'offre. */
export const LAUNCH_OFFER_ACTIVE = true;
export const LAUNCH_OFFER_END = "31 octobre 2026";
export const LAUNCH_OFFER_END_SHORT = "31 oct.";

const NB = " ";
/** 1234.5 → « 1 234,50 € » (espaces insécables). */
export function eur(n: number, decimals = 0) {
  return n.toFixed(decimals).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + "€";
}
/** Coût par jour d'un agent en mensuel (prix × 12 / 365). */
export const PRICE_PER_DAY = (PRICE_PER_AGENT * 12) / 365;
