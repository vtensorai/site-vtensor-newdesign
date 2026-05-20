"use client";

/**
 * Section2WheelPreview — Réutilise la "roue" scroll-linked de HiddenCostB
 * avec un nouveau contenu : 4 paires problème/solution.
 *
 * On garde tout le mécanisme déjà éprouvé :
 *  - section parente N×100vh (ici 250vh pour 4 chips au lieu de 5)
 *  - sticky inner viewport en 100vh
 *  - `useHiddenCostScroll` pour la progression
 *  - `FloatingPill` (label cyan en haut, title display, description body)
 *
 * Changements vs HiddenCostB :
 *  - 4 chips au lieu de 5
 *  - Positions cardinales (top / right / bottom / left) → effet "spokes" de
 *    roue plus pur avec 4 items
 *  - Pas de compteur d'heures/€ au centre (le pitch « problème/solution »
 *    ne nécessite pas de quantification). Au centre : titre de section +
 *    sous-titre court.
 *  - Title du chip = la douleur (voix du prospect), desc = la réponse Vtensor.
 */

import { useReducedMotion, motion, useTransform } from "motion/react";
import {
  FloatingPill,
  useHiddenCostScroll,
  HEADER_FADE_IN,
  HEADER_FADE_OUT,
  TITLE_FADE_IN,
  TITLE_FADE_OUT,
  type Pain,
} from "./HiddenCostBase";

// Type structurel local (le Pain exporté par HiddenCostBase est literal-typed
// sur les valeurs de PAINS, inutilisable hors de ce dataset précis).
type Pair = {
  num: string;
  label: string;
  title: string;
  desc: string;
  pos: { x: number; y: number };
};

// Hauteur de section réduite pour 4 chips au lieu de 5
// (CHIPS_START 0.18 + 4 × CHIPS_GAP 0.10 + CHIPS_WINDOW 0.12 = ~0.70 ;
// reste 30 % de scroll pour la sortie).
const SECTION_HEIGHT_VH = 250;

// 4 paires problème/solution typées comme Pain (shape attendu par FloatingPill).
// title = la douleur ressentie (voix du prospect). desc = la réponse Vtensor.
// pos = cardinal autour du centre (4 spokes : top, right, bottom, left).
const PAIRS: Pair[] = [
  {
    num: "01",
    label: "Capacité",
    title: "Vous ne pouvez pas vous permettre d'embaucher les profils dont votre business aurait besoin.",
    desc: "Vtensor vous donne accès à l'équipe que vous ne pouviez pas vous offrir : commercial, SAV, marketing, ADV. Tous opérationnels, 24/7, pour le coût d'un seul abonnement.",
    pos: { x: 0, y: -30 },
  },
  {
    num: "02",
    label: "Focus",
    title: "Vous ou votre équipe passez un temps non négligeable sur des tâches répétitives qu'une IA pourrait faire.",
    desc: "Vtensor reprend les tâches automatisables — relances, qualifications, devis brouillons, mises à jour catalogue. Vous (ou votre équipe) revenez à ce qui crée vraiment de la valeur : parler aux clients et développer votre business.",
    pos: { x: 34, y: 0 },
  },
  {
    num: "03",
    label: "Vitesse IA",
    title: "Vous sentez qu'une révolution IA est en cours, mais vous n'avez pas le temps de devenir expert.",
    desc: "Vtensor déploie pour vous des agents à l'état de l'art, mis à jour en permanence à la vitesse à laquelle l'IA évolue. Vous bénéficiez de la techno la plus récente sans jamais avoir à la suivre vous-même.",
    pos: { x: 0, y: 30 },
  },
  {
    num: "04",
    label: "Souveraineté",
    title: "Vous n'êtes pas serein à l'idée de confier vos données commerciales sensibles à des grands clouds américains.",
    desc: "Vtensor est hébergé en France — ou directement sur vos serveurs si vous préférez. Vos données ne quittent jamais l'Europe. RGPD natif, infrastructure souveraine.",
    pos: { x: -34, y: 0 },
  },
] as const;

// Origines (fromX, fromY) pour l'animation d'entrée : la chip arrive depuis
// l'extérieur de la roue. On extrapole vers l'extérieur de sa position finale.
function originFor(p: Pair): { fromX: number; fromY: number } {
  // Multiplie la position finale par un facteur > 1 → la chip vient de plus loin
  // dans la même direction que sa position cible.
  const k = 0.6;
  return { fromX: p.pos.x * k * 16, fromY: p.pos.y * k * 16 };
}

export function Section2WheelPreview() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <StaticFallback />;
  }

  return (
    <>
      <div className="md:hidden">
        <StaticFallback />
      </div>
      <div className="hidden md:block">
        <WheelDesktop />
      </div>
    </>
  );
}

function WheelDesktop() {
  const { sectionRef, scrollYProgress } = useHiddenCostScroll(false);

  const headerOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [TITLE_FADE_IN[0], TITLE_FADE_IN[1], TITLE_FADE_OUT[0], TITLE_FADE_OUT[1]],
    [0, 1, 1, 0.4],
    { clamp: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-vt-bg-deep text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fond — cercles concentriques discrets (effet "wheel") */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <CircleRings />
        </div>

        {/* Header haut : label section */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-8 left-0 right-0 flex justify-center"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono">
            // pourquoi adopter Vtensor
          </div>
        </motion.div>

        {/* Centre : titre */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05] max-w-3xl mb-5">
            Quatre raisons{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              de basculer maintenant
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl">
            Quatre situations que vous reconnaissez. Quatre réponses concrètes.
          </p>
        </motion.div>

        {/* 4 chips floating autour du centre */}
        {PAIRS.map((p, i) => {
          const o = originFor(p);
          return (
            <FloatingPill
              key={p.num}
              pain={p as unknown as Pain}
              progress={scrollYProgress}
              index={i}
              fromX={o.fromX}
              fromY={o.fromY}
            />
          );
        })}
      </div>
    </section>
  );
}

/** Cercles concentriques discrets en arrière-plan (effet "roue"). */
function CircleRings() {
  return (
    <div className="relative w-[800px] h-[800px] max-w-[90vw] max-h-[90vh] opacity-40">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-white/[0.06]"
          style={{
            transform: `scale(${i * 0.25})`,
          }}
        />
      ))}
      {/* Petit point lumineux au centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-vt-cyan/40 shadow-[0_0_24px_4px_rgba(34,211,238,0.4)]" />
      </div>
    </div>
  );
}

/** Fallback static (mobile + reduced-motion). */
function StaticFallback() {
  return (
    <section className="relative bg-vt-bg-deep text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono text-center mb-3">
          // pourquoi adopter Vtensor
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white text-center leading-tight mb-12">
          Quatre raisons{" "}
          <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
            de basculer maintenant
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAIRS.map((p) => (
            <div
              key={p.num}
              className="bg-vt-card border border-vt-border rounded-3xl p-7"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-vt-cyan font-semibold mb-3">
                {p.label}
              </div>
              <h3 className="font-display font-bold text-white text-lg leading-snug mb-3">
                {p.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
