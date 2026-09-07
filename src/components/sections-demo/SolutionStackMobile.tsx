"use client";

/**
 * SolutionStackMobile — rendu mobile du catalogue des agents.
 *
 * Stack vertical des 7 agents — chaque agent a sa propre card pleine largeur
 * qui se découvre au scroll naturel. Pas de pills horizontales, pas de tabs.
 * L'utilisateur scrolle de manière classique pour voir chaque agent.
 *
 * `customFraming` (2026-09-07) : les 7 agents sont présentés comme des
 * EXEMPLES de postes, chaque agent étant développé sur mesure. Ajoute une
 * card en pointillés « Votre poste sur mesure » en fin de liste.
 */

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, Star, Plus } from "@phosphor-icons/react/dist/ssr";
import { AGENTS } from "@/data/agents";
import { AUDIT_URL } from "@/lib/links";
import { AgentChatPreview } from "./AgentChatPreview";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

export function SolutionStackMobile({
  customFraming = false,
}: {
  customFraming?: boolean;
} = {}) {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative text-white py-16 px-5"
      aria-label="Catalogue des agents Vtensor — version mobile"
    >
      {/* Section header */}
      <div className="text-center mb-12">
        <h2
          className="font-display font-bold leading-[1.1] tracking-[-0.02em]"
          style={{ fontSize: "clamp(28px, 7vw, 40px)" }}
        >
          {customFraming ? (
            <>
              Six exemples de postes,{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
                pour vous donner des idées
              </span>
              .
            </>
          ) : (
            <>
              Nos{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
                7 modèles d&apos;agents
              </span>
              , prêts à travailler pour vous.
            </>
          )}
        </h2>
        <p className="mt-4 text-white/60 text-base">
          {customFraming
            ? "Chaque agent est développé sur mesure pour votre entreprise, vos outils et vos process. Choisissez un poste, adaptez-le, ou inventez celui qui vous manque."
            : "Une équipe complète, sous votre supervision."}
        </p>
      </div>

      {/* Stack vertical des 7 cards */}
      <div className="flex flex-col gap-5">
        {AGENTS.map((agent, idx) => (
          <motion.article
            key={agent.num}
            initial={
              reduce ? false : { opacity: 0, y: 24 }
            }
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: Math.min(0.1 * (idx % 3), 0.2),
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={[
              "relative overflow-hidden rounded-3xl px-5 py-6",
              "border bg-[#0E0E13]/95",
              agent.flagship
                ? "border-[#FBBF24]/30"
                : "border-white/10",
            ].join(" ")}
            style={{
              boxShadow:
                "0 16px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Header : badge numéro + nom + badge flagship */}
            <header className="flex items-start gap-3 mb-3">
              <span
                aria-hidden="true"
                className="shrink-0 inline-flex items-center justify-center font-mono font-bold leading-none select-none"
                style={{
                  width: 36,
                  height: 36,
                  fontSize: "14px",
                  color: "#22D3EE",
                  background: "rgba(34,211,238,0.06)",
                  border: "1px solid rgba(34,211,238,0.30)",
                }}
              >
                {agent.num}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className="font-display text-white font-bold leading-tight"
                    style={{ fontSize: "17px", letterSpacing: "-0.01em" }}
                  >
                    {agent.name}
                  </h3>
                  {agent.flagship && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-[#FBBF24]"
                      title="Agent maître"
                    >
                      <Star size={11} weight="fill" />
                      Maître
                    </span>
                  )}
                </div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/50 mt-1 font-medium">
                  {agent.metier}
                </p>
              </div>
              {agent.price && (
                <span
                  className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(139,92,246,0.15), rgba(34,211,238,0.15))",
                    border: "1px solid rgba(139,92,246,0.25)",
                    color: "#A78BFA",
                  }}
                >
                  {agent.price}
                </span>
              )}
            </header>

            {/* Description */}
            <p className="text-white/70 text-[14px] leading-relaxed mb-4">
              {agent.description}
            </p>

            {/* Capabilities — pills */}
            <ul className="flex flex-wrap gap-1.5 mb-5">
              {agent.capabilities.map((cap) => {
                const isMasterSkill =
                  agent.flagship &&
                  /coordination|inter[\s-]?agents/i.test(cap);
                return (
                  <li
                    key={cap}
                    className={[
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px]",
                      isMasterSkill
                        ? "border-[#FBBF24]/40 bg-[#FBBF24]/[0.08] text-[#FBBF24]"
                        : "border-white/10 bg-white/[0.04] text-white/75",
                    ].join(" ")}
                  >
                    <CheckCircle
                      size={10}
                      weight="fill"
                      className={
                        isMasterSkill ? "text-[#FBBF24]" : "text-[#22D3EE]"
                      }
                    />
                    {cap}
                  </li>
                );
              })}
            </ul>

            {/* Mini chat preview */}
            <AgentChatPreview
              agentName={agent.name}
              user={agent.user}
              agent={agent.agent}
              incoming={agent.incoming}
              variant="compact"
            />
          </motion.article>
        ))}

        {/* Card « Votre poste sur mesure » — agents développés à la demande */}
        {customFraming && (
          <a
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-3xl px-5 py-6 border border-dashed border-white/25 bg-[#0E0E13]/60 hover:border-[#22D3EE]/50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="shrink-0 inline-flex items-center justify-center text-white/70 group-hover:text-[#22D3EE] transition-colors"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px dashed rgba(255,255,255,0.3)",
                }}
              >
                <Plus size={14} weight="bold" />
              </span>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-display text-white font-bold leading-tight"
                  style={{ fontSize: "17px", letterSpacing: "-0.01em" }}
                >
                  Votre poste sur mesure
                </h3>
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/50 mt-1 font-medium">
                  Un besoin qui n&apos;est pas dans la liste ?
                </p>
              </div>
            </div>
            <p className="text-white/70 text-[14px] leading-relaxed mt-3">
              Décrivez-nous le poste qu&apos;il vous manque : chaque agent est développé
              sur mesure pour votre entreprise, vos outils et vos process.
            </p>
            <span
              className="mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] font-semibold text-[#22D3EE] group-hover:translate-x-0.5 transition-transform"
              style={mono}
            >
              Réserver un audit gratuit →
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
