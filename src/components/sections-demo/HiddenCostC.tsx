"use client";

/**
 * HiddenCostC — Sanjaya + transition cinématographique
 *
 * Reprend l'architecture Sanjaya (sticky + cercles + pills flottantes) et
 * ajoute :
 *   - Un fond qui s'assombrit progressivement au scroll (tension qui monte)
 *   - Un crossfade entre douleurs (highlight focal qui glisse de pill en pill)
 *   - Une transition de sortie dramatique : "Mais il y a une autre façon →"
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const PAINS = [
  {
    title: "Pilotage à l'aveugle",
    desc: "Vous décidez avec des données dispersées dans 5 outils. Les chiffres clés arrivent toujours trop tard.",
    pos: { x: -34, y: -32 },
  },
  {
    title: "Mise en route interminable",
    desc: "Chaque nouveau client ou collaborateur exige des heures de paperasse et de re-saisie.",
    pos: { x: 34, y: -24 },
  },
  {
    title: "Processus éclatés",
    desc: "Un même dossier traverse 6 outils, 3 personnes, 12 copier-coller. Rien ne tient ensemble.",
    pos: { x: -38, y: 10 },
  },
  {
    title: "Équipes cloisonnées",
    desc: "Commerce, finance et opérations s'envoient des emails au lieu de partager la même information.",
    pos: { x: 36, y: 18 },
  },
  {
    title: "Ressources gaspillées",
    desc: "Vos équipes passent un tiers de leur temps sur des tâches qu'une IA peut faire en arrière-plan.",
    pos: { x: 0, y: 36 },
  },
] as const;

export function HiddenCostC() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Background darkens : passe de #0A0A0F (clair) à #000 (très sombre)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    ["#0A0A0F", "#06060B", "#020205", "#0A0A0F"]
  );

  // Vignette intensifies
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [0, 0.55, 0.85, 0.4]);

  // Cercles
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [0.85, 1.05, 1.4, 0.7]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.92, 1], [0, 1, 1, 0.2, 0]);

  // Title fade in/out
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.78, 0.88], [0, 1, 1, 0]);

  // CTA outro reveal
  const outroOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1]);
  const outroY = useTransform(scrollYProgress, [0.82, 0.95], [40, 0]);

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
          <p className="text-center text-white/70 mt-12 text-lg">
            Mais il y a une autre façon
            <span aria-hidden> →</span>
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative text-white"
      style={{ height: "360vh", backgroundColor: bgColor }}
      aria-label="Le coût caché du travail manuel"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Vignette overlay (tension) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            opacity: vignetteOpacity,
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Cercles concentriques */}
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
                borderColor: `rgba(139, 92, 246, ${0.32 - i * 0.06})`,
                boxShadow:
                  i === 0
                    ? "0 0 80px rgba(139,92,246,0.45), inset 0 0 50px rgba(34,211,238,0.18)"
                    : undefined,
              }}
            />
          ))}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white"
            style={{ boxShadow: "0 0 24px rgba(255,255,255,0.7)" }}
          />
        </motion.div>

        {/* Floating pills with crossfade highlight */}
        {PAINS.map((p, i) => {
          const inAt = 0.05 + i * 0.09;
          const focusAt = 0.12 + i * 0.13;
          const exitAt = 0.78;
          const fromX = i % 2 === 0 ? -50 : 50;
          const fromY = i === 4 ? -30 : i < 2 ? -20 : 20;
          return (
            <FloatingPill
              key={p.title}
              pain={p}
              index={i}
              progress={scrollYProgress}
              inAt={inAt}
              focusAt={focusAt}
              exitAt={exitAt}
              fromX={fromX}
              fromY={fromY}
            />
          );
        })}

        {/* Title */}
        <motion.div
          className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 w-full max-w-[900px] px-6 text-center pointer-events-none"
          style={{ opacity: titleOpacity }}
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
            Le coût caché du{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]">
              travail manuel
            </span>
          </h2>
        </motion.div>

        {/* Outro CTA "Mais il y a une autre façon" */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none"
          style={{ opacity: outroOpacity, y: outroY }}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 mb-4">
              La bonne nouvelle
            </p>
            <p
              className="font-display text-white font-bold"
              style={{
                fontSize: "clamp(28px, 4.6vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Mais il y a une{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]">
                autre façon
              </span>
              <span aria-hidden className="inline-flex items-center ml-2 align-middle">
                <ArrowRight size={42} weight="bold" className="text-[#22D3EE]" />
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

type Pain = (typeof PAINS)[number];

function FloatingPill({
  pain,
  index,
  progress,
  inAt,
  focusAt,
  exitAt,
  fromX,
  fromY,
}: {
  pain: Pain;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  inAt: number;
  focusAt: number;
  exitAt: number;
  fromX: number;
  fromY: number;
}) {
  const opacity = useTransform(
    progress,
    [inAt - 0.05, inAt + 0.06, exitAt - 0.05, exitAt + 0.05],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [inAt - 0.05, inAt + 0.08], [0.5, 1]);
  const tx = useTransform(progress, [inAt - 0.05, inAt + 0.08], [fromX, 0]);
  const ty = useTransform(progress, [inAt - 0.05, inAt + 0.08], [fromY, 0]);

  // Highlight when "focus" — that pill glows brighter, others dim slightly
  const focusGlow = useTransform(
    progress,
    [focusAt - 0.06, focusAt, focusAt + 0.06],
    [0.4, 1, 0.5]
  );

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
      <motion.div
        className="inline-flex items-center gap-2.5 rounded-xl border bg-[#1A1A1D] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-sm"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow: useTransform(
            focusGlow,
            (g) =>
              `0 0 ${10 + g * 30}px rgba(139,92,246,${0.15 + g * 0.4}), 0 8px 32px rgba(0,0,0,0.55)`
          ),
        }}
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-[#8B5CF6]"
          style={{
            boxShadow: useTransform(
              focusGlow,
              (g) => `0 0 ${6 + g * 14}px rgba(139,92,246,${0.5 + g * 0.4})`
            ),
          }}
        />
        <span className="font-display text-white text-[14px] md:text-[15px] font-semibold whitespace-nowrap">
          {pain.title}
        </span>
      </motion.div>
    </motion.div>
  );
}
