"use client";

/**
 * /typo — Comparatif visuel de 4 polices tech sur le headline du Hero.
 * À supprimer une fois la police définitive choisie.
 */

const PROPOSITIONS = [
  {
    id: "A",
    name: "Geist Sans",
    by: "Vercel",
    pitch: "Vibe dev tools 2024+ (V0, Cursor, shadcn). Moderne, géométrique, ultra clean.",
    fontFamily: "'Geist', 'Geist Sans', system-ui, sans-serif",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap",
    weight: 700,
  },
  {
    id: "B",
    name: "Space Grotesk",
    by: "Florian Karsten",
    pitch: "Linear-feel, geometric grotesque. 2-story g distinctif. Vibe future-tech.",
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
    weight: 700,
  },
  {
    id: "C",
    name: "General Sans",
    by: "Indian Type Foundry",
    pitch: "Élégant et tech, plus de personnalité qu'Inter sans tomber dans le gimmick.",
    fontFamily: "'General Sans', system-ui, sans-serif",
    href: "https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap",
    weight: 700,
  },
  {
    id: "D",
    name: "JetBrains Mono",
    by: "JetBrains",
    pitch: "Cohérence absolue avec le logo [v]tensor. Tech à 200% — risqué en headline.",
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
    weight: 700,
  },
];

export default function TypoComparePage() {
  return (
    <main className="min-h-screen w-full text-white py-16 px-5 sm:px-10">
      {/* Charge les 4 polices */}
      {PROPOSITIONS.map((p) => (
        <link key={p.id} rel="stylesheet" href={p.href} />
      ))}

      <div className="max-w-[1200px] mx-auto">
        <div
          className="text-[11px] uppercase tracking-[0.18em] text-[#22D3EE] mb-3"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono')" }}
        >
          // comparatif typo — vtensor v0.18
        </div>
        <h1
          className="font-display font-bold leading-[1.05] tracking-[-0.02em] mb-12"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
        >
          4 polices candidates pour le headline.
        </h1>
        <p className="text-white/60 text-base mb-16 max-w-[60ch]">
          Empile les 4 versions du H1 actuel du Hero avec leur tagline pivot. Compare
          la gueule, le poids visuel, et la cohérence avec le logo `[v]tensor`. Choisis
          celui qui claque, on l&apos;applique partout.
        </p>

        <div className="space-y-20 md:space-y-24">
          {PROPOSITIONS.map((p) => (
            <section
              key={p.id}
              className="border-t border-[#22D3EE]/15 pt-10 md:pt-12"
            >
              {/* Header proposition */}
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span
                  className="px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] border border-[#22D3EE]/40 text-[#22D3EE]"
                  style={{ fontFamily: "var(--font-mono, 'JetBrains Mono')" }}
                >
                  // option {p.id}
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.18em] text-white/45"
                  style={{ fontFamily: "var(--font-mono, 'JetBrains Mono')" }}
                >
                  {p.name} — {p.by}
                </span>
              </div>
              <p className="text-white/55 text-sm mb-8 max-w-[60ch]">{p.pitch}</p>

              {/* Headline rendu avec la police candidate */}
              <h2
                className="leading-[1.05] tracking-[-0.02em] flex flex-col gap-2 sm:gap-3"
                style={{
                  fontFamily: p.fontFamily,
                  fontWeight: p.weight,
                  fontSize: "clamp(40px, 6vw, 84px)",
                }}
              >
                <span className="block text-white">Reprenez le contrôle</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #8B5CF6, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  de votre business
                </span>
              </h2>

              {/* Sub avec la même police pour cohérence */}
              <p
                className="mt-6 text-white/65 max-w-[55ch]"
                style={{
                  fontFamily: p.fontFamily,
                  fontWeight: 400,
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  lineHeight: 1.5,
                }}
              >
                Des assistants intelligents qui gèrent vos opérations à votre place.
                Vous récupérez vos heures perdues pour vous concentrer sur
                l&apos;essentiel.
              </p>

              {/* CTAs avec la même police */}
              <div className="mt-8 flex flex-wrap gap-3 items-center">
                <button
                  className="px-6 py-3 text-white border border-transparent inline-flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #8B5CF6, #22D3EE)",
                    fontFamily: p.fontFamily,
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Audit gratuit · 30 min →
                </button>
                <button
                  className="px-6 py-3 text-white/85 border border-white/15 hover:border-[#22D3EE]/40 transition-colors inline-flex items-center"
                  style={{
                    fontFamily: p.fontFamily,
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Voir les tarifs
                </button>
              </div>
            </section>
          ))}
        </div>

        <div
          className="mt-24 mb-8 text-[11px] uppercase tracking-[0.18em] text-white/40 text-center"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono')" }}
        >
          // dis-moi quelle option et je l&apos;applique sur tout le site
        </div>
      </div>
    </main>
  );
}
