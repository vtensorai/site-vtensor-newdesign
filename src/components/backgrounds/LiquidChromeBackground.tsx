"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Liquid Chrome — surface chrome qui ondule.
 * Inspiré ReactBits. SVG <feTurbulence> distordant un gradient miroir
 * (technique similaire à MistBackground, palette différente).
 */
export function LiquidChromeBackground({ className }: { className?: string }) {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const baseX = 0.005 + Math.sin(t * 0.06) * 0.002;
      const baseY = 0.006 + Math.cos(t * 0.05) * 0.002;
      if (turbRef.current) {
        turbRef.current.setAttribute(
          "baseFrequency",
          `${baseX.toFixed(5)} ${baseY.toFixed(5)}`
        );
        turbRef.current.setAttribute("seed", String(Math.floor(t * 6)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
      >
        <defs>
          <filter
            id="vt-chrome-filter"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.005 0.006"
              numOctaves="3"
              seed="0"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="140"
              xChannelSelector="R"
              yChannelSelector="G"
              result="disp"
            />
            <feGaussianBlur in="disp" stdDeviation="6" />
          </filter>

          <linearGradient id="vt-chrome-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F0F1A" />
            <stop offset="20%" stopColor="#A78BFA" />
            <stop offset="40%" stopColor="#22D3EE" />
            <stop offset="55%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#22D3EE" />
            <stop offset="85%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#0F0F1A" />
          </linearGradient>
        </defs>

        <g filter="url(#vt-chrome-filter)">
          <rect
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            fill="url(#vt-chrome-grad)"
          />
        </g>
      </svg>

      {/* Reflet doux */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
