/**
 * Programme de parrainage (décision de Victor du 2026-10-20) : règles affichées sur /parrainage/.
 * Une seule source pour le taux et le délai ; les montants d'exemple viennent de data/pricing.ts.
 * Rien ici qui ne soit dans le contrat du programme (article « Programme de parrainage » des conditions générales).
 */

import { APP_URL, CONTACT_EMAIL } from "@/lib/links";
import { PRICE_PER_AGENT, TEAM_PRICE, eur } from "@/data/pricing";

/** Part de l'abonnement hors taxes payé par le filleul, reversée au parrain. */
export const REFERRAL_RATE_PERCENT = 20;
/** Délai de validation d'une commission après le paiement de la facture du filleul. */
export const REFERRAL_HOLD_DAYS = 30;
/** Rubrique de l'application où le client trouve son lien et son code. */
export const CONSTELLATION_URL = `${APP_URL}/constellation`;
export const PARTNER_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Programme de parrainage")}`;
/** Ancre de l'article des conditions générales. */
export const REFERRAL_TERMS_HREF = "/conditions-generales/#parrainage";

/** Commission sur un montant d'abonnement hors taxes. */
export function commission(amount: number): number {
  return (amount * REFERRAL_RATE_PERCENT) / 100;
}

const NB = " ";
export const RATE_LABEL = `${REFERRAL_RATE_PERCENT}${NB}%`;

/** Les deux exemples du contrat : formule Équipe complète, et 2 agents. */
export const REFERRAL_EXAMPLES = [
  { label: "Formule Équipe complète", base: TEAM_PRICE },
  { label: "2 agents", base: 2 * PRICE_PER_AGENT },
] as const;

export type ReferralFaq = { question: string; answer: string };

/** Espaces insécables de la typographie française (avant « ? : ; », entre un montant et « HT »). */
function fr(text: string): string {
  return text.replace(/ ([?:;!])/g, `${NB}$1`).replace(/ HT\b/g, `${NB}HT`);
}

export const REFERRAL_FAQS: readonly ReferralFaq[] = [
  {
    question: "Pendant combien de temps suis-je rémunéré ?",
    answer: `Tant que l'entreprise parrainée reste abonnée. Vous touchez ${RATE_LABEL} du montant hors taxes de chaque facture d'abonnement qu'elle paie.`,
  },
  {
    question: "Les frais d'intégration comptent-ils ?",
    answer: `Non. La commission porte sur l'abonnement seul, par agent ou formule Équipe complète. Les frais d'intégration, les taxes et les montants remboursés n'ouvrent pas droit à commission. Exemple : un filleul abonné à ${eur(TEAM_PRICE)} HT par mois vous rapporte ${eur(commission(TEAM_PRICE))} HT par mois.`,
  },
  {
    question: "Et si mon filleul parraine à son tour ?",
    answer: "Le parrainage ne porte que sur un niveau : vous êtes rémunéré sur les entreprises que vous parrainez directement, pas sur leurs propres filleuls.",
  },
  {
    question: "Qui peut être parrainé ?",
    answer: "Une entreprise qui n'était pas encore cliente de Vtensor. Un client existant ne peut pas être parrainé, et un client ne peut pas se parrainer lui-même.",
  },
  {
    question: "Qui peut être parrain ?",
    answer: "Une entreprise : un client de Vtensor, ou un partenaire professionnel (expert-comptable, consultant, intégrateur, dirigeant de réseau). Le programme est réservé aux professionnels.",
  },
  {
    question: "Quand ma commission est-elle versée ?",
    answer: `Elle est validée ${REFERRAL_HOLD_DAYS} jours après le paiement de la facture de votre filleul. Si vous êtes client au mois, elle est déduite de votre facture Vtensor suivante. Sinon, elle vous est versée chaque mois par virement, sur votre facture.`,
  },
].map((f) => ({ question: fr(f.question), answer: fr(f.answer) }));
