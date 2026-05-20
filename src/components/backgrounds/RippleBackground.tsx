"use client";

import { cn } from "@/lib/utils";

/**
 * Ripple — cercles concentriques qui pulsent depuis le centre.
 * Inspiré Magic UI. Pure CSS.
 */
const RINGS = 8;

export function RippleBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: RINGS }).map((_, i) => {
          const size = 80 + i * 110;
          const opacity = 1 - i / RINGS;
          return (
            <div
              key={i}
              className="vt-ripple-ring absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                border: `1px solid rgba(${i % 2 === 0 ? "139,92,246" : "34,211,238"}, ${(opacity * 0.45).toFixed(3)})`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          );
        })}
      </div>

      {/* Centre lumineux */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <style jsx>{`
        @keyframes vt-ripple {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .vt-ripple-ring {
          animation: vt-ripple 4s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-ripple-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
