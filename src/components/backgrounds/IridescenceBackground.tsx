"use client";

import { cn } from "@/lib/utils";

/**
 * Iridescence — irisation type bulle de savon.
 * Inspiré ReactBits. CSS conic-gradient + animation rotate + blur.
 */
export function IridescenceBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <div
        className="vt-iridescence-rotate pointer-events-none absolute -inset-[30%]"
        style={{
          background:
            "conic-gradient(from 0deg, #8B5CF6, #22D3EE, #A78BFA, #67E8F9, #C4B5FD, #06B6D4, #7C3AED, #22D3EE, #8B5CF6)",
          filter: "blur(80px) saturate(140%)",
          opacity: 0.7,
        }}
      />
      <div
        className="vt-iridescence-rotate-rev pointer-events-none absolute -inset-[30%]"
        style={{
          background:
            "conic-gradient(from 180deg, transparent, rgba(255,255,255,0.18), transparent, rgba(255,255,255,0.18), transparent)",
          filter: "blur(40px)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(6,6,10,0.6) 100%)",
        }}
      />

      <style jsx>{`
        @keyframes vt-irid-rotate {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes vt-irid-rotate-rev {
          to {
            transform: rotate(-360deg);
          }
        }
        .vt-iridescence-rotate {
          animation: vt-irid-rotate 30s linear infinite;
        }
        .vt-iridescence-rotate-rev {
          animation: vt-irid-rotate-rev 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-iridescence-rotate,
          .vt-iridescence-rotate-rev {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
