/**
 * Catalogue final des 7 agents Vtensor (aligné sur le stack réellement déployé
 * dans l'app — référentiel = table `agent_config` côté tenant).
 *
 * Stack 2026 :
 *   01 Directeur Exécutif (master)       — flagship, orchestration + stratégie
 *   02 Agent SAV (sav)                   — autonome multi-canal
 *   03 Agent Commercial (commercial)     — autonome prospection + AO + devis
 *   04 Agent ADV (adv)                   — autonome facturation + trésorerie
 *   05 Agent Webmaster (webmaster)       — CMS + SEO + acquisition payante
 *   06 Agent Marketing (marketing)       — contenu + visuels + publication
 *   07 Agent Standardiste (standardiste) — voix téléphonique 24/7
 *
 * `incoming: true` → la bubble user de l'AgentChatPreview est formatée comme un
 * mail/appel externe entrant (préfixe "📨 De …", fond légèrement teinté cyan).
 *
 * `flagship: true` → agent maître (Directeur Exécutif), mis en avant.
 */

export type Channel = "web" | "email" | "whatsapp" | "telegram" | "phone";

export type Agent = {
  num: string;
  name: string;
  metier: string;
  description: string;
  capabilities: readonly string[];
  price: string;
  user: string;
  agent: string;
  flagship?: boolean;
  incoming?: boolean;
  /** Canaux par lesquels le Founder peut joindre cet agent (affichés sous la chat preview). */
  channels?: readonly Channel[];
};

