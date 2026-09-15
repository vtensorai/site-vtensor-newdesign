"use client";

/**
 * Hero en carrousel : la photo, la proposition d'équipe et le mot du titre
 * changent ensemble toutes les 6 s (pause au survol, arrêt si l'utilisateur
 * choisit un onglet, respect de prefers-reduced-motion).
 */

import { useEffect, useRef, useState } from "react";
import { AUDIT_URL } from "@/lib/links";
import { INTEGRATION_PER_AGENT, LAUNCH_OFFER_ACTIVE, LAUNCH_OFFER_END_SHORT, PRICE_PER_AGENT, SLIDES } from "@/data/slides";
import { Photo } from "./Photo";

const NB = " ";
const DURATION = 6000;

function eur(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NB) + NB + "€";
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const manual = useRef(false);

  useEffect(() => {
    if (paused || manual.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), DURATION);
    return () => window.clearTimeout(t);
  }, [index, paused]);

  const slide = SLIDES[index];
  const total = PRICE_PER_AGENT * slide.agents.length;

  return (
    <section className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-14 pb-16 lg:pt-24 lg:pb-28">
      {/* Texte */}
      <div className="lg:col-span-7 flex flex-col gap-7 lg:gap-8 lg:pr-6">
        <div className="kicker">Agence d&apos;agents IA · France</div>
        <h1 className="h1">
          Reprenez le contrôle de{" "}
          <span key={slide.id} className="text-accent fade-in inline-block">
            {slide.word}
          </span>
          .
        </h1>
        <p className="lead max-w-[600px]">
          Des agents IA développés sur mesure pour votre entreprise. Vous leur parlez en direct, par email ou depuis l&apos;application.
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn">
            Réserver un audit gratuit · 30{NB}min
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </a>
          <a href="#tarifs" className="btn-ghost">Voir les tarifs</a>
        </div>
        <div className="small flex flex-wrap gap-y-2">
          <span className="pr-5 border-r border-rule">Données hébergées en Allemagne</span>
          <span className="px-5 border-r border-rule">Sans engagement</span>
          <span className="pl-5">Réponse sous 24{NB}h</span>
        </div>
      </div>

      {/* Photo + proposition d'équipe + onglets */}
      <div
        className="lg:col-span-5 flex flex-col gap-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative lg:pb-14">
          {/* Les quatre photos sont empilées et fondues : pas de chargement à la bascule. */}
          <div className="relative h-[440px] sm:h-[520px] lg:h-[640px]">
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                aria-hidden={i !== index}
              >
                <Photo name={s.photo} alt={s.alt} width={896} height={1200} priority={i === 0} className="photo h-full" />
              </div>
            ))}
          </div>
          <div
            key={slide.id + "-card"}
            className="box fade-in relative z-10 lg:absolute lg:-left-[72px] lg:bottom-0 lg:w-[360px] mt-4 lg:mt-0 p-6 lg:p-7 flex flex-col gap-3.5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex justify-between items-baseline">
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">Proposition d&apos;équipe</span>
              <span className="mono text-[10px] text-faint">exemple</span>
            </div>
            <div className="serif text-[24px] leading-tight">{slide.company}</div>
            <div className="flex flex-col">
              {slide.agents.map((a) => (
                <div key={a} className="flex justify-between py-2.5 border-t border-rule-2 text-[14px]">
                  <span>{a}</span>
                  <span className="mono text-[13px] text-muted">{eur(PRICE_PER_AGENT)}{NB}HT / mois</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-ink text-[14px] font-semibold">
                <span>Abonnement</span>
                <span className="mono text-[13px]">{eur(total)}{NB}HT / mois</span>
              </div>
              {LAUNCH_OFFER_ACTIVE ? (
                <div className="flex justify-between items-baseline gap-3 pt-1 text-[12px] text-muted">
                  <span>Intégration</span>
                  <span className="mono whitespace-nowrap">
                    <s className="text-faint">{eur(INTEGRATION_PER_AGENT * slide.agents.length)}{NB}HT</s>{" "}
                    <span className="text-offer font-semibold">offerte jusqu&apos;au {LAUNCH_OFFER_END_SHORT}</span>
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-baseline gap-3 pt-1 text-[12px] text-muted">
                  <span>Intégration</span>
                  <span className="mono whitespace-nowrap">à partir de {eur(INTEGRATION_PER_AGENT * slide.agents.length)}{NB}HT</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dots" role="tablist" aria-label="Exemples de métiers" style={{ ["--dot-duration" as string]: `${DURATION}ms` }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className="dot"
              onClick={() => {
                manual.current = true;
                setIndex(i);
              }}
            >
              <span className="dot-bar" aria-hidden="true" />
              <span className="hidden sm:inline">{s.company}</span>
              <span className="sm:hidden">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
