"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Couleurs Vtensor : globe avec teinte violet/cyan, marqueurs cyan.
// onRender est typé en `(state: Record<string, any>) => void` côté cobe — on cast pour bypass.
const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.6,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.12, 0.07, 0.22], // ~ teinte violet sombre
  markerColor: [34 / 255, 211 / 255, 238 / 255], // cyan Vtensor
  glowColor: [139 / 255, 92 / 255, 246 / 255], // violet Vtensor
  markers: [
    { location: [48.8566, 2.3522], size: 0.1 }, // Paris
    { location: [40.7128, -74.006], size: 0.1 }, // NYC
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
    { location: [37.7749, -122.4194], size: 0.08 }, // SF
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
    { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
    { location: [19.4326, -99.1332], size: 0.07 }, // Mexico
    { location: [-23.5505, -46.6333], size: 0.08 }, // Sao Paulo
    { location: [52.52, 13.405], size: 0.06 }, // Berlin
    { location: [55.7558, 37.6173], size: 0.07 }, // Moscou
  ],
};

/**
 * Globe Background — Magic UI (cobe / WebGL).
 *
 * Globe 3D autorotatif avec marqueurs sur les capitales. Couleurs
 * Vtensor : base violet sombre, marqueurs cyan, glow violet.
 *
 * Reduced-motion : la rotation auto est mise en pause (le globe reste
 * statique mais reste interactif au drag).
 */
export function GlobeBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const config = {
      ...GLOBE_CONFIG,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state: Record<string, number>) => {
        if (!pointerInteracting.current && !reducedMotion) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    } as unknown as Parameters<typeof createGlobe>[1];

    const globe = createGlobe(canvasRef.current, config);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, reducedMotion]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {/* Halo violet derriere le globe */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, transparent 60%)",
        }}
      />

      <div className="absolute inset-0 mx-auto flex aspect-square w-full max-w-[600px] items-center justify-center">
        <canvas
          ref={canvasRef}
          className="size-full opacity-0 transition-opacity duration-700"
          style={{ contain: "layout paint size" }}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>

      {/* Vignette douce */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(6,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
