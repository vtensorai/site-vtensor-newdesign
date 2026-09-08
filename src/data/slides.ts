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
export const INTEGRATION_FROM = 1000;
