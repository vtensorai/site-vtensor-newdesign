"use client";

/**
 * Catalogue : six postes avec leur couleur (la même que dans l'application),
 * la mission visible sur mobile, le prix dit une seule fois. Fiche : promesse,
 * exemples de missions (des idées, tout est développé sur mesure), un échange
 * avec un client de TPE, canaux.
 * Desktop : fiche en colonne. Mobile / tablette : fiche dépliée sous la ligne.
 */

import { useState } from "react";
import { AGENT_COLOR, AGENTS, type Agent } from "@/data/home";
import { PRICE_PER_AGENT, eur } from "@/data/pricing";
import { CHANNEL_ICON, Icon } from "./Icons";
import { AgentTag, rich } from "./Bits";

const NB = " ";
const CHANNEL: Record<Agent["channels"][number], string> = { email: "Email", whatsapp: "WhatsApp", phone: "Téléphone", web: "Application" };

function Fiche({ a, id, role }: { a: Agent; id: string; role?: string }) {
  return (
    <div id={id} role={role} className="box p-5 sm:p-6 md:p-7 flex flex-col gap-4 md:gap-5" style={{ borderTop: `2px solid ${AGENT_COLOR[a.key]}` }}>
      <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
        <AgentTag k={a.key} full />
        <span className="mono text-[12px] whitespace-nowrap text-muted">{eur(PRICE_PER_AGENT)}{NB}HT / mois</span>
      </div>
      <h3 className="h3" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>{a.headline}</h3>
      <p className="p text-[15px]">{a.description}</p>
      <div className="flex flex-col gap-2.5">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Exemples de missions</span>
        <div className="flex flex-wrap gap-2">
          {a.missions.map((c) => (
            <span key={c} className="chip">
              <Icon.check size={13} /> {c}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 pt-1">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Exemple</span>
        <div className="bubble bubble-in">
          {a.example.from && (
            <>
              <span className="mono text-[10px] tracking-[0.1em] uppercase text-accent">{a.example.from}</span>
              <br />
            </>
          )}
          {a.example.user}
        </div>
        <div className="bubble">{rich(a.example.agent)}</div>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-rule-2">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted mr-1">Joignable par</span>
        {a.channels.map((ch) => {
          const Ic = CHANNEL_ICON[ch];
          return (
            <span key={ch} className="chip">
              <Ic size={13} /> {CHANNEL[ch]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Agents() {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected ?? 0;
  const onRow = (i: number) => {
    const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
    setSelected((prev) => (desktop ? i : prev === i ? null : i));
  };

  return (
    <section className="section" id="agents">
      <div className="shell flex flex-col gap-10 lg:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="kicker">Agents</div>
            <h2 className="h2">Six postes pour commencer. Le vôtre, sur mesure.</h2>
          </div>
          <div className="lg:col-start-9 lg:col-span-4 flex flex-col gap-3">
            <p className="p">Des exemples pour vous donner des idées : vous adaptez un poste ou vous inventez celui qui vous manque. Chaque agent se branche sur vos outils.</p>
            <span className="mono text-[13px] text-ink">{eur(PRICE_PER_AGENT)}{NB}HT par mois, chacun.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex flex-col" role="tablist" aria-label="Postes">
              {AGENTS.map((ag, i) => {
                const open = i === selected;
                return (
                  <div key={ag.key} className="flex flex-col">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={i === current}
                      aria-expanded={open}
                      aria-controls={`agent-fiche agent-fiche-${ag.key}`}
                      className="arow"
                      style={{ gridTemplateColumns: "14px 1fr 24px" }}
                      data-open={open}
                      data-current={i === current}
                      onClick={() => onRow(i)}
                    >
                      <span className="w-[9px] h-[9px] rounded-full self-center" style={{ background: AGENT_COLOR[ag.key] }} aria-hidden="true" />
                      <span className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-6">
                        <span className="text-[17px] md:text-[18px] font-medium text-ink">{ag.name}</span>
                        <span className="text-[14px] text-muted">{ag.metier}</span>
                      </span>
                      <span className="arow-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M5 12h14" />
                          <path d="M12 5v14" className="arow-v" />
                        </svg>
                      </span>
                    </button>
                    <div className="fiche-panel lg:hidden" data-open={open} aria-hidden={!open}>
                      <div className="fiche-panel-inner">
                        <div className="pt-1 pb-6">
                          <Fiche a={ag} id={`agent-fiche-${ag.key}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <a href="#tarifs" className="arow arow-plus text-accent" style={{ gridTemplateColumns: "14px 1fr 24px" }}>
              <span className="text-[18px] leading-none">+</span>
              <span className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <span className="text-[17px] md:text-[18px] font-medium whitespace-nowrap">Votre poste</span>
                <span className="text-[14px] text-muted">Un besoin qui n&apos;est pas dans la liste{NB}? On le développe.</span>
              </span>
              <span className="arow-icon" style={{ display: "inline-flex" }} aria-hidden="true">
                <Icon.arrow size={13} />
              </span>
            </a>
          </div>

          <div className="hidden lg:block lg:col-start-7 lg:col-span-6 lg:sticky lg:top-24">
            <Fiche a={AGENTS[current]} id="agent-fiche" role="tabpanel" />
          </div>
        </div>
      </div>
    </section>
  );
}
