"use client";

/**
 * SectionDivider — Séparateur dashboard-style entre deux sections.
 *
 * Rend un label mono `// label` centré avec des lignes horizontales fines
 * de part et d'autre, façon "breadcrumb de section" du dashboard app.vtensor.ai.
 *
 * Usage : intercaler entre Hero et HiddenCostB, ou tout autre couple de
 * sections où on veut marquer un changement de chapitre.
 */

type Props = {
  label: string;
  /** Couleur d'accent du label (par défaut cyan #22D3EE). */
  accent?: string;
};

export function SectionDivider({ label, accent = "#22D3EE" }: Props) {
  return (
    <div
      className="relative w-full py-10 md:py-14 flex items-center justify-center px-6"
      aria-hidden
    >
      <div className="flex items-center gap-4 w-full max-w-[640px]">
        <div className="flex-1 h-px" style={{ background: `${accent}26` }} />
        <span
          className="text-[11px] uppercase tracking-[0.28em] font-semibold whitespace-nowrap"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
            color: accent,
          }}
        >
          // {label}
        </span>
        <div className="flex-1 h-px" style={{ background: `${accent}26` }} />
      </div>
    </div>
  );
}
