"use client";

import { cn } from "@/lib/utils";

/**
 * Retro Grid — grille perspective rétro années 80.
 * Inspiré Magic UI. CSS transform + repeating-linear-gradient.
 */
export function RetroGridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {/* Soleil halo */}
      <div
        className="absolute left-1/2 top-[28%] h-[30vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.7) 0%, rgba(34,211,238,0.45) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Grille en perspective */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60vh]"
        style={{ perspective: "300px" }}
      >
        <div
          className="vt-retro-grid h-full w-full"
          style={{
            transform: "rotateX(55deg)",
            backgroundImage:
              "linear-gradient(to right, rgba(34,211,238,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.45) 1px, transparent 1px)",
            backgroundSize: "60px 40px",
            transformOrigin: "50% 0",
          }}
        />
      </div>

      {/* Ligne d'horizon lumineuse */}
      <div
        className="absolute left-0 right-0 top-[40%] h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #22D3EE 30%, #8B5CF6 70%, transparent 100%)",
          boxShadow: "0 0 16px 2px rgba(34,211,238,0.6)",
        }}
      />

      {/* Sol foncé en bas */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[20vh]"
        style={{
          background:
            "linear-gradient(to top, #06060A 30%, transparent 100%)",
        }}
      />

      <style jsx>{`
        @keyframes vt-retro-scroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 40px;
          }
        }
        .vt-retro-grid {
          animation: vt-retro-scroll 1.4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-retro-grid {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
