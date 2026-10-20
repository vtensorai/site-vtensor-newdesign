"use client";

/**
 * Page Parrainage (2026-10-20) : simulateur de commission et questions en accordéon.
 * Montants lus dans data/pricing.ts, taux et délai dans data/referral.ts.
 */

import { useId, useState } from "react";
import { PRICE_PER_AGENT, PRICE_PER_AGENT_YEAR, TEAM_OFFER_LIVE, TEAM_PRICE, TEAM_PRICE_YEAR, eur } from "@/data/pricing";
import { AGENTS } from "@/data/home";
import { RATE_LABEL, REFERRAL_FAQS, commission } from "@/data/referral";
import { Icon } from "./Icons";

const NB = " ";
const MIN_FILLEULS = 1;
const MAX_FILLEULS = 99;

type Plan = number | "team";

/** Nombres d'agents proposés : en dessous du prix de la formule quand elle est en ligne (au-delà, le serveur applique la formule). */
const AGENT_COUNTS = Array.from({ length: AGENTS.length }, (_, i) => i + 1).filter((n) => !TEAM_OFFER_LIVE || n * PRICE_PER_AGENT < TEAM_PRICE);
const PLANS: readonly { value: Plan; label: string }[] = [
  ...AGENT_COUNTS.map((n) => ({ value: n as Plan, label: n === 1 ? "1 agent" : `${n} agents` })),
  ...(TEAM_OFFER_LIVE ? [{ value: "team" as Plan, label: "Équipe complète" }] : []),
];

const monthlyBase = (p: Plan) => (p === "team" ? TEAM_PRICE : p * PRICE_PER_AGENT);
const yearlyBase = (p: Plan) => (p === "team" ? TEAM_PRICE_YEAR : p * PRICE_PER_AGENT_YEAR);

export function ReferralSimulator() {
  const id = useId();
  const [count, setCount] = useState(3);
  /** Saisie en cours dans le champ (null : le champ affiche `count`), pour pouvoir l'effacer avant de retaper. */
  const [draft, setDraft] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan>(2);
  const clamp = (n: number) => Math.min(MAX_FILLEULS, Math.max(MIN_FILLEULS, Math.round(n)));
  const step = (d: number) => {
    setDraft(null);
    setCount((c) => clamp(c + d));
  };
  const perMonth = count * commission(monthlyBase(plan));
  const perYearIfAnnual = count * commission(yearlyBase(plan));

  return (
    <div className="box grid grid-cols-1 lg:grid-cols-12" style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col gap-7 border-b lg:border-b-0 lg:border-r border-rule-2">
        <div className="flex flex-col gap-3">
          <label htmlFor={`${id}-count`} className="mono text-[11px] tracking-[0.14em] uppercase text-muted">
            Entreprises parrainées
          </label>
          <div className="inline-flex items-stretch self-start border border-rule bg-paper">
            <button type="button" onClick={() => step(-1)} disabled={count <= MIN_FILLEULS} aria-label="Une entreprise de moins" className="w-12 inline-flex items-center justify-center text-ink hover:bg-alt hover:text-accent transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink">
              <Icon.minus size={16} />
            </button>
            <input
              id={`${id}-count`}
              type="number"
              inputMode="numeric"
              min={MIN_FILLEULS}
              max={MAX_FILLEULS}
              value={draft ?? String(count)}
              onChange={(e) => {
                const raw = e.target.value;
                setDraft(raw);
                const v = Number(raw);
                if (raw !== "" && Number.isFinite(v)) setCount(clamp(v));
              }}
              onBlur={() => setDraft(null)}
              className="w-16 h-12 text-center mono text-[18px] text-ink bg-transparent border-x border-rule [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button type="button" onClick={() => step(1)} disabled={count >= MAX_FILLEULS} aria-label="Une entreprise de plus" className="w-12 inline-flex items-center justify-center text-ink hover:bg-alt hover:text-accent transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink">
              <Icon.plus size={16} />
            </button>
          </div>
        </div>

        <fieldset className="m-0 p-0 border-0 flex flex-col gap-3 min-w-0">
          <legend className="mono text-[11px] tracking-[0.14em] uppercase text-muted mb-3">Abonnement de chaque entreprise</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {PLANS.map((p) => (
              <label
                key={String(p.value)}
                className={`flex flex-col items-start gap-1 px-3.5 py-3 border border-rule bg-card text-ink cursor-pointer transition-colors hover:border-ink has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:shadow-[inset_0_0_0_1px_var(--accent)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${p.value === "team" ? "col-span-2" : ""}`}
              >
                <input type="radio" name={`${id}-plan`} value={String(p.value)} checked={plan === p.value} onChange={() => setPlan(p.value)} className="sr-only" />
                <span className="text-[14.5px] font-medium whitespace-nowrap">{p.label}</span>
                <span className="mono text-[12px] text-muted whitespace-nowrap">{`${eur(monthlyBase(p.value))}${NB}HT${NB}/${NB}mois`}</span>
              </label>
            ))}
          </div>
          <span className="small">Prix de l&apos;abonnement mensuel de l&apos;entreprise parrainée, hors frais d&apos;intégration.</span>
        </fieldset>
      </div>

      <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col gap-5 justify-between" aria-live="polite">
        <div className="flex flex-col gap-5">
          <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Votre commission ({RATE_LABEL})</span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="fig">{eur(perMonth)}</span>
            <span className="text-[16px] text-muted">HT par mois</span>
          </div>
          <div className="flex justify-between items-baseline gap-4 pt-4 border-t border-rule-2 text-[15px]">
            <span className="text-muted">Sur 12 mois</span>
            <span className="mono text-[18px] text-ink">{eur(perMonth * 12)}{NB}HT</span>
          </div>
        </div>
        <p className="small m-0">
          Pour des entreprises abonnées au mois, tant qu&apos;elles restent abonnées. Si elles règlent à l&apos;année, la commission porte sur leur facture annuelle{NB}: {eur(perYearIfAnnual)}{NB}HT par an pour cette sélection.
        </p>
      </div>
    </div>
  );
}

export function ReferralFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col">
      {REFERRAL_FAQS.map((f, i) => {
        const isOpen = open === i;
        const panelId = `parrainage-a-${i}`;
        return (
          <div key={f.question} className="border-t border-rule last:border-b">
            <button type="button" id={`parrainage-q-${i}`} className="qa w-full text-left cursor-pointer" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
              <span className="num pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="qa-q serif text-[21px] md:text-[24px] leading-[1.2]">{f.question}</span>
              <span className="qa-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" className="qa-v" />
                </svg>
              </span>
            </button>
            <div id={panelId} className="qa-panel" data-open={isOpen} role="region" aria-labelledby={`parrainage-q-${i}`}>
              <div className="qa-panel-inner">
                <p className="p text-[15px] pb-7">{f.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
