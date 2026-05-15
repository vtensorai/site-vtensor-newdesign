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
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div
            className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE]/80 mb-3"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // notre solution
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05] mb-4">
            Des agents IA{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              pensés pour votre business
            </span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            Conçus par notre équipe, mis à jour en permanence, intégrés à vos outils existants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-vt-card border border-vt-border rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-vt-violet/10 border border-vt-violet/20 flex items-center justify-center mb-4">
                <f.icon size={18} className="text-vt-violet" />
              </div>
              <h3 className="font-display font-semibold text-white text-base md:text-lg leading-snug mb-2">
                {f.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
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
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div
            className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE]/80 mb-3"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // nos offres
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
            Choisissez votre formule
          </h3>
          <p className="text-white/45 text-sm">
            Tarifs hors taxes — B2B France.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((t) => (
            <PricingCard key={t.id} tier={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  const featured = tier.featured;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl p-8 md:p-10 flex flex-col overflow-hidden ${
        featured
          ? "border-2 border-vt-cyan/40 bg-gradient-to-b from-vt-violet/[0.08] to-vt-card lg:scale-[1.04] lg:-my-2"
          : "border border-vt-border bg-vt-card"
      }`}
    >
      {featured && tier.badge && (
        <div className="absolute -top-px left-0 right-0 mx-auto w-fit px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-vt-violet to-vt-cyan text-xs font-semibold uppercase tracking-wider text-white">
          {tier.badge}
        </div>
      )}
      <header className="mt-3">
        <h4 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
          {tier.name}
        </h4>
        <p className="text-white/55 text-sm leading-relaxed min-h-[60px]">
          {tier.tagline}
        </p>
      </header>

      <div className="my-6 pb-6 border-b border-white/[0.06]">
        <PriceBlock tier={tier} />
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/75">
            <Check
              size={16}
              className={`mt-0.5 flex-shrink-0 ${
                featured ? "text-vt-cyan" : "text-vt-violet"
              }`}
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
          <div className="mt-2 inline-flex px-2.5 py-1 rounded-md bg-vt-cyan/15 border border-vt-cyan/30 text-vt-cyan text-xs font-semibold">
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
      className={`w-full px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
        featured
          ? "bg-gradient-to-r from-vt-violet to-vt-cyan text-white hover:opacity-90"
          : "bg-white/[0.04] border border-vt-border text-white hover:bg-white/[0.07] hover:border-white/15"
      }`}
    >
      {tier.cta}
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
