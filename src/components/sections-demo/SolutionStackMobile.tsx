"use client";

/**
 * SolutionStackMobile — rendu mobile de la section "Vos 7 agents".
 *
 * Stack vertical des 7 agents — chaque agent a sa propre card pleine largeur
 * qui se découvre au scroll naturel. Pas de pills horizontales, pas de tabs.
 * L'utilisateur scrolle de manière classique pour voir chaque agent.
 */

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, Star } from "@phosphor-icons/react/dist/ssr";
import { AGENTS } from "@/data/agents";
import { AgentChatPreview } from "./AgentChatPreview";

export function SolutionStackMobile() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative bg-[#0A0A0F] text-white py-16 px-5"
      aria-label="Catalogue des 7 agents Vtensor — version mobile"
    >
      {/* Section header */}
      <div className="text-center mb-12">
        <h2
          className="font-display font-bold leading-[1.1] tracking-[-0.02em]"
          style={{ fontSize: "clamp(28px, 7vw, 40px)" }}
        >
          Nos{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
            7 modèles d&apos;agents
          </span>
          , prêts à travailler pour vous.
        </h2>
        <p className="mt-4 text-white/60 text-base">
          Une équipe complète, sous votre supervision.
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
            {/* Header : monogramme + nom + badge flagship */}
            <header className="flex items-start gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/vtensor_monogram_gradient.svg"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="shrink-0 select-none"
                style={{ width: 36, height: 36 }}
                draggable={false}
              />
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
      </div>
    </section>
  );
}