export const AGENTS: readonly Agent[] = [
  {
    num: "01",
    flagship: true,
    name: "Directeur Exécutif",
    metier: "Direction, coordination et conseil stratégique",
    description:
      "Votre interlocuteur principal. Il coordonne toute votre équipe d'agents, vous tient au courant de l'essentiel chaque jour, et joue le rôle de conseiller stratégique. Communiquez avec lui comme vous le feriez aujourd'hui avec ChatGPT, mais avec la possibilité de lui demander d'effectuer des tâches concrètes, en plus de bénéficier d'une mémoire persistante et de la connaissance du contexte de votre entreprise.",
    capabilities: [
      "Coordination de votre équipe d'agents",
      "Conversation libre, mémoire persistante, contexte connu",
      "Conseil stratégique au quotidien",
      "Reporting quotidien des activités de l'équipe",
    ],
    price: "Inclus avec votre équipe",
    channels: ["web", "email", "whatsapp", "telegram", "phone"],
    user: "Briefing du matin stp.",
    agent:
      "✓ **Ta journée** : 3 RDV, dont Camille Roux à 10 h — elle hésite encore sur le contrat annuel (relancée 2 fois), prépare bien ton argument prix. **Cash** : +4 230 € reçus cette nuit, 2 impayés à J+30 (l'Agent ADV les relance ce matin). **SAV** : Pierre Acme avait un blocage export hier soir, l'Agent SAV a déjà répondu, situation OK. **Suggestion** : je te bloque 15 h-16 h pour brainstormer ta nouvelle offre ?",
  },
  {
    num: "02",
    name: "Agent SAV (autonome)",
    metier: "Service après-vente multi-canal",
    description:
      "Répond directement à vos clients en moins d'une minute, 24h/24, dans votre ton, sur tous les canaux : email, WhatsApp, chat. Escalade vers un humain quand c'est nécessaire. La base de connaissances métier s'auto-enrichit à mesure que les questions arrivent.",
    capabilities: [
      "Multi-canal (email, WhatsApp, chat)",
      "Base de connaissances métier",
      "Gestion de tickets",
      "Escalade humaine intelligente",
      "FAQ auto-enrichie",
    ],
    price: "299 € / mois",
    incoming: true,
    user: "De pierre@xxxx.fr (client final) — Bonjour, je n'arrive plus à exporter mes données depuis ce matin. Le bouton « Exporter » donne une page blanche. Pouvez-vous m'aider rapidement ? Pierre, Acme.",
    agent:
      "✓ Répondu à Pierre en 47 secondes : workaround envoyé (utiliser Chrome au lieu de Safari iOS), excuses, ETA fix < 24 h. Ticket ouvert côté tech. Pierre a confirmé que ça fonctionne. **Tu n'as rien à faire.**",
    channels: ["web", "email", "whatsapp", "telegram"],
  },
  {
    num: "03",
    name: "Agent Commercial (autonome)",
    metier: "Prospection, appels d'offres et qualification",
    description:
      "Prospecte vos futurs clients à grande échelle (intelligence LinkedIn, Apollo, Clay), qualifie les leads entrants, rédige vos réponses aux appels d'offres en PDF brandé, et prépare vos devis. Vous gardez la main sur la signature, il s'occupe de toute la machinerie commerciale.",
    capabilities: [
      "Prospection (LinkedIn, Apollo, Clay)",
      "Qualification de leads entrants",
      "Réponse aux appels d'offres (PDF brandé)",
      "Préparation de devis",
      "Relances séquencées",
      "Suivi pipeline et opportunities",
    ],
    price: "299 € / mois",
    user: "On veut entrer chez les 50 plus grosses ETI industrielles en Auvergne-Rhône-Alpes. Tu peux me préparer une liste qualifiée et la séquence de prospection ?",
    agent:
      "✓ 47 ETI identifiées (croisé Apollo + Clay + signaux d'intent). Pour chacune : décideur cible, taille équipe, stack tech, événements récents (recrutements, levées, presse). Messages personnalisés rédigés sur tes 3 angles de positionnement. CSV prêt à importer dans ton Waalaxy. Estimation : ~12 RDV qualifiés sur 2 semaines.",
    channels: ["web", "email", "whatsapp", "telegram"],
  },
  {
    num: "04",
    name: "Agent ADV (autonome)",
    metier: "Administration des ventes, facturation et trésorerie",
    description:
      "Saisit vos commandes, prépare vos devis, émet vos factures, relance les impayés, suit la logistique et gère les litiges. Connecté à votre comptabilité (Pennylane, Sage, Cegid) et à votre banque (Bridge, Powens) : reporting de trésorerie hebdo, P&L mensuel et rapports PDF brandés pour banquier ou expert-comptable.",
    capabilities: [
      "Saisie commandes et facturation",
      "Préparation de devis",
      "Relances impayés (J+1, J+15, J+30)",
      "Suivi logistique et livraisons",
      "Gestion des litiges clients",
      "Reporting cash hebdomadaire",
      "P&L mensuel et rapports PDF brandés",
    ],
    price: "199 € / mois",
    user: "Où on en est sur les impayés et la trésorerie ?",
    agent:
      "✓ **Impayés** : 4 factures +30 j (total 8 720 € HT). Toutes relancées. Camille Roux confirme virement vendredi, Marc Lefèvre demande échéancier 3 mois → je te le passe si OK. **Trésorerie** : position cash 87 540 €, runway 6,2 mois, DSO 47 j (vs objectif 35 j). Rapport PDF brandé prêt pour ton banquier si besoin.",
    channels: ["web", "email", "whatsapp", "telegram"],
  },
  {
    num: "05",
    name: "Agent Webmaster",
    metier: "Site web, SEO et acquisition payante",
    description:
      "Tout ce qui touche à votre site et à votre acquisition payante. Édition de pages no-code (Framer, Webflow, WordPress), rédaction et publication d'articles SEO, SEO technique (schema, sitemaps, performance), suivi Search Console, et gestion complète de vos campagnes Google Ads, Meta Ads et LinkedIn Ads.",
    capabilities: [
      "Édition site no-code (Framer, Webflow, WordPress)",
      "Rédaction et publication d'articles SEO",
      "SEO technique (schema, sitemaps, performance)",
      "Suivi Google Search Console",
      "Google Ads, Meta Ads, LinkedIn Ads",
      "A/B testing et reporting",
    ],
    price: "299 € / mois",
    user: "Pourquoi mon site n'a pas beaucoup de trafic organique, et est-ce que ma campagne Google Ads est bien calibrée ?",
    agent:
      "✓ Audit complet. **SEO** : 3 problèmes — H1 sans mots-clés recherchés (12 propositions calibrées), meta descriptions absentes sur 8 pages, contenu trop pauvre sur les pages produit. Plus 14 backlinks toxiques à désavouer. **Google Ads** : ton CPA est 2,4× au-dessus du benchmark secteur. 3 mots-clés cannibalisent 67 % du budget pour 12 % des conversions. Je redistribue les enchères et je publie 4 articles SEO cette semaine ?",
    channels: ["web", "email", "whatsapp", "telegram"],
  },
  {
    num: "06",
    name: "Agent Marketing",
    metier: "Contenu, visuels et publication",
    description:
      "Programme vos publications LinkedIn, Instagram, X et Facebook, monitore l'engagement et répond aux commentaires en votre nom. Rédige et envoie vos newsletters via Brevo ou Mailchimp. En version Pro, génère vos images, vidéos et logos et déploie une identité visuelle cohérente sur tous vos supports.",
    capabilities: [
      "Programmation posts (LinkedIn, Instagram, X, Facebook)",
      "Monitoring engagement et réponses commentaires",
      "Newsletters (Brevo, Mailchimp)",
      "Génération d'images, vidéos et logos (version Pro)",
      "Identité visuelle (version Pro)",
    ],
    price: "499 € / mois",
    user: "Génère un carrousel LinkedIn sur les 3 erreurs d'automation que les PME font le plus.",
    agent:
      "✓ Carrousel 8 slides posé en draft (titre + 3 erreurs + 3 fixes + CTA). Tonalité directe, hook validé. Visuels générés en cohérence avec ta charte. Tu veux 3 variantes de thumbnail ?",
    channels: ["web", "email", "whatsapp", "telegram"],
  },
  {
    num: "07",
    name: "Agent Standardiste",
    metier: "Accueil téléphonique et prise de messages",
    description:
      "Décroche votre standard 24h/24 d'une voix française naturelle. Qualifie l'appel, prend des messages structurés, transfère vers la bonne personne, escalade vers vous quand c'est urgent. Reconnaît votre voix : quand vous l'appelez, c'est elle qui dispatche vos demandes à l'équipe.",
    capabilities: [
      "Accueil téléphonique 24/7",
      "Voix française naturelle",
      "Prise de messages structurés",
      "Transferts d'appel intelligents",
      "Escalade urgence",
      "Dispatch vocal du dirigeant",
    ],
    price: "199 € / mois",
    incoming: true,
    user: "📞 De Pierre Lambert, Acme Industries — Bonjour, je voulais parler à Sophie au commercial pour discuter d'un partenariat possible.",
    agent:
      "✓ Appel reçu. Pierre Lambert identifié comme nouveau prospect (premier contact). Message structuré transmis à l'Agent Commercial : « Partenariat — Acme Industries, Pierre Lambert cherche Sophie ». ETA rappel : 24 h. SMS de confirmation envoyé à Pierre.",
    channels: ["phone"],
  },
] as const;
