"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightning — éclairs qui apparaissent occasionnellement.
 * Inspiré ReactBits. Canvas 2D. Bolts générés par marche aléatoire.
 */
type Bolt = { points: { x: number; y: number }[]; life: number; ttl: number };

export function LightningBackground({ className }: { className?: string }) {
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
    let bolts: Bolt[] = [];
    let flash = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const generateBolt = (): Bolt => {
      const startX = canvas.width * (0.2 + Math.random() * 0.6);
      const points: { x: number; y: number }[] = [{ x: startX, y: 0 }];
      let x = startX;
      let y = 0;
      while (y < canvas.height) {
        x += (Math.random() - 0.5) * 80;
        y += 14 + Math.random() * 36;
        points.push({ x, y });
      }
      return { points, life: 0, ttl: 12 + Math.floor(Math.random() * 12) };
    };

    let tick = 0;
    const draw = () => {
      tick++;
      // léger trail violet sombre
      ctx.fillStyle = "rgba(6,6,10,0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // halo nuage
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height * 0.2,
        20,
        canvas.width / 2,
        canvas.height * 0.2,
        canvas.width * 0.7
      );
      grad.addColorStop(0, "rgba(139,92,246,0.18)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // spawn rare
      if (tick % 35 === 0 && Math.random() < 0.6) {
        bolts.push(generateBolt());
        flash = 1;
      }

      // flash blanc qui descend
      if (flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${flash * 0.18})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flash *= 0.85;
      }

      // dessin bolts
      bolts = bolts.filter((b) => {
        b.life++;
        const alpha = 1 - b.life / b.ttl;
        // glow
        ctx.strokeStyle = `rgba(167,139,250,${alpha * 0.5})`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        b.points.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        );
        ctx.stroke();
        // core
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        b.points.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        );
        ctx.stroke();
        return b.life < b.ttl;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const b = generateBolt();
      ctx.strokeStyle = "rgba(167,139,250,0.6)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      b.points.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      );
      ctx.stroke();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      b.points.forEach((p, i) =>
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      );
      ctx.stroke();
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
    </div>
  );
}
