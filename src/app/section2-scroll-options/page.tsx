import Link from "next/link";

const OPTIONS = [
  {
    href: "/section2-wheel-preview",
    name: "01 — La roue",
    tag: "Réutilise HiddenCostB existant",
    desc: "Pattern actuel du site, sticky 250vh. 4 chips floating en cardinal autour d'un centre (cercles concentriques + point cyan). Approche éprouvée, code recyclé.",
    risk: "Sûr",
  },
  {
    href: "/section2-carousel",
    name: "02 — Carousel pinned horizontal",
    tag: "Apple keynote / Cosmos",
    desc: "Section 400vh sticky. Les 4 cartes en ligne horizontale, scroll vertical translate sur X. La carte centrée scale up et s'illumine, les autres se dégradent. Dots indicateurs en bas.",
    risk: "Modéré",
  },
  {
    href: "/section2-stack",
    name: "03 — Stack de cartes qui se révèlent",
    tag: "Stripe onboarding / Cash App",
    desc: "Section 400vh sticky. 4 cartes empilées au centre en perspective ; la carte de tête glisse vers le haut et révèle la suivante à chaque scroll-step. Compteur 01/04 en bas.",
    risk: "Modéré",
  },
  {
    href: "/section2-orbital",
    name: "04 — Path orbital",
    tag: "Linear / Vercel Conf",
    desc: "Section 400vh sticky. Une comète lumineuse parcourt une courbe en S à travers le viewport. Les 4 cartes sont posées le long du chemin et s'activent quand la comète passe à proximité.",
    risk: "Plus narratif, code plus dense",
  },
];

export const metadata = { title: "Vtensor — Section 2 scroll options" };

export default function Page() {
  return (
    <main className="min-h-screen bg-vt-bg-deep text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-mono mb-3">
          // section 2 — comparatif scroll-based
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Quatre directions pour la section{" "}
          <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
            problème / solution
          </span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-12">
          Même contenu (4 paires problème/solution), 4 patterns scroll-driven
          différents. Ouvre chacun, scrolle, compare le ressenti.
        </p>

        <div className="space-y-3">
          {OPTIONS.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="block group bg-vt-card border border-vt-border rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display text-xl font-semibold text-white group-hover:text-vt-cyan transition-colors">
                      {o.name}
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">
                      {o.tag}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {o.desc}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                    Risque
                  </div>
                  <div className="text-sm text-white/80">{o.risk}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-white/40 text-sm">
          Aussi disponible :{" "}
          <Link
            href="/section2-variants"
            className="text-white/70 hover:text-vt-cyan underline underline-offset-4"
          >
            les 4 variantes statiques (miroir / cards / chat / bento)
          </Link>{" "}
          — sans scroll-driven, pour comparer aussi les directions visuelles simples.
        </div>
      </div>
    </main>
  );
}
