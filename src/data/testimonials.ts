/**
 * Témoignages. Règle absolue : rien d'inventé. Un témoignage n'est publié
 * (`published: true`) qu'avec l'accord de la personne sur le texte exact.
 *
 * - 3D NUM : mots de Victor (2026-09-14), fondateur de Vtensor. Publié.
 * - Bravel : accord de principe de Sébastien Brault (2026-09-14), texte à valider.
 * - GOMES SARL : texte, signature et portrait fournis par Damien Gomes, transmis par Victor (2026-09-20). Citation publiée telle quelle.
 *   Raison sociale, intitulé de poste et agents en place : indiqués par Victor (2026-09-20).
 *
 * Ordre d'affichage : les clients d'abord, le récit du fondateur (`featured`) en fin de section.
 */

export type Testimonial = {
  id: string;
  company: string;
  sector: string;
  person: string;
  role: string;
  quote: string;
  agents: readonly string[];
  /** Portrait dans /public/photos (sans extension), carré. Sinon monogramme. */
  photo?: string;
  /** Site de l'entreprise. */
  url?: string;
  /** Logo dans /public/logos : version pour fond clair, et pour fond sombre (sinon la même). */
  logo?: { light: string; dark?: string; alt: string };
  /** Récit du fondateur : bloc large encadré, affiché après les témoignages clients. */
  featured?: boolean;
  /** Visible sur le site. */
  published: boolean;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "3dnum",
    company: "3D NUM",
    sector: "Numérisation 3D",
    person: "Victor Arnoul",
    role: "Dirigeant de 3D NUM, fondateur de Vtensor",
    quote:
      "J'ai commencé par développer un agent pour gérer le service après-vente de mon entreprise, en particulier pour les clients à l'autre bout du monde. Puis j'ai automatisé, une par une, toutes mes tâches non productives\u00a0: factures, relances, devis, etc. Une fois tous ces agents en place, j'ai trouvé ça tellement révolutionnaire que je me suis dit qu'il fallait pouvoir proposer ces agents à tous les entrepreneurs comme moi. C'est ainsi qu'est né Vtensor.",
    agents: ["SAV", "Administratif", "Commercial", "Standardiste", "Marketing", "Webmaster"],
    photo: "victor",
    url: "https://www.3dnum.fr",
    logo: { light: "/logos/3dnum-gradient.svg", alt: "Logo 3D NUM" },
    featured: true,
    published: true,
  },
  {
    id: "bravel",
    company: "Bravel",
    sector: "Impression 3D · Service bureau",
    person: "Sébastien Brault",
    role: "Dirigeant, Bravel",
    quote: "",
    agents: ["Commercial", "Webmaster"],
    published: false,
  },
  {
    id: "gomes",
    company: "GOMES SARL",
    sector: "Entreprise de BTP",
    person: "Damien Gomes",
    role: "Co-dirigeant de l'entreprise GOMES SARL",
    quote:
      "En tant que co-dirigeant de PME, on a un éventail de tâches extrêmement large. Victor m'a aidé à mettre en place des agents qui me font gagner un temps précieux au quotidien\u00a0: assistant personnel, relances automatiques, agent commercial, outils personnalisés. Je peux maintenant me consacrer pleinement aux sujets stratégiques et structurants de l'entreprise.",
    agents: ["Administratif", "Commercial", "Métier sur mesure"],
    photo: "damien-gomes",
    // Logo fourni par Damien Gomes (2026-09-21), retracé en SVG depuis son image ; variante à lettres blanches pour le thème sombre.
    logo: { light: "/logos/gomes.svg", dark: "/logos/gomes-dark.svg", alt: "Logo GOMES" },
    published: true,
  },
];
