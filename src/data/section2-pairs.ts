/**
 * Données partagées Section 2 — 4 paires problème/solution.
 *
 * Mapping sur les angles officiels du positionnement Vtensor (validé Victor
 * 2026-05-02 dans `project_vtensor_positioning_augmentation_frame`) :
 *  - Capacité     → Angle 1 (équipe que vous ne pouvez pas vous offrir)
 *  - Focus        → Angles 2+3 (libération équipe + temps dirigeant, fusionnés)
 *  - Vitesse IA   → Angle 5 (prenez l'avance)
 *  - Souveraineté → Angle 4 (Made in France)
 *
 * Réutilisé par tous les composants Section 2 (wheel + alternatives).
 */

export type Section2Pair = {
  num: string;
  label: string;
  /** La douleur, voix du prospect. */
  problem: string;
  /** La réponse Vtensor à cette douleur. */
  solution: string;
};

export const SECTION2_PAIRS: Section2Pair[] = [
  {
    num: "01",
    label: "Capacité",
    problem:
      "Vous ne pouvez pas vous permettre d'embaucher les profils dont votre business aurait besoin.",
    solution:
      "Vtensor vous donne accès à l'équipe que vous ne pouviez pas vous offrir : commercial, SAV, marketing, ADV. Tous opérationnels, 24/7, pour le coût d'un seul abonnement.",
  },
  {
    num: "02",
    label: "Focus",
    problem:
      "Vous ou votre équipe passez un temps non négligeable sur des tâches répétitives qu'une IA pourrait faire.",
    solution:
      "Vtensor reprend les tâches automatisables — relances, qualifications, devis brouillons, mises à jour catalogue. Vous (ou votre équipe) revenez à ce qui crée vraiment de la valeur : parler aux clients et développer votre business.",
  },
  {
    num: "03",
    label: "Vitesse IA",
    problem:
      "Vous sentez qu'une révolution IA est en cours, mais vous n'avez pas le temps de devenir expert.",
    solution:
      "Vtensor déploie pour vous des agents à l'état de l'art, mis à jour en permanence à la vitesse à laquelle l'IA évolue. Vous bénéficiez de la techno la plus récente sans jamais avoir à la suivre vous-même.",
  },
  {
    num: "04",
    label: "Souveraineté",
    problem:
      "Vous n'êtes pas serein à l'idée de confier vos données commerciales sensibles à des grands clouds américains.",
    solution:
      "Vtensor est hébergé en France — ou directement sur vos serveurs si vous préférez. Vos données ne quittent jamais l'Europe. RGPD natif, infrastructure souveraine.",
  },
];
