/**
 * LegalLayout — gabarit des pages légales (mentions légales, confidentialité).
 * En-tête minimal (logo → home), colonne de texte lisible, footer commun.
 */

import Image from "next/image";
import { SiteFooter } from "./SiteFooter";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

export function LegalLayout({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <a href="/" className="inline-flex items-center" aria-label="Vtensor — accueil">
            <Image src="/logos/vtensor.svg" alt="Vtensor" width={140} height={36} className="h-8 w-auto" />
          </a>
          <a
            href="/"
            className="text-[12px] uppercase tracking-[0.12em] text-white/60 hover:text-[#22D3EE] transition-colors"
            style={mono}
          >
            ← retour au site
          </a>
        </div>
      </header>

      <main className="flex-1">
        <article className="max-w-[820px] mx-auto px-6 sm:px-10 py-16 md:py-24">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
            {kicker}
          </div>
          <h1
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-3"
            style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
          >
            {title}
          </h1>
          <p className="text-white/40 text-[12px] tracking-[0.14em] uppercase mb-12" style={mono}>
            // dernière mise à jour : {updated}
          </p>

          <div
            className={[
              "text-white/70 text-[15px] leading-relaxed",
              "[&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-white [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-[-0.01em]",
              "[&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-white [&_h3]:text-base [&_h3]:mt-8 [&_h3]:mb-2",
              "[&_p]:mb-4",
              "[&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-1.5",
              "[&_a]:text-[#22D3EE] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-white",
              "[&_strong]:text-white [&_strong]:font-semibold",
            ].join(" ")}
          >
            {children}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
