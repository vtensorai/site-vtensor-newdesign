"use client";

/**
 * HiddenCostA — Sanjaya pure (architecture fidèle)
 *
 * Reproduit l'architecture observée sur sanjaya.framer.ai :
 *   - Sticky container avec cercles concentriques (Circle S/M/L/XL)
 *   - 5 cards "pill" (Dot + titre) flottant autour, positionnées en offset
 *   - 5 zoom triggers : à chaque trigger, on "zoome" sur une douleur
 *   - Titre H2 "Le coût caché du travail manuel" centré
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

// 5 douleurs adaptées Vtensor (transposition fidèle de Sanjaya)
const PAINS = [
  {
    title: "Pilotage à l'aveugle",
    desc: "Vous décidez avec des données dispersées dans 5 outils. Les chiffres clés arrivent toujours trop tard.",
    stat: "−40%",
    statLabel: "de réactivité",
    // Position relative au cercle central : (xPercent, yPercent)
    pos: { x: -34, y: -36 },
  },
  {
    title: "Mise en route interminable",
    desc: "Chaque nouveau client ou collaborateur exige des heures de paperasse et de re-saisie.",
    stat: "8 j",
    statLabel: "d'onboarding moyen",
    pos: { x: 34, y: -28 },
  },
  {
    title: "Processus éclatés",
    desc: "Un même dossier traverse 6 outils, 3 personnes, 12 copier-coller. Rien ne tient ensemble.",
    stat: "12",
    statLabel: "outils par dossier",
    pos: { x: -38, y: 8 },
  },
  {
    title: "Équipes cloisonnées",
    desc: "Commerce, finance et opérations s'envoient des emails au lieu de partager la même information.",
    stat: "30+",
    statLabel: "emails internes / jour",
    pos: { x: 36, y: 18 },
  },
  {
    title: "Ressources gaspillées",
    desc: "Vos équipes passent un tiers de leur temps sur des tâches qu'une IA peut faire en arrière-plan.",
    stat: "520 h",
    statLabel: "perdues / an",
    pos: { x: 0, y: 38 },
  },
] as const;

export function HiddenCostA() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracker : 0 = section entre dans le viewport, 1 = section sort
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Pulse global des cercles concentriques (lent, ambient)
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.6]);

  // Reduced motion : layout statique, opacity 1, pas de transform
  if (reduce) {
    return (
      <section className="relative bg-[#0A0A0F] text-white py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-white/55 mb-4">
            Le coût caché
          </p>
          <h2 className="font-display text-center text-white text-3xl md:text-5xl font-bold mb-12 max-w-[20ch] mx-auto" style={{ letterSpacing: "-0.02em" }}>
            Le coût caché du travail manuel
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[820px] mx-auto">
            {PAINS.map((p) => (
              <li key={p.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#8B5CF6] shrink-0" />
                <div>
                  <h3 className="font-display text-white text-base font-semibold">{p.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0F] text-white"
      style={{ height: "320vh" }}
      aria-label="Le coût caché du travail manuel"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Concentric circles */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ scale: ringScale, opacity: ringOpacity }}
          aria-hidden
        >
          {[180, 320, 480, 660].map((size, i) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(139, 92, 246, ${0.28 - i * 0.05})`,
                boxShadow:
                  i === 0
                    ? "0 0 60px rgba(139,92,246,0.35), inset 0 0 40px rgba(34,211,238,0.15)"
                    : undefined,
              }}
            />
          ))}
          {/* core dot */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white"
            style={{ boxShadow: "0 0 24px rgba(255,255,255,0.7)" }}
          />
        </motion.div>

        {/* Floating pills */}
        {PAINS.map((p, i) => {
          // Each pill : enters between progress [0.05 + i*0.12 .. 0.2 + i*0.12], stays, fades on exit
          const inAt = 0.05 + i * 0.11;
          const outAt = 0.92;
          const fromX = i % 2 === 0 ? -50 : 50;
          const fromY = i === 4 ? -30 : i === 0 || i === 1 ? -20 : 20;

          return (
            <FloatingPill
              key={p.title}
              pain={p}
              progress={scrollYProgress}
              inAt={inAt}
              outAt={outAt}
              fromX={fromX}
              fromY={fromY}
            />
          );
        })}

        {/* Centered title */}
        <motion.div
          className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 w-full max-w-[900px] px-6 text-center pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0, 1, 1, 0.6]),
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 mb-3">
            Le coût caché
          </p>
          <h2
            className="font-display text-white font-bold mx-auto"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Le coût caché du <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]">travail manuel</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

type Pain = (typeof PAINS)[number];

function FloatingPill({
  pain,
  progress,
  inAt,
  outAt,
  fromX,
  fromY,
}: {
  pain: Pain;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  inAt: number;
  outAt: number;
  fromX: number;
  fromY: number;
}) {
  const opacity = useTransform(progress, [inAt - 0.05, inAt + 0.06, outAt - 0.05, outAt + 0.05], [0, 1, 1, 0.4]);
  const scale = useTransform(progress, [inAt - 0.05, inAt + 0.08], [0.5, 1]);
  const tx = useTransform(progress, [inAt - 0.05, inAt + 0.08], [fromX, 0]);
  const ty = useTransform(progress, [inAt - 0.05, inAt + 0.08], [fromY, 0]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${pain.pos.x}vw)`,
        top: `calc(50% + ${pain.pos.y}vh)`,
        x: tx,
        y: ty,
        scale,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1A1A1D] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-sm"
      >
        <span
          className="h-2 w-2 rounded-full bg-[#8B5CF6]"
          style={{ boxShadow: "0 0 12px rgba(139,92,246,0.7)" }}
        />
        <span className="font-display text-white text-[14px] md:text-[15px] font-semibold whitespace-nowrap">
          {pain.title}
        </span>
      </div>
    </motion.div>
  );
}
