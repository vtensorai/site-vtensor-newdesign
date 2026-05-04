"use client";

/**
 * SolutionV3Tabs — sticky scroll-driven tabs.
 *
 * Desktop (≥ lg) : la section a une hauteur de N×100vh (N = AGENTS.length).
 * Un wrapper interne en `position: sticky; top: 0; height: 100vh` reste fixé
 * pendant que l'utilisateur scrolle, et l'agent affiché change selon la
 * progression du scroll dans la section parent. Une fois le dernier agent
 * atteint, la sticky se détache et la section suivante apparaît normalement.
 *
 * Mobile (< lg) : pas de scroll-jacking. Hauteur naturelle, pills horizontales
 * cliquables comme avant.
 *
 * Click sur un agent : change l'agent ET scrolle la window à la position
 * correspondante (sinon le useTransform remettrait l'agent à celui calculé
 * depuis le scroll réel dès le moindre scroll).
 *
 * Inspiration : Cal.com (Apps catalog), Linear features showcase.
 */

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { CheckCircle, Star } from "@phosphor-icons/react/dist/ssr";
import { AGENTS } from "@/data/agents";
import {
  AgentChatPreview,
  AgentBadgeNumber,
} from "./AgentChatPreview";
import { SolutionStackMobile } from "./SolutionStackMobile";
import { OrgChartCompact } from "./OrgChartCompact";

