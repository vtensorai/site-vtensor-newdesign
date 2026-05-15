"use client";

/**
 * SolutionPricingVariants — Section "Notre solution + Pricing" entre la
 * Section 2 (HiddenCostB) et la Section 3 (catalogue agents SolutionV3Tabs).
 *
 * Structure :
 *  - SolutionHeader : 4 features de la solution Vtensor (top)
 *  - PricingSection : 3 offres (Pro / Founder / Sur-mesure) (bas)
 *
 * Convention B2B France : tous les prix HT. Hiérarchie visuelle = abonnement
 * en haut (le récurrent c'est ce qui compte), frais d'intégration en dessous.
 */

import { motion } from "motion/react";
import {
  Sparkles,
  Puzzle,
  ShieldCheck,
  Users,
  Check,
  type LucideIcon,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────────
// Features — 4 piliers de la solution Vtensor
// ────────────────────────────────────────────────────────────────────

type Feature = { icon: LucideIcon; title: string; desc: string };

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "Le meilleur de l'IA",
    desc: "Une équipe d'agents développée par nos soins, propulsée par les modèles d'IA les plus performants — et qui évolue au rythme du marché, génération après génération.",
  },
  {
    icon: Puzzle,
    title: "Intégration sur-mesure",
    desc: "Branchés directement sur vos outils — compatibles avec la quasi-totalité des ERP et systèmes de gestion.",
  },
  {
    icon: ShieldCheck,
    title: "Vos données sous haute protection",
    desc: "Chiffrement, hébergement souverain, isolation stricte par client : les informations de vos clients sont protégées au plus haut niveau du marché.",
  },
  {
    icon: Users,
    title: "Une équipe à la carte",
    desc: "Composez votre équipe IA selon vos besoins — du Directeur Exécutif au Standardiste, choisissez les postes qui vous manquent.",
  },
];

// ────────────────────────────────────────────────────────────────────
// Pricing data — 3 tiers, B2B France HT
// ────────────────────────────────────────────────────────────────────

type Tier = {
  id: "pro" | "founder" | "sur-mesure";
  badge?: string;
  name: string;
  tagline: string;
  /** Affichage principal de l'abonnement (gros chiffre) */
  recurringValue: string;
  /** Suffixe sous/à côté du gros chiffre (ex: "/ mois", null si pas applicable) */
  recurringUnit?: string;
  /** Affichage des frais d'intégration (secondaire) */
  setupValue: string;
  /** Prix initial barré pour Founder */
  setupCrossed?: string;
  /** Badge promo (ex: "−50 % + 1er mois offert") */
  pricePromo?: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "pro",
    name: "Pro",
    tagline:
      "Pour les artisans, professions libérales et entrepreneurs solos qui veulent une équipe IA opérationnelle, sans complexité.",
    recurringValue: "500 € HT",
    recurringUnit: "/ mois",
    setupValue: "2 000 € HT",
    features: [
      "Un agent tout-en-un qui pilote ADV, accueil téléphonique et relances commerciales",
      "Profilé sur les codes et les usages de votre métier",
      "Toutes les fonctions essentielles incluses, sans option à activer",
      "Opérationnel en quelques jours — pas en quelques mois",
    ],
    cta: "Vérifier votre éligibilité",
  },
  {
    id: "founder",
    featured: true,
    badge: "10 entreprises — accès anticipé",
    name: "Founder",
    tagline:
      "L'offre standard adaptée pour les PME — à tarif lancement, réservée aux 10 premières entreprises qui nous rejoignent.",
    recurringValue: "Selon les agents",
    recurringUnit: "choisis",
    setupValue: "2 500 € HT",
    setupCrossed: "5 000 € HT",
    pricePromo: "−50 % + 1er mois offert",
    features: [
      "Composition libre de votre équipe IA dans tout le catalogue",
      "Onboarding prioritaire mené par notre équipe technique",
      "Statut beta-tester : votre voix pèse sur la roadmap produit",
      "Tarif verrouillé à vie sur les frais d'intégration",
    ],
    cta: "Rejoindre les 10 premiers",
  },
  {
    id: "sur-mesure",
    name: "Sur-mesure",
    tagline:
      "Pour les besoins spécifiques et les organisations sensibles qui exigent un environnement taillé pour elles.",
    recurringValue: "Devis",
    recurringUnit: "personnalisé",
    setupValue: "Sur demande",
    features: [
      "Hébergement chez vous ou dans le pays de votre choix",
      "Agents métiers conçus et entraînés pour votre activité",
      "Applications dédiées, taillées sur vos workflows",
      "Intégration ERP sur-mesure et conseil sécurité dédié",
    ],
    cta: "Demander un devis",
  },
];

// ────────────────────────────────────────────────────────────────────
// Header
// ────────────────────────────────────────────────────────────────────

