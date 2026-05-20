"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Letter Glitch — texte qui glitch en arrière-plan (style hacker).
 * Inspiré ReactBits. Canvas 2D : grille de glyphes qui changent.
 */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>/\\|{}[];:";

export function LetterGlitchBackground({ className }: { className?: string }) {
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
    let cellW = 14;
    const cellH = 18;
    let cols = 0;
    let rows = 0;
    let cells: { ch: string; hue: number; nextChange: number }[] = [];
    let tick = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.font = "14px ui-monospace, SFMono-Regular, Menlo, monospace";
      cellW = ctx.measureText("M").width + 2;
      cols = Math.ceil(canvas.width / cellW);
      rows = Math.ceil(canvas.height / cellH);
      cells = Array.from({ length: cols * rows }, () => ({
        ch: CHARS[Math.floor(Math.random() * CHARS.length)],
        hue:
          Math.random() < 0.5
            ? 270 + Math.random() * 30
            : 185 + Math.random() * 25,
        nextChange: Math.random() * 200,
      }));
    };

    const draw = () => {
      tick++;
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font =
        "13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.textBaseline = "top";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const cell = cells[i];
          if (tick > cell.nextChange) {
            cell.ch = CHARS[Math.floor(Math.random() * CHARS.length)];
            cell.hue =
              Math.random() < 0.5
                ? 270 + Math.random() * 30
                : 185 + Math.random() * 25;
            cell.nextChange = tick + 30 + Math.random() * 200;
          }
          // alpha en bandes (effet diagonale lumineuse)
          const wave = Math.sin((c + r) * 0.18 - tick * 0.02) * 0.5 + 0.5;
          const alpha = 0.18 + wave * 0.5;
          ctx.fillStyle = `hsla(${cell.hue},100%,72%,${alpha})`;
          ctx.fillText(cell.ch, c * cellW, r * cellH);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
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
            "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
