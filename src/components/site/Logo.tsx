/**
 * Logo officiel `[v]tensor` (V0.18.0) — géométrie identique au SVG du site,
 * « tensor » en couleur de texte (currentColor), crochets et v en dégradé.
 * `id` doit être unique par instance (dégradé SVG).
 */

const MONO = "var(--font-jetbrains), 'JetBrains Mono', ui-monospace, monospace";

export function Logo({ id = "logo", height = 40, className = "" }: { id?: string; height?: number; className?: string }) {
  const gid = `vt-grad-${id}`;
  const width = Math.round(height * 2.5);
  return (
    <svg viewBox="20 0 200 80" width={width} height={height} aria-label="Vtensor" className={className} style={{ display: "block" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <g transform="translate(20 18)">
        <path d="M14 4 L4 4 L4 44 L14 44" fill="none" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="square" />
        <text x="14" y="38" fontSize="32" fontWeight="700" fontStyle="italic" fill={`url(#${gid})`} style={{ fontFamily: MONO }}>
          v
        </text>
        <path d="M38 4 L48 4 L48 44 L38 44" fill="none" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="square" />
      </g>
      <text x="92" y="52" fontSize="34" fontWeight="500" letterSpacing="1" fill="currentColor" style={{ fontFamily: MONO }}>
        tensor
      </text>
    </svg>
  );
}

/** Monogramme `[v]` seul (sidebar de l'aperçu app, favicon). */
export function LogoMark({ id = "mark", size = 22 }: { id?: string; size?: number }) {
  const gid = `vt-mark-${id}`;
  return (
    <svg viewBox="19 19 46 46" width={size} height={size} aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <g transform="translate(16 18)">
        <path d="M14 4 L4 4 L4 44 L14 44" fill="none" stroke={`url(#${gid})`} strokeWidth="2.8" strokeLinecap="square" />
        <text x="14" y="38" fontSize="32" fontWeight="700" fontStyle="italic" fill={`url(#${gid})`} style={{ fontFamily: MONO }}>
          v
        </text>
        <path d="M38 4 L48 4 L48 44 L38 44" fill="none" stroke={`url(#${gid})`} strokeWidth="2.8" strokeLinecap="square" />
      </g>
    </svg>
  );
}
