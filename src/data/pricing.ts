/**
 * Prix publics de l'abonnement (une seule source pour la page d'accueil, la FAQ
 * et les conditions générales).
 * 99 € HT par agent et par mois depuis le 2026-10-08 (décision Victor ; 3D NUM
 * garde son abonnement en cours). Annuel = 10 mois (2 mois offerts).
 */

export const PRICE_PER_AGENT = 99;
export const PRICE_PER_AGENT_YEAR = PRICE_PER_AGENT * 10;
/** Formule « Équipe complète » (décision Victor 2026-10-19) : tous les agents du catalogue pour 500 € HT par mois,
 *  annuel = 10 mois comme par agent. Mêmes montants que les prix Stripe `VT-PACK-ALL-monthly|yearly` : c'est le
 *  serveur qui applique la formule dès que tous les agents sont choisis, le site affiche ce qu'il facturera. */
export const TEAM_PRICE = 500;
export const TEAM_PRICE_YEAR = TEAM_PRICE * 10;
/** Formule affichée sur l'accueil, la FAQ et les conditions générales. Tant que false, elle n'est visible que sur
 *  l'aperçu /tarifs-equipe/ (non indexé) : passer à true après validation de Victor. */
export const TEAM_OFFER_LIVE = false;
/** Frais d'intégration : 499 € HT par agent, une fois, réglés à la commande (décision Victor 2026-10-12 ;
 *  avant : « à partir de 500 € »). Même montant que le prix Stripe `VT-INTEG-agent`. */
export const INTEGRATION_PER_AGENT = 499;
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
/** Formule équipe, article 4 des conditions générales (affiché aussi sur l'aperçu pour relecture). */
export const TEAM_TERMS = `${eur(TEAM_PRICE)} hors taxes par mois pour l'ensemble des Agents du catalogue publié sur le site, ou ${eur(TEAM_PRICE_YEAR)} hors taxes par an en règlement annuel d'avance. Les Agents ajoutés au catalogue pendant l'abonnement y sont inclus sans supplément ; les postes développés sur mesure pour le Client n'en font pas partie.`;
