"use client";

/**
 * Section 2 — Pattern "Path orbital" (point lumineux qui parcourt une
 * trajectoire SVG, activant les cartes à proximité).
 *
 * Une courbe en S traverse le viewport sticky. 4 cartes sont posées le long
 * de la courbe à des positions clés. Au scroll, un point lumineux (comète)
 * parcourt la courbe. Quand il passe près d'une carte → elle s'illumine,
 * scale up légèrement, et révèle sa solution. Inspiration : Linear changelog
 * timeline, GitHub Universe path, Vercel Conf path.
 *
 * Les positions des cartes sont calculées en pourcentages du viewport :
 * x ∈ [0,1] horizontal, y ∈ [0,1] vertical (de haut en bas). Le SVG path
 * suit ces 4 points + un point d'entrée et de sortie.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SECTION2_PAIRS } from "@/data/section2-pairs";

const SECTION_HEIGHT_VH = 400;

// Positions (en fraction du viewport) où chaque carte est ancrée.
// La trajectoire passe par ces points dans l'ordre.
const ANCHORS = [
  { x: 0.22, y: 0.30 }, // 1 — top-left
  { x: 0.72, y: 0.42 }, // 2 — middle-right
  { x: 0.28, y: 0.62 }, // 3 — middle-left
  { x: 0.74, y: 0.78 }, // 4 — bottom-right
];

// Le path SVG passe d'un point d'entrée (top center), traverse les 4
// ancres, et sort par le bas. On utilise une courbe Bezier lissée.
function buildPathD(): string {
  const pts = [
    { x: 0.5, y: 0.05 }, // entrée
    ...ANCHORS,
    { x: 0.5, y: 0.95 }, // sortie
  ];
  // Path "C" cubic-bezier entre chaque point — control points = milieu
  // des segments, avec offset doux. Coords en pourcentages (× 100).
  const toPct = (p: { x: number; y: number }) => `${(p.x * 100).toFixed(1)} ${(p.y * 100).toFixed(1)}`;
  let d = `M ${toPct(pts[0])}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const cp1 = { x: prev.x, y: (prev.y + cur.y) / 2 };
    const cp2 = { x: cur.x, y: (prev.y + cur.y) / 2 };
    d += ` C ${toPct(cp1)}, ${toPct(cp2)}, ${toPct(cur)}`;
  }
  return d;
}

const PATH_D = buildPathD();

export function Section2OrbitalPath() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticFallback />;
  return (
    <>
      <div className="md:hidden">
        <StaticFallback />
      </div>
      <div className="hidden md:block">
        <OrbitalDesktop />
      </div>
    </>
  );
}

function OrbitalDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="relative bg-vt-bg-deep text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-8 left-0 right-0 text-center z-30 pointer-events-none">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono mb-2">
            // pourquoi adopter Vtensor
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Quatre raisons{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              de basculer maintenant
            </span>
          </h2>
        </div>

        {/* SVG path en arrière-plan */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.4" />
            </linearGradient>
            <filter id="comet-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Path principal (faible opacité) */}
          <path
            d={PATH_D}
            fill="none"
            stroke="url(#orbit-gradient)"
            strokeWidth="0.4"
            strokeDasharray="0.6 0.6"
            vectorEffect="non-scaling-stroke"
          />
          {/* Comète qui parcourt le path */}
          <Comet progress={scrollYProgress} />
        </svg>

        {/* Cartes ancrées le long du path */}
        {SECTION2_PAIRS.map((p, i) => (
          <OrbitalCard
            key={p.num}
            pair={p}
            index={i}
            anchor={ANCHORS[i]}
            total={SECTION2_PAIRS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

/** La comète qui parcourt le path SVG selon scrollYProgress. */
function Comet({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // On utilise un <circle> dont on anime la position via motionPath n'est
  // pas directement supporté par Motion sur SVG simple → on calcule la
  // position via path.getPointAtLength côté JS. Approche simple : on rend
  // un cercle, on le déplace via cx/cy calculés d'un useTransform sur le
  // pourcentage le long du path (échantillonnage discret du path).
  // Pour rester simple, on précalcule N points du path et on interpole.
  const samples = sampleLinearPath();
  const x = useTransform(progress, (v) => {
    const idx = Math.min(samples.length - 1, Math.floor(v * (samples.length - 1)));
    return samples[idx].x;
  });
  const y = useTransform(progress, (v) => {
    const idx = Math.min(samples.length - 1, Math.floor(v * (samples.length - 1)));
    return samples[idx].y;
  });

  return (
    <>
      {/* Halo */}
      <motion.circle cx={x} cy={y} r={2.5} fill="#22D3EE" opacity={0.18} filter="url(#comet-glow)" />
      {/* Cœur */}
      <motion.circle cx={x} cy={y} r={0.8} fill="#ffffff" filter="url(#comet-glow)" />
    </>
  );
}

/** Échantillonnage simple du path pour positionner la comète. */
function sampleLinearPath(): Array<{ x: number; y: number }> {
  // On échantillonne entre les ancres et points d'entrée/sortie sur N=80 points.
  const pts = [
    { x: 0.5, y: 0.05 },
    ...ANCHORS,
    { x: 0.5, y: 0.95 },
  ];
  const samples: Array<{ x: number; y: number }> = [];
  const N_PER_SEGMENT = 20;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    for (let j = 0; j <= N_PER_SEGMENT; j++) {
      const t = j / N_PER_SEGMENT;
      // Approximation Bezier cubique avec control points horizontaux (cf. buildPathD)
      const cp1 = { x: a.x, y: (a.y + b.y) / 2 };
      const cp2 = { x: b.x, y: (a.y + b.y) / 2 };
      const x =
        Math.pow(1 - t, 3) * a.x +
        3 * Math.pow(1 - t, 2) * t * cp1.x +
        3 * (1 - t) * Math.pow(t, 2) * cp2.x +
        Math.pow(t, 3) * b.x;
      const y =
        Math.pow(1 - t, 3) * a.y +
        3 * Math.pow(1 - t, 2) * t * cp1.y +
        3 * (1 - t) * Math.pow(t, 2) * cp2.y +
        Math.pow(t, 3) * b.y;
      samples.push({ x: x * 100, y: y * 100 });
    }
  }
  return samples;
}

function OrbitalCard({
  pair,
  index,
  anchor,
  total,
  progress,
}: {
  pair: (typeof SECTION2_PAIRS)[number];
  index: number;
  anchor: { x: number; y: number };
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // La carte est "active" quand la comète passe à son ancre, soit autour de
  // progress ≈ (index + 1) / (total + 1) (4 ancres + entrée + sortie = 6 points).
  // En pratique : la comète atteint la carte i à t = (i + 1) / 5.
  // ⚠️ Les offsets doivent rester dans [0, 1] strictement monotones (sinon
  // l'API Web Animations refuse les keyframes). On clamp les bornes.
  const focal = (index + 1) / (total + 1);
  const width = 1 / (total + 1) / 1.2;
  const lo = Math.max(0, focal - width * 2);
  const lo2 = Math.max(lo + 0.001, focal - width);
  const hi = Math.min(1, focal + width * 2);
  const hi2 = Math.min(hi - 0.001, focal + width);

  const opacity = useTransform(
    progress,
    [lo, lo2, focal, hi2, hi],
    [0.15, 0.4, 1, 0.5, 0.15],
    { clamp: true },
  );
  const scale = useTransform(
    progress,
    [lo, focal, hi],
    [0.85, 1, 0.85],
    { clamp: true },
  );

  // L'ancre est centrée sur le point. Position en %.
  const leftPct = `${anchor.x * 100}%`;
  const topPct = `${anchor.y * 100}%`;

  return (
    <motion.article
      style={{
        left: leftPct,
        top: topPct,
        opacity,
        scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="absolute z-20 w-[300px] md:w-[360px] bg-vt-card border border-vt-border rounded-2xl p-6 md:p-7"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="font-mono text-vt-cyan/70 text-xs">
          {pair.num} / {total.toString().padStart(2, "0")}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-vt-cyan font-semibold">
          {pair.label}
        </div>
      </div>
      <h3 className="font-display font-bold text-white text-base md:text-lg leading-snug mb-3">
        {pair.problem}
      </h3>
      <div className="h-px w-10 bg-vt-cyan/40 mb-3" />
      <p className="text-white/70 text-xs md:text-sm leading-relaxed">
        {pair.solution}
      </p>
    </motion.article>
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
