/**
 * Gabarit des pages légales : navigation commune, colonne de lecture, footer.
 */

import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function LegalLayout({ kicker, title, updated, children }: { kicker: string; title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <article className="container max-w-[860px] py-16 md:py-24">
          <div className="kicker mb-5">{kicker}</div>
          <h1 className="h2 mb-3">{title}</h1>
          <p className="mono text-[12px] tracking-[0.14em] uppercase text-faint mb-12">Dernière mise à jour : {updated}</p>
          <div className="legal">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
