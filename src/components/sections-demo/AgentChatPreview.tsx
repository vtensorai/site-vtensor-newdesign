"use client";

/**
 * AgentChatPreview — mini fenêtre chat compact, réutilisable.
 *
 * Window-bar minimaliste (3 dots macOS + label "Conversation avec [agentName]").
 * - Si `incoming: true` → la bubble user est formatée comme un mail externe
 *   (préfixe "📨 De …", fond légèrement teinté cyan), pour signaler que c'est
 *   un client final qui parle, pas le dirigeant.
 * - Sinon → bubble user classique (alignée à droite, fond gris foncé).
 *
 * Bubble agent : alignée à gauche, border violet 18 %, ✓ checkmark cyan en
 * début. Animation : user fade-in immédiat, agent fade-in après 800 ms.
 *
 * Pas d'input field (compact).
 *
 * Reduced-motion : désactive les delays/animations, tout est visible
 * directement.
 */

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

type Variant = "default" | "compact";

type Props = {
  agentName: string;
  user: string;
  agent: string;
  incoming?: boolean;
  variant?: Variant;
  className?: string;
};

function parseEmphasis(text: string): React.ReactNode[] {
  // Convertit **xxx** en <strong>xxx</strong> sans markdown lib.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function parseIncomingHeader(user: string): { from: string | null; body: string } {
  // Format attendu : "De pierre@xxxx.fr (client final) — Bonjour, …"
  // Pas de flag /s (target ES5) → on utilise [\s\S] pour matcher les newlines.
  const match = user.match(/^De\s+([^—]+?)\s+—\s+([\s\S]*)$/);
  if (match) {
    return { from: match[1].trim(), body: match[2].trim() };
  }
  return { from: null, body: user };
}

export function AgentChatPreview({
  agentName,
  user,
  agent,
  incoming = false,
  variant = "default",
  className,
}: Props) {
  const reduce = useReducedMotion();
  const incomingParsed = useMemo(
    () => (incoming ? parseIncomingHeader(user) : null),
    [incoming, user],
  );

  const isCompact = variant === "compact";

  const userDelay = reduce ? 0 : 0.05;
  const agentDelay = reduce ? 0 : 0.85;
  const fadeDuration = reduce ? 0 : 0.4;

  return (
    <div
      className={[
        "relative w-full rounded-2xl overflow-hidden",
        "border border-white/10 bg-[#101015]/95",
        "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        "backdrop-blur",
        className ?? "",
      ].join(" ")}
    >
      {/* Window bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        </div>
        <span className="text-[11px] text-white/45 font-medium truncate">
          Conversation avec {agentName}
        </span>
      </div>

      {/* Messages */}
      <div
        className={[
          "flex flex-col gap-3",
          isCompact ? "p-3 sm:p-4" : "p-4 sm:p-5",
        ].join(" ")}
      >
        {/* User bubble — incoming mail style or default */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: fadeDuration, delay: userDelay }}
          className={incoming ? "self-stretch" : "self-end max-w-[85%]"}
        >
          {incoming && incomingParsed?.from ? (
            <div
              className={[
                "rounded-xl px-3.5 py-2.5",
                "border border-[#22D3EE]/20",
                "bg-[#22D3EE]/[0.04]",
                "text-[13px] leading-relaxed text-white/85",
              ].join(" ")}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#22D3EE]/85">
                  📨 De {incomingParsed.from}
                </span>
              </div>
              <p className="text-white/80">{incomingParsed.body}</p>
            </div>
          ) : (
            <div
              className={[
                "rounded-2xl px-3.5 py-2.5",
                "bg-white/[0.06] border border-white/[0.08]",
                "text-[13px] leading-relaxed text-white/85",
              ].join(" ")}
            >
              {user}
            </div>
          )}
        </motion.div>

        {/* Agent bubble */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: fadeDuration, delay: agentDelay }}
          className="self-start max-w-[92%]"
        >
          <div
            className={[
              "rounded-2xl px-3.5 py-2.5",
              "border border-[#8B5CF6]/[0.18]",
              "bg-gradient-to-br from-[#8B5CF6]/[0.08] to-[#22D3EE]/[0.04]",
              "text-[13px] leading-relaxed text-white/90",
            ].join(" ")}
          >
            {parseEmphasis(agent.replace(/^✓\s*/, ""))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * AgentBadgeNumber — Badge numérique de l'agent.
 * Format : pastille bordée cyan avec le numéro (01-07) en mono cyan.
 * Le marqueur "agent maître" est rendu séparément par le composant parent
 * (badge "AGENT MAÎTRE" à côté du badge numérique).
 */
export function AgentBadgeNumber({
  num,
  size = "md",
}: {
  num: string;
  flagship?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizePx = {
    sm: 28,
    md: 40,
    lg: 56,
  }[size];
  const fontSize = {
    sm: 12,
    md: 16,
    lg: 22,
  }[size];

  return (
    <span
      aria-label={`Agent ${num}`}
      className="inline-flex items-center justify-center font-mono font-bold leading-none select-none"
      style={{
        width: sizePx,
        height: sizePx,
        fontSize: `${fontSize}px`,
        color: "#22D3EE",
        background: "rgba(34,211,238,0.06)",
        border: "1px solid rgba(34,211,238,0.30)",
      }}
    >
      {num}
    </span>
  );
}
