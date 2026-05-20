"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Galaxy — étoiles + nébuleuses qui tournent.
 * Inspiré ReactBits. Canvas 2D : étoiles + bras de spirale via gradients.
 */
type Star = {
  r: number;
  theta: number;
  br: number;
  size: number;
  hue: number;
  twPhase: number;
};

export function GalaxyBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let stars: Star[] = [];
    let rotation = 0;

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const max = Math.min(canvas.width, canvas.height) / 2;
      stars = Array.from({ length: 1100 }, () => {
        // distance gaussienne pour densité au centre
        const r = Math.pow(Math.random(), 0.6) * max * 1.1;
        // bras spiraux : 4 bras
        const armBias = (Math.floor(Math.random() * 4) * Math.PI * 2) / 4;
        const spiral = (r / max) * 4; // turns
        return {
          r,
          theta: armBias + spiral + (Math.random() - 0.5) * 0.6,
          br: 0.4 + Math.random() * 0.6,
          size: 0.4 + Math.random() * 1.6,
          hue:
            Math.random() < 0.4
              ? 270 + Math.random() * 30
              : Math.random() < 0.6
                ? 185 + Math.random() * 25
                : 0,
          twPhase: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = () => {
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // glow nébuleuse
      const grad = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.min(canvas.width, canvas.height) / 2
      );
      grad.addColorStop(0, "rgba(167,139,250,0.35)");
      grad.addColorStop(0.4, "rgba(34,211,238,0.18)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.twPhase += 0.05;
        const a = s.br * (0.6 + 0.4 * Math.sin(s.twPhase));
        const t = s.theta + rotation + (s.r / 200) * 0.4;
        const x = cx + Math.cos(t) * s.r;
        const y = cy + Math.sin(t) * s.r * 0.55; // élargit l'ellipse
        if (s.hue === 0) {
          ctx.fillStyle = `rgba(255,255,255,${a})`;
        } else {
          ctx.fillStyle = `hsla(${s.hue},100%,75%,${a})`;
        }
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rotation += 0.0006;
      raf = requestAnimationFrame(draw);
    };

    setup();
    window.addEventListener("resize", setup);
    if (reduced) {
      // une frame statique
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
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
    </div>
  );
}
