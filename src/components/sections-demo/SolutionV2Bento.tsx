"use client";

/**
 * SolutionV2Bento — bento grid masonry.
 *
 * Grid responsive 1/2/3 col. Card flagship CEO (col-span-2 row-span-2).
 * Autres 6 cards : 1x1. Glow rotatif (cyan/violet) pour rythmer la grille.
 *
 * Inspiration : Apple Vision Pro features grid, Linear, shadcn-ui Bento.
 * Avantage : dense, tous les agents visibles en 1-2 viewports.
 */

import { motion, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { AGENTS } from "@/data/agents";
import {
  AgentChatPreview,
  AgentBadgeNumber,
} from "./AgentChatPreview";

const ACCENT_PATTERN = ["#8B5CF6", "#22D3EE", "#22D3EE", "#8B5CF6", "#22D3EE", "#8B5CF6"];

export function SolutionV2Bento() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative bg-[#0A0A0F] text-white py-20 md:py-28"
      aria-label="Catalogue des 7 agents — V2 Bento"
    >
      {/* Section header */}
      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 text-center mb-14 md:mb-20">
        <h2
          className="font-display font-bold leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          Vos{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
            7 agents
          </span>
          , prêts à travailler pour vous.
        </h2>
        <p className="mt-5 text-white/60 text-base sm:text-lg max-w-[55ch] mx-auto">
          Une équipe complète, sous votre supervision.
        </p>
      </div>

      {/* Bento grid */}
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(280px,auto)] gap-5">
          {AGENTS.map((agent, i) => {
            // Flagship CEO occupe 2x2 sur desktop
            const isLarge = !!agent.flagship;
            const span = isLarge
              ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
              : "";
            // Décale la palette : flagship a son propre style.
            const accent = isLarge
              ? null
              : ACCENT_PATTERN[(i - 1) % ACCENT_PATTERN.length];

            return (
              <motion.article
                key={agent.num}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={[
                  "relative overflow-hidden rounded-2xl",
                  "border border-white/10 bg-[#101015]/70",
                  "p-5 md:p-6",
                  "flex flex-col",
                  span,
                  isLarge ? "min-h-[560px]" : "",
                ].join(" ")}
              >
                {/* Glow */}
                {isLarge ? (
                  <>
                    <div
                      className="pointer-events-none absolute -top-24 -left-24 h-[320px] w-[320px] rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(139,92,246,0.22), transparent 65%)",
                      }}
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -bottom-32 -right-24 h-[360px] w-[360px] rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(34,211,238,0.18), transparent 65%)",
                      }}
                      aria-hidden
                    />
                  </>
                ) : (
                  <div
                    className="pointer-events-none absolute -top-20 -right-20 h-[220px] w-[220px] rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${accent}22, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                )}

                {/* Flagship badge */}
                {isLarge && (
                  <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#FBBF24]">
                    <Star size={12} weight="fill" />
                    Agent maître
                  </div>
                )}

                {/* Header */}
                <div className="relative z-10">
                  <AgentBadgeNumber
                    num={agent.num}
                    flagship={agent.flagship}
                    size={isLarge ? "md" : "sm"}
                  />
                  <h3
                    className={[
                      "mt-2 font-display font-bold text-white leading-tight tracking-[-0.01em]",
                      isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
                    ].join(" ")}
                  >
                    {agent.name}
                  </h3>
                  <p className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/45 font-medium">
                    {agent.metier}
                  </p>
                  <p
                    className={[
                      "mt-3 text-white/65 leading-relaxed",
                      isLarge ? "text-sm md:text-base" : "text-[13px]",
                    ].join(" ")}
                  >
                    {agent.description}
                  </p>

                  {/* Capabilities — 3 max sur cards std, 4 sur flagship */}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {agent.capabilities
                      .slice(0, isLarge ? 4 : 3)
                      .map((cap) => {
                        const isMasterSkill =
                          agent.flagship &&
                          /coordination|inter[\s-]?agents/i.test(cap);
                        return (
                          <li
                            key={cap}
                            className={[
                              "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px]",
                              isMasterSkill
                                ? "border-[#FBBF24]/40 bg-[#FBBF24]/[0.08] text-[#FBBF24]"
                                : "border-white/10 bg-white/[0.03] text-white/70",
                            ].join(" ")}
                            title={
                              isMasterSkill
                                ? "Skill indispensable de l'agent maître"
                                : undefined
                            }
                          >
                            {cap}
                          </li>
                        );
                      })}
                  </ul>
                </div>

                {/* Chat preview — version compacte sauf flagship */}
                <div className="relative z-10 mt-auto pt-4">
                  <AgentChatPreview
                    agentName={agent.name}
                    user={agent.user}
                    agent={agent.agent}
                    incoming={agent.incoming}
                    variant={isLarge ? "default" : "compact"}
                  />
                </div>

                {/* Price tag */}
                <div className="relative z-10 mt-3 flex items-center justify-between">
                  <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/40 font-semibold">
                    Tarif
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {agent.price}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
