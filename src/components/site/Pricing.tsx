"use client";

/**
 * Tarifs : un prix par agent, sélecteur mensuel / annuel (2 mois offerts),
 * simulateur d'équipe, frais d'intégration, offre Sur-mesure.
 */

import { useState } from "react";
import { AUDIT_URL, CONTACT_EMAIL } from "@/lib/links";
import { INTEGRATION_PER_AGENT, LAUNCH_FIRST_CLIENTS, PRICE_PER_AGENT, PRICE_PER_AGENT_YEAR } from "@/data/slides";
import { Icon } from "./Icons";

const NB = " ";
const MIN = 1;
const MAX = 12;

function eur(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + "€";
}

const FEATURES = ["Chaque agent développé sur mesure", "Évolutions et nouveaux modèles inclus", "Email, application, WhatsApp, téléphone", "Hébergement en Allemagne, isolation par client"];
const CUSTOM = ["Hébergement chez vous ou dans le pays de votre choix", "Agents métier conçus et entraînés pour votre activité", "Applications dédiées, taillées sur vos workflows", "Intégration ERP sur mesure et conseil sécurité"];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [n, setN] = useState(3);

  const monthly = n * PRICE_PER_AGENT;
  const yearly = n * PRICE_PER_AGENT_YEAR;
  const saved = monthly * 12 - yearly;
  const integration = n * INTEGRATION_PER_AGENT;

  return (
    <section className="section" id="tarifs">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-12 flex flex-col gap-5 lg:mb-6">
          <div className="kicker">Tarifs</div>
          <h2 className="h2">Un prix simple, par agent.</h2>
          <span className="mono text-[12px] tracking-[0.14em] uppercase text-muted">Hors taxes · B2B France</span>
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 self-start border border-accent px-3.5 py-2 text-[14px] text-ink">
            <span className="badge">Offre de lancement</span>
            Frais d&apos;intégration offerts pour les {LAUNCH_FIRST_CLIENTS} premiers clients
          </span>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-7">
          <div className="seg" role="tablist" aria-label="Périodicité">
            <button type="button" role="tab" aria-selected={!annual} onClick={() => setAnnual(false)}>
              Mensuel
            </button>
            <button type="button" role="tab" aria-selected={annual} onClick={() => setAnnual(true)}>
              Annuel <span className="badge">2 mois offerts</span>
            </button>
          </div>

          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="serif leading-none" style={{ fontSize: "clamp(64px, 8vw, 96px)", letterSpacing: "-0.02em" }}>
              {annual ? eur(PRICE_PER_AGENT_YEAR) : eur(PRICE_PER_AGENT)}
            </span>
            <span className="p text-[18px]">{annual ? "HT par agent et par an" : "HT par agent et par mois"}</span>
          </div>
          <p className="p text-[15px] -mt-3">
            {annual
              ? `Soit ${eur(PRICE_PER_AGENT)}${NB}HT par mois, dont deux mois offerts. Réglé d'avance pour 12${NB}mois.`
              : `ou ${eur(PRICE_PER_AGENT_YEAR)}${NB}HT par agent et par an, deux mois offerts. Mensuel sans engagement, préavis de 30${NB}jours.`}
          </p>

          <div className="box flex flex-col gap-4" style={{ padding: "20px 24px" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col gap-2.5">
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Simulez votre équipe</span>
              <div className="stepper">
                <button type="button" aria-label="Un agent de moins" disabled={n <= MIN} onClick={() => setN((v) => Math.max(MIN, v - 1))}>
                  <Icon.minus size={16} />
                </button>
                <span className="mono text-[13px] font-medium text-center" style={{ minWidth: 110 }} aria-live="polite">
                  {n} agent{n > 1 ? "s" : ""}
                </span>
                <button type="button" aria-label="Un agent de plus" disabled={n >= MAX} onClick={() => setN((v) => Math.min(MAX, v + 1))}>
                  <Icon.plus size={16} />
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-0.5">
              {annual ? (
                <>
                  <span className="mono text-[22px] font-medium">{eur(yearly)}{NB}HT / an</span>
                  <span className="small">soit {eur(yearly / 12)}{NB}HT / mois · {eur(saved)} économisés</span>
                </>
              ) : (
                <>
                  <span className="mono text-[22px] font-medium">{eur(monthly)}{NB}HT / mois</span>
                  <span className="small">ou {eur(yearly)}{NB}HT / an</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 pt-3 border-t border-rule-2 text-[14px]">
            <span className="text-muted">Intégration, une fois</span>
            <span className="mono">
              <s className="text-faint">à partir de {eur(integration)}{NB}HT</s>{" "}
              <span className="text-accent font-semibold">offerte</span>
              <span className="text-muted"> · {LAUNCH_FIRST_CLIENTS} premiers clients</span>
            </span>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-5 py-4 border-t border-ink border-b border-b-rule text-[15px]">
            <span className="font-medium">Frais d&apos;intégration</span>
            <span className="p text-[15px]">
              <span className="mono text-ink">à partir de {eur(INTEGRATION_PER_AGENT)}{NB}HT par agent</span>, une fois, selon vos outils. Devis précis à l&apos;issue de l&apos;audit.{" "}
              <span className="text-accent font-medium">Offerts pour les {LAUNCH_FIRST_CLIENTS} premiers clients.</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
            {FEATURES.map((f) => (
              <span key={f} className="flex gap-2.5 items-center">
                <span className="text-accent"><Icon.check size={16} /></span> {f}
              </span>
            ))}
          </div>

          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn self-start">
            Réserver mon audit gratuit <Icon.arrow size={16} />
          </a>
        </div>

        <div className="strong lg:col-start-9 lg:col-span-4 flex flex-col gap-4 md:gap-[18px] p-7 md:p-9">
          <span className="mono accent text-[11px] tracking-[0.14em] uppercase">Sur-mesure</span>
          <span className="serif leading-none" style={{ fontSize: 40 }}>Sur devis</span>
          <p className="muted text-[15px] leading-[1.55] m-0">Pour les besoins spécifiques et les organisations sensibles qui exigent un environnement taillé pour elles.</p>
          <div className="flex flex-col gap-2.5 text-[14px] pt-1.5">
            {CUSTOM.map((c) => (
              <span key={c} className="flex gap-2.5 items-center">
                <span className="accent"><Icon.check size={16} /></span> {c}
              </span>
            ))}
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demande de devis sur-mesure")}`} className="btn-inv self-start mt-2">
            Demander un devis <Icon.arrow size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
