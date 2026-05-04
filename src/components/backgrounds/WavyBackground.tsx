"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

/**
 * Wavy Background — Aceternity UI (canvas + simplex-noise).
 *
 * Vagues fluides organiques qui ondulent en continu, palette Vtensor
 * (violets, cyan). Texture vraiment "fluide" grace au bruit 3D.
 *
 * Reduced-motion : on rend une frame statique et on s'arrete.
 */
export function WavyBackground({
  className,
  colors = ["#8B5CF6", "#22D3EE", "#A78BFA", "#06B6D4", "#67E8F9"],
  waveWidth = 50,
  backgroundFill = "#06060A",
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
}: {
  className?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const noise = createNoise3D();
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    ctx.filter = `blur(${blur}px)`;
    let nt = 0;

    const getSpeed = () => (speed === "slow" ? 0.001 : 0.002);

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = colors[i % colors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      // Frame unique
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
    } else {
      render();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity]);

  // Detection Safari (filter:blur sur canvas n'est pas supporte par defaut → on
  // applique le blur au style si Safari).
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
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
