"use client";

/**
 * Tarifs : le visiteur compose son équipe en cochant des postes (plutôt
 * qu'un compteur abstrait), le reçu se met à jour, prix ramené au jour,
 * offre de lancement dite une seule fois. Sur-mesure en bandeau.
 */

import { useState } from "react";
import { AUDIT_URL, CONTACT_EMAIL } from "@/lib/links";
import { INTEGRATION_PER_AGENT, LAUNCH_OFFER_ACTIVE, LAUNCH_OFFER_END, PRICE_PER_AGENT, PRICE_PER_AGENT_YEAR, PRICE_PER_DAY, eur } from "@/data/pricing";
import { AGENT_COLOR, AGENTS, type AgentKey } from "@/data/home";
import { Icon } from "./Icons";

const NB = " ";

const INCLUDED = ["Chaque agent développé pour vous", "Évolutions et nouveaux modèles inclus", "Email, téléphone, application", "Hébergement en Allemagne", "Sans engagement en mensuel", "Intégration à vos outils"];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [team, setTeam] = useState<ReadonlySet<AgentKey>>(() => new Set<AgentKey>(["SAV", "STA", "ADM"]));
  const n = team.size;
  const monthly = n * PRICE_PER_AGENT;
  const yearly = n * PRICE_PER_AGENT_YEAR;
  const perDay = (annual ? yearly : monthly * 12) / 365;
  const toggle = (k: AgentKey) =>
    setTeam((t) => {
      const next = new Set(t);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  return (
    <section className="section" id="tarifs">
      <div className="shell flex flex-col gap-10 lg:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="kicker">Tarifs</div>
            <h2 className="h2">Un prix simple, par agent.</h2>
          </div>
          <div className="lg:col-start-9 lg:col-span-4 flex flex-col gap-1">
            <span className="serif text-[44px] leading-none">
              {eur(PRICE_PER_AGENT)} <span className="font-sans text-[16px] text-muted">HT par agent et par mois</span>
            </span>
            <span className="small">soit environ {eur(PRICE_PER_DAY, 2)}{NB}HT par jour · ou {eur(PRICE_PER_AGENT_YEAR)}{NB}HT par an, 2 mois offerts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Composer */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Composez votre équipe</span>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
              {AGENTS.map((a) => {
                const on = team.has(a.key);
                return (
                  <button key={a.key} type="button" className="pick" aria-pressed={on} onClick={() => toggle(a.key)}>
                    <span className="flex items-center justify-between gap-3 w-full">
                      <span className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink">
                        <span className="w-[8px] h-[8px] rounded-full" style={{ background: AGENT_COLOR[a.key] }} aria-hidden="true" />
                        {a.short}
                      </span>
                      <span className="pick-box" aria-hidden="true">{on && <Icon.check size={13} />}</span>
                    </span>
                    <span className="text-[12.5px] sm:text-[13px] text-muted leading-snug">{a.metier}</span>
                  </button>
                );
              })}
            </div>
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Un poste sur mesure")}`} className="flex items-center justify-between gap-4 px-4 py-3.5 border border-dashed border-faint text-[14px] hover:border-accent transition-colors">
              <span>
                <span className="text-accent font-medium whitespace-nowrap">+ Votre poste</span> <span className="text-muted">· un besoin qui n&apos;est pas dans la liste, on le développe</span>
              </span>
              <Icon.arrow size={14} />
            </a>
            <div className="flex flex-col gap-3 pt-5">
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Inclus dans chaque abonnement</span>
              <ul className="m-0 p-0 list-none grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2.5 text-[13.5px] sm:text-[14.5px]">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex gap-2.5 items-start">
                    <span className="text-accent pt-0.5"><Icon.check size={15} /></span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reçu */}
          <div className="lg:col-span-5 box flex flex-col lg:sticky lg:top-24" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-rule-2">
              <span className="serif text-[22px]">Votre équipe</span>
              <div className="seg" role="tablist" aria-label="Périodicité">
                <button type="button" role="tab" aria-selected={!annual} onClick={() => setAnnual(false)}>
                  Mensuel
                </button>
                <button type="button" role="tab" aria-selected={annual} onClick={() => setAnnual(true)}>
                  Annuel
                </button>
              </div>
            </div>
            <div className="px-5 py-3 flex flex-col min-h-[132px]">
              {n === 0 && <span className="small py-3">Cochez au moins un poste.</span>}
              {AGENTS.filter((a) => team.has(a.key)).map((a) => (
                <div key={a.key} className="flex justify-between items-center py-2.5 border-b border-rule-2 last:border-b-0 text-[14px]">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="w-[7px] h-[7px] rounded-full" style={{ background: AGENT_COLOR[a.key] }} aria-hidden="true" />
                    {a.name}
                  </span>
                  <span className="mono text-[13px] text-muted">{annual ? eur(PRICE_PER_AGENT_YEAR) : eur(PRICE_PER_AGENT)}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-ink flex flex-col gap-1" aria-live="polite">
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-semibold">{annual ? "Par an" : "Par mois"}</span>
                <span className="mono text-[24px] font-medium">{eur(annual ? yearly : monthly)}{NB}HT</span>
              </div>
              <span className="small text-right">
                {n > 0 ? <>soit {eur(perDay, 2)}{NB}HT par jour{annual ? ` · ${eur(monthly * 12 - yearly)} économisés` : ""}</> : " "}
              </span>
            </div>
            <div className="px-5 py-3.5 border-t border-rule-2 flex justify-between items-baseline gap-4 text-[14px]">
              <span className="text-muted">Intégration, une fois</span>
              {LAUNCH_OFFER_ACTIVE ? (
                <span className="mono text-right">
                  <s className="text-faint">dès {eur(n * INTEGRATION_PER_AGENT)}</s> <span className="text-offer font-semibold">offerte</span>
                </span>
              ) : (
                <span className="mono">dès {eur(n * INTEGRATION_PER_AGENT)}{NB}HT</span>
              )}
            </div>
            {LAUNCH_OFFER_ACTIVE && (
              <div className="px-5 py-2.5 border-t border-offer text-[13px] text-offer" style={{ background: "color-mix(in srgb, var(--offer) 7%, transparent)" }}>
                Offre de lancement : frais d&apos;intégration offerts pour toute commande passée jusqu&apos;au {LAUNCH_OFFER_END}.
              </div>
            )}
            <div className="px-5 py-5 border-t border-rule-2 flex flex-col">
              <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn">
                Réserver mon audit gratuit <Icon.arrow size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Sur-mesure */}
        <div className="strong grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-7 md:p-9">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="mono accent text-[11px] tracking-[0.14em] uppercase">Sur-mesure · sur devis</span>
            <span className="serif text-[28px] leading-tight">Pour les organisations qui veulent un environnement à elles.</span>
          </div>
          <ul className="lg:col-span-5 m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[14px]">
            {["Hébergement chez vous ou dans le pays de votre choix", "Agents métier conçus pour votre activité", "Applications dédiées à vos façons de travailler", "Intégration poussée à votre logiciel de gestion, conseil sécurité"].map((c) => (
              <li key={c} className="flex gap-2.5 items-start">
                <span className="accent pt-0.5"><Icon.check size={15} /></span> {c}
              </li>
            ))}
          </ul>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demande de devis sur-mesure")}`} className="btn-inv lg:col-span-3 lg:justify-self-end">
            Demander un devis <Icon.arrow size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
