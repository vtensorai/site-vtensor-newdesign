"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight — un spot lumineux qui suit la souris.
 * Inspiré Aceternity UI. Position via CSS variables, pas de re-render React.
 */
export function SpotlightBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.style.setProperty("--mx", "50%");
      node.style.setProperty("--my", "30%");
      return;
    }
    let frame = 0;
    let tx = 50,
      ty = 30,
      cx = 50,
      cy = 30;
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      node.style.setProperty("--mx", `${cx}%`);
      node.style.setProperty("--my", `${cy}%`);
      frame = requestAnimationFrame(tick);
    };
    node.style.setProperty("--mx", "50%");
    node.style.setProperty("--my", "30%");
    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {/* Grille discrète */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Spot principal cyan */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 500px at var(--mx,50%) var(--my,30%), rgba(34,211,238,0.45), transparent 60%)",
        }}
      />
      {/* Halo violet plus large */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 700px at var(--mx,50%) var(--my,30%), rgba(139,92,246,0.25), transparent 70%)",
        }}
      />
    </div>
  );
}
