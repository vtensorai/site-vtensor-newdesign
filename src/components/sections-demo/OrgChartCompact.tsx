"use client";

/**
 * OrgChartCompact — vue organigramme animée (variante D — Animated Beams).
 *
 * Layout vertical hiérarchique :
 *   - Directeur Exécutif en haut (box plus grande, accent ambre)
 *   - 6 sub-agents en row (grid 6 colonnes égales)
 *
 * Connecteurs en SVG :
 *   - Lignes statiques fines (rgba blanc 15%)
 *   - Beam horizontal animé (gradient cyan qui circule sur la barre)
 *   - Particule cyan qui descend en boucle sur le trait DE
 *
 * Cliquer sur une box change l'`activeIdx` (synchronisation avec les tabs).
 * Caché sur mobile (lg:flex hidden).
 */

import { Star } from "@phosphor-icons/react/dist/ssr";
import type { Agent } from "@/data/agents";

type Props = {
  agents: readonly Agent[];
  activeIdx: number;
  onAgentClick?: (idx: number) => void;
  /** Mode dashboard : acronymes colorés (CEO/SAV/ATC/...) en couleur d'accent par agent, au lieu du numéro cyan. */
  coloredAcronyms?: boolean;
};

const METIERS_COURTS: Record<string, string> = {
  "01": "Directeur Exécutif",
  "02": "Service après-vente",
  "03": "Commercial",
  "04": "Administration des ventes",
  "05": "Webmaster",
  "06": "Marketing",
  "07": "Standardiste",
};

const TRAIT_HEIGHT = 70;

function MasterBox({
  agent,
  active,
  onClick,
  coloredAcronyms = false,
}: {
  agent: Agent;
  active: boolean;
  onClick?: () => void;
  coloredAcronyms?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative overflow-hidden inline-flex items-center gap-3",
        "px-6 py-4",
        coloredAcronyms ? "" : "rounded-2xl",
        "transition-all duration-200",
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/40",
        active ? "-translate-y-0.5" : "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
        background: "rgba(8,8,12,0.95)",
        border: active
          ? "1px solid rgba(251,191,36,0.65)"
          : "1px solid rgba(251,191,36,0.4)",
        boxShadow: active
          ? "0 0 40px -8px rgba(251,191,36,0.45), inset 0 0 20px rgba(251,191,36,0.06)"
          : "0 0 30px -10px rgba(251,191,36,0.30), inset 0 0 16px rgba(34,211,238,0.04)",
      }}
    >
      {/* Acronyme / Numéro */}
      {coloredAcronyms && agent.acronym ? (
        <span
          className="inline-flex items-center justify-center font-mono font-bold leading-none"
          style={{
            minWidth: 46,
            padding: "6px 10px",
            fontSize: "13px",
            color: agent.accent || "#22D3EE",
            background: `${agent.accent || "#22D3EE"}10`,
            border: `1px solid ${agent.accent || "#22D3EE"}40`,
          }}
        >
          {agent.acronym}
        </span>
      ) : (
        <span
          className="font-mono font-bold leading-none text-[#22D3EE]"
          style={{ fontSize: "20px" }}
        >
          01
        </span>
      )}

      <span className="w-px self-stretch bg-[#22D3EE]/25" aria-hidden />

      {/* Bloc texte 2 lignes */}
      <span className="flex flex-col items-start gap-1 text-left">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#FBBF24] font-semibold leading-none flex items-center gap-1">
          Agent maître
        </span>
        <span className="font-display font-bold text-white text-[17px] leading-tight tracking-[-0.01em] whitespace-nowrap">
          {METIERS_COURTS[agent.num] ?? agent.name}
        </span>
      </span>

      <Star
        size={13}
        weight="fill"
        className="text-[#FBBF24] ml-2 shrink-0"
        aria-label="Agent maître"
      />
    </button>
  );
}

