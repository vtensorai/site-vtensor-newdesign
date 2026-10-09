"use client";

/**
 * Hero : « Des agents IA qui [tâche]. » La tâche, la photo, la notification
 * (ce que l'agent vient de faire) et l'équipe proposée changent ensemble toutes
 * les 6 s. Pause au survol, arrêt au clic, mouvement réduit respecté.
 */

import { useEffect, useRef, useState } from "react";
import { AUDIT_URL } from "@/lib/links";
import { INTEGRATION_PER_AGENT, LAUNCH_OFFER_ACTIVE, LAUNCH_OFFER_END_SHORT, PRICE_PER_AGENT, eur } from "@/data/pricing";
import { AGENT_COLOR, SLIDES, agentByKey } from "@/data/home";
import { Icon } from "./Icons";
import { Photo } from "./Photo";
import { AgentTag } from "./Bits";

const NB = " ";
const DURATION = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState<ReadonlySet<number>>(() => new Set([0]));
  const manual = useRef(false);

  useEffect(() => {
    if (paused || manual.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), DURATION);
    return () => window.clearTimeout(t);
  }, [index, paused]);

  useEffect(() => {
    const next = (index + 1) % SLIDES.length;
    const t = window.setTimeout(() => setMounted((m) => (m.has(next) ? m : new Set(m).add(next))), 2000);
    return () => window.clearTimeout(t);
  }, [index]);

  const s = SLIDES[index];
  const total = PRICE_PER_AGENT * s.agents.length;

  return (
    <section className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-8 pb-14 lg:pt-14 lg:pb-20" id="haut">
      <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-7">
        <div className="kicker">Agents IA sur mesure · France</div>
        <h1 className="h1-hero">
          Des agents IA qui{" "}
          <span key={s.id} className="text-accent fade-in">
            {s.task}
          </span>
          .
        </h1>
        <p className="lead max-w-[560px]">
          Pendant que vous êtes à l&apos;atelier, sur un chantier ou en rendez-vous. Chaque agent est développé pour votre entreprise, travaille dans vos outils et vous transmet ce qui demande votre décision.
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Réserver un échange" data-umami-event-emplacement="haut-de-page" className="btn">
            Réserver un audit gratuit · 30{NB}min <Icon.arrow size={16} />
          </a>
          <a href="#journee" className="btn-ghost">
            Voir une journée type
          </a>
        </div>
        <ul className="small m-0 p-0 list-none flex flex-wrap gap-x-5 gap-y-1.5">
          {[`${eur(PRICE_PER_AGENT)}${NB}HT par agent et par mois`, "Sans engagement", "Hébergé en Allemagne"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <span className="text-accent"><Icon.check size={14} /></span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-6 flex flex-col gap-5" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="relative lg:pl-16">
          <div className="relative h-[300px] sm:h-[420px] lg:h-[560px]">
            {SLIDES.map(
              (x, i) =>
                (mounted.has(i) || i === index) && (
                  <div key={x.id} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }} aria-hidden={i !== index}>
                    <Photo name={x.photo} alt={x.alt} width={896} height={1200} priority={i === 0} widths={[480]} sizes="(min-width: 1024px) 470px, 100vw" className="photo h-full" />
                  </div>
                ),
            )}
            {/* Notification : ce que l'agent vient de faire */}
            <div key={s.id + "-n"} className="fade-in absolute z-10 left-3 right-3 bottom-3 sm:left-auto sm:right-4 sm:w-[340px] lg:right-auto lg:-left-16 lg:top-10 lg:bottom-auto box p-4 flex flex-col gap-2" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between gap-3">
                <AgentTag k={s.notif.agent} full />
                <span className="art-meta">{s.notif.time}</span>
              </div>
              <p className="m-0 text-[14px] leading-[1.45] text-ink">{s.notif.text}</p>
            </div>
          </div>

          {/* Équipe proposée pour ce métier */}
          <div key={s.id + "-c"} className="fade-in box relative z-10 mt-4 lg:mt-0 lg:absolute lg:-left-6 lg:-bottom-8 lg:w-[310px] p-5 flex flex-col gap-3" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex justify-between items-baseline gap-3">
              <span className="serif text-[21px] leading-tight">{s.company}</span>
              <span className="mono text-[10px] text-faint">exemple</span>
            </div>
            <div className="flex flex-col">
              {s.agents.map((k) => (
                <div key={k} className="flex justify-between items-center py-2 border-t border-rule-2 text-[13.5px]">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="w-[7px] h-[7px] rounded-full" style={{ background: AGENT_COLOR[k] }} aria-hidden="true" />
                    {agentByKey(k).name}
                  </span>
                  <span className="mono text-[12px] text-muted">{eur(PRICE_PER_AGENT)}</span>
                </div>
              ))}
              <div className="flex justify-between items-baseline pt-2.5 border-t border-ink text-[13.5px] font-semibold">
                <span>Par mois</span>
                <span className="mono text-[13px]">{eur(total)}{NB}HT</span>
              </div>
              <div className="flex justify-between items-baseline gap-3 pt-1.5 text-[12px] text-muted">
                <span>Intégration</span>
                {LAUNCH_OFFER_ACTIVE ? (
                  <span className="mono text-offer font-semibold">offerte jusqu&apos;au {LAUNCH_OFFER_END_SHORT}</span>
                ) : (
                  <span className="mono">dès {eur(INTEGRATION_PER_AGENT * s.agents.length)}{NB}HT</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="dots lg:mt-12" role="tablist" aria-label="Exemples de métiers" style={{ ["--dot-duration" as string]: `${DURATION}ms` }}>
          {SLIDES.map((x, i) => (
            <button
              key={x.id}
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
              <span className="hidden sm:inline">{x.company}</span>
              <span className="sm:hidden">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
