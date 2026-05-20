"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Meteors — pluie de météores diagonaux.
 * Inspiré Aceternity UI. Pure CSS animations.
 */
export function MeteorsBackground({ className }: { className?: string }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
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
      {/* Halo violet de fond */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(139,92,246,0.18), transparent 60%)",
        }}
      />

      {meteors.map((m) => (
        <span
          key={m.id}
          className="vt-meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        .vt-meteor {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 9999px;
          background: #ffffff;
          box-shadow: 0 0 8px 1px #ffffff;
          transform: rotate(215deg);
          animation: vt-meteor-fall linear infinite;
        }
        .vt-meteor::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 80px;
          height: 1px;
          background: linear-gradient(
            90deg,
            #22d3ee,
            rgba(139, 92, 246, 0.6),
            transparent
          );
        }
        @keyframes vt-meteor-fall {
          0% {
            transform: translate(0, 0) rotate(215deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          100% {
            transform: translate(-700px, 700px) rotate(215deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-meteor {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