export function SolutionV3Tabs({ withGrid = false }: { withGrid?: boolean } = {}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleSelectAgent = (idx: number) => {
    setActiveIdx(idx);
  };

  const active = AGENTS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="agents"
      className="relative text-white solutionv3-section"
      aria-label="Catalogue des 7 agents Vtensor"
    >
      <style jsx>{`
        .solutionv3-section {
          height: auto;
        }
      `}</style>

      {/* Mobile : 7 cards en stack vertical (rendu séparé) */}
      <div className="lg:hidden">
        <SolutionStackMobile />
      </div>

      {/* Desktop : tabs interactif (sidebar + zone agent) */}
      <div
        className={[
          "hidden lg:flex relative w-full overflow-hidden",
          "flex-col py-20 md:py-28",
        ].join(" ")}
      >
        {/* V0.18.0 : grid+glow body suffisent (signature dev/tech). withGrid kept for backwards compat */}

        {/* Section header */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 text-center mb-10 md:mb-14 lg:mb-12">
          <div
            className="text-[11px] uppercase tracking-[0.18em] text-[#22D3EE] mb-4"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // catalogue agents
          </div>
          <h2
            className="font-display font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Nos{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              7 modèles d&apos;agents
            </span>
            , prêts à travailler pour vous.
          </h2>
          <p className="mt-5 text-white/60 text-base sm:text-lg max-w-[55ch] mx-auto">
            Une équipe complète, sous votre supervision.
          </p>
        </div>

        {/* Organigramme compact (desktop only) — vue hiérarchique avant les tabs */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
          <OrgChartCompact
            agents={AGENTS}
            activeIdx={activeIdx}
            onAgentClick={handleSelectAgent}
          />
        </div>

        {/* Phrase de transition entre l'organigramme et le tableau d'agents */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 text-center mb-12 md:mb-16">
          <p
            className="font-display font-bold leading-[1.15] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
          >
            Faites votre propre organigramme,{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              en fonction de vos besoins
            </span>
            .
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 flex-1 min-h-0 flex items-center"
        >
          <div
            className={[
              "relative w-full overflow-hidden",
              "border border-[#22D3EE]/20 bg-[#0E0E13]/80",
              "backdrop-blur",
              "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]",
            ].join(" ")}
          >
            {/* Glow ambient */}
            <div
              className="pointer-events-none absolute -top-32 left-1/4 h-[320px] w-[320px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.16), transparent 65%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-32 right-1/4 h-[320px] w-[320px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.12), transparent 65%)",
              }}
              aria-hidden
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[300px_1fr]">
              {/* Sidebar (desktop) — pills horizontales (mobile) */}
              <aside
                className={[
                  "relative",
                  "lg:border-r lg:border-white/8",
                  "px-3 py-3 lg:px-3 lg:py-5",
                ].join(" ")}
                role="tablist"
                aria-label="Liste des agents"
              >
                <div
                  className="hidden lg:block px-2 mb-3 text-[10px] uppercase tracking-[0.18em] text-[#22D3EE]/70"
                  style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                >
                  // vos agents
                </div>
                <div
                  className={[
                    "flex gap-2",
                    "lg:flex-col",
                    "overflow-x-auto lg:overflow-visible",
                    "snap-x snap-mandatory lg:snap-none",
                    "no-scrollbar",
                  ].join(" ")}
                  style={{ scrollbarWidth: "none" }}
                >
                  {AGENTS.map((agent, i) => {
                    const isActive = i === activeIdx;
                    return (
                      <button
                        key={agent.num}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="agent-panel"
                        onClick={() => handleSelectAgent(i)}
                        className={[
                          "shrink-0 lg:shrink",
                          "snap-center lg:snap-none",
                          "text-left cursor-pointer",
                          "flex items-center gap-3",
                          "px-3 py-2.5",
                          "transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]/40",
                          isActive
                            ? "bg-gradient-to-r from-[#8B5CF6]/15 to-[#22D3EE]/10 border border-[#22D3EE]/40"
                            : "border border-transparent hover:bg-white/[0.06] hover:border-white/10 hover:translate-x-0.5",
                        ].join(" ")}
                      >
                        {/* Dot indicator */}
                        <span
                          className={[
                            "relative h-2 w-2 rounded-full shrink-0",
                            isActive
                              ? "bg-[#22D3EE]"
                              : "bg-white/20",
                          ].join(" ")}
                          aria-hidden
                        >
                          {/* Halo statique (pas d'animation = pas de clignotement) */}
                          {isActive && (
                            <span
                              className="absolute inset-0 rounded-full bg-[#22D3EE]/40 blur-[3px]"
                              aria-hidden
                            />
                          )}
                        </span>

                        <span
                          className={[
                            "font-display font-bold text-xs leading-none tracking-tight",
                            "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent",
                          ].join(" ")}
                        >
                          {parseInt(agent.num, 10)}
                        </span>

                        <span className="flex flex-col min-w-0">
                          <span
                            className={[
                              "text-sm leading-tight whitespace-nowrap lg:whitespace-normal truncate",
                              isActive
                                ? "text-white font-semibold"
                                : "text-white/75",
                            ].join(" ")}
                          >
                            {agent.name}
                          </span>
                        </span>

                        {agent.flagship && (
                          <Star
                            size={12}
                            weight="fill"
                            className="text-[#FBBF24] shrink-0 ml-auto"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Center panel */}
              <div
                id="agent-panel"
                role="tabpanel"
                className="relative p-6 sm:p-8 md:p-10 min-h-[560px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.num}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                  >
                    {/* Text */}
                    <div>
                      <div className="flex items-center gap-3">
                        <AgentBadgeNumber
                          num={active.num}
                          flagship={active.flagship}
                          size="md"
                        />
                        {active.flagship && (
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#FBBF24]/30 bg-[#FBBF24]/10 text-[10px] uppercase tracking-[0.16em] text-[#FBBF24]"
                            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                          >
                            <Star size={12} weight="fill" />
                            Agent maître
                          </span>
                        )}
                      </div>
                      <h3
                        className="mt-3 font-display font-bold text-white leading-[1.1] tracking-[-0.01em]"
                        style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}
                      >
                        {active.name}
                      </h3>
                      <p
                        className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#22D3EE]/70"
                        style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                      >
                        // {active.metier}
                      </p>
                      <p className="mt-5 text-white/70 text-base leading-relaxed">
                        {active.description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {active.capabilities.map((cap) => {
                          const isMasterSkill =
                            active.flagship &&
                            /coordination|inter[\s-]?agents/i.test(cap);
                          return (
                            <li
                              key={cap}
                              className={[
                                "inline-flex items-center gap-1.5 px-3 py-1.5 border text-[12px]",
                                isMasterSkill
                                  ? "border-[#FBBF24]/40 bg-[#FBBF24]/[0.08] text-[#FBBF24]"
                                  : "border-[#22D3EE]/20 bg-white/[0.03] text-white/75",
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

                      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-[#22D3EE]/25 bg-white/[0.04]">
                        <span
                          className="text-[11px] uppercase tracking-[0.16em] text-[#22D3EE]/80"
                          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                        >
                          // tarif
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {active.price}
                        </span>
                      </div>
                    </div>

                    {/* Chat preview */}
                    <div>
                      <AgentChatPreview
                        agentName={active.name}
                        user={active.user}
                        agent={active.agent}
                        incoming={active.incoming}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Hint scroll-driven (desktop uniquement) */}
                {activeIdx === 0 && (
                  <div
                    className="hidden lg:block absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.18em] text-[#22D3EE]/45"
                    style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                  >
                    // ↓ scrollez pour découvrir chaque agent
                  </div>
                )}
                {activeIdx === 0 && (
                  <div
                    className="lg:hidden absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.18em] text-[#22D3EE]/45"
                    style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                  >
                    // ← cliquez pour explorer chaque agent
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
