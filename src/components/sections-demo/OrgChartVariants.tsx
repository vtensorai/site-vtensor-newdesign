"use client";

/**
 * OrgChartVariants — 4 propositions de design d'organigramme.
 *
 * Inspirations :
 *  A — Constellation     : Notion, Linear (nodes + connections schémas tech)
 *  B — Floating Glass    : Vercel, Aceternity (cards glass + halos doux)
 *  C — Hierarchical Plate: Stripe Press, Apple (cards sur "scènes" éditoriales)
 *  D — Animated Beams    : Magic UI, Aceternity (particules qui circulent dans les lignes)
 */

import { useEffect, useRef, useState } from "react";
import { Star } from "@phosphor-icons/react/dist/ssr";
import type { Agent } from "@/data/agents";
import { AGENTS } from "@/data/agents";

const METIERS_COURTS: Record<string, string> = {
  "01": "Directeur Exécutif",
  "02": "Service après-vente",
  "03": "Commercial",
  "04": "Administration des ventes",
  "05": "Stratégique",
  "06": "Marketing",
  "07": "Webmaster",
};

// ─── A — Constellation Network (Notion / Linear vibes) ───────────────────────
// Nodes minimalistes, lignes très fines, points (•) aux jonctions.
// Très clean, presque schéma technique.

export function OrgChartA() {
  const subs = AGENTS.slice(1);
  const n = subs.length;
  const subCenters = subs.map((_, i) => ((i + 0.5) / n) * 100);
  const TRAIT_H = 64;
  const yMid = TRAIT_H / 2;

  return (
    <div className="flex flex-col items-center w-full max-w-[1100px] mx-auto">
      {/* DE node */}
      <NodeA agent={AGENTS[0]} master />

      {/* Connecteurs */}
      <div className="relative w-full" style={{ height: TRAIT_H }}>
        <svg width="100%" height={TRAIT_H} preserveAspectRatio="none" shapeRendering="geometricPrecision">
          <line x1="50%" y1="0" x2="50%" y2={yMid} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1={`${subCenters[0]}%`} y1={yMid} x2={`${subCenters[n - 1]}%`} y2={yMid} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          {subCenters.map((cx, i) => (
            <line key={i} x1={`${cx}%`} y1={yMid} x2={`${cx}%`} y2={TRAIT_H} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          ))}
          {/* Junction dot au centre du DE */}
          <circle cx="50%" cy={yMid} r="2.5" fill="#22D3EE" />
          {/* Junction dots à chaque sub */}
          {subCenters.map((cx, i) => (
            <circle key={i} cx={`${cx}%`} cy={yMid} r="1.5" fill="rgba(255,255,255,0.4)" />
          ))}
        </svg>
      </div>

      <div className="grid w-full gap-2.5" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {subs.map((a) => <NodeA key={a.num} agent={a} />)}
      </div>
    </div>
  );
}

function NodeA({ agent, master }: { agent: Agent; master?: boolean }) {
  const num = parseInt(agent.num, 10);
  return (
    <div
      className={[
        "inline-flex items-center gap-2.5 rounded-md border bg-[#0A0A0F]",
        master ? "px-5 py-3 border-white/15" : "px-3 py-2 border-white/10 w-full",
      ].join(" ")}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" aria-hidden />
      <span className={["font-mono text-white/40", master ? "text-[12px]" : "text-[10px]"].join(" ")}>
        0{num}
      </span>
      <span className={["text-white", master ? "font-display font-bold text-[15px]" : "font-medium text-[12px]"].join(" ")}>
        {METIERS_COURTS[agent.num]}
      </span>
      {master && <Star size={11} weight="fill" className="text-[#FBBF24] ml-1" />}
    </div>
  );
}

// ─── B — Floating Glass (Vercel / Aceternity vibes) ──────────────────────────
// Cards plus grosses avec halos lumineux, lignes gradient violet→cyan plus
// épaisses, glass effect sur les boxes.

