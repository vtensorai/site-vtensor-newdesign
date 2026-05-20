"use client";

/**
 * HiddenCostCenterV1 — Cercles pulsants synchronisés (scroll-linked).
 *
 * Garde les cercles concentriques mais plus subtils. Chaque chip qui apparaît
 * au scroll déclenche une "onde" concentrique qui pulse depuis le centre vers
 * l'extérieur. Les ondes peuvent re-jouer si l'utilisateur remonte puis
 * redescend (FloatingPill émet onAppear / onDisappear avec hystérésis).
 */

import { useState, useCallback } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
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

const RING_COLORS = ["#22D3EE", "#8B5CF6", "#22D3EE", "#8B5CF6", "#22D3EE"];

type Wave = { id: number; color: string };

export function HiddenCostCenterV1() {
  const reduce = useReducedMotion();
  const { sectionRef, scrollYProgress, hours, euros } = useHiddenCostScroll(
    !!reduce,
  );

  const [waves, setWaves] = useState<Wave[]>([]);

  const ringScale = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    [0.85, 1.05, 0.95],
    { clamp: true },
  );
  const ringOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 0.6, 0.6, 0.35],
    { clamp: true },
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [TITLE_FADE_IN[0], TITLE_FADE_IN[1], TITLE_FADE_OUT[0], TITLE_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );

  const triggerWave = useCallback((i: number) => {
    const id = Date.now() + i;
    setWaves((w) => [...w, { id, color: RING_COLORS[i] }]);
    setTimeout(() => {
      setWaves((w) => w.filter((wv) => wv.id !== id));
    }, 1800);
  }, []);

  if (reduce) return <StaticFallback />;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0F] text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Le coût caché du travail manuel — V1"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Sticky counter */}
        <motion.div
          className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-3 md:gap-5"
          style={{ opacity: headerOpacity }}
        >
          <Counter value={`${hours} h`} label="perdues / an" accent="#22D3EE" />
          <Counter
            value={`${euros.toLocaleString("fr-FR")} €`}
            label="gaspillés / an"
            accent="#8B5CF6"
          />
        </motion.div>

        {/* Subtle concentric circles */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ scale: ringScale, opacity: ringOpacity }}
          aria-hidden
        >
          {[200, 360, 540, 720].map((size, i) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: size,
                height: size,
                border: `1px solid rgba(34, 211, 238, ${0.18 - i * 0.035})`,
              }}
            />
          ))}
        </motion.div>

        {/* Ripple waves — synchronisées avec apparitions chips */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        >
          <AnimatePresence>
            {waves.map((w) => (
              <motion.div
                key={w.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ border: `2px solid ${w.color}` }}
                initial={{ width: 60, height: 60, opacity: 0.85 }}
                animate={{ width: 900, height: 900, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Central title */}
        <CenterTitle opacity={titleOpacity} />

        {/* Pills */}
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
              onAppear={() => triggerWave(i)}
            />
          );
        })}
      </div>
    </section>
  );
}
