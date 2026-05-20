"use client";

/**
 * Section2Variants — 4 propositions visuelles pour la Section 2 du site
 * (« Pourquoi adopter Vtensor »), format problème → solution.
 *
 * Contenu validé avec Victor (2026-05-15) :
 *  - Format problème (« ce que vit le prospect ») → solution (réponse Vtensor)
 *  - 4 paires, mapping sur les angles officiels du positionnement
 *  - Option A : on fusionne « VOUS » et « votre équipe » dans la même carte
 *
 * Les 4 variantes ci-dessous explorent des directions visuelles différentes
 * sur les MÊMES contenus. À utiliser dans /section2-variants pour comparaison.
 */

import { motion } from "motion/react";
import { Sparkles, Clock, Compass, ShieldCheck } from "lucide-react";

// ────────────────────────────────────────────────────────────────────
// Contenu partagé — 4 paires problème/solution
// ────────────────────────────────────────────────────────────────────

const PAIRS = [
  {
    label: "Capacité",
    icon: Sparkles,
    problem:
      "Vous ne pouvez pas vous permettre d'embaucher les profils dont votre business aurait besoin.",
    solution:
      "Vtensor vous donne accès à l'équipe que vous ne pouviez pas vous offrir : commercial, SAV, marketing, ADV. Tous opérationnels, 24/7, pour le coût d'un seul abonnement.",
  },
  {
    label: "Focus",
    icon: Clock,
    problem:
      "Vous ou votre équipe passez un temps non négligeable sur des tâches répétitives qu'une IA pourrait faire.",
    solution:
      "Vtensor reprend les tâches automatisables — relances, qualifications, devis brouillons, mises à jour catalogue. Vous (ou votre équipe) revenez à ce qui crée vraiment de la valeur : parler aux clients et développer votre business.",
  },
  {
    label: "Vitesse IA",
    icon: Compass,
    problem:
      "Vous sentez qu'une révolution IA est en cours, mais vous n'avez pas le temps de devenir expert.",
    solution:
      "Vtensor déploie pour vous des agents à l'état de l'art, mis à jour en permanence à la vitesse à laquelle l'IA évolue. Vous bénéficiez de la techno la plus récente sans jamais avoir à la suivre vous-même.",
  },
  {
    label: "Souveraineté",
    icon: ShieldCheck,
    problem:
      "Vous n'êtes pas serein à l'idée de confier vos données commerciales sensibles à des grands clouds américains.",
    solution:
      "Vtensor est hébergé en France — ou directement sur vos serveurs si vous préférez. Vos données ne quittent jamais l'Europe. RGPD natif, infrastructure souveraine.",
  },
] as const;

type Pair = (typeof PAIRS)[number];

// ────────────────────────────────────────────────────────────────────
// V1 — Miroir 2 colonnes (le prospect lit sa douleur, voit la réponse)
// ────────────────────────────────────────────────────────────────────

