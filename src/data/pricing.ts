/**
 * Prix publics de l'abonnement (une seule source pour la page d'accueil, la FAQ
 * et les conditions générales).
 * 100 € HT par agent et par mois (décision Victor du 2026-10-19 : « on arrête les prix à 99 €, ça marche pour
 * le retail en TTC, pas en HT chez les pros » ; 99 € du 08/10 au 19/10). Annuel = 10 mois (2 mois offerts).
 * Mêmes montants que les prix Stripe `VT-SUB-<CODE>-monthly|yearly`.
 */

export const PRICE_PER_AGENT = 100;
export const PRICE_PER_AGENT_YEAR = PRICE_PER_AGENT * 10;
/** Formule « Équipe complète » (décision Victor 2026-10-19) : tous les agents du catalogue pour 500 € HT par mois,
 *  annuel = 10 mois comme par agent. Mêmes montants que les prix Stripe `VT-PACK-ALL-monthly|yearly` : c'est le
 *  serveur qui applique la formule dès que tous les agents sont choisis, le site affiche ce qu'il facturera. */
export const TEAM_PRICE = 500;
export const TEAM_PRICE_YEAR = TEAM_PRICE * 10;
/** Formule affichée sur l'accueil, la FAQ et les conditions générales (go de Victor le 2026-10-19). */
export const TEAM_OFFER_LIVE = true;
/** Frais d'intégration : 500 € HT par agent, une fois, réglés à la commande (décision Victor 2026-10-12, arrondi de
 *  499 à 500 € le 2026-10-19 : prix ronds en HT). Même montant que le prix Stripe `VT-INTEG-agent`. */
export const INTEGRATION_PER_AGENT = 500;
/** Formule équipe : intégration de 5 agents (option A de Victor, 2026-10-19 ; à 100 € par agent, cinq agents coûtent
 *  déjà le prix de la formule, le sixième est offert jusque dans l'intégration). Même valeur que la metadata
 *  `integration_agents` du produit Stripe VT-PACK-ALL, qui décide de ce qui est facturé. */
export const TEAM_INTEGRATION_AGENTS = 5;
export const TEAM_INTEGRATION = TEAM_INTEGRATION_AGENTS * INTEGRATION_PER_AGENT;
/** Offre de lancement : frais d'intégration offerts jusqu'au LAUNCH_OFFER_LAST_DAY inclus, heure de Paris
 *  (décision Victor 2026-09-15, prolongée le 2026-10-01). Prolonger = changer les trois constantes ci-dessous
 *  ET la metadata `offered_until` du prix Stripe `VT-INTEG-agent` (c'est elle qui décide de ce qui est facturé). */
export const LAUNCH_OFFER_LAST_DAY = "2026-10-31";
export const LAUNCH_OFFER_END = "31 octobre 2026";
export const LAUNCH_OFFER_END_SHORT = "31 oct.";
export function launchOfferActive(now = new Date()): boolean {
  const today = new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return today <= LAUNCH_OFFER_LAST_DAY;
}
/** Valeur au moment du build (pages statiques, et état initial identique dans le navigateur pour l'hydratation) ;
 *  les composants client la réévaluent ensuite avec la date réelle (`useLaunchOffer`). */
export const LAUNCH_OFFER_ACTIVE = process.env.NEXT_PUBLIC_BUILT_ON_PARIS
  ? process.env.NEXT_PUBLIC_BUILT_ON_PARIS <= LAUNCH_OFFER_LAST_DAY
  : launchOfferActive();

const NB = " ";
/** 1234.5 → « 1 234,50 € » (espaces insécables). */
export function eur(n: number, decimals = 0) {
  return n.toFixed(decimals).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + "€";
}
/** Coût par jour d'un agent en mensuel (prix × 12 / 365). */
export const PRICE_PER_DAY = (PRICE_PER_AGENT * 12) / 365;
/** Formule équipe, article 4 des conditions générales. */
export const TEAM_TERMS = `${eur(TEAM_PRICE)} hors taxes par mois pour l'ensemble des Agents du catalogue publié sur le site, ou ${eur(TEAM_PRICE_YEAR)} hors taxes par an en règlement annuel d'avance. Les Agents ajoutés au catalogue pendant l'abonnement y sont inclus sans supplément ; les postes développés sur mesure pour le Client n'en font pas partie. Les frais d'intégration de la formule sont ceux de ${TEAM_INTEGRATION_AGENTS} Agents, soit ${eur(TEAM_INTEGRATION)} hors taxes.`;
