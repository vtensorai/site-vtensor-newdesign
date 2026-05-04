"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Flickering Grid — grille de carrés qui clignotent aléatoirement.
 * Inspiré Magic UI. Canvas 2D, low-cost.
 */
export function FlickeringGridBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cell = 18;
    const gap = 4;
    const flickerChance = 0.08;
    let cols = 0;
    let rows = 0;
    let opacities: Float32Array = new Float32Array(0);
    let raf = 0;

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.ceil(canvas.width / (cell + gap));
      rows = Math.ceil(canvas.height / (cell + gap));
      opacities = new Float32Array(cols * rows);
      for (let i = 0; i < opacities.length; i++) {
        opacities[i] = Math.random() * 0.4;
      }
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // fond
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (Math.random() < flickerChance * dt * 0.06) {
            opacities[i] = 0.3 + Math.random() * 0.7;
          }
          opacities[i] *= 0.985;
          const op = opacities[i];
          if (op < 0.02) continue;
          // Couleur tirée sur le gradient violet→cyan en fonction de la position
          const t = c / Math.max(1, cols - 1);
          const r1 = Math.round(139 + (34 - 139) * t);
          const g1 = Math.round(92 + (211 - 92) * t);
          const b1 = Math.round(246 + (238 - 246) * t);
          ctx.fillStyle = `rgba(${r1},${g1},${b1},${op})`;
          ctx.fillRect(c * (cell + gap), r * (cell + gap), cell, cell);
        }
      }
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    setup();
    window.addEventListener("resize", setup);
    if (reduced) {
      draw(16);
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,10,0.9) 100%)",
        }}
      />
    </div>
  );
}
