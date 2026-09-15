/**
 * Carrousel du hero : un métier, une configuration d'agents, un mot du titre.
 * La photo, la proposition d'équipe et le mot changent ensemble.
 */

export type Slide = {
  id: string;
  /** Fichier dans /public/photos (sans extension) */
  photo: string;
  alt: string;
  /** Mot mis en accent dans « Reprenez le contrôle de … » */
  word: string;
  company: string;
  agents: string[];
};

export const SLIDES: readonly Slide[] = [
  {
    id: "menuiserie",
    photo: "menuiserie",
    alt: "Une dirigeante dans son atelier de menuiserie, tablette à la main",
    word: "votre temps",
    company: "Atelier de menuiserie",
    agents: ["Agent SAV", "Agent Administratif", "Agent Standardiste"],
  },
  {
    id: "architecture",
    photo: "architecture",
    alt: "Un architecte dans son agence, tablette à la main",
    word: "votre business",
    company: "Agence d'architecture",
    agents: ["Agent Commercial", "Agent Marketing"],
  },
  {
    id: "ecommerce",
    photo: "ecommerce",
    alt: "Une fondatrice de boutique en ligne dans sa réserve",
    word: "votre quotidien",
    company: "Boutique en ligne",
    agents: ["Agent SAV", "Agent Marketing", "Agent Administratif"],
  },
  {
    id: "garage",
    photo: "garage",
    alt: "Un garagiste indépendant devant un véhicule sur pont",
    word: "vos journées",
    company: "Garage indépendant",
    agents: ["Agent Standardiste", "Agent Administratif"],
  },
];

export const PRICE_PER_AGENT = 100;
export const PRICE_PER_AGENT_YEAR = 1000;
/** Frais d'intégration : à partir de 500 € HT par agent, une fois (décision Victor 2026-09-08). */
export const INTEGRATION_PER_AGENT = 500;
/** Offre de lancement : frais d'intégration offerts jusqu'au 30 septembre 2026 (décision Victor 2026-09-15 ; remplace « 10 premiers clients »).
 *  Passer LAUNCH_OFFER_ACTIVE à false et redéployer à la fin de l'offre. */
export const LAUNCH_OFFER_ACTIVE = true;
export const LAUNCH_OFFER_END = "30 septembre 2026";
export const LAUNCH_OFFER_END_SHORT = "30 sept.";
