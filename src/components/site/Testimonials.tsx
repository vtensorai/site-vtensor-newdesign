"use client";

/**
 * Témoignages en carrousel : un seul témoignage à l'écran, les clients d'abord,
 * le récit du fondateur (`featured`) en dernier. Bascule automatique (durée
 * calée sur le temps de lecture de chaque citation), points de sélection avec
 * barre de progression comme le hero, flèches, balayage au doigt. Pause au
 * survol, au focus clavier et hors écran ; arrêt dès que le visiteur choisit
 * lui-même ; respect de prefers-reduced-motion.
 * Les slides sont empilés dans la même cellule de grille : la hauteur du cadre
 * est celle du plus long, la page ne saute jamais à la bascule. Tous restent
 * dans le HTML (référencement). Seuls les témoignages `published` sont rendus.
 */

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { Icon } from "./Icons";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

/** Temps d'affichage d'un témoignage : le temps de le lire (≈ 250 mots / min) + 2 s. */
function durationFor(t: Testimonial) {
  return 2000 + t.quote.trim().split(/\s+/).length * 240;
}

function Portrait({ t, size = 64 }: { t: Testimonial; size?: number }) {
  if (t.photo) {
    // Le <picture> est l'élément flex : sans ce conteneur à largeur fixe, un rôle long écrase le portrait en ovale.
    return (
      <span className="inline-flex shrink-0" style={{ width: size, height: size }}>
        <Photo
          name={t.photo}
          alt={`Portrait de ${t.person}`}
          width={640}
          height={640}
          className="rounded-full object-cover"
          style={{ width: size, height: size, border: "1px solid var(--rule)" }}
        />
      </span>
    );
  }
  const initials = t.person
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-accent-soft text-accent serif shrink-0" style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden="true">
      {initials}
    </span>
  );
}

function CompanyLogo({ t }: { t: Testimonial }) {
  if (!t.logo) return null;
  const img = (src: string, cls: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={t.logo!.alt} className={`${cls} h-12 lg:h-[72px] w-auto`} loading="lazy" decoding="async" />
  );
  const inner = (
    <>
      {img(t.logo.light, "logo-light")}
      {img(t.logo.dark ?? t.logo.light, "logo-dark")}
    </>
  );
  if (!t.url) return <span className="inline-flex shrink-0">{inner}</span>;
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 opacity-90 hover:opacity-100 transition-opacity" aria-label={`Site de ${t.company}`}>
      {inner}
    </a>
  );
}

function Company({ t }: { t: Testimonial }) {
  const cls = "mono text-[11px] tracking-[0.14em] uppercase text-accent";
  if (!t.url) return <span className={cls}>{t.company}</span>;
  const host = t.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className={`${cls} inline-flex flex-wrap items-center gap-x-1.5 hover:text-ink transition-colors`}>
      {t.company} <span className="normal-case tracking-normal text-faint">· {host} ↗</span>
    </a>
  );
}

