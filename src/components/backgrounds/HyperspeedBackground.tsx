"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Hyperspeed — tunnel néon type Tron / Star Wars hyperspace.
 * Inspiré ReactBits. Canvas 2D : trails radiaux qui filent vers un point central.
 */
type Streak = {
  angle: number;
  dist: number;
  speed: number;
  hue: number;
  width: number;
  trail: number;
};

export function HyperspeedBackground({ className }: { className?: string }) {
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
    let streaks: Streak[] = [];
    let cx = 0;
    let cy = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
      const count = 220;
      streaks = Array.from({ length: count }, () => spawn());
    };

    const spawn = (): Streak => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 30 + 10,
      speed: 1 + Math.random() * 4,
      hue: Math.random() < 0.5 ? 270 + Math.random() * 30 : 185 + Math.random() * 25,
      width: 0.6 + Math.random() * 1.8,
      trail: 30 + Math.random() * 80,
    });

    const draw = () => {
      // trail effect
      ctx.fillStyle = "rgba(6,6,10,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const max = Math.hypot(canvas.width, canvas.height) / 2 + 60;
      for (const s of streaks) {
        const x1 = cx + Math.cos(s.angle) * s.dist;
        const y1 = cy + Math.sin(s.angle) * s.dist;
        const x2 = cx + Math.cos(s.angle) * (s.dist + s.trail);
        const y2 = cy + Math.sin(s.angle) * (s.dist + s.trail);
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `hsla(${s.hue},100%,72%,0.95)`);
        grad.addColorStop(1, `hsla(${s.hue},100%,72%,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        s.dist += s.speed * (1 + s.dist / 200);
        if (s.dist > max) {
          Object.assign(s, spawn());
          s.dist = 5 + Math.random() * 20;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // une frame statique
      for (const s of streaks) {
        const x1 = cx + Math.cos(s.angle) * s.dist;
        const y1 = cy + Math.sin(s.angle) * s.dist;
        const x2 = cx + Math.cos(s.angle) * (s.dist + s.trail);
        const y2 = cy + Math.sin(s.angle) * (s.dist + s.trail);
        ctx.strokeStyle = `hsla(${s.hue},100%,72%,0.4)`;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(6,6,10,0.4) 80%)",
        }}
      />
    </div>
  );
}
