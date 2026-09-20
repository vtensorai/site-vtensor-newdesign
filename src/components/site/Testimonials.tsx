import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

/**
 * Témoignages : les clients d'abord (un seul = bloc large, plusieurs = cartes
 * en colonnes), puis le récit du fondateur (`featured`, bloc large encadré).
 * Seuls les témoignages `published` sont rendus.
 */

function Portrait({ t, size = 48 }: { t: Testimonial; size?: number }) {
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

function CompanyLogo({ t, height }: { t: Testimonial; height: number }) {
  if (!t.logo) return null;
  const img = (src: string, cls: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={t.logo!.alt} className={cls} style={{ height, width: "auto" }} loading="lazy" decoding="async" />
  );
  const inner = (
    <>
      {img(t.logo.light, "logo-light")}
      {img(t.logo.dark ?? t.logo.light, "logo-dark")}
    </>
  );
  if (!t.url) return <span className="inline-flex">{inner}</span>;
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className="inline-flex opacity-90 hover:opacity-100 transition-opacity" aria-label={`Site de ${t.company}`}>
      {inner}
    </a>
  );
}

function Company({ t }: { t: Testimonial }) {
  const cls = "mono text-[11px] tracking-[0.14em] uppercase text-accent";
  if (!t.url) return <span className={cls}>{t.company}</span>;
  const host = t.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a href={t.url} target="_blank" rel="noopener noreferrer" className={`${cls} inline-flex items-center gap-1.5 hover:text-ink transition-colors`}>
      {t.company} <span className="normal-case tracking-normal text-faint">· {host} ↗</span>
    </a>
  );
}

/** Bloc large : identité à gauche, citation à droite. Encadré pour le récit du fondateur. */
function Wide({ t, boxed = false }: { t: Testimonial; boxed?: boolean }) {
  return (
    <figure className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 m-0 ${boxed ? "box p-7 md:p-10 lg:p-12" : "pt-8 border-t border-ink"}`}>
      <figcaption className="lg:col-span-4 flex flex-col gap-5 lg:border-r lg:border-rule lg:pr-10">
        <div className="flex items-center gap-4">
          <Portrait t={t} size={64} />
          <div className="flex flex-col">
            <span className="text-[16px] font-medium text-ink">{t.person}</span>
            <span className="small">{t.role}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4 border-t border-rule-2">
          <CompanyLogo t={t} height={72} />
          <div className="flex flex-col gap-1.5">
            <Company t={t} />
            <span className="small">{t.sector}</span>
          </div>
        </div>
        {t.agents.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-4 border-t border-rule-2">
            <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Agents en place</span>
            <span className="small">{t.agents.join(" · ")}</span>
          </div>
        )}
      </figcaption>
      <blockquote className="lg:col-span-8 m-0 serif text-ink" style={{ fontSize: "clamp(22px, 2.3vw, 30px)", lineHeight: 1.3, textWrap: "pretty" }}>
        «{" "}{t.quote}{" "}»
      </blockquote>
    </figure>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col gap-5 pt-6 border-t border-ink m-0">
      <div className="flex flex-col gap-3">
        <CompanyLogo t={t} height={48} />
        <span className="flex flex-wrap items-baseline gap-x-2">
          <Company t={t} />
          <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">· {t.sector}</span>
        </span>
      </div>
      <blockquote className="m-0 serif text-ink text-[21px] md:text-[23px] leading-[1.3]" style={{ textWrap: "pretty" }}>
        «{" "}{t.quote}{" "}»
      </blockquote>
      <figcaption className="flex items-center gap-3.5 pt-4 border-t border-rule-2">
        <Portrait t={t} />
        <div className="flex flex-col">
          <span className="text-[15px] font-medium text-ink">{t.person}</span>
          <span className="small">{t.role}</span>
          {t.agents.length > 0 && <span className="small">Agents{" "}: {t.agents.join(", ")}</span>}
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const items = TESTIMONIALS.filter((t) => t.published);
  if (items.length === 0) return null;
  const story = items.find((t) => t.featured);
  const clients = items.filter((t) => t !== story);

  return (
    <section className="section" id="temoignages">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <SectionHead
          kicker="Témoignages"
          title="Ils travaillent déjà avec des agents."
          lead="Des dirigeants qui parlent en leur nom, de ce que les agents ont changé dans leur entreprise."
        />

        {/* Clients */}
        {clients.length === 1 && <Wide t={clients[0]} />}
        {clients.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clients.map((t) => (
              <Card key={t.id} t={t} />
            ))}
          </div>
        )}

        {/* Récit du fondateur */}
        {story && <Wide t={story} boxed />}
      </div>
    </section>
  );
}