/** Un témoignage : identité à gauche, citation à droite (empilés sous lg). */
function Slide({ t }: { t: Testimonial }) {
  return (
    <figure className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 m-0 h-full content-start lg:content-stretch">
      <figcaption className="lg:col-span-4 flex flex-col gap-4 lg:gap-5 lg:border-r lg:border-rule lg:pr-10">
        <div className="flex items-center gap-4">
          <Portrait t={t} />
          <div className="flex flex-col">
            <span className="text-[16px] font-medium text-ink">{t.person}</span>
            <span className="small">{t.role}</span>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col items-center lg:items-start justify-between gap-3 pt-4 border-t border-rule-2">
          <div className="flex flex-col gap-1.5 lg:order-2">
            <Company t={t} />
            <span className="small">{t.sector}</span>
          </div>
          <CompanyLogo t={t} />
        </div>
        {t.agents.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-4 border-t border-rule-2">
            <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Agents en place</span>
            <span className="small">{t.agents.join(" · ")}</span>
          </div>
        )}
      </figcaption>
      <blockquote className="lg:col-span-8 m-0 serif text-ink" style={{ fontSize: "clamp(20px, 2.3vw, 30px)", lineHeight: 1.3, textWrap: "pretty" }}>
        «{" "}{t.quote}{" "}»
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  const published = TESTIMONIALS.filter((t) => t.published);
  // Les clients d'abord, le récit du fondateur en dernier.
  const items = [...published.filter((t) => !t.featured), ...published.filter((t) => t.featured)];
  const n = items.length;

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const [manual, setManual] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const remaining = useRef(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const running = n > 1 && !manual && !hover && !focus && inView;

  // Hors écran : le carrousel attend (le premier témoignage n'est pas « consommé » avant l'arrivée du visiteur).
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Nouveau slide : on repart de sa durée complète.
  useEffect(() => {
    remaining.current = n > 0 ? durationFor(items[index]) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Minuteur : une pause conserve le temps restant, en phase avec la barre de progression (mise en pause en CSS).
  useEffect(() => {
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const started = performance.now();
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % n), remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [running, index, n]);

  if (n === 0) return null;

  /** Choix du visiteur (point, flèche, balayage) : on arrête la bascule automatique. */
  const go = (i: number) => {
    setManual(true);
    setIndex(((i % n) + n) % n);
  };

  return (
    <section className="section" id="temoignages">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <SectionHead
          kicker="Témoignages"
          title="Ils travaillent déjà avec des agents."
          lead="Des dirigeants qui parlent en leur nom, de ce que les agents ont changé dans leur entreprise."
        />

        <div
          ref={root}
          className="flex flex-col gap-5"
          role="group"
          aria-roledescription="carrousel"
          aria-label="Témoignages"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
          }}
        >
          <div
            className="box tcar-stage p-6 sm:p-7 md:p-10 lg:p-12"
            onTouchStart={(e) => {
              const p = e.touches[0];
              swipe.current = { x: p.clientX, y: p.clientY };
            }}
            onTouchEnd={(e) => {
              const s = swipe.current;
              swipe.current = null;
              if (!s || n < 2) return;
              const p = e.changedTouches[0];
              const dx = p.clientX - s.x;
              const dy = p.clientY - s.y;
              if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
            }}
          >
            {items.map((t, i) => (
              <div
                key={t.id}
                id={`temoignage-${t.id}`}
                className="tcar-slide"
                role={n > 1 ? "tabpanel" : undefined}
                aria-labelledby={n > 1 ? `temoignage-tab-${t.id}` : undefined}
                data-active={i === index}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <Slide t={t} />
              </div>
            ))}
          </div>

          {n > 1 && (
            <div className="flex items-end justify-between gap-6">
              <div
                className="dots flex-1"
                role="tablist"
                aria-label="Choisir un témoignage"
                data-auto={!manual}
                data-paused={!running}
                style={{ maxWidth: n * 220 }}
              >
                {items.map((t, i) => (
                  <button
                    key={t.id}
                    id={`temoignage-tab-${t.id}`}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-controls={`temoignage-${t.id}`}
                    className="dot"
                    style={{ ["--dot-duration" as string]: `${durationFor(t)}ms` }}
                    onClick={() => go(i)}
                  >
                    <span className="dot-bar" aria-hidden="true" />
                    <span className="mono text-[11px] tracking-[0.14em] uppercase">{t.company}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 border border-rule text-ink hover:border-ink hover:text-accent transition-colors cursor-pointer"
                  aria-label="Témoignage précédent"
                  onClick={() => go(index - 1)}
                >
                  <span className="inline-flex rotate-180"><Icon.arrow size={15} /></span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 border border-rule text-ink hover:border-ink hover:text-accent transition-colors cursor-pointer"
                  aria-label="Témoignage suivant"
                  onClick={() => go(index + 1)}
                >
                  <Icon.arrow size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
