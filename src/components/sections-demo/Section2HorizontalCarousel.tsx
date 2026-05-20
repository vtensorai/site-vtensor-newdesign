"use client";

/**
 * Section 2 — Pattern "Carousel pinned horizontal".
 *
 * Section haute (4×100vh), sticky inner viewport. Les 4 cartes sont alignées
 * en ligne horizontale et translatées sur l'axe X selon scrollYProgress.
 * À chaque "step" de scroll, une carte différente est centrée → elle scale
 * up, ses voisines passent en gris/blur. Inspiration : Apple keynote, Cosmos.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SECTION2_PAIRS } from "@/data/section2-pairs";

const SECTION_HEIGHT_VH = 400; // 100vh par carte
const CARD_WIDTH_VW = 60; // largeur visuelle d'une carte centrée
const CARD_GAP_VW = 8;

export function Section2HorizontalCarousel() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticFallback />;
  return (
    <>
      <div className="md:hidden">
        <StaticFallback />
      </div>
      <div className="hidden md:block">
        <CarouselDesktop />
      </div>
    </>
  );
}

function CarouselDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Translation X totale = (n - 1) × (CARD_WIDTH + GAP)
  const totalShiftVw = (SECTION2_PAIRS.length - 1) * (CARD_WIDTH_VW + CARD_GAP_VW);
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [`0vw`, `-${totalShiftVw}vw`],
    { clamp: true },
  );

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

        {/* Carousel — viewport flex centré */}
        <div className="flex-1 flex items-center justify-center relative">
          <motion.div
            style={{ x }}
            className="flex items-center"
            // Les cartes sont positionnées en partant du centre du viewport :
            // chacune a width = CARD_WIDTH_VW vw. La 1ère carte est centrée
            // au départ ; le translate X la pousse à gauche pour révéler la 2e.
          >
            {SECTION2_PAIRS.map((p, i) => (
              <CarouselCard key={p.num} pair={p} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        {/* Indicateurs en bas (dots) */}
        <div className="pb-10 flex justify-center gap-2 flex-shrink-0">
          {SECTION2_PAIRS.map((_, i) => (
            <Dot key={i} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselCard({
  pair,
  index,
  progress,
}: {
  pair: (typeof SECTION2_PAIRS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Quand la carte i est "centrée" → progress ≈ i / (n-1).
  // On dérive l'opacité, scale de la distance à ce point.
  // ⚠️ Important : les offsets passés à useTransform doivent être strictement
  // monotones ET dans [0, 1] (sinon l'API Web Animations refuse les keyframes).
  // Pour la 1ère carte (focal=0) et la dernière (focal=1), on tronque
  // l'enveloppe symétrique en demi-enveloppe.
  const n = SECTION2_PAIRS.length;
  const focal = index / (n - 1); // ∈ [0, 1]
  const width = 1 / (n - 1);
  const opacityEnv = buildEnvelope(focal, width);
  const scaleEnv = buildEnvelope(focal, width, "scale");

  const opacity = useTransform(progress, opacityEnv.offsets, opacityEnv.opacity, { clamp: true });
  const scale = useTransform(progress, scaleEnv.offsets, scaleEnv.scale, { clamp: true });

  return (
    <motion.article
      style={{
        width: `${CARD_WIDTH_VW}vw`,
        marginRight: `${CARD_GAP_VW}vw`,
        marginLeft: index === 0 ? `${(100 - CARD_WIDTH_VW) / 2}vw` : 0, // centre la 1ère
        opacity,
        scale,
      }}
      className="flex-shrink-0 bg-vt-card border border-vt-border rounded-3xl p-10 md:p-14 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(139,92,246,0.4), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="font-display text-vt-cyan/70 text-sm font-mono">
            {pair.num} / {SECTION2_PAIRS.length.toString().padStart(2, "0")}
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-vt-cyan font-semibold">
            {pair.label}
          </div>
        </div>
        <h3 className="font-display font-bold text-white text-2xl md:text-3xl leading-snug mb-6">
          {pair.problem}
        </h3>
        <div className="h-px w-12 bg-vt-cyan/40 mb-6" />
        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          {pair.solution}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * Construit une enveloppe (offsets + values) strictement monotone et bornée
 * à [0, 1]. Pour focal=0 → demi-enveloppe descendante. Pour focal=1 →
 * demi-enveloppe ascendante. Sinon → enveloppe symétrique 5 points.
 */
function buildEnvelope(focal: number, width: number, kind: "opacity" | "scale" = "opacity") {
  const peakOpacity = 1;
  const lowOpacity = 0.18;
  const midOpacity = 0.45;
  const peakScale = 1;
  const lowScale = 0.78;

  if (focal <= 0.001) {
    // Première carte : peak à 0, fade out
    return {
      offsets: [0, width / 2, width],
      opacity: [peakOpacity, midOpacity, lowOpacity],
      scale: [peakScale, (peakScale + lowScale) / 2, lowScale],
    };
  }
  if (focal >= 0.999) {
    // Dernière carte : fade in vers peak à 1
    return {
      offsets: [1 - width, 1 - width / 2, 1],
      opacity: [lowOpacity, midOpacity, peakOpacity],
      scale: [lowScale, (peakScale + lowScale) / 2, peakScale],
    };
  }
  // Cartes intermédiaires : enveloppe symétrique complète
  return {
    offsets: [
      Math.max(0, focal - width),
      focal - width / 2,
      focal,
      focal + width / 2,
      Math.min(1, focal + width),
    ],
    opacity: [lowOpacity, midOpacity, peakOpacity, midOpacity, lowOpacity],
    scale: [lowScale, (peakScale + lowScale) / 2, peakScale, (peakScale + lowScale) / 2, lowScale],
  };
  // Note : `kind` n'est plus utilisé pour distinguer — on renvoie les 2 dans le
  // même objet. Le caller choisit `env.opacity` ou `env.scale`.
  void kind;
}

function Dot({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const n = SECTION2_PAIRS.length;
  const focal = index / (n - 1);
  const width = 1 / (n - 1) / 2;
  // Même problème que CarouselCard : offsets doivent rester dans [0, 1].
  let offsets: number[];
  let scaleValues: number[];
  let bgValues: string[];
  if (focal <= 0.001) {
    offsets = [0, width];
    scaleValues = [1.6, 1];
    bgValues = ["rgba(34,211,238,1)", "rgba(255,255,255,0.2)"];
  } else if (focal >= 0.999) {
    offsets = [1 - width, 1];
    scaleValues = [1, 1.6];
    bgValues = ["rgba(255,255,255,0.2)", "rgba(34,211,238,1)"];
  } else {
    offsets = [focal - width, focal, focal + width];
    scaleValues = [1, 1.6, 1];
    bgValues = [
      "rgba(255,255,255,0.2)",
      "rgba(34,211,238,1)",
      "rgba(255,255,255,0.2)",
    ];
  }
  const scale = useTransform(progress, offsets, scaleValues, { clamp: true });
  const bg = useTransform(progress, offsets, bgValues);
  return (
    <motion.div
      style={{ scale, background: bg }}
      className="w-2 h-2 rounded-full"
    />
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
