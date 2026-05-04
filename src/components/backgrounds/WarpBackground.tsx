"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Warp Background — effet warp/déformation, traits qui filent vers un point central.
 * Inspiré Magic UI. Pure CSS animations sur des barres rotatives.
 */
const BEAMS = 24;

export function WarpBackground({ className }: { className?: string }) {
  const beams = useMemo(
    () =>
      Array.from({ length: BEAMS }, (_, i) => ({
        rotate: (i * 360) / BEAMS,
        delay: (i % 6) * 0.18,
        duration: 3 + (i % 4) * 0.6,
      })),
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[200vmax] w-[200vmax]">
          {beams.map((b, i) => (
            <span
              key={i}
              className="vt-warp-beam absolute left-1/2 top-1/2"
              style={{
                width: "1px",
                height: "100%",
                background:
                  i % 3 === 0
                    ? "linear-gradient(to top, transparent 0%, rgba(34,211,238,0.7) 50%, transparent 100%)"
                    : "linear-gradient(to top, transparent 0%, rgba(139,92,246,0.6) 50%, transparent 100%)",
                transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,
                transformOrigin: "50% 50%",
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 5%, rgba(6,6,10,0.95) 70%)",
        }}
      />

      <style jsx>{`
        @keyframes vt-warp-pulse {
          0%,
          100% {
            opacity: 0.2;
            filter: blur(0px);
          }
          50% {
            opacity: 0.95;
            filter: blur(1px);
          }
        }
        .vt-warp-beam {
          animation: vt-warp-pulse ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-warp-beam {
            animation: none;
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