export function OrgChartB() {
  const subs = AGENTS.slice(1);
  const n = subs.length;
  const subCenters = subs.map((_, i) => ((i + 0.5) / n) * 100);
  const TRAIT_H = 70;
  const yMid = TRAIT_H / 2;

  return (
    <div className="flex flex-col items-center w-full max-w-[1100px] mx-auto">
      <NodeB agent={AGENTS[0]} master />

      <div className="relative w-full" style={{ height: TRAIT_H }}>
        <svg width="100%" height={TRAIT_H} preserveAspectRatio="none">
          <defs>
            <linearGradient id="orgB-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <line x1="50%" y1="0" x2="50%" y2={yMid} stroke="url(#orgB-grad)" strokeWidth="1.5" />
          <line x1={`${subCenters[0]}%`} y1={yMid} x2={`${subCenters[n - 1]}%`} y2={yMid} stroke="url(#orgB-grad)" strokeWidth="1.5" />
          {subCenters.map((cx, i) => (
            <line key={i} x1={`${cx}%`} y1={yMid} x2={`${cx}%`} y2={TRAIT_H} stroke="url(#orgB-grad)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      <div className="grid w-full gap-3" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {subs.map((a) => <NodeB key={a.num} agent={a} />)}
      </div>
    </div>
  );
}

function NodeB({ agent, master }: { agent: Agent; master?: boolean }) {
  const num = parseInt(agent.num, 10);
  return (
    <div
      className={[
        "relative overflow-hidden",
        master ? "px-7 py-4 rounded-2xl" : "px-4 py-3 rounded-xl w-full",
      ].join(" ")}
      style={{
        background: master
          ? "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(139,92,246,0.08), rgba(34,211,238,0.06))"
          : "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(34,211,238,0.06))",
        border: master ? "1px solid rgba(251,191,36,0.30)" : "1px solid rgba(139,92,246,0.25)",
        backdropFilter: "blur(8px)",
        boxShadow: master ? "0 0 40px -10px rgba(251,191,36,0.25)" : "0 0 24px -10px rgba(139,92,246,0.20)",
      }}
    >
      {/* Halo doux */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: master
            ? "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.12), transparent 70%)"
            : "radial-gradient(circle at 50% 100%, rgba(34,211,238,0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/45">0{num}</span>
          {master && <Star size={11} weight="fill" className="text-[#FBBF24]" />}
        </div>
        <span
          className={[
            "font-display text-white",
            master ? "text-[18px] font-bold" : "text-[12.5px] font-semibold leading-tight",
          ].join(" ")}
        >
          {METIERS_COURTS[agent.num]}
        </span>
      </div>
    </div>
  );
}

// ─── C — Hierarchical Plate (Stripe Press / Apple) ───────────────────────────
// Cards sur 2 "scènes" horizontales. Lignes intégrées dans un canal/rail
// (effet PCB minimaliste, très éditorial).

export function OrgChartC() {
  const subs = AGENTS.slice(1);
  const n = subs.length;
  const subCenters = subs.map((_, i) => ((i + 0.5) / n) * 100);
  const TRAIT_H = 64;
  const yMid = TRAIT_H / 2;

  return (
    <div className="flex flex-col items-center w-full max-w-[1100px] mx-auto">
      {/* Plate 1 (DE) */}
      <div
        className="relative px-12 py-1 rounded-full"
        style={{
          background: "linear-gradient(180deg, rgba(20,20,28,0.9), rgba(10,10,15,0.95))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <NodeC agent={AGENTS[0]} master />
      </div>

      {/* Connecteur fin */}
      <div className="relative w-full" style={{ height: TRAIT_H }}>
        <svg width="100%" height={TRAIT_H} preserveAspectRatio="none" shapeRendering="crispEdges">
          <line x1="50%" y1="0" x2="50%" y2={yMid} stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" strokeDasharray="2 3" />
          <line x1={`${subCenters[0]}%`} y1={yMid} x2={`${subCenters[n - 1]}%`} y2={yMid} stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
          {subCenters.map((cx, i) => (
            <line key={i} x1={`${cx}%`} y1={yMid} x2={`${cx}%`} y2={TRAIT_H} stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" strokeDasharray="2 3" />
          ))}
        </svg>
      </div>

      {/* Plate 2 (subs) */}
      <div
        className="relative w-full px-3 py-3 rounded-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(20,20,28,0.7), rgba(10,10,15,0.85))",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="grid w-full gap-2" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {subs.map((a) => <NodeC key={a.num} agent={a} />)}
        </div>
      </div>
    </div>
  );
}

function NodeC({ agent, master }: { agent: Agent; master?: boolean }) {
  const num = parseInt(agent.num, 10);
  return (
    <div className={["flex flex-col items-center text-center", master ? "py-1.5" : "py-2"].join(" ")}>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[10px] text-white/35 leading-none">0{num}</span>
        {master && <Star size={10} weight="fill" className="text-[#FBBF24]" />}
      </div>
      <span
        className={[
          "font-display text-white mt-1 leading-tight",
          master ? "text-[16px] font-bold tracking-tight" : "text-[12px] font-semibold",
        ].join(" ")}
      >
        {METIERS_COURTS[agent.num]}
      </span>
    </div>
  );
}

// ─── D — Animated Beam (Magic UI / Aceternity vibes) ─────────────────────────
// Particules cyan qui circulent le long des connecteurs (animation lumineuse).
// Cards similaires à B mais avec un effet "tech/AI" plus marqué.

export function OrgChartD() {
  const subs = AGENTS.slice(1);
  const n = subs.length;
  const subCenters = subs.map((_, i) => ((i + 0.5) / n) * 100);
  const TRAIT_H = 70;
  const yMid = TRAIT_H / 2;

  return (
    <div className="flex flex-col items-center w-full max-w-[1100px] mx-auto">
      <NodeD agent={AGENTS[0]} master />

      <div className="relative w-full" style={{ height: TRAIT_H }}>
        <svg width="100%" height={TRAIT_H} preserveAspectRatio="none">
          {/* Lignes statiques en arrière-plan */}
          <line x1="50%" y1="0" x2="50%" y2={yMid} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1={`${subCenters[0]}%`} y1={yMid} x2={`${subCenters[n - 1]}%`} y2={yMid} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {subCenters.map((cx, i) => (
            <line key={i} x1={`${cx}%`} y1={yMid} x2={`${cx}%`} y2={TRAIT_H} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          ))}

          {/* Beam animé violet→cyan sur la ligne horizontale */}
          <line
            x1={`${subCenters[0]}%`}
            y1={yMid}
            x2={`${subCenters[n - 1]}%`}
            y2={yMid}
            stroke="url(#beam-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="1.6s" repeatCount="indefinite" />
          </line>
          <defs>
            <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              <animate attributeName="x1" values="-30%;100%" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="x2" values="0%;130%" dur="2.8s" repeatCount="indefinite" />
            </linearGradient>
          </defs>

          {/* Particule sur le trait DE descendant */}
          <circle r="2.5" fill="#22D3EE">
            <animate attributeName="cx" values="50%;50%" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="0" to={yMid} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="grid w-full gap-3" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {subs.map((a) => <NodeD key={a.num} agent={a} />)}
      </div>
    </div>
  );
}

function NodeD({ agent, master }: { agent: Agent; master?: boolean }) {
  const num = parseInt(agent.num, 10);
  return (
    <div
      className={[
        "relative overflow-hidden inline-flex items-center gap-3",
        master ? "px-6 py-4 rounded-2xl" : "px-4 py-3 rounded-xl w-full",
      ].join(" ")}
      style={{
        background: "rgba(8,8,12,0.95)",
        border: master ? "1px solid rgba(34,211,238,0.4)" : "1px solid rgba(34,211,238,0.18)",
        boxShadow: master
          ? "0 0 30px -8px rgba(34,211,238,0.3), inset 0 0 20px rgba(34,211,238,0.05)"
          : "inset 0 0 12px rgba(34,211,238,0.04)",
      }}
    >
      <span
        className="font-mono font-bold leading-none"
        style={{
          fontSize: master ? "16px" : "13px",
          color: "#22D3EE",
        }}
      >
        0{num}
      </span>
      <span className="w-px self-stretch bg-[#22D3EE]/25" aria-hidden />
      <span className="flex flex-col items-start gap-0.5">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 leading-none">Agent</span>
        <span
          className={[
            "font-display text-white leading-tight",
            master ? "text-[16px] font-bold" : "text-[12px] font-semibold",
          ].join(" ")}
        >
          {METIERS_COURTS[agent.num]}
        </span>
      </span>
      {master && <Star size={12} weight="fill" className="text-[#FBBF24] ml-2" />}
    </div>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

const VARIANTS = [
  {
    id: "A",
    name: "Constellation",
    inspiration: "Notion / Linear",
    desc: "Nodes minimalistes, lignes très fines, points aux jonctions. Vibe schéma technique propre.",
    Cmp: OrgChartA,
  },
  {
    id: "B",
    name: "Floating Glass",
    inspiration: "Vercel / Aceternity",
    desc: "Cards en glass effect avec halos doux, lignes gradient violet→cyan. Premium soft.",
    Cmp: OrgChartB,
  },
  {
    id: "C",
    name: "Hierarchical Plate",
    inspiration: "Stripe Press / Apple",
    desc: "Cards posées sur deux « scènes » horizontales, lignes pointillées discrètes. Très éditorial.",
    Cmp: OrgChartC,
  },
  {
    id: "D",
    name: "Animated Beams",
    inspiration: "Magic UI / Aceternity",
    desc: "Faisceau lumineux qui circule sur la ligne horizontale + particule sur le trait DE. Vibe AI tech.",
    Cmp: OrgChartD,
  },
];

export function OrgChartVariantsShowcase() {
  return (
    <section className="relative bg-[#0A0A0F] text-white py-20 px-5 sm:px-10">
      <div className="max-w-[1300px] mx-auto">
        <header className="text-center mb-16">
          <h1
            className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            4 directions{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              organigramme
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-[60ch] mx-auto">
            Même contenu, 4 traitements visuels. Chaque proposition est rendue à
            taille réelle pour juger de la lisibilité et de la prestance.
          </p>
        </header>

        <div className="flex flex-col gap-20">
          {VARIANTS.map(({ id, name, inspiration, desc, Cmp }) => (
            <div key={id}>
              <div className="mb-4 flex items-center gap-2 max-w-[1100px] mx-auto">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[12px] font-mono font-bold text-white/70">
                  {id}
                </span>
                <span className="font-display font-bold text-white text-[16px]">{name}</span>
                <span className="text-[12px] text-white/35 italic">· inspiration {inspiration}</span>
              </div>
              <p className="mb-8 max-w-[1100px] mx-auto text-[13px] text-white/55 leading-relaxed">
                {desc}
              </p>
              <Cmp />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
