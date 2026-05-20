"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  travel: number;
  opacity: number;
};

/**
 * Floating particles background — slow violet/cyan dots drifting.
 * Reduced-motion: kills float animation, keeps dots static.
 */
export function ParticlesBackground({ className }: { className?: string }) {
  const particles = useMemo<Particle[]>(() => {
    // Deterministic-ish pseudo-random so SSR/CSR match: seed-based.
    const arr: Particle[] = [];
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 45; i++) {
      arr.push({
        left: rand() * 100,
        top: rand() * 100,
        size: 2 + rand() * 3,
        color: i % 2 === 0 ? "#A78BFA" : "#22D3EE",
        duration: 6 + rand() * 8,
        delay: rand() * 6,
        travel: 10 + rand() * 25,
        opacity: 0.3 + rand() * 0.4,
      });
    }
    return arr;
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="vt-particle pointer-events-none absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // CSS var consumed by keyframes
            ["--vt-travel" as string]: `${p.travel}px`,
          }}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(6,6,10,0.6) 100%)",
        }}
      />
    </div>
  );
}
