/**
 * Catalogue final des 7 agents Vtensor.
 *
 * `incoming: true` → la bubble user de l'AgentChatPreview est formatée comme un
 * mail externe entrant (préfixe "📨 De …", fond légèrement teinté cyan), pour
 * signaler que c'est un client final qui parle, pas le dirigeant.
 *
 * `flagship: true` → agent maître (Directeur Exécutif), mis en avant dans
 * chaque option d'affichage.
 */

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
};

export const AGENTS: readonly Agent[] = [
  {
    num: "01",
    flagship: true,
    name: "Directeur Exécutif",
    metier: "Orchestration, conseil et brainstorming stratégique",
    description:
      "Votre interlocuteur unique. Coordonne tous vos agents, vous brief sur l'essentiel, et joue le rôle de sparring partner stratégique : brainstorming, synthèse de documents, veille personnalisée, pressure-test des décisions importantes.",
    capabilities: [
      "Orchestration inter-agents",
      "Brainstorming stratégique (SWOT, OKR, BMC)",
      "Synthèse de documents",
      "Veille personnalisée",
      "Pressure-test multi-modèles",
    ],
    price: "299 € / mois",
    user: "Je voudrais brainstormer mon plan d'attaque sur le marché allemand. Aide-moi à structurer.",
    agent:
      "✓ J'ai préparé une analyse SWOT sur ton expansion DACH à partir des données de tes 6 derniers mois et d'un benchmark concurrents. 3 leviers prioritaires : 1) Bavière (déjà 2 clients early adopters), 2) partenariat avec un revendeur local, 3) localisation de ton offre core. Veux-tu que je pressure-teste ce plan via un panel multi-modèles ?",
  },
  {
    num: "02",
    name: "Agent SAV (autonome)",
    metier: "Service après-vente multi-canal",
    description:
      "Répond directement à vos clients en moins d'une minute, 24h/24, dans votre ton, sur tous les canaux : email, WhatsApp, chat. Escalade vers un humain quand c'est nécessaire. La FAQ s'auto-enrichit à mesure que les questions arrivent.",
    capabilities: [
      "Multi-canal (email, WhatsApp, chat)",
      "Base de connaissances métier",
      "Escalade humaine intelligente",
      "FAQ auto-mise à jour",
    ],
    price: "299 € / mois",
    incoming: true,
    user: "De pierre@xxxx.fr (client final) — Bonjour, je n'arrive plus à exporter mes données depuis ce matin. Le bouton « Exporter » donne une page blanche. Pouvez-vous m'aider rapidement ? Pierre, Acme.",
    agent:
      "✓ Répondu à Pierre en 47 secondes : workaround envoyé (utiliser Chrome au lieu de Safari iOS), excuses, ETA fix < 24 h. Ticket ouvert côté tech. Pierre a confirmé que ça fonctionne. **Tu n'as rien à faire.**",
  },
  {
    num: "03",
    name: "Agent Commercial (autonome)",
    metier: "Qualification, devis et appels d'offres",
    description:
      "Qualifie vos leads, prépare vos devis, rédige vos réponses aux appels d'offres en PDF brandé, et relance le pipeline au bon moment. Vous gardez la main sur la signature, il s'occupe de tout le reste.",
    capabilities: [
      "Qualification leads",
      "Devis et relances séquencées",
      "Réponse aux appels d'offres (PDF)",
      "Suivi pipeline et opportunities",
    ],
    price: "299 € / mois",
    user: "On vient de recevoir un appel d'offres de la mairie de Lyon. Tu peux préparer une réponse pour vendredi ?",
    agent:
      "✓ Cahier des charges analysé (12 pages). Réponse en PDF brandé prête : mémoire technique de 8 pages, références clients adaptées, planning détaillé, grille tarifaire. Score d'éligibilité 87 %. Tu veux relire avant que je le mette en signature ?",
  },
  {
    num: "04",
    name: "Agent ADV (autonome)",
    metier: "Administration des ventes",
    description:
      "Saisit vos commandes, émet vos factures, relance les impayés, suit la logistique et gère les litiges. L'arrière-boutique commerciale tourne sans que vous ayez à y penser.",
    capabilities: [
      "Saisie commandes et facturation",
      "Relances impayés (J+1, J+15, J+30)",
      "Suivi logistique et livraisons",
      "Gestion des litiges clients",
    ],
    price: "99 € / mois",
    user: "Où en est-on sur les impayés ?",
    agent:
      "✓ 4 factures en retard +30 j (total 8 720 € HT). Toutes relancées hier. Camille Roux confirme virement vendredi, Marc Lefèvre demande échéancier 3 mois → je te le passe si OK. Les 2 autres : pas de réponse, j'enchaîne J+45 lundi.",
  },
  {
    num: "05",
    name: "Agent Financier",
    metier: "Pilotage financier et trésorerie",
    description:
      "Connecté à votre comptabilité (Pennylane, Sage, Cegid) et à votre banque (Bridge, Powens). Reporting de trésorerie hebdo, P&L mensuel automatique, rapports PDF brandés pour banquier, expert-comptable ou investisseur. Détecte les anomalies financières et chiffre vos scénarios « what-if ».",
    capabilities: [
      "APIs compta + banque",
      "Reporting cash hebdomadaire",
      "P&L mensuel automatique",
      "Rapports PDF brandés (banquier, CAC, investisseur)",
      "Détection d'anomalies",
    ],
    price: "99 € / mois",
    user: "Tu peux me préparer un rapport de trésorerie pour mon banquier vendredi ?",
    agent:
      "✓ Rapport prêt : 14 pages, brandées à ton logo. Position cash actuelle : 87 540 €, runway 6,2 mois. Encours clients +12 % vs mois dernier (vigilance Camille Roux et Marc Lefèvre). DSO à 47 j (objectif 35 j). 2 anomalies détectées : un prélèvement récurrent X-Soft de 890 €/mois apparu en mars dont je n'ai pas trace dans tes contrats, et un encaissement OVH de 2 100 € catégorisé comme « divers ». Je te liste tout ?",
  },
  {
    num: "06",
    name: "Agent Marketing",
    metier: "Réseaux sociaux et newsletters",
    description:
      "Programme vos publications LinkedIn, Instagram, Twitter et Facebook, monitore l'engagement et répond aux commentaires en votre nom. Rédige et envoie vos newsletters via Brevo ou Mailchimp. En version Pro, génère vos images, vidéos et logos et déploie une identité visuelle cohérente sur tous vos supports.",
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
  },
  {
    num: "07",
    name: "Agent Webmaster",
    metier: "Site web, SEO et acquisition payante",
    description:
      "Tout ce qui touche à votre site et à votre acquisition payante. Édition de pages no-code (Framer, Webflow, WordPress), rédaction et publication d'articles SEO, SEO technique, et gestion complète de vos campagnes Google Ads, Meta Ads et LinkedIn Ads (création, optimisation, A/B testing, reporting).",
    capabilities: [
      "Édition site no-code (Framer, Webflow, WordPress)",
      "Rédaction et publication d'articles SEO",
      "SEO technique (schema, sitemaps, performance)",
      "Google Ads, Meta Ads, LinkedIn Ads",
    ],
    price: "299 € / mois",
    user: "Pourquoi mon site n'a pas beaucoup de trafic organique, et est-ce que ma campagne Google Ads est bien calibrée ?",
    agent:
      "✓ Audit complet. **SEO** : 3 problèmes — H1 sans mots-clés recherchés (12 propositions calibrées), meta descriptions absentes sur 8 pages, contenu trop pauvre sur les pages produit. Plus 14 backlinks toxiques à désavouer. **Google Ads** : ton CPA est 2,4× au-dessus du benchmark secteur. 3 mots-clés cannibalisent 67 % du budget pour 12 % des conversions. Je redistribue les enchères et je publie 4 articles SEO cette semaine ?",
  },
] as const;
