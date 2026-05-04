"use client";

import { cn } from "@/lib/utils";

/**
 * Beams Background — diagonal violet/cyan beams flowing.
 * Inspired by Aceternity Background Beams.
 * Reduced-motion: stops translation.
 */
export function BeamsBackground({ className }: { className?: string }) {
  const beams = Array.from({ length: 7 });
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {beams.map((_, i) => (
        <div
          key={i}
          className="vt-beam pointer-events-none absolute -left-1/2 top-0 h-[140%] w-[2px]"
          style={{
            transform: `rotate(20deg) translateY(${i * 14}%)`,
            left: `${-30 + i * 18}%`,
            background:
              i % 2 === 0
                ? "linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.55) 35%, rgba(34,211,238,0.55) 65%, transparent 100%)"
                : "linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.45) 30%, rgba(167,139,250,0.45) 70%, transparent 100%)",
            opacity: 0.5,
            animationDelay: `${i * 1.4}s`,
          }}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
