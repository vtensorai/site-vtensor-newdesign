"use client";

import { cn } from "@/lib/utils";

/**
 * Lamp Effect — inspiré Aceternity UI.
 * Effet de lampe qui éclaire d'en haut, très dramatique.
 * Pure CSS (gradients + blur), animation reduced-motion safe.
 */
export function LampBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {/* Cône de lumière du haut */}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2">
        {/* Halo principal violet */}
        <div
          className="absolute inset-0 vt-lamp-pulse"
          style={{
            background:
              "conic-gradient(from 90deg at 50% -10%, transparent 0deg, rgba(139,92,246,0.55) 30deg, rgba(34,211,238,0.55) 60deg, transparent 90deg)",
            filter: "blur(40px)",
            opacity: 0.95,
          }}
        />
        {/* Mince barre lumineuse */}
        <div
          className="absolute left-1/2 top-[36%] h-[2px] w-[60%] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #22D3EE 35%, #8B5CF6 65%, transparent 100%)",
            boxShadow:
              "0 0 24px 4px rgba(139,92,246,0.6), 0 0 48px 8px rgba(34,211,238,0.4)",
          }}
        />
      </div>

      {/* Sol sombre */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          background:
            "linear-gradient(to top, #06060A 30%, rgba(6,6,10,0.4) 70%, transparent 100%)",
        }}
      />

      <style jsx>{`
        @keyframes vt-lamp-pulse {
          0%,
          100% {
            opacity: 0.85;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.04);
          }
        }
        .vt-lamp-pulse {
          animation: vt-lamp-pulse 6s ease-in-out infinite;
          transform-origin: 50% 0%;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-lamp-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
