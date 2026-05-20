"use client";

import { cn } from "@/lib/utils";

/**
 * Conic Gradient rotating background — slow lighthouse / scanner feel.
 * Reduced-motion: stops rotation.
 */
export function ConicGradientBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <div
        className="vt-conic-spin pointer-events-none absolute -inset-[40%]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.35) 90deg, transparent 180deg, rgba(34,211,238,0.35) 270deg, transparent 360deg)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(6,6,10,0.6) 100%)",
        }}
      />
    </div>
  );
}
