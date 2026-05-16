"use client";

/**
 * FaqSection — Section Foire Aux Questions, format accordéon.
 *
 * Style dashboard : labels mono cyan `// q_NN`, borders fines white/8,
 * chevron qui pivote au open.
 *
 * Ordre 2026-05-16 (validé Victor) : commence par "différenciation ChatGPT"
 * (le premier point de doute), puis intégration / délai / modifications /
 * évolution / engagement / erreurs, puis termine par sécurité / training /
 * peur de l'équipe.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

export type Faq = { question: string; answer: string; category?: FaqCategory };

export type FaqCategory = "differentiation" | "integration" | "evolution" | "securite" | "engagement" | "equipe";

export const FAQ_CATEGORIES: Record<FaqCategory, string> = {
  differentiation: "Différenciation",
  integration: "Intégration",
  evolution: "Évolution",
  securite: "Sécurité",
  engagement: "Engagement",
  equipe: "Équipe",
};

export const FAQS: Faq[] = [
  {
    question: "En quoi c'est différent de ChatGPT ou d'un chatbot classique ?",
    answer:
      "Vos agents Vtensor connaissent votre business sur le bout des doigts : mémoire persistante, contexte entreprise, accès à vos outils existants (ERP, CRM, messagerie). Ils exécutent des tâches concrètes — envoyer un email, créer un devis dans votre ERP, lancer une campagne — pas juste répondre à une question. Et ils travaillent en équipe coordonnée par le Directeur Exécutif, qui dispatche chaque demande au bon poste.",
    category: "differentiation",
  },
  {
    question: "Comment se passe l'intégration ?",
    answer:
      "On commence par un audit gratuit de 30 minutes pour cartographier vos outils et vos chronophages. Ensuite, notre équipe technique configure vos agents, les connecte à vos systèmes (Odoo, HubSpot, Pennylane, votre messagerie…) et les forme sur vos documents et vos process. Vous validez chaque agent en live avant la mise en production. Aucune ligne de code à écrire de votre côté.",
    category: "integration",
  },
  {
    question: "Combien de temps avant que mes agents soient opérationnels ?",
    answer:
      "Quelques jours pour un agent autonome simple (SAV ou ADV). 1 à 2 semaines pour une équipe complète avec intégrations métiers. Les Founders bénéficient d'un onboarding prioritaire mené directement par notre équipe technique.",
    category: "integration",
  },
  {
    question: "Est-il possible d'apporter des modifications à mes agents ?",
    answer:
      "Oui — c'est précisément l'intérêt d'un abonnement. Votre business évolue, vos agents évoluent avec. Nouveaux process, nouveaux outils à intégrer, nouveau ton de réponse, nouvelles règles métiers : on s'adapte en continu. Vous demandez, nous implémentons. Pas de surcoût, pas de nouveau contrat à signer.",
    category: "evolution",
  },
  {
    question: "Mes agents s'améliorent-ils avec le temps ?",
    answer:
      "Oui. Mémoire persistante (ils retiennent tout le contexte de votre business au fil des interactions), base de connaissances qui s'auto-enrichit, et déploiement régulier des dernières générations de modèles d'IA sans coût additionnel. Vos agents sont toujours à la pointe.",
    category: "evolution",
  },
  {
    question: "Suis-je engagé sur une durée ?",
    answer:
      "Non. Abonnement mensuel, sans engagement, résiliation possible à tout moment avec un préavis de 30 jours. Nous voulons que vous restiez parce que ça marche, pas parce que vous êtes coincé.",
    category: "engagement",
  },
  {
    question: "Que se passe-t-il si un agent fait une erreur ?",
    answer:
      "Les actions sensibles (envoi d'email client, création de facture, publication) sortent toujours en draft à valider — vous gardez la main sur la signature. Les agents savent escalader vers vous quand une situation sort de leur scope. Chaque action est tracée dans un audit log complet pour que vous puissiez revenir en arrière à tout moment.",
    category: "engagement",
  },
  {
    question: "Mes données sont-elles vraiment en sécurité ?",
    answer:
      "Hébergement sur des datacenters allemands certifiés ISO 27001, chiffrement bout-en-bout, isolation stricte par client (vos données ne croisent jamais celles d'un autre tenant), et option d'hébergement local sur vos propres serveurs pour les organisations qui exigent un contrôle total.",
    category: "securite",
  },
  {
    question: "Qui est éligible à l'offre Pro ?",
    answer:
      "L'offre Pro est conçue pour les structures à dirigeant unique qui veulent un agent IA tout-en-un, sans complexité de configuration. Sont éligibles :\n\n— Les indépendants en professions libérales réglementées : avocats, médecins, kinés, architectes, experts-comptables, notaires, psychologues, ostéopathes, dentistes, vétérinaires…\n— Les artisans : plombiers, électriciens, menuisiers, peintres, paysagistes, carreleurs…\n— Les entrepreneurs solos et freelances : consultants, coachs, designers, développeurs…\n\nSi vous êtes plusieurs ou si votre activité demande des agents spécialisés (commercial dédié, ADV avec reporting financier, marketing avancé, etc.), l'offre Founder ou Sur-mesure sera plus adaptée.",
    category: "engagement",
  },
  {
    question: "Mon équipe va-t-elle craindre d'être remplacée ?",
    answer:
      "Vtensor augmente votre équipe, il ne la remplace pas. Vos agents IA prennent les tâches répétitives et chronophages — saisie, relances, premières réponses — pour que vos humains se concentrent sur ce qu'ils font de mieux : la relation client, la stratégie, le jugement nuancé. C'est l'équipe que vous ne pouviez pas vous offrir, pas une menace pour celle que vous avez déjà.",
    category: "equipe",
  },
];

const monoStyle = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative py-20 md:py-28" id="faq">
      <div className="max-w-[860px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
            style={monoStyle}
          >
            // foire aux questions
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-3"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            Vos questions,{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              nos réponses
            </span>
          </h2>
          <p className="text-white/55 text-base md:text-lg">
            Les 10 questions que les dirigeants nous posent le plus souvent.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <FaqItem
                key={i}
                idx={idx}
                faq={faq}
                isOpen={isOpen}
                onToggle={() => setOpenIdx(isOpen ? null : i)}
              />
            );
          })}
        </div>

        {/* Footer CTA discret */}
        <div className="mt-10 text-center">
          <p className="text-white/45 text-sm">
            Une autre question ?{" "}
            <a
              href="https://cal.com/vtensor/audi-30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22D3EE] hover:text-white transition-colors"
              style={monoStyle}
            >
              audit gratuit · 30 min →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  idx,
  faq,
  isOpen,
  onToggle,
}: {
  idx: string;
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b transition-colors"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-4 py-5 text-left group cursor-pointer"
      >
        <span
          className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mt-1.5 flex-shrink-0"
          style={monoStyle}
        >
          q_{idx}
        </span>
        <h3 className="flex-1 font-display font-semibold text-white text-base md:text-lg leading-snug group-hover:text-[#22D3EE] transition-colors">
          {faq.question}
        </h3>
        <span
          className="flex-shrink-0 w-7 h-7 inline-flex items-center justify-center border border-white/15 mt-0.5 group-hover:border-[#22D3EE]/40 transition-colors"
        >
          {isOpen ? (
            <Minus size={14} className="text-[#22D3EE]" />
          ) : (
            <Plus size={14} className="text-white/75 group-hover:text-[#22D3EE] transition-colors" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pl-[60px] pr-11 pb-6">
              <p className="text-white/70 text-[15px] leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
