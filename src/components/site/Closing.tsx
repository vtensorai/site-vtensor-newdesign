"use client";

/**
 * Fin de page : sécurité compacte (sans photo de baie de serveurs),
 * « qui est derrière » (le fondateur mène l'audit ; pas de téléphone, consigne
 * de Victor du 08/10), appel final avec ce que l'audit apporte, barre d'action
 * fixe sur mobile.
 */

import { useEffect, useState } from "react";
import { AUDIT_URL, CONTACT_EMAIL } from "@/lib/links";
import { AUDIT_DELIVERABLES } from "@/data/home";
import { Icon } from "./Icons";
import { Photo } from "./Photo";
import { Reveal } from "./Bits";

const NB = " ";

const GUARDS: { icon: "server" | "shield" | "file" | "eye"; title: string; text: string }[] = [
  { icon: "server", title: `Allemagne, ISO${NB}27001`, text: "Serveurs Hetzner en Allemagne. Chaque client a son propre espace : vos données ne croisent jamais celles d'un autre." },
  { icon: "shield", title: "Un agent ne lit que ce qui le concerne", text: "Un agent qui répond à un email n'accède qu'aux données de son expéditeur, par une règle du système et non par une consigne." },
  { icon: "file", title: "Pièces jointes contrôlées", text: "Formats dangereux bloqués, antivirus. Le contenu d'un fichier est lu comme une donnée, jamais comme une instruction." },
  { icon: "eye", title: "Vous gardez la main", text: "Les actions sensibles vous sont soumises, chaque action est journalisée, un agent hors de son périmètre vous passe la main." },
];

export function Security() {
  return (
    <section className="section" id="securite">
      <div className="shell flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="kicker">Sécurité</div>
            <h2 className="h2">Vos données restent dans leur périmètre.</h2>
          </div>
          <p className="p lg:col-start-9 lg:col-span-4">Quatre garde-fous, actifs sur chaque agent.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {GUARDS.map((g, i) => {
            const Ic = Icon[g.icon];
            return (
              <Reveal key={g.title} delay={i * 80} className="flex flex-col gap-3 pt-5 border-t border-ink">
                <span className="text-accent"><Ic size={22} /></span>
                <h3 className="text-[17px] font-medium leading-snug m-0 text-ink">{g.title}</h3>
                <p className="p text-[14.5px]">{g.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section className="section">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          <div className="lg:col-span-3">
            <Photo name="victor" alt="Victor Arnoul" width={640} height={640} widths={[192]} sizes="(min-width: 768px) 200px, 160px" className="photo w-[160px] md:w-[200px] aspect-square" />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="kicker">Qui est derrière</div>
            <p className="serif m-0 text-[clamp(24px,2.5vw,34px)] leading-[1.25] text-ink text-balance">
              «{NB}Je dirige 3D NUM, une entreprise de numérisation 3D. Ces agents, je les ai d&apos;abord construits pour moi : service après-vente, factures, relances, devis. C&apos;est moi qui mène chaque audit : vous parlez à un dirigeant qui connaît vos journées.{NB}»
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[15px]">
                <span className="font-medium text-ink">Victor Arnoul</span> <span className="text-muted">· fondateur de Vtensor</span>
              </span>
              <a href={`mailto:${CONTACT_EMAIL}`} data-umami-event="Écrire par mail" data-umami-event-emplacement="qui-est-derriere" className="text-[15px] text-accent underline underline-offset-4 hover:text-ink transition-colors">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="shell pb-16 lg:pb-24" id="audit">
      <div className="strong grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center px-7 py-12 md:px-12 md:py-16 lg:px-16 lg:py-[72px]">
        <div className="lg:col-span-6 flex flex-col gap-4 md:gap-5">
          <span className="mono accent text-[11px] tracking-[0.14em] uppercase">Audit gratuit · 30{NB}min</span>
          <h2 className="serif m-0" style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.015em" }}>
            Parlons de votre équipe.
          </h2>
          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Réserver un échange" data-umami-event-emplacement="fin-de-page" className="btn-inv self-start mt-2" style={{ padding: "18px 26px", fontSize: 15 }}>
            Choisir un créneau <Icon.arrow size={16} />
          </a>
          <span className="muted text-[14px]">
            ou écrivez-moi :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} data-umami-event="Écrire par mail" data-umami-event-emplacement="fin-de-page" className="underline underline-offset-4 hover:text-strong-accent transition-colors">
              {CONTACT_EMAIL}
            </a>
          </span>
        </div>
        <div className="lg:col-start-8 lg:col-span-5 flex flex-col gap-4">
          <span className="muted text-[15px]">Vous repartez avec, même sans suite :</span>
          <ol className="m-0 p-0 list-none flex flex-col">
            {AUDIT_DELIVERABLES.map((d, i) => (
              <li key={d} className="grid grid-cols-[32px_1fr] gap-3 py-3.5 text-[15px] leading-[1.5]" style={{ borderTop: "1px solid color-mix(in srgb, var(--strong-muted) 30%, transparent)" }}>
                <span className="mono accent text-[13px] pt-0.5">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Barre fixe sur mobile : apparaît après le hero, disparaît sur l'appel final. */
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("haut");
    const end = document.getElementById("audit");
    if (!hero || !end) return;
    let pastHero = false;
    let atEnd = false;
    const update = () => setShow(pastHero && !atEnd);
    const io1 = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const io2 = new IntersectionObserver(([e]) => {
      atEnd = e.isIntersecting || e.boundingClientRect.top < 0;
      update();
    });
    io1.observe(hero);
    io2.observe(end);
    return () => {
      io1.disconnect();
      io2.disconnect();
    };
  }, []);
  return (
    <div className="sticky-cta" data-show={show} aria-hidden={!show}>
      <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Réserver un échange" data-umami-event-emplacement="bandeau" className="btn w-full" tabIndex={show ? 0 : -1}>
        Réserver un audit gratuit · 30{NB}min <Icon.arrow size={16} />
      </a>
    </div>
  );
}
