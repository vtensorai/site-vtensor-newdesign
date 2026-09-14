import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHead } from "./SectionHead";

/**
 * Témoignages : un récit mis en avant (bloc large) + cartes. Seuls les
 * témoignages `published` sont rendus ; la mise en page s'adapte au nombre.
 */

function Monogram({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent serif text-[20px]" aria-hidden="true">
      {initials}
    </span>
  );
}

export function Testimonials() {
  const items = TESTIMONIALS.filter((t) => t.published);
  if (items.length === 0) return null;
  const featured = items.find((t) => t.featured) ?? items[0];
  const others = items.filter((t) => t !== featured);

  return (
    <section className="section" id="temoignages">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <SectionHead
          kicker="Témoignages"
          title="Ils travaillent déjà avec des agents."
          lead="Des dirigeants qui parlent en leur nom, de ce que les agents ont changé dans leur entreprise."
        />

        {/* Récit mis en avant */}
        <figure className="box grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-7 md:p-10 lg:p-12 m-0">
          <figcaption className="lg:col-span-4 flex flex-col gap-5 lg:border-r lg:border-rule lg:pr-10">
            <div className="flex items-center gap-4">
              <Monogram name={featured.person} />
              <div className="flex flex-col">
                <span className="text-[16px] font-medium text-ink">{featured.person}</span>
                <span className="small">{featured.role}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 pt-4 border-t border-rule-2">
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">{featured.company}</span>
              <span className="small">{featured.sector}</span>
            </div>
            {featured.agents.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-4 border-t border-rule-2">
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Agents en place</span>
                <span className="small">{featured.agents.join(" · ")}</span>
              </div>
            )}
          </figcaption>
          <blockquote className="lg:col-span-8 m-0 serif text-ink" style={{ fontSize: "clamp(22px, 2.3vw, 30px)", lineHeight: 1.3, textWrap: "pretty" }}>
            «{" "}{featured.quote}{" "}»
          </blockquote>
        </figure>

        {/* Autres témoignages */}
        {others.length > 0 && (
          <div className={`grid grid-cols-1 gap-8 ${others.length >= 2 ? "md:grid-cols-2" : ""}`}>
            {others.map((t) => (
              <figure key={t.id} className="flex flex-col gap-5 pt-6 border-t border-ink m-0">
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">
                  {t.company} · {t.sector}
                </span>
                <blockquote className="m-0 serif text-ink text-[21px] md:text-[23px] leading-[1.3]" style={{ textWrap: "pretty" }}>
                  «{" "}{t.quote}{" "}»
                </blockquote>
                <figcaption className="flex items-center gap-3.5 pt-4 border-t border-rule-2">
                  <Monogram name={t.person} />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-medium text-ink">{t.person}</span>
                    <span className="small">{t.role}</span>
                    {t.agents.length > 0 && <span className="small">Agents{" "}: {t.agents.join(", ")}</span>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
