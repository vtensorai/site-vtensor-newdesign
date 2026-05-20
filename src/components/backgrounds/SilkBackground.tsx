"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Silk — surface "soie" qui ondule.
 * Inspiré ReactBits. SVG turbulence + gradient diagonal violet→cyan, blur.
 */
export function SilkBackground({ className }: { className?: string }) {
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
      const f = 0.003 + Math.sin(t * 0.04) * 0.0007;
      const fy = 0.004 + Math.cos(t * 0.05) * 0.0007;
      if (turbRef.current) {
        turbRef.current.setAttribute(
          "baseFrequency",
          `${f.toFixed(5)} ${fy.toFixed(5)}`
        );
        turbRef.current.setAttribute("seed", String(Math.floor(t * 4)));
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
            id="vt-silk-filter"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.003 0.004"
              numOctaves="2"
              seed="0"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="180"
              xChannelSelector="R"
              yChannelSelector="G"
              result="disp"
            />
            <feGaussianBlur in="disp" stdDeviation="3" />
          </filter>
          <linearGradient id="vt-silk-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>
        <g filter="url(#vt-silk-filter)">
          <rect
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            fill="url(#vt-silk-grad)"
          />
        </g>
      </svg>
      {/* Reflet soyeux */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
