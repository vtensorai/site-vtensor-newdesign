"use client";

/**
 * HiddenCostCenterV3 — Champ de particules + attraction (scroll-linked).
 *
 * Pas de cercles. Titre central. Champ de ~40 particules lumineuses qui
 * flottent doucement autour du centre. Quand une chip apparaît : attraction
 * depuis l'extérieur. Les particules s'écartent légèrement quand une chip
 * passe. Tout est scroll-linked : remonter ramène les chips et inverse
 * la trajectoire.
 */

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import {
  PAINS,
  type Pain,
  Counter,
  StaticFallback,
  CenterTitle,
  useHiddenCostScroll,
  chipBounds,
  SECTION_HEIGHT_VH,
  HEADER_FADE_IN,
  HEADER_FADE_OUT,
  TITLE_FADE_IN,
  TITLE_FADE_OUT,
} from "./HiddenCostBase";

const PARTICLE_COUNT = 40;
const COLORS = ["#ffffff", "#22D3EE", "#8B5CF6"];

type Particle = {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  phase: number;
  speed: number;
};

function createParticles(): Particle[] {
  const arr: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 80 + Math.random() * 280;
    arr.push({
      id: i,
      baseX: Math.cos(angle) * radius,
      baseY: Math.sin(angle) * radius,
      size: 1.5 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
    });
  }
  return arr;
}

export function HiddenCostCenterV3() {
  const reduce = useReducedMotion();
  const { sectionRef, scrollYProgress, hours, euros } = useHiddenCostScroll(
    !!reduce,
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

  const particlesRef = useRef<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const repulseRef = useRef<{ x: number; y: number; t: number } | null>(null);

  if (particlesRef.current.length === 0) {
    particlesRef.current = createParticles();
  }

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const r = wrap.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;

      ctx.clearRect(0, 0, r.width, r.height);

      const repulse = repulseRef.current;
      const repulseStrength = repulse
        ? Math.max(0, 1 - (now - repulse.t) / 800)
        : 0;

      for (const p of particlesRef.current) {
        const drift =
          Math.sin(t * p.speed + p.phase) * 18 +
          Math.cos(t * p.speed * 0.6 + p.phase * 1.7) * 14;
        const driftY =
          Math.cos(t * p.speed + p.phase) * 18 +
          Math.sin(t * p.speed * 0.7 + p.phase * 1.3) * 14;

        let x = cx + p.baseX + drift;
        let y = cy + p.baseY + driftY;

        if (repulse && repulseStrength > 0) {
          const dx = x - repulse.x;
          const dy = y - repulse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 220 && d > 0) {
            const force = ((220 - d) / 220) * 30 * repulseStrength;
            x += (dx / d) * force;
            y += (dy / d) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  const handlePillAppear = useCallback((pain: Pain) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const x = r.width / 2 + (pain.pos.x / 100) * r.width;
    const y = r.height / 2 + (pain.pos.y / 100) * r.height;
    repulseRef.current = { x, y, t: performance.now() };
  }, []);

  if (reduce) return <StaticFallback />;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0F] text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Le coût caché du travail manuel — V3"
    >
      <div
        ref={wrapRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        />

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

        <CenterTitle opacity={titleOpacity} />

        {/* Pills — version "attraction" custom mais scroll-linked */}
        {PAINS.map((p, i) => {
          const fromX = i % 2 === 0 ? -90 : 90;
          const fromY = i === 4 ? -60 : i < 2 ? -50 : 50;
          return (
            <AttractedPill
              key={p.title}
              pain={p}
              index={i}
              progress={scrollYProgress}
              fromX={fromX}
              fromY={fromY}
              onAppear={() => handlePillAppear(p)}
            />
          );
        })}
      </div>
    </section>
  );
}

function AttractedPill({
  pain,
  index,
  progress,
  fromX,
  fromY,
  onAppear,
}: {
  pain: Pain;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  fromX: number;
  fromY: number;
  onAppear?: () => void;
}) {
  const { start, end } = chipBounds(index);
  // Quart-points pour un easing easeOut visuel
  const q1 = start + (end - start) * 0.25;
  const q2 = start + (end - start) * 0.5;
  const q3 = start + (end - start) * 0.75;

  const opacity = useTransform(progress, [start, q1, end], [0, 1, 1], {
    clamp: true,
  });
  const scale = useTransform(progress, [start, end], [0.4, 1], { clamp: true });

  const tx = useTransform(
    progress,
    [start, q1, q2, q3, end],
    [fromX, fromX * 0.7, fromX * 0.3, fromX * 0.1, 0],
    { clamp: true },
  );
  const ty = useTransform(
    progress,
    [start, q1, q2, q3, end],
    [fromY, fromY * 0.7, fromY * 0.3, fromY * 0.1, 0],
    { clamp: true },
  );

  // Trail : pic de visibilité au milieu de la trajectoire
  const trailOpacity = useTransform(
    progress,
    [start, q1, q2, end],
    [0, 0.5, 0.3, 0],
    { clamp: true },
  );
  const trailX = useTransform(tx, (v) => v * 0.4);
  const trailY = useTransform(ty, (v) => v * 0.4);

  // Hystérésis pour onAppear (re-déclenchable si remontée puis redescente)
  const wasVisible = useRef(false);
  useMotionValueEvent(opacity, "change", (v) => {
    if (!wasVisible.current && v > 0.55) {
      wasVisible.current = true;
      onAppear?.();
    } else if (wasVisible.current && v < 0.2) {
      wasVisible.current = false;
    }
  });

  return (
    <>
      <motion.div
        className="absolute pointer-events-none z-[5]"
        style={{
          left: `calc(50% + ${pain.pos.x}vw)`,
          top: `calc(50% + ${pain.pos.y}vh)`,
          x: trailX,
          y: trailY,
          opacity: trailOpacity,
          translateX: "-50%",
          translateY: "-50%",
          filter: "blur(8px)",
        }}
      >
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />
          <span className="font-display text-white text-[14px] md:text-[15px] font-semibold whitespace-nowrap">
            {pain.title}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute z-10"
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
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1A1A1D] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <span
            className="h-2 w-2 rounded-full bg-[#22D3EE]"
            style={{ boxShadow: "0 0 12px rgba(34,211,238,0.7)" }}
          />
          <span className="font-display text-white text-[14px] md:text-[15px] font-semibold whitespace-nowrap">
            {pain.title}
          </span>
        </div>
      </motion.div>
    </>
  );
}
