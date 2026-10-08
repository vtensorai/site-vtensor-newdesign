/**
 * Contenus de l'aperçu V4 (route /apercu/, non indexée) — 2026-10-08.
 *
 * Écrits pour la cible de la prospection : TPE dont le dirigeant gère encore
 * l'opérationnel. Les missions et exemples sont des idées de ce qu'un agent
 * peut faire (développement sur mesure, consigne de Victor du 08/10) ; les
 * personnes et entreprises citées sont fictives et marquées « exemple ».
 */

export type AgentKey = "SAV" | "COM" | "ADM" | "WEB" | "MKT" | "STA";

/** Couleur d'agent = jetons de l'aperçu app (mêmes teintes que dans l'application). */
export const AGENT_COLOR: Record<AgentKey, string> = {
  SAV: "var(--app-cyan)",
  COM: "var(--app-blue)",
  ADM: "var(--app-green)",
  WEB: "var(--app-amber)",
  MKT: "var(--app-pink)",
  STA: "var(--app-indigo)",
};

export type AgentV4 = {
  key: AgentKey;
  name: string;
  short: string;
  /** Mission en une ligne (liste). */
  metier: string;
  headline: string;
  description: string;
  /** Exemples de missions : des idées, chaque agent est développé sur mesure. */
  missions: readonly string[];
  channels: readonly ("email" | "whatsapp" | "phone" | "web")[];
  example: { from?: string; user: string; agent: string };
};

export const AGENTS_V4: readonly AgentV4[] = [
  {
    key: "SAV",
    name: "Agent SAV",
    short: "SAV",
    metier: "Répond à vos clients",
    headline: "Répond à vos clients en quelques minutes, dans votre ton.",
    description:
      "Une question sur une commande, un délai, une facture : l'agent répond par email ou WhatsApp à partir de vos documents et de votre historique. Ce qu'il ne sait pas traiter, il vous le transmet avec un résumé.",
    missions: ["Réponses par email et WhatsApp", "Suivi de commande et de chantier", "Base de connaissances de votre métier", "Transmission à vous avec un résumé", "Réponses en anglais pour vos clients étrangers"],
    channels: ["email", "whatsapp", "web"],
    example: {
      from: "Mme Leroy · email",
      user: "Bonjour, où en est la fabrication de mon escalier ? Vous m'aviez parlé de fin octobre.",
      agent: "Répondu à Mme Leroy en 3 minutes : fabrication en cours, pose prévue semaine 44 d'après votre planning. Elle demande si la teinte peut encore changer : **je vous laisse trancher.**",
    },
  },
  {
    key: "COM",
    name: "Agent Commercial",
    short: "Commercial",
    metier: "Trouve vos prochains clients",
    headline: "Trouve vos prochains clients et prépare vos devis. Vous signez.",
    description:
      "L'agent repère les entreprises de votre secteur et de votre zone, rédige pour chacune un premier mail personnalisé et ses relances, qualifie les demandes entrantes et prépare vos devis. Rien ne part sans votre accord.",
    missions: ["Recherche d'entreprises par secteur et par zone", "Mails personnalisés et relances", "Qualification des demandes entrantes", "Devis préparés dans votre logiciel", "Relance des devis sans réponse", "Réponses aux appels d'offres"],
    channels: ["email", "web"],
    example: {
      user: "Trouvez-moi des syndics et des agences immobilières dans les Yvelines qui pourraient avoir besoin d'un vitrier.",
      agent: "38 entreprises trouvées, 31 avec une adresse vérifiée. Un premier mail personnalisé et deux relances rédigés pour chacune. **Tout est prêt, il ne manque que votre validation.**",
    },
  },
  {
    key: "ADM",
    name: "Agent Administratif",
    short: "Administratif",
    metier: "Factures, relances, trésorerie",
    headline: "Saisit vos factures, relance les impayés, suit votre trésorerie.",
    description:
      "Les factures fournisseurs reçues par email sont saisies dans votre logiciel de gestion. Les impayés sont relancés au bon moment, avec le ton qui convient. Chaque semaine, vous savez où vous en êtes.",
    missions: ["Saisie des factures fournisseurs", "Relances d'impayés à 30, 60 et 90 jours", "Devis et factures en brouillon", "Point de trésorerie chaque semaine", "Odoo, Pennylane, Sage…", "Pièces prêtes pour votre expert-comptable"],
    channels: ["email", "web"],
    example: {
      user: "Où en sont les impayés ?",
      agent: "**3 factures** à plus de 30 jours, 4 870 € HT au total. Relance envoyée à M. Garnier ; Mme Roche demande à payer en deux fois, **je vous le soumets**. La dernière est relancée lundi.",
    },
  },
  {
    key: "WEB",
    name: "Agent Webmaster",
    short: "Webmaster",
    metier: "Site web et Google",
    headline: "Fait vivre votre site et le fait remonter sur Google.",
    description:
      "Articles, pages, actualités de vos chantiers : l'agent rédige, publie et suit ce que Google en fait. Il surveille vos positions et vous propose les pages à améliorer.",
    missions: ["Articles et actualités", "Mise à jour des pages", "Référencement local", "Suivi Search Console et Analytics", "Campagnes Google Ads", "WordPress, Webflow, Framer…"],
    channels: ["web", "email"],
    example: {
      user: "Pourquoi mon site ne sort pas quand on cherche « menuisier Rambouillet » ?",
      agent: "Votre page d'accueil ne cite ni « menuisier » ni « Rambouillet », et votre fiche Google ne renvoie pas vers le site. Je propose un nouveau titre, une page « Menuiserie sur mesure à Rambouillet » et deux articles sur vos derniers chantiers. **Je publie ?**",
    },
  },
  {
    key: "MKT",
    name: "Agent Marketing",
    short: "Marketing",
    metier: "Réseaux sociaux et visuels",
    headline: "Publie pour vous et crée vos visuels.",
    description:
      "Posts LinkedIn, Instagram et Facebook à partir de vos photos de chantier ou de vos produits, visuels à vos couleurs, newsletter. Vous validez, l'agent publie.",
    missions: ["Posts LinkedIn, Instagram, Facebook", "Visuels et vidéos à vos couleurs", "Logo et identité visuelle", "Newsletter", "Réponses aux commentaires"],
    channels: ["web", "email"],
    example: {
      user: "Je vous ai envoyé 6 photos de l'escalier des Leroy. Vous pouvez en faire un post ?",
      agent: "Post LinkedIn et Instagram prêts : 4 photos, un texte court sur le chêne massif et la pose en une journée, à vos couleurs. **Je programme jeudi 18 h ?**",
    },
  },
  {
    key: "STA",
    name: "Agent Standardiste",
    short: "Standardiste",
    metier: "Décroche votre téléphone",
    headline: "Décroche votre téléphone, même quand vous avez les mains prises.",
    description:
      "Une voix française naturelle répond à vos appels, comprend la demande, prend un message complet et vous l'envoie aussitôt. Si c'est urgent, vous êtes prévenu immédiatement.",
    missions: ["Accueil téléphonique 24 h/24", "Voix française naturelle", "Message complet par email ou SMS", "Alerte en cas d'urgence", "Transfert d'appel", "Prise de rendez-vous"],
    channels: ["phone", "email"],
    example: {
      from: "Appel entrant · 10 h 42",
      user: "Bonjour, je voudrais un devis pour un escalier en chêne. C'est possible d'être rappelé demain matin ?",
      agent: "Appel pris (1 min 20). Message envoyé : M. Durand, escalier en chêne, maison à Montfort-l'Amaury, rappel souhaité demain avant 10 h. **Ajouté à vos rappels.**",
    },
  },
];

