"use client";

import { cn } from "@/lib/utils";

/**
 * Background Gradient Animation — bulles de gradient qui rebondissent.
 * Inspiré Aceternity UI. Pure CSS keyframes.
 */
export function BackgroundGradientAnimationBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <div className="absolute inset-0" style={{ filter: "blur(60px)" }}>
        <div className="vt-bgblob vt-bgblob-a" />
        <div className="vt-bgblob vt-bgblob-b" />
        <div className="vt-bgblob vt-bgblob-c" />
        <div className="vt-bgblob vt-bgblob-d" />
        <div className="vt-bgblob vt-bgblob-e" />
      </div>

      <style jsx>{`
        .vt-bgblob {
          position: absolute;
          width: 50vw;
          height: 50vw;
          border-radius: 9999px;
          opacity: 0.65;
          mix-blend-mode: screen;
        }
        .vt-bgblob-a {
          background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
          animation: vt-bg-a 24s ease-in-out infinite;
        }
        .vt-bgblob-b {
          background: radial-gradient(circle, #22d3ee 0%, transparent 70%);
          animation: vt-bg-b 28s ease-in-out infinite;
        }
        .vt-bgblob-c {
          background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
          animation: vt-bg-c 32s ease-in-out infinite;
          opacity: 0.5;
        }
        .vt-bgblob-d {
          background: radial-gradient(circle, #67e8f9 0%, transparent 70%);
          animation: vt-bg-d 30s ease-in-out infinite;
          opacity: 0.45;
        }
        .vt-bgblob-e {
          background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
          animation: vt-bg-e 34s ease-in-out infinite;
          opacity: 0.4;
        }
        @keyframes vt-bg-a {
          0% {
            transform: translate(-15%, -10%);
          }
          25% {
            transform: translate(60%, 20%);
          }
          50% {
            transform: translate(40%, 70%);
          }
          75% {
            transform: translate(-10%, 50%);
          }
          100% {
            transform: translate(-15%, -10%);
          }
        }
        @keyframes vt-bg-b {
          0% {
            transform: translate(80%, -10%);
          }
          25% {
            transform: translate(-5%, 40%);
          }
          50% {
            transform: translate(70%, 80%);
          }
          75% {
            transform: translate(20%, 30%);
          }
          100% {
            transform: translate(80%, -10%);
          }
        }
        @keyframes vt-bg-c {
          0% {
            transform: translate(30%, 80%);
          }
          50% {
            transform: translate(20%, -10%);
          }
          100% {
            transform: translate(30%, 80%);
          }
        }
        @keyframes vt-bg-d {
          0% {
            transform: translate(-20%, 60%);
          }
          50% {
            transform: translate(70%, 30%);
          }
          100% {
            transform: translate(-20%, 60%);
          }
        }
        @keyframes vt-bg-e {
          0% {
            transform: translate(50%, 50%);
          }
          50% {
            transform: translate(10%, 10%);
          }
          100% {
            transform: translate(50%, 50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-bgblob {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
