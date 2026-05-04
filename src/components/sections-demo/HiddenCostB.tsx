"use client";

/**
 * HiddenCostB — Sanjaya + compteur Vtensor (scroll-linked strict).
 *
 * Reprend l'architecture Sanjaya (sticky + cercles + chips) et ajoute un
 * compteur en haut qui suit le scroll en temps réel :
 *   "0 → 520h/an perdues" + "0 → 26 000 € gaspillés".
 *
 * Tout est dérivé de `scrollYProgress` via `useTransform({ clamp: true })`
 * — donc remonter le scroll fait redescendre le compteur et disparaître
 * les chips dans l'ordre inverse.
 *
 * Props :
 *  - withGrid?: boolean → ajoute un fond AnimatedGridBackground (dots qui
 *    suivent la souris) en arrière-plan, derrière les cercles.
 */

import { useReducedMotion, motion, useTransform } from "motion/react";
import {
  PAINS,
  Counter,
  FloatingPill,
  StaticFallback,
  CenterTitle,
  useHiddenCostScroll,
  SECTION_HEIGHT_VH,
  HEADER_FADE_IN,
  HEADER_FADE_OUT,
  TITLE_FADE_IN,
  TITLE_FADE_OUT,
} from "./HiddenCostBase";
import { HiddenCostMobile } from "./HiddenCostMobile";

export function HiddenCostB({ withGrid = false }: { withGrid?: boolean } = {}) {
  const reduce = useReducedMotion();

  if (reduce) return <StaticFallback />;

  return (
    <>
      {/* Mobile (≤ md) — stack vertical, pas de chips flottantes ni cercles */}
      <div className="md:hidden">
        <HiddenCostMobile />
      </div>
      {/* Desktop (≥ md) — version Sanjaya complète */}
      <div className="hidden md:block">
        <HiddenCostBDesktop withGrid={withGrid} />
      </div>
    </>
  );
}

function HiddenCostBDesktop({ withGrid = false }: { withGrid?: boolean } = {}) {
  const { sectionRef, scrollYProgress, hours, euros } = useHiddenCostScroll(false);

  // Cercles : pulse léger sur la traversée
  const ringScale = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    [0.85, 1.05, 0.95],
    { clamp: true },
  );
  const ringOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 1, 1, 0.6],
    { clamp: true },
  );

  // Compteur top
  const headerOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );

  // Titre central
  const titleOpacity = useTransform(
    scrollYProgress,
    [TITLE_FADE_IN[0], TITLE_FADE_IN[1], TITLE_FADE_OUT[0], TITLE_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Le coût caché du travail manuel"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* V0.18.0 : grid+glow body suffisent (signature dev/tech). withGrid kept for backwards compat */}

        {/* Sticky counter top */}
        <motion.div
          className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-3 md:gap-5"
          style={{ opacity: headerOpacity }}
        >
          <Counter
            value={`+${hours} h`}
            label="libérées / an"
            accent="#22D3EE"
          />
          <Counter
            value={`+${euros.toLocaleString("fr-FR")} €`}
            label="économisés / an"
            accent="#8B5CF6"
          />
        </motion.div>

        {/* Concentric circles — light shadow uniquement sur le 1er cercle pour réduire le paint */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]"
          style={{
            scale: ringScale,
            opacity: ringOpacity,
            willChange: "transform, opacity",
          }}
          aria-hidden
        >
          {[180, 320, 480, 660].map((size, i) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(34, 211, 238, ${0.22 - i * 0.04})`,
              }}
            />
          ))}
          {/* Halo central léger en absolute, ne se repaint pas pendant le scroll */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 180,
              height: 180,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Central title */}
        <CenterTitle opacity={titleOpacity} />

        {/* Pills — scroll-linked strict */}
        {PAINS.map((p, i) => {
          const fromX = i % 2 === 0 ? -32 : 32;
          const fromY = i === 4 ? -20 : i < 2 ? -14 : 14;
          return (
            <FloatingPill
              key={p.title}
              pain={p}
              progress={scrollYProgress}
              index={i}
              fromX={fromX}
              fromY={fromY}
            />
          );
        })}
      </div>
    </section>
  );
}
