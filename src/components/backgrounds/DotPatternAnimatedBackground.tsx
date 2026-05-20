"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Dot Pattern (animated variant) — points qui pulsent en vague depuis le centre.
 * Magic UI variant. SVG + CSS animations.
 */
export function DotPatternAnimatedBackground({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // Décale la position du masque radial pour faire pulser la matrice
      const scale = 1 + Math.sin(t * 0.6) * 0.12;
      node.style.setProperty("--dot-scale", scale.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Halo pulsant */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle calc(50vmin * var(--dot-scale, 1)) at 50% 50%, rgba(34,211,238,0.18) 0%, rgba(139,92,246,0.18) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
