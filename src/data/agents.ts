/**
 * Catalogue des 6 agents Vtensor (aligné sur le stack réellement déployé
 * dans l'app — référentiel = table `agent_config` côté tenant).
 *
 * Depuis le 2026-09-07 il n'y a plus d'agent maître : le client s'adresse
 * directement à chaque agent (email, application, WhatsApp, téléphone).
 * Ce sont des exemples de postes : chaque agent est développé sur mesure.
 *
 * Stack :
 *   01 Agent SAV (sav)                   — autonome multi-canal
 *   02 Agent Commercial (commercial)     — autonome prospection + AO + devis
 *   03 Agent Administratif (adv)         — autonome facturation + trésorerie (renommé « ADV » → « Administratif » le 2026-09-08)
 *   04 Agent Webmaster (webmaster)       — CMS + SEO + acquisition payante
 *   05 Agent Marketing (marketing)       — contenu + visuels + publication
 *   06 Agent Standardiste (standardiste) — voix téléphonique 24/7
 */

export type Channel = "web" | "email" | "whatsapp" | "telegram" | "phone";

export const CHANNEL_LABEL: Record<Channel, string> = {
  web: "Application",
  email: "Email",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  phone: "Téléphone",
};

export type Agent = {
  num: string;
  /** Identifiant technique (= clé agent_config). */
  slug: string;
  name: string;
  /** Acronyme 3 lettres, comme dans le tableau de bord (SAV/ATC/ADM/WEB/MKT/STA). */
  acronym: string;
  /** Mission en une ligne (liste du catalogue). */
  metier: string;
  /** Promesse en une phrase (titre de la fiche). */
  headline: string;
  /** Détail de la fiche. */
  description: string;
  capabilities: readonly string[];
  /** Canaux par lesquels le client joint cet agent. */
  channels: readonly Channel[];
  /** Tourne en boucle sans sollicitation (badge « autonome »). */
  autonomous?: boolean;
  /** Exemple d'échange. `from` renseigné = message externe entrant (client final, appel). */
  example: { from?: string; user: string; agent: string };
};

