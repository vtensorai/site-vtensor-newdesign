/**
 * Page 404 — exportée en `out/404.html` (nginx : `error_page 404 /404.html`).
 */

import { Footer } from "@/components/site/Footer";
import { Icon } from "@/components/site/Icons";
import { Nav } from "@/components/site/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center py-24 md:py-32">
        <div className="container max-w-[720px] flex flex-col gap-6">
          <div className="kicker">Erreur 404</div>
          <h1 className="h2">Page introuvable.</h1>
          <p className="lead">L&apos;adresse demandée n&apos;existe pas ou a été déplacée.</p>
          <a href="/" className="btn self-start">
            Retour à l&apos;accueil <Icon.arrow size={16} />
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
