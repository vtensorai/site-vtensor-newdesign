"use client";

/**
 * /solution-demo
 *
 * Page de prévisualisation de la section Solution = "Catalogue des 7 agents".
 * 3 propositions empilées :
 *  - Option 1 : Alternance Stripe-style
 *  - Option 2 : Bento grid masonry
 *  - Option 3 : Tabs interactif (sidebar)
 *
 * Sticky nav top-center pour ancrer rapidement entre les 3 options.
 * Identification card bottom-right par section avec bouton "Sélectionner".
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { SolutionV1Stripe } from "@/components/sections-demo/SolutionV1Stripe";
import { SolutionV2Bento } from "@/components/sections-demo/SolutionV2Bento";
import { SolutionV3Tabs } from "@/components/sections-demo/SolutionV3Tabs";

const SECTIONS = [
  {
    id: "v1",
    label: "Option 1",
    title: "Alternance Stripe",
    desc: "Cards 2-col alternées gauche/droite. Flagship card mise en avant. Plus narratif.",
  },
  {
    id: "v2",
    label: "Option 2",
    title: "Bento masonry",
    desc: "Grille dense 1/2/3 col. Flagship en 2x2. Tous les agents visibles en 1-2 viewports.",
  },
  {
    id: "v3",
    label: "Option 3",
    title: "Tabs interactif",
    desc: "Sidebar style chat list. Auto-rotation 5 s. Une seule fenêtre immersive.",
  },
];

function StickyAnchorNav() {
  const [active, setActive] = useState<string>("v1");

  useEffect(() => {
    const handler = () => {
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, dist: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: s.id, dist: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.dist - b.dist);
      setActive(offsets[0].id);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-2 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex gap-1">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={[
            "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap",
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

function PageHeader() {
  return (
    <header className="relative z-50 w-full max-w-[1200px] mx-auto px-8 sm:px-12 py-6 flex items-center justify-between">
      <Link href="/" className="inline-flex items-center" aria-label="Vtensor">
        <Image
          src="/logos/vtensor-wordmark-white.svg"
          alt="Vtensor"
          width={112}
          height={28}
          priority
          className="h-7 w-auto"
        />
      </Link>
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
        Preview · Section Solution
      </span>
    </header>
  );
}

function IdentificationCard({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="pointer-events-auto fixed bottom-6 right-6 z-[55] hidden md:block">
      <div className="w-[300px] rounded-2xl border border-white/10 bg-black/75 backdrop-blur-md p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#22D3EE] font-semibold">
            {label}
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span className="text-[11px] text-white/55 font-medium">{title}</span>
        </div>
        <p className="text-[12px] text-white/65 leading-relaxed mb-3">{desc}</p>
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          style={{
            background: "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
          }}
          onClick={() => {
            // Simple feedback : surligne dans la console.
            // eslint-disable-next-line no-console
            console.log(`[solution-demo] Sélectionné : ${label} — ${title}`);
          }}
        >
          <CheckCircle size={14} weight="fill" />
          Sélectionner
        </button>
      </div>
    </div>
  );
}

function SectionWrapper({
  id,
  label,
  title,
  desc,
  children,
}: {
  id: string;
  label: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  // Identification card affichée par section : utilise IntersectionObserver
  // simple via classe `data-active` — on attache ici juste le label.
  return (
    <section id={id} className="relative" data-section-label={label}>
      {/* Section divider top */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Sticky overlay label */}
      <div className="pointer-events-none sticky top-20 z-40 flex justify-center">
        <span className="pointer-events-auto inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[11px] uppercase tracking-[0.18em] text-white/70">
          <span className="font-semibold text-white">{label}</span>
          <span className="h-3 w-px bg-white/15" />
          <span>{title}</span>
        </span>
      </div>

      {/* Actual content */}
      <div className="relative -mt-8">{children}</div>

      {/* Inline identification card (fallback mobile + footer per section) */}
      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 pb-16">
        <div className="md:hidden mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#22D3EE] font-semibold">
              {label}
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[11px] text-white/55 font-medium">
              {title}
            </span>
          </div>
          <p className="text-[12px] text-white/65 leading-relaxed mb-3">
            {desc}
          </p>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white"
            style={{
              background: "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
            }}
          >
            <CheckCircle size={14} weight="fill" />
            Sélectionner
          </button>
        </div>
      </div>

      {/* Section divider bottom */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export default function SolutionDemoPage() {
  // Identification card globale qui suit la section visible.
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  useEffect(() => {
    const handler = () => {
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { ...s, dist: Infinity };
        const rect = el.getBoundingClientRect();
        return { ...s, dist: Math.abs(rect.top - 200) };
      });
      offsets.sort((a, b) => a.dist - b.dist);
      setActiveSection(offsets[0]);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0A0A0F] text-white">
      <PageHeader />
      <StickyAnchorNav />

      {/* Intro */}
      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 pt-8 pb-12 text-center">
        <h1
          className="font-display text-white"
          style={{
            fontWeight: 700,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            letterSpacing: "-0.02em",
          }}
        >
          3 architectures pour la section Solution
        </h1>
        <p className="text-white/55 text-sm sm:text-base max-w-[60ch] mx-auto mt-4">
          Catalogue des 7 agents Vtensor. Mêmes données, 3 mises en forme. À
          comparer pour choisir celle qui sert le mieux le storytelling
          commercial.
        </p>
      </div>

      <SectionWrapper
        id="v1"
        label={SECTIONS[0].label}
        title={SECTIONS[0].title}
        desc={SECTIONS[0].desc}
      >
        <SolutionV1Stripe />
      </SectionWrapper>

      <SectionWrapper
        id="v2"
        label={SECTIONS[1].label}
        title={SECTIONS[1].title}
        desc={SECTIONS[1].desc}
      >
        <SolutionV2Bento />
      </SectionWrapper>

      <SectionWrapper
        id="v3"
        label={SECTIONS[2].label}
        title={SECTIONS[2].title}
        desc={SECTIONS[2].desc}
      >
        <SolutionV3Tabs />
      </SectionWrapper>

      {/* Floating identification card (desktop) — suit la section visible */}
      <IdentificationCard
        label={activeSection.label}
        title={activeSection.title}
        desc={activeSection.desc}
      />

      <footer className="relative max-w-[1100px] mx-auto px-6 sm:px-10 py-16 text-center">
        <p className="text-white/45 text-xs uppercase tracking-[0.18em]">
          Preview Vtensor — comparatif Solution catalogue
        </p>
      </footer>
    </main>
  );
}
