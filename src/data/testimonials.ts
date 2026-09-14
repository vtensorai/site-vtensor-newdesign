/**
 * Témoignages. Règle absolue : rien d'inventé. Un témoignage n'est publié
 * (`published: true`) qu'avec l'accord de la personne sur le texte exact.
 *
 * - 3D NUM : mots de Victor (2026-09-14), fondateur de Vtensor. Publié.
 * - Bravel : accord de principe de Sébastien Brault (2026-09-14), texte à valider.
 * - Gomes SARL : accord de principe de Damien Gomes (2026-09-14), texte à écrire avec lui.
 */

export type Testimonial = {
  id: string;
  company: string;
  sector: string;
  person: string;
  role: string;
  quote: string;
  agents: readonly string[];
  /** Mis en avant (bloc large). */
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
      "J'ai commencé par développer un agent pour gérer le service après-vente de mes clients, à l'autre bout du monde. Puis j'ai automatisé, une par une, toutes mes tâches non productives : factures, relances, standard téléphonique. J'ai trouvé ça tellement révolutionnaire que je me suis dit qu'il fallait proposer ces agents aux entrepreneurs comme moi. Vtensor est né comme ça.",
    agents: ["SAV", "Administratif", "Commercial", "Standardiste", "Marketing", "Webmaster"],
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
    company: "Gomes SARL",
    sector: "Construction · Bâtiment",
    person: "Damien Gomes",
    role: "Dirigeant, Gomes SARL",
    quote: "",
    agents: [],
    published: false,
  },
];
