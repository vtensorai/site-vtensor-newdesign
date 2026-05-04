"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Sparkles — étincelles flottantes Vtensor (canvas).
 * Inspiration Aceternity UI sparkles.
 */
type Spark = {
  x: number;
  y: number;
  r: number;
  a: number;
  va: number;
  vy: number;
};

export function SparklesBackground({ className }: { className?: string }) {
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
    let sparks: Spark[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.min(
        260,
        Math.floor((canvas.width * canvas.height) / 8000)
      );
      sparks = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.4 + Math.random() * 1.6,
        a: Math.random(),
        va: 0.005 + Math.random() * 0.02,
        vy: -0.05 - Math.random() * 0.15,
      }));
    };

    const draw = () => {
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const p of sparks) {
        p.a += p.va;
        if (p.a > 1 || p.a < 0) p.va *= -1;
        p.y += p.vy;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        const alpha = Math.max(0, Math.min(1, p.a));
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const p of sparks) {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
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
      {/* Halo violet/cyan en bas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,211,238,0.18), transparent 60%)",
        }}
      />
    </div>
  );
}
