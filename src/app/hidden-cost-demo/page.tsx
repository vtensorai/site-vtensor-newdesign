"use client";

/**
 * /hidden-cost-demo
 *
 * Page de prévisualisation : 3 architectures narratives pour la section
 * "Le coût caché des tâches manuelles" empilées verticalement, avec une
 * sticky nav top-center pour ancrer rapidement à chaque option.
 *
 * Aucune dépendance au Hero principal (qui n'est pas modifié).
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiddenCostA } from "@/components/sections-demo/HiddenCostA";
import { HiddenCostB } from "@/components/sections-demo/HiddenCostB";
import { HiddenCostC } from "@/components/sections-demo/HiddenCostC";

const SECTIONS = [
  {
    id: "option-a",
    label: "Option A",
    title: "Sanjaya pure",
  },
  {
    id: "option-b",
    label: "Option B",
    title: "Sanjaya + compteur",
  },
  {
    id: "option-c",
    label: "Option C",
    title: "Sanjaya + cinématographique",
  },
  {
    id: "option-b-grid",
    label: "B + Grid",
    title: "Option B + Grid Interactif",
  },
];

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-2 py-2 rounded-full border border-white/10 bg-black/55 backdrop-blur-md flex gap-1">
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
        Preview · Le coût caché
      </span>
    </header>
  );
}

function SectionWrapper({
  id,
  letter,
  title,
  children,
}: {
  id: string;
  letter: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative">
      {/* Section divider top */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Sticky overlay label */}
      <div className="pointer-events-none sticky top-20 z-40 flex justify-center">
        <span className="pointer-events-auto inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[11px] uppercase tracking-[0.18em] text-white/70">
          <span className="font-semibold text-white">Option {letter}</span>
          <span className="h-3 w-px bg-white/15" />
          <span>{title}</span>
        </span>
      </div>

      {/* Actual content */}
      <div className="relative -mt-8">{children}</div>

      {/* Section divider bottom */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8" />
    </section>
  );
}

export default function HiddenCostDemoPage() {
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
          3 architectures pour la section &laquo;&nbsp;Coût caché&nbsp;&raquo;
        </h1>
        <p className="text-white/55 text-sm sm:text-base max-w-[60ch] mx-auto mt-4">
          3 versions inspirées de la section &laquo;&nbsp;Hidden Cost of Manual Work&nbsp;&raquo;
          de Sanjaya — pills flottantes autour de cercles concentriques, 5
          douleurs adaptées au dirigeant français.
        </p>
      </div>

      <SectionWrapper id="option-a" letter="A" title="Sanjaya pure">
        <HiddenCostA />
      </SectionWrapper>

      <SectionWrapper id="option-b" letter="B" title="Sanjaya + compteur">
        <HiddenCostB />
      </SectionWrapper>

      <SectionWrapper
        id="option-c"
        letter="C"
        title="Sanjaya + cinématographique"
      >
        <HiddenCostC />
      </SectionWrapper>

      <SectionWrapper
        id="option-b-grid"
        letter="B+"
        title="Option B + Grid Interactif"
      >
        <HiddenCostB withGrid />
      </SectionWrapper>

      <footer className="relative max-w-[1100px] mx-auto px-6 sm:px-10 py-16 text-center">
        <p className="text-white/45 text-xs uppercase tracking-[0.18em]">
          Preview Vtensor — comparatif éditorial
        </p>
      </footer>
    </main>
  );
}
