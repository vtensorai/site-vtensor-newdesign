"use client";

/**
 * SolutionV1Stripe — alternance gauche/droite Stripe-style.
 *
 * 7 cards en stack vertical, layout 2-col 50/50, alternance via index % 2.
 * Card flagship CEO : background avec léger glow violet/cyan + badge "Agent
 * maître" en top-right. Mobile : stack vertical, chat preview en haut.
 *
 * Inspiration : Stripe "Why Stripe", Sanjaya Services.
 */

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, Star } from "@phosphor-icons/react/dist/ssr";
import { AGENTS } from "@/data/agents";
import {
  AgentChatPreview,
  AgentBadgeNumber,
} from "./AgentChatPreview";

export function SolutionV1Stripe() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative bg-[#0A0A0F] text-white py-20 md:py-28"
      aria-label="Catalogue des 7 agents — V1 Stripe"
    >
      {/* Section header */}
      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 text-center mb-16 md:mb-24">
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

      {/* Agents */}
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 flex flex-col gap-24 md:gap-32">
        {AGENTS.map((agent, i) => {
          const reversed = i % 2 === 1;
          const fromX = reduce ? 0 : reversed ? 40 : -40;

          return (
            <motion.article
              key={agent.num}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={[
                "relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center",
                agent.flagship
                  ? "rounded-3xl border border-white/10 bg-white/[0.015] p-6 md:p-12 overflow-hidden"
                  : "",
              ].join(" ")}
            >
              {/* Glow flagship */}
              {agent.flagship && (
                <>
                  <div
                    className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(139,92,246,0.18), transparent 65%)",
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(34,211,238,0.14), transparent 65%)",
                    }}
                    aria-hidden
                  />
                  <div className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#FBBF24]">
                    <Star size={12} weight="fill" />
                    Agent maître
                  </div>
                </>
              )}

              {/* Text */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: fromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={[
                  "relative z-10",
                  reversed ? "md:order-2" : "md:order-1",
                ].join(" ")}
              >
                <AgentBadgeNumber
                  num={agent.num}
                  flagship={agent.flagship}
                  size="md"
                />
                <h3
                  className="mt-3 font-display font-bold text-white leading-[1.1] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
                >
                  {agent.name}
                </h3>
                <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-white/45 font-medium">
                  {agent.metier}
                </p>
                <p className="mt-5 text-white/70 text-base sm:text-lg leading-relaxed max-w-[50ch]">
                  {agent.description}
                </p>

                {/* Capabilities */}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => {
                    const isMasterSkill =
                      agent.flagship &&
                      /coordination|inter[\s-]?agents/i.test(cap);
                    return (
                      <li
                        key={cap}
                        className={[
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px]",
                          isMasterSkill
                            ? "border-[#FBBF24]/40 bg-[#FBBF24]/[0.08] text-[#FBBF24]"
                            : "border-white/10 bg-white/[0.03] text-white/75",
                        ].join(" ")}
                        title={
                          isMasterSkill
                            ? "Skill indispensable de l'agent maître"
                            : undefined
                        }
                      >
                        <CheckCircle
                          size={12}
                          weight="fill"
                          className={
                            isMasterSkill
                              ? "text-[#FBBF24]"
                              : "text-[#22D3EE]"
                          }
                        />
                        {cap}
                      </li>
                    );
                  })}
                </ul>

                {/* Price tag */}
                <div className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04]">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-semibold">
                    Tarif
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {agent.price}
                  </span>
                </div>
              </motion.div>

              {/* Chat preview */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -fromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={[
                  "relative z-10",
                  reversed ? "md:order-1" : "md:order-2",
                ].join(" ")}
              >
                <AgentChatPreview
                  agentName={agent.name}
                  user={agent.user}
                  agent={agent.agent}
                  incoming={agent.incoming}
                />
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
