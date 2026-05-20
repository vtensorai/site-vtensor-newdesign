"use client";

/**
 * HiddenCostCenterV2 — Réseau / nœuds connectés (scroll-linked).
 *
 * Pas de cercles concentriques. Le titre central est encadré d'un petit cercle
 * subtil. Quand chaque chip apparaît, une ligne SVG fine se trace du centre
 * vers la chip. Si l'utilisateur remonte au-delà du seuil de la chip, la
 * ligne disparaît (état `appeared` géré par onAppear/onDisappear).
 */

import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useReducedMotion } from "motion/react";
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

export function HiddenCostCenterV2() {
  const reduce = useReducedMotion();
  const { sectionRef, scrollYProgress, hours, euros } = useHiddenCostScroll(
    !!reduce,
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1280, h: 720 });

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [appeared, setAppeared] = useState<Set<number>>(new Set());

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

  if (reduce) return <StaticFallback />;

  const cx = size.w / 2;
  const cy = size.h / 2;

  const endpoints = PAINS.map((p) => ({
    x: cx + (p.pos.x / 100) * size.w,
    y: cy + (p.pos.y / 100) * size.h,
  }));

  const setAppearedFor = (i: number, on: boolean) =>
    setAppeared((prev) => {
      const has = prev.has(i);
      if (on === has) return prev;
      const next = new Set(prev);
      if (on) next.add(i);
      else next.delete(i);
      return next;
    });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0F] text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Le coût caché du travail manuel — V2"
    >
      <div
        ref={wrapRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
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

        {/* SVG network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
          viewBox={`0 0 ${size.w} ${size.h}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="halo-grad">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r={140} fill="url(#halo-grad)" />
          <circle
            cx={cx}
            cy={cy}
            r={110}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
          />

          {endpoints.map((pt, i) => (
            <NetworkLine
              key={i}
              x1={cx}
              y1={cy}
              x2={pt.x}
              y2={pt.y}
              visible={appeared.has(i)}
            />
          ))}
        </svg>

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
              onAppear={() => setAppearedFor(i, true)}
              onDisappear={() => setAppearedFor(i, false)}
            />
          );
        })}
      </div>
    </section>
  );
}

function NetworkLine({
  x1,
  y1,
  x2,
  y2,
  visible,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  visible: boolean;
}) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#line-grad)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={len}
        initial={{ strokeDashoffset: len, opacity: 0 }}
        animate={{
          strokeDashoffset: visible ? 0 : len,
          opacity: visible ? 0.85 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {visible && (
        <motion.circle
          cx={x2}
          cy={y2}
          r={4}
          fill="#22D3EE"
          initial={{ opacity: 0.9, scale: 0.6 }}
          animate={{ opacity: [0.9, 0, 0.9, 0], scale: [0.6, 2, 0.6, 2] }}
          transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
        />
      )}
      {visible && (
        <motion.circle
          r={2.5}
          fill="#ffffff"
          initial={{ cx: x1, cy: y1, opacity: 0 }}
          animate={{
            cx: [x1, x2],
            cy: [y1, y2],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.6,
          }}
        />
      )}
    </g>
  );
}
