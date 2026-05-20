"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Background Boxes — inspiré Aceternity UI.
 * Grille de cellules qui s'illuminent au survol (CSS pur via :hover).
 * Couleurs Vtensor (violet/cyan), grille en perspective légère.
 */
const ROWS = 14;
const COLS = 24;

export function BackgroundBoxesBackground({ className }: { className?: string }) {
  const cells = useMemo(
    () => Array.from({ length: ROWS * COLS }, (_, i) => i),
    []
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            width: "140%",
            height: "140%",
            transform: "rotateX(28deg) rotateY(0deg) rotateZ(-22deg) translateY(2%)",
          }}
        >
          {cells.map((i) => (
            <div
              key={i}
              className="vt-box-cell border-l border-t border-white/[0.05]"
            />
          ))}
        </div>
      </div>

      {/* Style local — CSS uniquement, hover illumination */}
      <style jsx>{`
        .vt-box-cell {
          transition:
            background-color 80ms ease-out,
            box-shadow 200ms ease-out;
        }
        .vt-box-cell:hover {
          background: rgba(139, 92, 246, 0.55);
          box-shadow: 0 0 16px 1px rgba(34, 211, 238, 0.6);
          transition: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-box-cell {
            transition: none;
          }
        }
      `}</style>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(6,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
