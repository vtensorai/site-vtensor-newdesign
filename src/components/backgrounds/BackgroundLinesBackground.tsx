"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Background Lines — lignes verticales animées subtiles.
 * Inspiré Aceternity UI. Pure SVG + CSS.
 */
export function BackgroundLinesBackground({
  className,
}: {
  className?: string;
}) {
  const lines = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      x: (i + 0.5) * (100 / 18),
      delay: (i % 6) * 0.6,
      duration: 6 + (i % 4) * 1.2,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="vt-bgline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vt-bgline-static" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
        </defs>

        {/* lignes statiques fines */}
        {lines.map((l, i) => (
          <line
            key={`s-${i}`}
            x1={l.x}
            y1="0"
            x2={l.x}
            y2="100"
            stroke="url(#vt-bgline-static)"
            strokeWidth="0.06"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* lignes "lumineuses" qui descendent */}
        {lines
          .filter((_, i) => i % 3 === 0)
          .map((l, i) => (
            <line
              key={`l-${i}`}
              x1={l.x}
              y1="-20"
              x2={l.x}
              y2="0"
              stroke="url(#vt-bgline-grad)"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
              className="vt-bgline-anim"
              style={{
                animationDelay: `${l.delay}s`,
                animationDuration: `${l.duration}s`,
              }}
            />
          ))}
      </svg>

      <style jsx>{`
        @keyframes vt-bgline-fall {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(120%);
            opacity: 0;
          }
        }
        :global(.vt-bgline-anim) {
          animation-name: vt-bgline-fall;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.vt-bgline-anim) {
            animation: none;
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
