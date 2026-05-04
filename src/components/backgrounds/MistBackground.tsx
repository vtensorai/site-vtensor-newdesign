"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Mist Background v2 — vraie fumée organique via SVG <feTurbulence> + <feDisplacementMap>.
 *
 * Technique :
 * - <feTurbulence type="fractalNoise"> génère un bruit de Perlin natif (même
 *   technique que les fumées des jeux vidéo) — l'attribut `seed` est animé via
 *   requestAnimationFrame pour faire évoluer la texture en continu.
 * - `baseFrequency` oscille très lentement (sin) pour créer un effet de
 *   respiration / vagues larges.
 * - <feDisplacementMap> distord les gradients de couleur (violet/cyan/blanc)
 *   en suivant ce bruit → résultat : volutes de fumée volumineuses.
 * - <feGaussianBlur> adoucit les bords pour un rendu vaporeux, pas pixelisé.
 * - Deux filtres en parallèle (`scale` 90 et 140) pour ajouter de la profondeur.
 *
 * Reduced-motion : l'animation est désactivée si l'utilisateur a activé la
 * préférence `prefers-reduced-motion: reduce`.
 */
export function MistBackground({ className }: { className?: string }) {
  const turbulenceARef = useRef<SVGFETurbulenceElement>(null);
  const turbulenceBRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000; // secondes

      // Couche A — fumée principale (vagues larges)
      // baseFrequency oscille lentement entre 0.006 et 0.012 → effet "respiration"
      const baseA = 0.009 + Math.sin(elapsed * 0.08) * 0.003;
      // freq Y légèrement différente pour casser la symétrie
      const baseAY = 0.011 + Math.cos(elapsed * 0.07) * 0.003;

      if (turbulenceARef.current) {
        turbulenceARef.current.setAttribute(
          "baseFrequency",
          `${baseA.toFixed(5)} ${baseAY.toFixed(5)}`
        );
        // seed change rapidement → texture qui "tourne"
        turbulenceARef.current.setAttribute(
          "seed",
          String(Math.floor(elapsed * 8))
        );
      }

      // Couche B — texture fine de surface (grain)
      const baseB = 0.018 + Math.sin(elapsed * 0.12 + 1.5) * 0.004;
      const baseBY = 0.022 + Math.cos(elapsed * 0.1 + 0.5) * 0.004;

      if (turbulenceBRef.current) {
        turbulenceBRef.current.setAttribute(
          "baseFrequency",
          `${baseB.toFixed(5)} ${baseBY.toFixed(5)}`
        );
        turbulenceBRef.current.setAttribute(
          "seed",
          String(Math.floor(elapsed * 12) + 100)
        );
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {/* Couche A — fumée principale, volutes larges, scale fort */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="vt-mist-filter-a"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              ref={turbulenceARef}
              type="fractalNoise"
              baseFrequency="0.009 0.011"
              numOctaves="3"
              seed="0"
              result="turbA"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbA"
              scale="180"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispA"
            />
            <feGaussianBlur in="dispA" stdDeviation="22" result="blurA" />
          </filter>

          <radialGradient id="vt-mist-grad-violet" cx="28%" cy="32%" r="55%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vt-mist-grad-cyan" cx="72%" cy="58%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#0EA5E9" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vt-mist-grad-violet2" cx="55%" cy="78%" r="55%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vt-mist-grad-white" cx="48%" cy="40%" r="38%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Couche A : volutes massives, déformées fortement */}
        <g filter="url(#vt-mist-filter-a)">
          <rect width="120%" height="120%" x="-10%" y="-10%" fill="#06060A" />
          <rect
            width="120%"
            height="120%"
            x="-10%"
            y="-10%"
            fill="url(#vt-mist-grad-violet)"
          />
          <rect
            width="120%"
            height="120%"
            x="-10%"
            y="-10%"
            fill="url(#vt-mist-grad-cyan)"
            style={{ mixBlendMode: "screen" }}
          />
          <rect
            width="120%"
            height="120%"
            x="-10%"
            y="-10%"
            fill="url(#vt-mist-grad-violet2)"
            style={{ mixBlendMode: "screen" }}
          />
          <rect
            width="120%"
            height="120%"
            x="-10%"
            y="-10%"
            fill="url(#vt-mist-grad-white)"
            style={{ mixBlendMode: "screen" }}
          />
        </g>
      </svg>

      {/* Couche B — grain fin de fumée par-dessus, plus subtil */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="vt-mist-filter-b"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              ref={turbulenceBRef}
              type="fractalNoise"
              baseFrequency="0.018 0.022"
              numOctaves="2"
              seed="100"
              result="turbB"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbB"
              scale="90"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispB"
            />
            <feGaussianBlur in="dispB" stdDeviation="14" result="blurB" />
          </filter>

          <radialGradient id="vt-mist-grad-cyanB" cx="20%" cy="70%" r="45%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vt-mist-grad-violetB" cx="80%" cy="25%" r="45%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g filter="url(#vt-mist-filter-b)">
          <rect
            width="110%"
            height="110%"
            x="-5%"
            y="-5%"
            fill="url(#vt-mist-grad-cyanB)"
          />
          <rect
            width="110%"
            height="110%"
            x="-5%"
            y="-5%"
            fill="url(#vt-mist-grad-violetB)"
          />
        </g>
      </svg>

      {/* Vignette douce pour focaliser le centre */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(6,6,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
