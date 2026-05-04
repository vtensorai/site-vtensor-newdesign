"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Threads — fils horizontaux qui ondulent.
 * Inspiré ReactBits. Canvas 2D, sinus paramétrés.
 */
export function ThreadsBackground({ className }: { className?: string }) {
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
    const lines = 22;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = (t: number) => {
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lines; i++) {
        const baseY = (canvas.height / (lines + 1)) * (i + 1);
        const phase = i * 0.4 + t * 0.0007;
        const amp = 18 + (i % 5) * 6;
        const period = 0.012 - (i % 4) * 0.0015;
        const isCyan = i % 2 === 0;
        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(
          0.5,
          isCyan ? "rgba(34,211,238,0.85)" : "rgba(139,92,246,0.85)"
        );
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 6) {
          const y =
            baseY +
            Math.sin(x * period + phase) * amp +
            Math.sin(x * period * 2.3 + phase * 1.4) * (amp * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw(0);
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
            "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
