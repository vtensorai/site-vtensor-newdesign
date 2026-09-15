"use client";

/**
 * Catalogue : liste des six postes (lignes sélectionnables) + fiche détaillée
 * de l'agent sélectionné (promesse, capacités, exemple d'échange, canaux).
 * Desktop (≥ lg) : fiche en colonne de droite. Mobile / tablette : la fiche
 * se déplie sous la ligne choisie, comme la FAQ.
 */

import { useState } from "react";
import { AGENTS, CHANNEL_LABEL, type Agent } from "@/data/agents";
import { PRICE_PER_AGENT } from "@/data/slides";
import { CHANNEL_ICON, Icon } from "./Icons";
import { SectionHead } from "./SectionHead";

const NB = " ";

/** Rend `**gras**` en <strong>. */
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function Fiche({ a, id, role }: { a: Agent; id: string; role?: string }) {
  return (
    <div id={id} role={role} className="box p-5 sm:p-6 md:p-7 flex flex-col gap-4 md:gap-[18px]">
      <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">
          {a.num} · {a.name}
          {a.autonomous ? " · autonome" : ""}
        </span>
        <span className="mono text-[12px] whitespace-nowrap">{PRICE_PER_AGENT}{NB}€{NB}HT / mois</span>
      </div>
      <h3 className="h3" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>{a.headline}</h3>
      <p className="p text-[15px]">{a.description}</p>
      <div className="flex flex-wrap gap-2">
        {a.capabilities.map((c) => (
          <span key={c} className="chip">
            <Icon.check size={13} /> {c}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 pt-1.5">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Exemple d&apos;échange</span>
        <div className="bubble bubble-in">
          {a.example.from && (
            <>
              <span className="mono text-[10px] tracking-[0.1em] uppercase text-accent">De {a.example.from}</span>
              <br />
            </>
          )}
          {a.example.user}
        </div>
        <div className="bubble">{rich(a.example.agent)}</div>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1.5 border-t border-rule-2">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Joignable via</span>
        {a.channels.map((ch) => {
          const Ic = CHANNEL_ICON[ch];
          return (
            <span key={ch} className="chip">
              <Ic size={13} /> {CHANNEL_LABEL[ch]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Agents() {
  const [selected, setSelected] = useState(0);
  const a = AGENTS[selected];

  return (
    <section className="section" id="agents">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <SectionHead
          kicker="Agents"
          title="Six postes, développés sur mesure."
          lead="Des exemples pour vous donner des idées. Vous composez votre équipe, vous adaptez un poste, ou vous inventez celui qui vous manque. Vous parlez à chaque agent en direct."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Liste (+ fiche dépliée sous la ligne choisie en dessous de lg) */}
          <div className="lg:col-span-7 flex flex-col" role="tablist" aria-label="Postes du catalogue">
            {AGENTS.map((ag, i) => {
              const open = i === selected;
              return (
                <div key={ag.slug} className="flex flex-col">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={open}
                    aria-controls={`agent-fiche agent-fiche-${ag.slug}`}
                    className="arow"
                    onClick={() => setSelected(i)}
                  >
                    <span className="num">{ag.num}</span>
                    <span className="text-[16px] md:text-[18px] font-medium text-ink">{ag.name}</span>
                    <span className="hidden md:block text-[14px] text-muted">{ag.metier}</span>
                    <span className="mono text-[12px] md:text-[13px] text-right text-muted whitespace-nowrap">{PRICE_PER_AGENT}{NB}€{NB}HT / mois</span>
                  </button>
                  <div className="fiche-panel lg:hidden" data-open={open} aria-hidden={!open}>
                    <div className="fiche-panel-inner">
                      <div className="pt-1 pb-6">
                        <Fiche a={ag} id={`agent-fiche-${ag.slug}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <a href="#tarifs" className="arow arow-plus text-accent" style={{ cursor: "pointer" }}>
              <span className="num text-accent">+</span>
              <span className="text-[16px] md:text-[18px] font-medium">Votre poste</span>
              <span className="hidden md:block text-[14px] text-muted">Un besoin qui n&apos;est pas dans la liste{NB}? On le développe.</span>
              <span className="mono text-[12px] md:text-[13px] text-right whitespace-nowrap">sur devis</span>
            </a>
          </div>

          {/* Fiche en colonne (desktop) */}
          <div className="hidden lg:block lg:col-start-8 lg:col-span-5">
            <Fiche a={a} id="agent-fiche" role="tabpanel" />
          </div>
        </div>
      </div>
    </section>
  );
}
