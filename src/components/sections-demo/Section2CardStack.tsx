"use client";

/**
 * Section 2 — Pattern "Stack de cartes qui se révèlent".
 *
 * Les 4 cartes sont empilées au centre du viewport. La carte ACTIVE est
 * devant, en taille pleine. Les cartes derrière elle "peeken" via un offset
 * vertical + un scale légèrement plus petit — mais elles restent FULLEMENT
 * OPAQUES (pas de transparence qui laisse voir le texte des cartes derrière).
 *
 * À chaque step de scroll, la carte active glisse vers le haut (translate Y
 * + fade out), et la carte suivante prend sa place. Inspiration : Stripe
 * onboarding, Cash App.
 *
 * Implémentation : `useTransform(progress, fn)` (fonction, pas array) — on
 * calcule la "distance à la position active" pour chaque carte, puis on
 * dérive y / scale / opacity / zIndex. Évite le piège des keyframe offsets
 * monotones.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SECTION2_PAIRS } from "@/data/section2-pairs";

const SECTION_HEIGHT_VH = 400; // 100vh par carte révélée

export function Section2CardStack() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticFallback />;
  return (
    <>
      <div className="md:hidden">
        <StaticFallback />
      </div>
      <div className="hidden md:block">
        <StackDesktop />
      </div>
    </>
  );
}

function StackDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = SECTION2_PAIRS.length;

  return (
    <section
      ref={ref}
      className="relative bg-vt-bg-deep text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-16 pb-8 text-center flex-shrink-0">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono mb-3">
            // pourquoi adopter Vtensor
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Quatre raisons{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              de basculer maintenant
            </span>
          </h2>
        </div>

        {/* Stack au centre */}
        <div className="flex-1 flex items-center justify-center relative px-6">
          <div className="relative w-full max-w-2xl h-[440px]">
            {SECTION2_PAIRS.map((p, i) => (
              <StackCard
                key={p.num}
                pair={p}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Progress numérique */}
        <div className="pb-12 flex justify-center flex-shrink-0">
          <ProgressLabel progress={scrollYProgress} total={total} />
        </div>
      </div>
    </section>
  );
}

function StackCard({
  pair,
  index,
  total,
  progress,
}: {
  pair: (typeof SECTION2_PAIRS)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Distance continue à la position active. distance=0 quand la carte est
  // pile au centre/active. distance > 0 = en attente derrière. distance < 0
  // = la carte a déjà été présentée et a glissé vers le haut.
  const distance = useTransform(progress, (p) => index - p * (total - 1));

  // y : la carte derrière peeke avec un petit offset positif. La carte qui
  // part glisse vers le haut. La carte active est à y=0.
  const y = useTransform(distance, (d) => {
    if (d > 0) return Math.min(d * 14, 60); // peek (max +60px)
    if (d < 0) return d * 180; // slide out vers le haut
    return 0;
  });

  // scale : carte active à 1, cartes peek progressivement plus petites
  // (mais toujours visibles, jamais < 0.88).
  const scale = useTransform(distance, (d) => {
    if (d <= 0) return 1;
    return Math.max(0.88, 1 - d * 0.04);
  });

  // opacity : 1 sur toute la zone visible (active + peek). Fade out
  // uniquement quand la carte sort de la zone (au-delà de d=2.8 derrière
  // ou en dessous de d=-0.2 quand elle part vers le haut).
  const opacity = useTransform(distance, (d) => {
    if (d > 3) return 0;
    if (d > 2.5) return Math.max(0, 1 - (d - 2.5) * 2);
    if (d >= -0.1) return 1;
    if (d > -0.6) return Math.max(0, 1 + d / 0.5);
    return 0;
  });

  // zIndex : la carte active passe au premier plan, les peek derrière en
  // ordre, les sortantes sous tout le monde.
  const zIndex = useTransform(distance, (d) =>
    Math.round(100 - Math.abs(d) * 8),
  );

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex }}
      className="absolute inset-0 bg-vt-card border border-vt-border rounded-3xl p-10 md:p-12 overflow-hidden flex flex-col shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(139,92,246,0.4), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-5">
          <div className="font-display text-vt-cyan/70 text-sm font-mono">
            {pair.num} / {total.toString().padStart(2, "0")}
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-vt-cyan font-semibold">
            {pair.label}
          </div>
        </div>
        <h3 className="font-display font-bold text-white text-2xl md:text-3xl leading-snug mb-5">
          {pair.problem}
        </h3>
        <div className="h-px w-12 bg-vt-cyan/40 mb-5" />
        <p className="text-white/75 text-base md:text-lg leading-relaxed">
          {pair.solution}
        </p>
      </div>
    </motion.article>
  );
}

function ProgressLabel({
  progress,
  total,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const current = useTransform(progress, (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    return `${(idx + 1).toString().padStart(2, "0")} / ${total
      .toString()
      .padStart(2, "0")}`;
  });
  return (
    <motion.div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono">
      {current}
    </motion.div>
  );
}

function StaticFallback() {
  return (
    <section className="bg-vt-bg-deep text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono text-center mb-3">
          // pourquoi adopter Vtensor
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-center mb-12">
          Quatre raisons{" "}
          <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
            de basculer maintenant
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTION2_PAIRS.map((p) => (
            <div
              key={p.num}
              className="bg-vt-card border border-vt-border rounded-3xl p-7"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-vt-cyan font-semibold mb-3">
                {p.label}
              </div>
              <h3 className="font-display font-bold text-white text-lg leading-snug mb-3">
                {p.problem}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
