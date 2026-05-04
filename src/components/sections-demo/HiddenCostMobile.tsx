"use client";

/**
 * HiddenCostMobile — version stack vertical pour viewports < md (≤ 767px).
 *
 * Layout :
 *  - Compteur sticky en haut (h + €), scroll-linked sur la section
 *  - Titre central "Vtensor, c'est concrètement…"
 *  - 5 chips empilées en colonne, fade-up scroll-linked
 *
 * Pas de cercles, pas d'absolute autour d'un point, pas de débordement.
 * Reduced-motion respecté côté parent (HiddenCostB rend StaticFallback dans ce cas).
 */

import { useRef, useState } from "react";
import {
  useReducedMotion,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import {
  PAINS,
  Counter,
  TARGET_HOURS,
  TARGET_EUROS,
} from "./HiddenCostBase";

function MobileChip({ pain }: { pain: (typeof PAINS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0], { clamp: true });

  return (
    <motion.div ref={ref} className="w-full" style={{ opacity, y }}>
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-6 text-left"
        style={{
          background: "rgba(10,10,15,0.94)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 12px 28px -10px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Numéro géant en watermark coin haut-droit */}
        <div
          className="pointer-events-none absolute -top-5 -right-1 select-none font-display font-black leading-none text-white/[0.05]"
          style={{ fontSize: "130px" }}
          aria-hidden
        >
          {pain.num}
        </div>

        <div className="relative">
          {/* Label uppercase cyan */}
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] font-semibold mb-3">
            {pain.label}
          </div>

          {/* Titre display blanc */}
          <h3
            className="font-display font-bold text-white leading-[1.2] tracking-[-0.005em] mb-3"
            style={{ fontSize: "17px" }}
          >
            {pain.title}
          </h3>

          <p
            className="text-white/60"
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              fontFamily:
                "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {pain.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HiddenCostMobile() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Compteur scroll-linked sur la traversée de la section dans le viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const hoursMV = useTransform(scrollYProgress, [0.1, 0.85], [0, TARGET_HOURS], {
    clamp: true,
  });
  const eurosMV = useTransform(
    scrollYProgress,
    [0.1, 0.85],
    [0, TARGET_EUROS],
    { clamp: true },
  );

  const [hours, setHours] = useState(0);
  const [euros, setEuros] = useState(0);

  useMotionValueEvent(hoursMV, "change", (v) => {
    if (reduce) return;
    setHours(Math.round(v));
  });
  useMotionValueEvent(eurosMV, "change", (v) => {
    if (reduce) return;
    setEuros(Math.round(v / 100) * 100);
  });

  return (
    <section
      ref={sectionRef}
      className="relative text-white overflow-hidden"
      aria-label="Le coût caché du travail manuel (mobile)"
    >
      {/* Sticky compteur en haut, suit le scroll de la section */}
      <div className="sticky top-3 z-20 flex justify-center pt-2 pb-1 px-4 pointer-events-none">
        <motion.div className="flex flex-wrap justify-center gap-2 pointer-events-auto">
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
      </div>

      <div className="px-5 pt-6 pb-16">
        {/* Titre central */}
        <h2
          className="font-display text-white font-bold text-center mb-8 mx-auto"
          style={{
            fontSize: "clamp(24px, 7vw, 36px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: "18ch",
          }}
        >
          Vtensor, c&apos;est concrètement…
        </h2>

        {/* Stack chips dans le flow naturel — fade-up en arrivant au viewport */}
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {PAINS.map((p) => (
            <MobileChip key={p.title} pain={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
