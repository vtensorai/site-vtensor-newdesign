"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LazyBackground } from "@/components/backgrounds/LazyBackground";
import { VideoBackground } from "@/components/backgrounds/VideoBackground";
import { WordSwitcherTagline } from "@/components/WordSwitcherTagline";

/* ---------------------------------------------------
 * Constants
 * --------------------------------------------------- */
const VIDEO_SRC = "/videos/city-dawn-seedance-15s.mp4";

const NAV_LINKS = [
  { label: "Tarifs", href: "#tarifs" },
  { label: "Agents", href: "#agents" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const REASSURANCES = [
  "Données sécurisées en Europe",
  "Sans engagement de durée",
  "Réponse sous 24 h",
];

const ROTATION_ITEMS = [
  "de votre temps",
  "de vos opérations",
  "de votre quotidien",
  "de vos heures",
  "de votre énergie",
];

const SECTIONS = [
  { id: "variante-1", label: "Variante 1" },
  { id: "variante-2", label: "Variante 2" },
];

/* ---------------------------------------------------
 * Reduced motion
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
 * Sticky anchor nav (top)
 * --------------------------------------------------- */
function StickyAnchorNav() {
  const [active, setActive] = useState<string>("variante-1");

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2 py-2 rounded-full border border-white/10 bg-black/55 backdrop-blur-md flex gap-1">
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
 * Hero shell — mini-nav + kicker + (custom tagline) + sub + CTAs + reassurances
 * --------------------------------------------------- */
function HeroShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-20 flex min-h-screen w-full flex-col">
      {/* Mini-nav */}
      <nav className="relative z-30 w-full max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20 py-6 flex items-center justify-between">
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
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://cal.com/vtensor/audi-30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm text-white/90 hover:bg-white/[0.08] transition-colors"
        >
          Audit gratuit
          <ArrowRight size={14} weight="bold" />
        </a>
      </nav>

      {/* Hero content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Kicker */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-[0.16em] text-white/65 font-medium">
              L&apos;agence qui automatise votre entreprise
            </span>
          </div>

          {/* Tagline (custom per variante) */}
          <div className="mb-6">{children}</div>

          {/* Sub */}
          <div className="mb-10">
            <p className="text-white/85 text-lg md:text-xl max-w-[60ch] leading-relaxed">
              Des assistants intelligents qui gèrent votre service client, vos
              devis, vos relances et vos contenus marketing à votre place. Vous
              récupérez vos heures pour faire avancer votre entreprise.
            </p>
          </div>

          {/* CTAs */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://cal.com/vtensor/audi-30min"
                target="_blank"
                rel="noopener noreferrer"
                className="vt-cta-shift group/cta inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_50px_-5px_rgba(34,211,238,0.7)] transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Audit gratuit · 30 min
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </a>
              <a
                href="#tarifs"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/25 text-white font-semibold text-sm hover:bg-white/[0.08] hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                Voir les tarifs
              </a>
            </div>
          </div>

          {/* Réassurances */}
          <div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-white/70">
              {REASSURANCES.map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5">
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="text-[#22D3EE]"
                  />
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
 * Identification card (bottom-right)
 * --------------------------------------------------- */
function IdentificationCard({
  num,
  title,
  selected,
  onSelect,
}: {
  num: number;
  title: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="absolute bottom-6 right-6 z-40 max-w-sm rounded-2xl border border-white/15 bg-black/70 p-5 shadow-2xl backdrop-blur-md">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-base font-bold text-white">
          {num}
        </span>
        <span className="text-sm font-semibold leading-tight text-white">
          {title}
        </span>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-full px-4 py-2 text-xs font-semibold transition-all ${
          selected
            ? "bg-emerald-400 text-emerald-950 shadow-[0_0_24px_-6px_rgba(52,211,153,0.7)]"
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        {selected ? "✓ Sélectionnée" : "Sélectionner cette variante"}
      </button>
    </div>
  );
}

/* ---------------------------------------------------
 * Variante 1 — Tagline statique 2 lignes
 * --------------------------------------------------- */
function StaticTagline({ reduced }: { reduced: boolean }) {
  const baseStyle = {
    fontFamily: "var(--font-display), Manrope, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(56px, 8vw, 96px)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    display: "block",
  };

  if (reduced) {
    return (
      <h1 className="font-display max-w-[16ch] mx-auto">
        <span style={{ ...baseStyle, color: "white" }}>
          Pilotez votre entreprise
        </span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            ...baseStyle,
            backgroundImage:
              "linear-gradient(90deg, #A78BFA 0%, #22D3EE 100%)",
          }}
        >
          Pas votre agenda
        </span>
      </h1>
    );
  }

  return (
    <h1 className="font-display max-w-[16ch] mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        style={{ ...baseStyle, color: "white" }}
      >
        Pilotez votre entreprise
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="bg-clip-text text-transparent"
        style={{
          ...baseStyle,
          backgroundImage: "linear-gradient(90deg, #A78BFA 0%, #22D3EE 100%)",
        }}
      >
        Pas votre agenda
      </motion.span>
    </h1>
  );
}

/* ---------------------------------------------------
 * Variante 2 — Word switcher rotation
 * --------------------------------------------------- */
function RotationTagline({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1
        className="font-display text-white"
        style={{
          fontWeight: 700,
          fontSize: "clamp(56px, 8vw, 96px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        Reprenez le contrôle
      </h1>
      <WordSwitcherTagline items={ROTATION_ITEMS} reduced={reduced} />
    </div>
  );
}

/* ---------------------------------------------------
 * Page
 * --------------------------------------------------- */
export default function HeroTaglineComparePage() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="bg-[#0A0A0F] text-white">
      {/* Inline keyframes for CTA gradient shift */}
      <style>{`
        @keyframes vt-cta-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .vt-cta-shift {
          background-image: linear-gradient(90deg, #8B5CF6 0%, #22D3EE 50%, #8B5CF6 100%);
          background-size: 200% 100%;
          animation: vt-cta-shift 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-cta-shift {
            animation: none;
            background-image: linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%);
            background-size: 100% 100%;
          }
        }
      `}</style>

      <StickyAnchorNav />

      {/* Variante 1 */}
      <section
        id="variante-1"
        className="relative min-h-screen w-full overflow-hidden"
      >
        <LazyBackground rootMargin="300px">
          <VideoBackground src={VIDEO_SRC} overlayOpacity={0.5} />
        </LazyBackground>
        <HeroShell>
          <StaticTagline reduced={reduced} />
        </HeroShell>
        <IdentificationCard
          num={1}
          title="Variante 1 — Statique"
          selected={selected === "variante-1"}
          onSelect={() => setSelected("variante-1")}
        />
      </section>

      {/* Variante 2 */}
      <section
        id="variante-2"
        className="relative min-h-screen w-full overflow-hidden"
      >
        <LazyBackground rootMargin="300px">
          <VideoBackground src={VIDEO_SRC} overlayOpacity={0.5} />
        </LazyBackground>
        <HeroShell>
          <RotationTagline reduced={reduced} />
        </HeroShell>
        <IdentificationCard
          num={2}
          title="Variante 2 — Word Switcher (rotation)"
          selected={selected === "variante-2"}
          onSelect={() => setSelected("variante-2")}
        />
      </section>
    </main>
  );
}
