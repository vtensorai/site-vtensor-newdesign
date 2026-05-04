"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";

const ITEMS = [
  { lead: "de votre", strong: "temps" },
  { lead: "de vos", strong: "opérations" },
  { lead: "de votre", strong: "quotidien" },
  { lead: "de vos", strong: "heures" },
  { lead: "de votre", strong: "énergie" },
];

const SECTIONS = [
  { id: "option-a", label: "Option A" },
  { id: "option-b", label: "Option B" },
  { id: "option-c", label: "Option C" },
];

/* ---------------------------------------------------
 * Reduced motion hook
 * --------------------------------------------------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ---------------------------------------------------
 * Shared layout pieces
 * --------------------------------------------------- */
function DemoBackground() {
  return (
    <>
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />
      {/* Top violet glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139, 92, 246, 0.12), transparent 70%)",
        }}
      />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
    </>
  );
}

function MiniNav({ rightLabel }: { rightLabel: string }) {
  return (
    <nav className="absolute top-0 inset-x-0 z-30 px-8 sm:px-12 py-6 flex items-center justify-between">
      <a href="/" className="inline-flex items-center" aria-label="Vtensor">
        <Image
          src="/logos/vtensor-wordmark-white.svg"
          alt="Vtensor"
          width={112}
          height={28}
          priority
          className="h-7 w-auto"
        />
      </a>
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
        {rightLabel}
      </span>
    </nav>
  );
}

function OptionCard({
  letter,
  title,
  description,
}: {
  letter: string;
  title: string;
  description: string;
}) {
  return (
    <div className="absolute inset-x-0 bottom-10 z-30 flex justify-center px-6">
      <div className="w-full max-w-[640px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Option {letter}
          </span>
          <span className="text-base font-semibold text-white mt-1">
            {title}
          </span>
          <span className="text-sm text-white/60 mt-1 max-w-[48ch]">
            {description}
          </span>
        </div>
        <button
          type="button"
          className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap"
          style={{
            background: "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
          }}
        >
          Sélectionner cette option
        </button>
      </div>
    </div>
  );
}

function StickyAnchorNav() {
  const [active, setActive] = useState<string>("option-a");

  useEffect(() => {
    const handler = () => {
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, dist: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: s.id, dist: Math.abs(rect.top) };
      });
      offsets.sort((a, b) => a.dist - b.dist);
      setActive(offsets[0].id);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex gap-1">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={[
            "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors",
            active === s.id
              ? "bg-white text-black"
              : "text-white/70 hover:text-white",
          ].join(" ")}
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}

/* ---------------------------------------------------
 * Title (reused across the 3 options)
 * --------------------------------------------------- */
function MainTitle() {
  return (
    <h1
      className="font-display text-white text-center"
      style={{
        fontWeight: 700,
        fontSize: "clamp(56px, 8vw, 96px)",
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
      }}
    >
      Reprenez le contrôle
    </h1>
  );
}

/* ---------------------------------------------------
 * Option A — Shimmer horizontal cascade
 * --------------------------------------------------- */
function ShimmerLine({
  lead,
  strong,
  delay,
  reduced,
}: {
  lead: string;
  strong: string;
  delay: number;
  reduced: boolean;
}) {
  const text = `${lead} ${strong}`;
  if (reduced) {
    return (
      <span
        className="inline-block"
        style={{
          color: "rgba(255,255,255,0.7)",
          fontFamily: "var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(24px, 3vw, 36px)",
          lineHeight: 1.2,
        }}
      >
        {lead}{" "}
        <span style={{ color: "white", fontWeight: 700 }}>{strong}</span>
      </span>
    );
  }

  return (
    <span
      className="vt-shimmer-line"
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif",
        fontWeight: 600,
        fontSize: "clamp(24px, 3vw, 36px)",
        lineHeight: 1.2,
        color: "rgba(255,255,255,0.55)",
      }}
    >
      <span aria-hidden="true" style={{ visibility: "hidden" }}>
        {text}
      </span>
      <span
        aria-label={text}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(100deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.55) 65%, rgba(255,255,255,0.55) 100%)",
          backgroundSize: "250% 100%",
          backgroundPosition: "200% 0",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: `vt-shimmer 4s linear infinite ${delay}s`,
        }}
      >
        {lead}{" "}
        <span style={{ fontWeight: 700 }}>{strong}</span>
      </span>
    </span>
  );
}

