"use client";

/**
 * OrgChartCompact — organigramme animé (variante D — Animated Beams).
 *
 * Layout vertical (2026-09-07, plus de Directeur Exécutif) :
 *   - « Vous » (le dirigeant) en haut : vous parlez à chaque agent en direct
 *   - Les agents en row (grid N colonnes égales) + case « Votre poste »
 *
 * Connecteurs SVG : lignes statiques fines, beam horizontal animé cyan,
 * particule qui descend de « Vous » vers les agents.
 *
 * Cliquer sur une box agent change l'`activeIdx` (synchronisation avec les tabs).
 * Caché sur mobile (lg:flex hidden).
 */

import { Plus, User } from "@phosphor-icons/react/dist/ssr";
import type { Agent } from "@/data/agents";
import { AUDIT_URL } from "@/lib/links";

type Props = {
  agents: readonly Agent[];
  activeIdx: number;
  onAgentClick?: (idx: number) => void;
  /** Mode dashboard : acronymes colorés (SAV/ATC/...) en couleur d'accent par agent, au lieu du numéro cyan. */
  coloredAcronyms?: boolean;
  /** Ajoute une case en pointillés « Votre poste » (agents développés sur mesure). */
  showCustomSlot?: boolean;
};

const METIERS_COURTS: Record<string, string> = {
  "01": "Service après-vente",
  "02": "Commercial",
  "03": "Administration des ventes",
  "04": "Webmaster",
  "05": "Marketing",
  "06": "Standardiste",
};

const TRAIT_HEIGHT = 70;

/** Box du haut : le dirigeant. Non cliquable — c'est le lecteur. */
function YouBox() {
  return (
    <div
      className="relative inline-flex items-center gap-3 px-6 py-4"
      style={{
        background: "rgba(8,8,12,0.95)",
        border: "1px solid rgba(139,92,246,0.55)",
        boxShadow:
          "0 0 40px -8px rgba(139,92,246,0.45), inset 0 0 20px rgba(139,92,246,0.06)",
      }}
      aria-label="Vous, le dirigeant"
    >
      <span
        className="inline-flex items-center justify-center"
        style={{
          minWidth: 46,
          padding: "6px 10px",
          color: "#8B5CF6",
          background: "rgba(139,92,246,0.10)",
          border: "1px solid rgba(139,92,246,0.4)",
        }}
      >
        <User size={16} weight="bold" />
      </span>

      <span className="w-px self-stretch bg-[#8B5CF6]/25" aria-hidden />

      <span className="flex flex-col items-start gap-1 text-left">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#8B5CF6] font-semibold leading-none">
          Votre entreprise
        </span>
        <span className="font-display font-bold text-white text-[17px] leading-tight tracking-[-0.01em] whitespace-nowrap">
          Vous
        </span>
      </span>
    </div>
  );
}

function SubAgentBox({
  agent,
  active,
  onClick,
  coloredAcronyms = false,
  compact = false,
}: {
  agent: Agent;
  active: boolean;
  onClick?: () => void;
  coloredAcronyms?: boolean;
  /** 7 colonnes (case « Votre poste ») : paddings/gaps réduits pour que les libellés tiennent. */
  compact?: boolean;
}) {
  const num = parseInt(agent.num, 10);
  const accent = agent.accent || "#22D3EE";
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative overflow-hidden inline-flex items-stretch",
        compact ? "gap-2 px-2.5 py-2.5 w-full" : "gap-3 px-3.5 py-2.5 w-full",
        coloredAcronyms ? "" : "rounded-xl",
        "transition-all duration-200",
        "bg-[#08080c]/95 hover:bg-[#16161c]/95",
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]/40",
        active ? "-translate-y-0.5" : "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
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
            minWidth: compact ? 32 : 38,
            padding: compact ? "4px 4px" : "4px 6px",
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
        <span
          className={[
            "font-display font-semibold text-white leading-tight tracking-[-0.005em] break-words [hyphens:auto]",
            compact ? "text-[12px]" : "text-[12.5px]",
          ].join(" ")}
          lang="fr"
        >
          {METIERS_COURTS[agent.num] ?? agent.name}
        </span>
      </span>
    </button>
  );
}

function CustomSlotBox() {
  return (
    <a
      href={AUDIT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "relative inline-flex items-stretch gap-2 px-2.5 py-2.5 w-full group",
        "transition-all duration-200 hover:-translate-y-0.5 cursor-pointer",
        "bg-[#08080c]/60 hover:bg-[#16161c]/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]/40",
      ].join(" ")}
      style={{
        border: "1px dashed rgba(255,255,255,0.28)",
      }}
      aria-label="Votre poste sur mesure — réserver un audit"
    >
      <span
        className="inline-flex items-center justify-center font-mono font-bold leading-none self-center text-white/70 group-hover:text-[#22D3EE] transition-colors"
        style={{ minWidth: 32, padding: "4px 4px", fontSize: "10px", border: "1px dashed rgba(255,255,255,0.3)" }}
      >
        <Plus size={11} weight="bold" />
      </span>
      <span className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.15)" }} aria-hidden />
      <span className="flex flex-col items-start gap-0.5 text-left min-w-0 flex-1">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/45 font-semibold leading-none">
          Sur mesure
        </span>
        <span className="font-display font-semibold text-white/85 group-hover:text-white text-[12.5px] leading-tight tracking-[-0.005em] transition-colors">
          Votre poste
        </span>
      </span>
    </a>
  );
}

export function OrgChartCompact({
  agents,
  activeIdx,
  onAgentClick,
  coloredAcronyms = false,
  showCustomSlot = false,
}: Props) {
  const n = agents.length + (showCustomSlot ? 1 : 0);
  const weights = Array.from({ length: n }, (_, i) => (showCustomSlot && i === n - 1 ? 0.85 : 1));
  const totalW = weights.reduce((a, b) => a + b, 0);
  const subCenters = weights.map((w, i) => {
    const before = weights.slice(0, i).reduce((a, b) => a + b, 0);
    return ((before + w / 2) / totalW) * 100;
  });
  const firstCx = subCenters[0];
  const lastCx = subCenters[subCenters.length - 1];
  const yMid = TRAIT_HEIGHT / 2;

  return (
    <div
      className="hidden lg:flex flex-col items-center mb-14 w-full max-w-[1100px] mx-auto"
      aria-label="Organigramme de votre équipe IA"
    >
      {/* Vous en haut */}
      <YouBox />

      {/* Zone des connecteurs animés */}
      <div className="relative w-full" style={{ height: TRAIT_HEIGHT }} aria-hidden>
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

          {/* Particule qui descend en boucle de « Vous » vers les agents */}
          <circle r="2.5" fill="#8B5CF6">
            <animate attributeName="cx" values="50%;50%" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="0" to={yMid} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Row des agents (+ case « Votre poste ») */}
      <div
        className={showCustomSlot ? "grid w-full gap-2" : "grid w-full gap-2.5"}
        style={{
          gridTemplateColumns: showCustomSlot
            ? `repeat(${agents.length}, 1fr) 0.85fr`
            : `repeat(${n}, 1fr)`,
        }}
      >
        {agents.map((agent, i) => (
          <SubAgentBox
            key={agent.num}
            agent={agent}
            active={activeIdx === i}
            onClick={() => onAgentClick?.(i)}
            coloredAcronyms={coloredAcronyms}
            compact={showCustomSlot}
          />
        ))}
        {showCustomSlot && <CustomSlotBox />}
      </div>
    </div>
  );
}
