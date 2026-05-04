"use client";

import { cn } from "@/lib/utils";

/**
 * Animated Beam — faisceaux qui connectent des points (style "data flow").
 * Inspiré Magic UI animated-beam.
 * SVG paths animés via stroke-dasharray.
 */
export function AnimatedBeamBackground({ className }: { className?: string }) {
  // Disposition simulée : 6 nodes périphériques + 1 hub central.
  const nodes = [
    { x: 12, y: 18 },
    { x: 88, y: 22 },
    { x: 14, y: 78 },
    { x: 90, y: 72 },
    { x: 50, y: 8 },
    { x: 50, y: 94 },
  ];
  const hub = { x: 50, y: 50 };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      {/* Halo central */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(34,211,238,0.35) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vt-ab-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {nodes.map((n, i) => {
          // courbe légère via Q
          const cx = (n.x + hub.x) / 2 + (i % 2 === 0 ? 4 : -4);
          const cy = (n.y + hub.y) / 2 + (i % 3 === 0 ? -3 : 3);
          const path = `M ${n.x} ${n.y} Q ${cx} ${cy} ${hub.x} ${hub.y}`;
          return (
            <g key={i}>
              {/* base ligne */}
              <path
                d={path}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.18"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* impulsion qui voyage */}
              <path
                d={path}
                stroke="url(#vt-ab-grad)"
                strokeWidth="0.55"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="6 100"
                className="vt-ab-pulse"
                style={{
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              {/* node */}
              <circle
                cx={n.x}
                cy={n.y}
                r="0.9"
                fill="#22D3EE"
                className="vt-ab-node"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </g>
          );
        })}
        {/* hub */}
        <circle cx={hub.x} cy={hub.y} r="2" fill="#A78BFA" />
        <circle
          cx={hub.x}
          cy={hub.y}
          r="3"
          fill="none"
          stroke="rgba(167,139,250,0.6)"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <style jsx>{`
        @keyframes vt-ab-travel {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes vt-ab-blink {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        :global(.vt-ab-pulse) {
          animation: vt-ab-travel 3s linear infinite;
        }
        :global(.vt-ab-node) {
          animation: vt-ab-blink 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.vt-ab-pulse),
          :global(.vt-ab-node) {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