function OptionASection() {
  const reduced = useReducedMotion();
  return (
    <section
      id="option-a"
      className="relative min-h-screen overflow-hidden bg-[#0A0A0F] flex flex-col items-center justify-center"
    >
      <DemoBackground />
      <MiniNav rightLabel="Tagline Demo · A" />

      <style>{`
        @keyframes vt-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <MainTitle />
        <div className="h-7 sm:h-8" />
        <div className="flex flex-col items-center gap-2">
          {ITEMS.map((it, i) => (
            <ShimmerLine
              key={i}
              lead={it.lead}
              strong={it.strong}
              delay={i * 0.5}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      <OptionCard
        letter="A"
        title="Shimmer horizontal"
        description="Les 5 compléments restent affichés en gris atténué. Un reflet brillant balaie chaque ligne en cascade, comme un effet métal poli."
      />
    </section>
  );
}

/* ---------------------------------------------------
 * Option B — Scroll-linked sequential highlight
 * --------------------------------------------------- */
function HighlightLine({
  index,
  total,
  scrollYProgress,
  lead,
  strong,
  reduced,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  lead: string;
  strong: string;
  reduced: boolean;
}) {
  const window = 0.8;
  const start = (index / total) * window + 0.1;
  const peak = ((index + 0.5) / total) * window + 0.1;
  const end = ((index + 1) / total) * window + 0.1;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), peak, Math.min(1, end + 0.05)],
    [0.3, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), peak, Math.min(1, end + 0.05)],
    [0.98, 1.04, 0.98]
  );

  if (reduced) {
    return (
      <div
        style={{
          fontFamily: "var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(24px, 3vw, 36px)",
          lineHeight: 1.2,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {lead} <span style={{ color: "white", fontWeight: 700 }}>{strong}</span>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        opacity,
        scale,
        fontFamily: "var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif",
        fontWeight: 600,
        fontSize: "clamp(24px, 3vw, 36px)",
        lineHeight: 1.2,
        color: "white",
      }}
    >
      {lead} <span style={{ fontWeight: 700 }}>{strong}</span>
    </motion.div>
  );
}

function OptionBSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id="option-b"
      className="relative overflow-hidden bg-[#0A0A0F]"
      style={{ minHeight: "220vh" }}
    >
      <DemoBackground />
      <MiniNav rightLabel="Tagline Demo · B" />

      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="relative z-20 flex flex-col items-center text-center">
          <MainTitle />
          <div className="h-7 sm:h-8" />
          <div className="flex flex-col items-center gap-2">
            {ITEMS.map((it, i) => (
              <HighlightLine
                key={i}
                index={i}
                total={ITEMS.length}
                scrollYProgress={scrollYProgress}
                lead={it.lead}
                strong={it.strong}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card pinned at end of section */}
      <div className="absolute bottom-10 inset-x-0 z-30">
        <OptionCard
          letter="B"
          title="Highlight séquentiel scroll-linked"
          description="Les compléments restent en gris ; un seul s'éclaire à 100%. La luminosité descend ligne par ligne au rythme du scroll."
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------
 * Option C — Word switcher with flash
 * --------------------------------------------------- */
function WordSwitcher({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setFlash(true);
      setIndex((i) => (i + 1) % ITEMS.length);
      const ft = setTimeout(() => setFlash(false), 220);
      return () => clearTimeout(ft);
    }, 2500);
    return () => clearInterval(t);
  }, [reduced]);

  const current = ITEMS[index];

  if (reduced) {
    return (
      <div
        style={{
          fontFamily: "var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(24px, 3vw, 36px)",
          lineHeight: 1.2,
          color: "white",
        }}
      >
        {ITEMS[0].lead}{" "}
        <span style={{ fontWeight: 700 }}>{ITEMS[0].strong}</span>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        height: "1.4em",
        fontSize: "clamp(24px, 3vw, 36px)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "white",
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          {current.lead}{" "}
          <span
            style={{
              fontWeight: 700,
              backgroundImage:
                "linear-gradient(90deg, #A78BFA 0%, #22D3EE 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {current.strong}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Flash overlay */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: flash ? 0.25 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-x-[-30%] inset-y-[-50%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.9), rgba(167,139,250,0.4) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}

function OptionCSection() {
  const reduced = useReducedMotion();
  return (
    <section
      id="option-c"
      className="relative min-h-screen overflow-hidden bg-[#0A0A0F] flex flex-col items-center justify-center"
    >
      <DemoBackground />
      <MiniNav rightLabel="Tagline Demo · C" />

      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <MainTitle />
        <div className="h-7 sm:h-8" />
        <WordSwitcher reduced={reduced} />
      </div>

      <OptionCard
        letter="C"
        title="Word switcher + flash"
        description="Un seul complément à la fois, qui se succède toutes les 2,5s. Transition blur+slide avec un flash violet/blanc bref à chaque changement."
      />
    </section>
  );
}

/* ---------------------------------------------------
 * Page
 * --------------------------------------------------- */
export default function TaglineDemoPage() {
  return (
    <main className="bg-[#0A0A0F] text-white">
      <StickyAnchorNav />
      <OptionASection />
      <OptionBSection />
      <OptionCSection />
    </main>
  );
}