export const agentByKey = (k: AgentKey) => AGENTS_V4.find((a) => a.key === k)!;

/** Hero : la tâche du titre, la notification et l'équipe changent ensemble. */
export type SlideV4 = {
  id: string;
  photo: string;
  alt: string;
  /** Fin du titre « Des agents IA qui … ». */
  task: string;
  company: string;
  agents: readonly AgentKey[];
  notif: { agent: AgentKey; time: string; text: string };
};

export const SLIDES_V4: readonly SlideV4[] = [
  {
    id: "menuiserie",
    photo: "menuiserie",
    alt: "Une dirigeante dans son atelier de menuiserie, tablette à la main",
    task: "décrochent votre téléphone",
    company: "Atelier de menuiserie",
    agents: ["STA", "SAV", "ADM"],
    notif: { agent: "STA", time: "10 h 42", text: "Appel de M. Durand pris pendant la découpe. Devis escalier en chêne, rappel demain avant 10 h." },
  },
  {
    id: "architecture",
    photo: "architecture",
    alt: "Un architecte dans son agence, tablette à la main",
    task: "trouvent vos prochains clients",
    company: "Agence d'architecture",
    agents: ["COM", "MKT"],
    notif: { agent: "COM", time: "9 h 15", text: "24 promoteurs et syndics repérés dans les Hauts-de-Seine. Mails prêts, en attente de votre accord." },
  },
  {
    id: "ecommerce",
    photo: "ecommerce",
    alt: "Une fondatrice de boutique en ligne dans sa réserve",
    task: "répondent à vos clients",
    company: "Boutique en ligne",
    agents: ["SAV", "MKT", "ADM"],
    notif: { agent: "SAV", time: "22 h 47", text: "Question sur un délai de livraison : répondu en 2 minutes, numéro de suivi joint." },
  },
  {
    id: "garage",
    photo: "garage",
    alt: "Un garagiste indépendant devant un véhicule sur pont",
    task: "relancent vos factures",
    company: "Garage indépendant",
    agents: ["ADM", "STA"],
    notif: { agent: "ADM", time: "8 h 00", text: "3 factures à plus de 30 jours relancées. M. Petit propose de régler vendredi." },
  },
];

/** « Une journée avec vos agents » : cinq situations, chacune avec ce que l'agent produit. */
export type Moment = {
  time: string;
  situation: string;
  agent: AgentKey;
  kind: "mail" | "call" | "invoice" | "prospects" | "article";
};

export const DAY: readonly Moment[] = [
  { time: "07:40", situation: "Un client attend une réponse depuis vendredi.", agent: "SAV", kind: "mail" },
  { time: "10:42", situation: "Le téléphone sonne pendant que vous avez les mains prises.", agent: "STA", kind: "call" },
  { time: "13:15", situation: "Des factures impayées que personne n'a relancées.", agent: "ADM", kind: "invoice" },
  { time: "16:30", situation: "Vous savez qu'il faudrait prospecter, mais vous n'avez jamais le temps.", agent: "COM", kind: "prospects" },
  { time: "18:05", situation: "Votre site n'a pas bougé depuis des mois.", agent: "WEB", kind: "article" },
];

/** Ce que le dirigeant obtient à l'issue de l'audit gratuit. */
export const AUDIT_DELIVERABLES = [
  "La liste des tâches qui vous coûtent le plus de temps, chiffrée en heures par semaine.",
  "Les agents qui s'en chargeraient et ce que chacun ferait, concrètement, chez vous.",
  "Le prix de l'abonnement et de l'intégration, par écrit, sans engagement.",
] as const;
