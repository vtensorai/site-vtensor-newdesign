"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Shooting Stars — étoiles fixes + étoiles filantes occasionnelles.
 * Canvas 2D, low-cost.
 */
type Star = { x: number; y: number; r: number; tw: number };
type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  hue: number;
};

export function ShootingStarsBackground({ className }: { className?: string }) {
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
    let shootings: Shooting[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.3 + Math.random() * 1.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const spawn = () => {
      const fromTop = Math.random() < 0.5;
      shootings.push({
        x: fromTop ? Math.random() * canvas.width : -50,
        y: fromTop ? -50 : Math.random() * canvas.height * 0.6,
        vx: 6 + Math.random() * 4,
        vy: 4 + Math.random() * 3,
        life: 0,
        ttl: 60 + Math.random() * 40,
        hue: Math.random() < 0.5 ? 270 : 190,
      });
    };

    let tick = 0;
    const draw = () => {
      tick++;
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // étoiles fixes scintillantes
      for (const s of stars) {
        s.tw += 0.04;
        const a = 0.3 + (Math.sin(s.tw) * 0.5 + 0.5) * 0.7;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // spawn rare
      if (!reduced && tick % 80 === 0 && Math.random() < 0.7) spawn();

      // shooting stars
      shootings = shootings.filter((sh) => {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life++;
        const a = 1 - sh.life / sh.ttl;
        // tail
        const grad = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * 12,
          sh.y - sh.vy * 12
        );
        grad.addColorStop(0, `hsla(${sh.hue},100%,75%,${a})`);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 12, sh.y - sh.vy * 12);
        ctx.stroke();
        // head
        ctx.fillStyle = `hsla(${sh.hue},100%,90%,${a})`;
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        return sh.life < sh.ttl;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      // une seule frame statique
      ctx.fillStyle = "#06060A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
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
    </div>
  );
}