function V1Miroir() {
  return (
    <section className="px-6 py-24 md:py-32">
      <Header label="V1 — Miroir 2 colonnes" />
      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-center mb-4">
        Pourquoi adopter Vtensor
      </h2>
      <p className="text-white/60 text-center text-lg mb-16 max-w-2xl mx-auto">
        À gauche, ce que vous vivez. À droite, ce qu'on en fait.
      </p>
      <div className="max-w-6xl mx-auto space-y-px">
        {PAIRS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Côté gauche : la douleur, gris foncé */}
            <div className="bg-[#0F0F12] border border-vt-border p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-widest text-white/40 font-mono mb-3">
                Ce que vous vivez
              </div>
              <p className="text-white/85 text-lg md:text-xl leading-snug font-medium">
                {p.problem}
              </p>
            </div>
            {/* Côté droit : la réponse, accent violet/cyan */}
            <div className="bg-vt-card border border-vt-border border-l-0 md:border-l p-8 md:p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(139,92,246,0.4), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <p.icon size={14} className="text-vt-cyan" />
                  <div className="text-[11px] uppercase tracking-widest text-vt-cyan font-mono">
                    Vtensor — {p.label}
                  </div>
                </div>
                <p className="text-white text-lg md:text-xl leading-snug">
                  {p.solution}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// V2 — Cards verticales (grid 2x2, headline problème, body solution)
// ────────────────────────────────────────────────────────────────────

function V2Cards() {
  return (
    <section className="px-6 py-24 md:py-32 bg-[#070709]">
      <Header label="V2 — Cards verticales (grid 2×2)" />
      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-center mb-4">
        Pourquoi adopter Vtensor
      </h2>
      <p className="text-white/60 text-center text-lg mb-16 max-w-2xl mx-auto">
        Quatre situations que vous reconnaissez. Quatre réponses concrètes.
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAIRS.map((p, i) => (
          <motion.article
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-vt-card border border-vt-border rounded-2xl p-8 md:p-10 hover:border-white/15 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-vt-violet/10 border border-vt-violet/20 flex items-center justify-center">
                <p.icon size={18} className="text-vt-violet" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                {p.label}
              </div>
            </div>
            <h3 className="text-white text-xl md:text-2xl font-semibold leading-snug mb-4">
              {p.problem}
            </h3>
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              {p.solution}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// V3 — Chat bubbles (cohérent avec le pitch produit)
// ────────────────────────────────────────────────────────────────────

function V3Chat() {
  return (
    <section className="px-6 py-24 md:py-32">
      <Header label="V3 — Conversation chat (le prospect parle, Vtensor répond)" />
      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-center mb-4">
        Pourquoi adopter Vtensor
      </h2>
      <p className="text-white/60 text-center text-lg mb-16 max-w-2xl mx-auto">
        Vos préoccupations, nos réponses.
      </p>
      <div className="max-w-3xl mx-auto space-y-8">
        {PAIRS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="space-y-3"
          >
            {/* Bulle "vous" — alignée à droite */}
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-[#1F1F24] border border-white/10 rounded-2xl rounded-tr-sm px-5 py-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">
                  Vous
                </div>
                <p className="text-white/90 text-base md:text-lg leading-snug">
                  {p.problem}
                </p>
              </div>
            </div>
            {/* Bulle "Vtensor" — alignée à gauche */}
            <div className="flex justify-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-vt-violet to-vt-cyan flex items-center justify-center flex-shrink-0 mt-1">
                <p.icon size={16} className="text-white" />
              </div>
              <div className="max-w-[80%] bg-vt-card border border-vt-border rounded-2xl rounded-tl-sm px-5 py-3">
                <div className="text-[10px] uppercase tracking-widest text-vt-cyan font-mono mb-1">
                  Vtensor — {p.label}
                </div>
                <p className="text-white text-base md:text-lg leading-snug">
                  {p.solution}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// V4 — Bento asymétrique (1 carte large + 3 cartes plus petites)
// ────────────────────────────────────────────────────────────────────

function V4Bento() {
  const [first, ...rest] = PAIRS;
  return (
    <section className="px-6 py-24 md:py-32 bg-[#070709]">
      <Header label="V4 — Bento asymétrique" />
      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-center mb-4">
        Pourquoi adopter Vtensor
      </h2>
      <p className="text-white/60 text-center text-lg mb-16 max-w-2xl mx-auto">
        Les quatre choses qui font que ça matche maintenant.
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carte large (problème principal — Capacité) */}
        <BentoCard pair={first} size="large" className="md:col-span-2" />
        {/* 3 cartes plus petites */}
        {rest.map((p) => (
          <BentoCard key={p.label} pair={p} size="small" />
        ))}
      </div>
    </section>
  );
}

function BentoCard({
  pair,
  size,
  className = "",
}: {
  pair: Pair;
  size: "large" | "small";
  className?: string;
}) {
  const isLarge = size === "large";
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`bg-vt-card border border-vt-border rounded-2xl p-8 md:p-10 relative overflow-hidden ${className}`}
    >
      {isLarge && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(139,92,246,0.3), transparent 60%)",
          }}
        />
      )}
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-vt-violet/20 to-vt-cyan/20 border border-vt-border flex items-center justify-center">
            <pair.icon size={16} className="text-vt-cyan" />
          </div>
          <div className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
            {pair.label}
          </div>
        </div>
        <h3
          className={`text-white font-semibold leading-snug mb-3 ${
            isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          }`}
        >
          {pair.problem}
        </h3>
        <p
          className={`text-white/70 leading-relaxed ${
            isLarge ? "text-lg" : "text-sm md:text-base"
          }`}
        >
          {pair.solution}
        </p>
      </div>
    </motion.article>
  );
}

// ────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────

function Header({ label }: { label: string }) {
  return (
    <div className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
      <div className="text-[10px] uppercase tracking-widest text-white/35 font-mono">
        {label}
      </div>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Showcase (wrapper qui empile les 4 variantes)
// ────────────────────────────────────────────────────────────────────

export function Section2VariantsShowcase() {
  return (
    <div className="bg-vt-bg-deep min-h-screen">
      {/* Mini-nav sticky pour jump entre variantes */}
      <div className="sticky top-0 z-50 bg-vt-bg-deep/90 backdrop-blur-md border-b border-vt-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] uppercase tracking-widest text-white/40 font-mono mr-2">
            Variantes :
          </span>
          {["V1 Miroir", "V2 Cards", "V3 Chat", "V4 Bento"].map((label, i) => (
            <a
              key={label}
              href={`#v${i + 1}`}
              className="text-xs px-3 py-1.5 rounded-full bg-vt-card border border-vt-border text-white/70 hover:text-white hover:border-white/20 transition-colors whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div id="v1">
        <V1Miroir />
      </div>
      <div id="v2">
        <V2Cards />
      </div>
      <div id="v3">
        <V3Chat />
      </div>
      <div id="v4">
        <V4Bento />
      </div>
    </div>
  );
}
