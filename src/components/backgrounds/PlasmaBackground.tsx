"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Plasma — plasma fluide.
 * Inspiré ReactBits. SVG <feTurbulence> rapide avec scale élevé sur
 * gradients saturés violet/cyan.
 */
export function PlasmaBackground({ className }: { className?: string }) {
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
      const f = 0.012 + Math.sin(t * 0.2) * 0.004;
      const fy = 0.014 + Math.cos(t * 0.18) * 0.004;
      if (turbRef.current) {
        turbRef.current.setAttribute(
          "baseFrequency",
          `${f.toFixed(5)} ${fy.toFixed(5)}`
        );
        turbRef.current.setAttribute("seed", String(Math.floor(t * 14)));
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
            id="vt-plasma-filter"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.012 0.014"
              numOctaves="4"
              seed="0"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="220"
              xChannelSelector="R"
              yChannelSelector="G"
              result="disp"
            />
            <feGaussianBlur in="disp" stdDeviation="10" />
          </filter>

          <radialGradient id="vt-plasma-violet" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vt-plasma-cyan" cx="70%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vt-plasma-magenta" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A21CAF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g filter="url(#vt-plasma-filter)">
          <rect x="-10%" y="-10%" width="120%" height="120%" fill="#06060A" />
          <rect
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            fill="url(#vt-plasma-violet)"
            style={{ mixBlendMode: "screen" }}
          />
          <rect
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            fill="url(#vt-plasma-cyan)"
            style={{ mixBlendMode: "screen" }}
          />
          <rect
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            fill="url(#vt-plasma-magenta)"
            style={{ mixBlendMode: "screen" }}
          />
        </g>
      </svg>
    </div>
  );
}