export const AGENTS: readonly Agent[] = [
  {
    num: "01",
    slug: "sav",
    name: "Agent SAV",
    acronym: "SAV",
    metier: "Service après-vente multicanal",
    headline: "Répond à vos clients en moins d'une minute, dans votre ton.",
    description:
      "Sur tous les canaux : email, WhatsApp, application. Escalade vers un humain quand c'est nécessaire. La base de connaissances métier s'enrichit à mesure que les questions arrivent.",
    capabilities: ["Multicanal", "Base de connaissances métier", "Gestion de tickets", "Escalade humaine", "FAQ auto-enrichie"],
    channels: ["email", "whatsapp", "web"],
    autonomous: true,
    example: {
      from: "pierre@acme-industrie.fr",
      user: "Bonjour, je n'arrive plus à exporter mes données depuis ce matin. Le bouton « Exporter » donne une page blanche. Pouvez-vous m'aider rapidement ?",
      agent:
        "Répondu à Pierre en 47 secondes : solution de contournement envoyée, excuses, correctif annoncé sous 24 h. Ticket ouvert côté technique. Pierre a confirmé que ça fonctionne. **Vous n'avez rien à faire.**",
    },
  },
  {
    num: "02",
    slug: "commercial",
    name: "Agent Commercial",
    acronym: "ATC",
    metier: "Prospection, appels d'offres et qualification",
    headline: "Prospecte, qualifie et prépare vos devis. Vous signez.",
    description:
      "Prospection à grande échelle (LinkedIn, Apollo, Clay), qualification des leads entrants, réponses aux appels d'offres en PDF à votre marque, préparation des devis. Vous gardez la main sur la signature.",
    capabilities: ["Prospection (LinkedIn, Apollo, Clay)", "Qualification des leads entrants", "Réponses aux appels d'offres", "Préparation de devis", "Relances séquencées", "Suivi du pipeline"],
    channels: ["email", "web"],
    autonomous: true,
    example: {
      user: "Nous voulons entrer chez les 50 plus grosses ETI industrielles d'Auvergne-Rhône-Alpes. Pouvez-vous me préparer une liste qualifiée et la séquence de prospection ?",
      agent:
        "47 ETI identifiées (croisement Apollo, Clay et signaux d'intention). Pour chacune : décideur cible, taille d'équipe, outils, actualité récente. Messages personnalisés rédigés sur vos 3 angles de positionnement. Fichier prêt à importer dans votre outil LinkedIn. **Estimation : une douzaine de rendez-vous qualifiés sur 2 semaines.**",
    },
  },
  {
    num: "03",
    slug: "adv",
    name: "Agent Administratif",
    acronym: "ADM",
    metier: "Facturation, relances et trésorerie",
    headline: "Facture, relance les impayés et suit votre trésorerie.",
    description:
      "Saisie des commandes, devis, factures, litiges et logistique. Connecté à votre comptabilité (Pennylane, Sage, Cegid) et à votre banque : reporting de trésorerie hebdomadaire, P&L mensuel, rapports PDF pour votre banquier ou votre expert-comptable.",
    capabilities: ["Commandes et facturation", "Préparation de devis", "Relances impayés (J+1, J+15, J+30)", "Suivi logistique", "Gestion des litiges", "Reporting trésorerie et P&L"],
    channels: ["email", "web"],
    autonomous: true,
    example: {
      user: "Où en sommes-nous sur les impayés et la trésorerie ?",
      agent:
        "**Impayés** : 4 factures à plus de 30 jours (8 720 € HT), toutes relancées. Camille Roux confirme un virement vendredi ; Marc Lefèvre demande un échéancier sur 3 mois, je vous le soumets. **Trésorerie** : position 87 540 €, 6,2 mois d'autonomie, délai de paiement moyen 47 jours (objectif 35). Rapport PDF prêt pour votre banquier.",
    },
  },
  {
    num: "04",
    slug: "webmaster",
    name: "Agent Webmaster",
    acronym: "WEB",
    metier: "Site web, SEO et acquisition payante",
    headline: "Fait vivre votre site et vos campagnes.",
    description:
      "Édition de pages (Framer, Webflow, WordPress), rédaction et publication d'articles SEO, SEO technique, suivi Search Console, gestion de vos campagnes Google Ads, Meta Ads et LinkedIn Ads.",
    capabilities: ["Édition de site (Framer, Webflow, WordPress)", "Articles SEO", "SEO technique", "Search Console", "Google, Meta et LinkedIn Ads", "Tests A/B et reporting"],
    channels: ["web"],
    example: {
      user: "Pourquoi mon site a-t-il si peu de trafic organique, et ma campagne Google Ads est-elle bien calibrée ?",
      agent:
        "Audit complet. **SEO** : titres sans les mots-clés recherchés (12 propositions), meta descriptions absentes sur 8 pages, pages produit trop pauvres, 14 liens toxiques à désavouer. **Google Ads** : coût par acquisition 2,4 fois au-dessus du secteur ; 3 mots-clés absorbent 67 % du budget pour 12 % des conversions. Je redistribue les enchères et je publie 4 articles cette semaine ?",
    },
  },
  {
    num: "05",
    slug: "marketing",
    name: "Agent Marketing",
    acronym: "MKT",
    metier: "Contenu, visuels et publication",
    headline: "Publie, anime et mesure votre présence en ligne.",
    description:
      "Programmation des publications LinkedIn, Instagram, X et Facebook, réponses aux commentaires en votre nom, newsletters via Brevo ou Mailchimp. En version Pro : images, vidéos, logos et identité visuelle cohérente sur tous vos supports.",
    capabilities: ["Publications LinkedIn, Instagram, X, Facebook", "Suivi de l'engagement", "Newsletters (Brevo, Mailchimp)", "Images et vidéos (Pro)", "Identité visuelle (Pro)"],
    channels: ["web"],
    example: {
      user: "Préparez un carrousel LinkedIn sur les 3 erreurs d'automatisation que les PME font le plus.",
      agent:
        "Carrousel de 8 visuels en brouillon : accroche, 3 erreurs, 3 correctifs, appel à l'action. Visuels générés dans votre charte. **Voulez-vous 3 variantes de couverture ?**",
    },
  },
  {
    num: "06",
    slug: "standardiste",
    name: "Agent Standardiste",
    acronym: "STA",
    metier: "Accueil téléphonique et prise de messages",
    headline: "Décroche votre standard 24h/24, d'une voix française naturelle.",
    description:
      "Qualifie l'appel, prend des messages structurés, transfère vers la bonne personne, vous alerte quand c'est urgent. Reconnaît votre voix : quand vous l'appelez, elle dispatche vos demandes à l'équipe.",
    capabilities: ["Accueil téléphonique 24/7", "Voix française naturelle", "Messages structurés", "Transferts d'appel", "Escalade des urgences", "Dispatch vocal du dirigeant"],
    channels: ["phone", "web"],
    autonomous: true,
    example: {
      from: "Pierre Lambert, Acme Industries · appel entrant",
      user: "Bonjour, je voulais parler à Sophie, au commercial, pour discuter d'un partenariat possible.",
      agent:
        "Appel reçu. Pierre Lambert identifié comme nouveau prospect. Message structuré transmis à l'Agent Commercial : « Partenariat, Acme Industries, Pierre Lambert cherche Sophie ». Rappel prévu sous 24 h. SMS de confirmation envoyé à Pierre.",
    },
  },
];
