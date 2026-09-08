/**
 * FAQ — 10 questions, ordre validé le 2026-05-16 (différenciation d'abord,
 * puis intégration / délai / évolution / engagement / erreurs, puis sécurité,
 * tarification, équipe). Contenu aligné sur l'offre 2026-09 (plus d'agent
 * maître, 100 € HT par agent et par mois, 1 000 € HT par an).
 */

export type Faq = { question: string; answer: string };

export const FAQS: readonly Faq[] = [
  {
    question: "En quoi c'est différent de ChatGPT ou d'un chatbot classique ?",
    answer:
      "Vos agents Vtensor connaissent votre entreprise : mémoire persistante, contexte métier, accès à vos outils (ERP, CRM, messagerie). Ils exécutent des tâches concrètes, envoyer un email, créer un devis dans votre ERP, lancer une campagne, et pas seulement répondre à une question. Et vous vous adressez directement à l'agent concerné, par email ou depuis l'application.",
  },
  {
    question: "Comment se passe l'intégration ?",
    answer:
      "On commence par un audit gratuit de 30 minutes pour cartographier vos outils et vos chronophages. Ensuite, notre équipe technique configure vos agents, les connecte à vos systèmes (ERP, messagerie, site web, téléphonie…) et les forme sur vos documents et vos process. Vous validez chaque agent en conditions réelles avant la mise en production. Aucune ligne de code à écrire de votre côté.",
  },
  {
    question: "Combien de temps avant que mes agents soient opérationnels ?",
    answer:
      "Quelques jours pour un agent autonome simple (SAV ou administratif). Une à deux semaines pour une équipe complète avec intégrations métier.",
  },
  {
    question: "Est-il possible d'apporter des modifications à mes agents ?",
    answer:
      "Oui, c'est précisément l'intérêt d'un abonnement. Votre entreprise évolue, vos agents évoluent avec elle : nouveaux process, nouveaux outils à intégrer, nouveau ton de réponse, nouvelles règles métier. Vous demandez, nous implémentons. Pas de surcoût, pas de nouveau contrat à signer.",
  },
  {
    question: "Mes agents s'améliorent-ils avec le temps ?",
    answer:
      "Oui. Mémoire persistante (ils retiennent le contexte de votre entreprise au fil des échanges), base de connaissances qui s'enrichit, et déploiement régulier des dernières générations de modèles d'IA sans coût additionnel.",
  },
  {
    question: "Suis-je engagé sur une durée ?",
    answer:
      "En mensuel, non : sans engagement, résiliation possible à tout moment avec un préavis de 30 jours. En annuel, l'abonnement est réglé d'avance pour 12 mois, avec 2 mois offerts. Nous voulons que vous restiez parce que ça marche, pas parce que vous êtes coincé.",
  },
  {
    question: "Que se passe-t-il si un agent fait une erreur ?",
    answer:
      "Les actions sensibles (envoi d'un email client, création d'une facture, publication) sortent toujours en brouillon à valider : vous gardez la main sur la signature. Les agents savent vous passer la main quand une situation sort de leur périmètre. Chaque action est journalisée, pour pouvoir revenir en arrière à tout moment.",
  },
  {
    question: "Mes données sont-elles vraiment en sécurité ?",
    answer:
      "Hébergement sur des datacenters allemands certifiés ISO 27001, chiffrement, isolation stricte par client (vos données ne croisent jamais celles d'un autre), et option d'hébergement sur vos propres serveurs pour les organisations qui exigent un contrôle total.",
  },
  {
    question: "Comment fonctionne la tarification ?",
    answer:
      "Un prix par agent, sans palier caché : 100 € HT par agent et par mois, ou 1 000 € HT par agent et par an si vous réglez à l'année (2 mois offerts). Vous composez votre équipe librement, avec des postes du catalogue ou des postes créés pour vous. S'y ajoutent des frais d'intégration uniques, à partir de 1 000 € HT, qui dépendent des outils à connecter et des process à modéliser ; le montant exact est fixé sur devis après l'audit gratuit. Les besoins spécifiques (hébergement chez vous, applications dédiées, intégration ERP lourde) relèvent de l'offre Sur-mesure.",
  },
  {
    question: "Mon équipe va-t-elle craindre d'être remplacée ?",
    answer:
      "Vtensor augmente votre équipe, il ne la remplace pas. Vos agents prennent les tâches répétitives et chronophages, saisie, relances, premières réponses, pour que vos collaborateurs se concentrent sur ce qu'ils font de mieux : la relation client, la stratégie, le jugement. C'est l'équipe que vous ne pouviez pas vous offrir, pas une menace pour celle que vous avez déjà.",
  },
];