export function SolutionFeaturesSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-2 md:pb-4">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        {/* Header : look dashboard */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // notre solution
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            Des agents IA{" "}
            <span className="text-[#22D3EE]">pensés pour votre business</span>
          </h2>
          <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto">
            Conçus par notre équipe, mis à jour en permanence, intégrés à vos outils existants.
          </p>
        </div>

        {/* 4 piliers — grille bordée fine style dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8">
          {FEATURES.map((f, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative bg-vt-bg-deep p-6 group hover:bg-white/[0.02] transition-colors"
              >
                {/* Label mono `// pillier_NN` */}
                <div
                  className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-4"
                  style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                >
                  // pillier_{idx}
                </div>
                {/* Icon cyan flat */}
                <div
                  className="inline-flex items-center justify-center w-9 h-9 mb-5"
                  style={{
                    border: "1px solid rgba(34,211,238,0.3)",
                    background: "rgba(34,211,238,0.06)",
                  }}
                >
                  <f.icon size={16} className="text-[#22D3EE]" />
                </div>
                <h3 className="font-display font-semibold text-white text-[15px] md:text-base leading-snug mb-2.5">
                  {f.title}
                </h3>
                <p className="text-white/55 text-[13px] leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// Pricing — 3 cards alignées, Founder centrée et mise en valeur
// ────────────────────────────────────────────────────────────────────

export function PricingSection() {
  return (
    <section className="relative py-24 md:py-32" id="tarifs">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <div
            className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // nos offres
          </div>
          <h3
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-3"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            Choisissez votre formule
          </h3>
          <p
            className="text-white/45 text-[12px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // tarifs hors taxes · b2b france
          </p>
        </div>
        {/* Grille bordée fine type dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
          {TIERS.map((t, i) => (
            <PricingCard key={t.id} tier={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, index }: { tier: Tier; index: number }) {
  const featured = tier.featured;
  const idx = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={[
        "relative p-8 md:p-9 flex flex-col",
        featured ? "bg-[#0E0E13]" : "bg-vt-bg-deep",
      ].join(" ")}
    >
      {/* Top accent line on featured tier — signature dashboard */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-vt-violet to-vt-cyan" />
      )}

      {/* Header : label mono + badge */}
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="text-[10px] uppercase tracking-[0.22em] text-white/40"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // offre_{idx} · {tier.id.replace("-", "_")}
          </div>
          {featured && tier.badge && (
            <span
              className="px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] font-semibold border inline-flex items-center gap-1.5"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
                color: "#22D3EE",
                borderColor: "rgba(34,211,238,0.4)",
                background: "rgba(34,211,238,0.08)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
              accès anticipé
            </span>
          )}
        </div>
        <h4
          className="font-display font-bold text-white leading-tight mb-2"
          style={{ fontSize: "clamp(24px, 2.4vw, 30px)", letterSpacing: "-0.015em" }}
        >
          {tier.name}
        </h4>
        <p className="text-white/55 text-[13px] leading-relaxed min-h-[60px]">
          {tier.tagline}
        </p>
      </header>

      {/* Prix */}
      <div className="mb-7 pb-6 border-b border-white/8">
        <PriceBlock tier={tier} />
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-7">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/75 leading-relaxed">
            <Check
              size={14}
              strokeWidth={2.5}
              className="mt-1 flex-shrink-0 text-[#22D3EE]"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CTAButton tier={tier} />
    </motion.article>
  );
}

// ────────────────────────────────────────────────────────────────────
// PriceBlock — abonnement en gros, frais d'intégration en dessous
// ────────────────────────────────────────────────────────────────────

function PriceBlock({ tier }: { tier: Tier }) {
  return (
    <div>
      {/* ABONNEMENT — gros chiffre prominent */}
      <div className="mb-5">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-2"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
        >
          Abonnement
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-display font-bold text-white text-3xl md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {tier.recurringValue}
          </span>
          {tier.recurringUnit && (
            <span className="text-white/55 text-base">{tier.recurringUnit}</span>
          )}
        </div>
      </div>

      {/* FRAIS D'INTÉGRATION — secondaire */}
      <div className="pt-1">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-1.5"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
        >
          Frais d&apos;intégration
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-white/85 font-semibold text-lg">
            {tier.setupValue}
          </span>
          {tier.setupCrossed && (
            <span className="text-white/30 line-through text-sm">
              {tier.setupCrossed}
            </span>
          )}
        </div>
        {tier.pricePromo && (
          <div
            className="mt-3 inline-flex px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
              color: "#22D3EE",
              border: "1px solid rgba(34,211,238,0.4)",
              background: "rgba(34,211,238,0.08)",
            }}
          >
            {tier.pricePromo}
          </div>
        )}
      </div>
    </div>
  );
}

function CTAButton({ tier }: { tier: Tier }) {
  const featured = tier.featured;
  return (
    <button
      type="button"
      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors group/cta"
      style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
        color: featured ? "#FFFFFF" : "rgba(255,255,255,0.9)",
        background: featured
          ? "linear-gradient(135deg, #8B5CF6, #22D3EE)"
          : "rgba(255,255,255,0.04)",
        border: featured ? "none" : "1px solid rgba(255,255,255,0.18)",
        boxShadow: featured ? "0 0 24px -8px rgba(34,211,238,0.4)" : "none",
      }}
    >
      {tier.cta}
      <span className="transition-transform group-hover/cta:translate-x-0.5">→</span>
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────
// Showcase wrapper — flow complet Features → Catalogue → Pricing
// ────────────────────────────────────────────────────────────────────

import { SolutionV3Tabs } from "./SolutionV3Tabs";

export function SolutionPricingShowcase() {
  return (
    <div className="relative min-h-screen">
      <SolutionFeaturesSection />
      <SolutionV3Tabs compactTop />
      <PricingSection />
    </div>
  );
}