function SubAgentBox({
  agent,
  active,
  onClick,
  coloredAcronyms = false,
}: {
  agent: Agent;
  active: boolean;
  onClick?: () => void;
  coloredAcronyms?: boolean;
}) {
  const num = parseInt(agent.num, 10);
  const accent = agent.accent || "#22D3EE";
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative overflow-hidden inline-flex items-stretch gap-3",
        "px-3.5 py-2.5 w-full",
        coloredAcronyms ? "" : "rounded-xl",
        "transition-all duration-200",
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]/40",
        active ? "-translate-y-0.5" : "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
        background: "rgba(8,8,12,0.95)",
        border: active
          ? coloredAcronyms
            ? `1px solid ${accent}80`
            : "1px solid rgba(34,211,238,0.5)"
          : coloredAcronyms
            ? `1px solid ${accent}30`
            : "1px solid rgba(34,211,238,0.18)",
        boxShadow: active
          ? coloredAcronyms
            ? `0 0 24px -6px ${accent}60, inset 0 0 14px ${accent}10`
            : "0 0 24px -6px rgba(34,211,238,0.35), inset 0 0 14px rgba(34,211,238,0.06)"
          : coloredAcronyms
            ? `inset 0 0 12px ${accent}08`
            : "inset 0 0 12px rgba(34,211,238,0.04)",
      }}
    >
      {/* Acronyme / Numéro */}
      {coloredAcronyms && agent.acronym ? (
        <span
          className="inline-flex items-center justify-center font-mono font-bold leading-none self-center"
          style={{
            minWidth: 38,
            padding: "4px 6px",
            fontSize: "10px",
            color: accent,
            background: `${accent}10`,
            border: `1px solid ${accent}40`,
          }}
        >
          {agent.acronym}
        </span>
      ) : (
        <span
          className="font-mono font-bold leading-none self-center text-[#22D3EE]"
          style={{ fontSize: "14px" }}
        >
          0{num}
        </span>
      )}

      <span
        className="w-px self-stretch"
        style={{ background: coloredAcronyms ? `${accent}30` : "rgba(34,211,238,0.25)" }}
        aria-hidden
      />

      <span className="flex flex-col items-start gap-0.5 text-left min-w-0 flex-1">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/45 font-semibold leading-none">
          Agent
        </span>
        <span className="font-display font-semibold text-white text-[12.5px] leading-tight tracking-[-0.005em]">
          {METIERS_COURTS[agent.num] ?? agent.name}
        </span>
      </span>
    </button>
  );
}

export function OrgChartCompact({ agents, activeIdx, onAgentClick, coloredAcronyms = false }: Props) {
  const master = agents[0];
  const subs = agents.slice(1);
  const n = subs.length;
  const subCenters = subs.map((_, i) => ((i + 0.5) / n) * 100);
  const firstCx = subCenters[0];
  const lastCx = subCenters[subCenters.length - 1];
  const yMid = TRAIT_HEIGHT / 2;

  return (
    <div
      className="hidden lg:flex flex-col items-center mb-14 w-full max-w-[1100px] mx-auto"
      aria-label="Organigramme de l'équipe Vtensor"
    >
      {/* DE en haut */}
      <MasterBox
        agent={master}
        active={activeIdx === 0}
        onClick={() => onAgentClick?.(0)}
        coloredAcronyms={coloredAcronyms}
      />

      {/* Zone des connecteurs animés */}
      <div
        className="relative w-full"
        style={{ height: TRAIT_HEIGHT }}
        aria-hidden
      >
        <svg width="100%" height={TRAIT_HEIGHT} preserveAspectRatio="none" className="block">
          {/* Lignes statiques en arrière-plan (blanc 15%) */}
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2={yMid}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            shapeRendering="crispEdges"
          />
          <line
            x1={`${firstCx}%`}
            y1={yMid}
            x2={`${lastCx}%`}
            y2={yMid}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            shapeRendering="crispEdges"
          />
          {subCenters.map((cx, i) => (
            <line
              key={i}
              x1={`${cx}%`}
              y1={yMid}
              x2={`${cx}%`}
              y2={TRAIT_HEIGHT}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              shapeRendering="crispEdges"
            />
          ))}

          {/* Gradient animé qui circule sur la ligne horizontale */}
          <defs>
            <linearGradient id="orgChart-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              <animate attributeName="x1" values="-30%;100%" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="x2" values="0%;130%" dur="2.8s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
          <line
            x1={`${firstCx}%`}
            y1={yMid}
            x2={`${lastCx}%`}
            y2={yMid}
            stroke="url(#orgChart-beam-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Particule cyan qui descend en boucle sur le trait DE */}
          <circle r="2.5" fill="#22D3EE">
            <animate attributeName="cx" values="50%;50%" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="0" to={yMid} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Row des sub-agents */}
      <div
        className="grid w-full gap-2.5"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {subs.map((agent, i) => {
          const realIdx = i + 1;
          return (
            <SubAgentBox
              key={agent.num}
              agent={agent}
              active={activeIdx === realIdx}
              onClick={() => onAgentClick?.(realIdx)}
              coloredAcronyms={coloredAcronyms}
            />
          );
        })}
      </div>
    </div>
  );
}
