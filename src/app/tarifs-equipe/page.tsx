/**
 * Aperçu de la formule « Équipe complète » (2026-10-19), non indexé et hors plan du site.
 * La section Tarifs est celle de l'accueil avec la formule ; en dessous, les textes qui changent
 * au passage en ligne (TEAM_OFFER_LIVE = true dans data/pricing.ts), pour relecture par Victor.
 * Le bouton « S'abonner » ouvre la vraie page de paiement Stripe (formule appliquée par le serveur).
 * Page à supprimer une fois la formule en ligne.
 */

import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";
import { pricingAnswer } from "@/data/faq";
import { PRICE_PER_AGENT, TEAM_PRICE, TEAM_TERMS, eur } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Tarifs, équipe complète (aperçu) — Vtensor",
  robots: { index: false, follow: false },
  alternates: { canonical: "/tarifs-equipe/" },
};

const NB = " ";

export default function TarifsEquipePage() {
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1">
        <section className="shell max-w-[960px] pt-12 md:pt-16 flex flex-col gap-3">
          <div className="kicker">Aperçu, non publié</div>
          <p className="p max-w-[680px]">
            Section Tarifs de l&apos;accueil avec la formule Équipe complète. Le paiement est réel : le serveur applique déjà la
            formule quand les six postes sont choisis.
          </p>
        </section>
        <Pricing teamOffer />
        <section className="shell max-w-[960px] pb-16 md:pb-24 flex flex-col gap-6">
          <div className="kicker">Textes mis à jour au passage en ligne</div>
          <div className="box p-5 md:p-6 flex flex-col gap-2">
            <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Section Agents, sous le titre</span>
            <p className="m-0 mono text-[13px] text-ink">
              {eur(PRICE_PER_AGENT)}{NB}HT par mois, chacun. Les six{NB}: {eur(TEAM_PRICE)}{NB}HT par mois.
            </p>
          </div>
          <div className="box p-5 md:p-6 flex flex-col gap-2">
            <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">FAQ · Comment fonctionne la tarification{NB}?</span>
            <p className="m-0 p">{pricingAnswer(true)}</p>
          </div>
          <div className="box p-5 md:p-6 flex flex-col gap-2">
            <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Conditions générales · article 4, nouvel alinéa</span>
            <p className="m-0 p">
              <strong>Formule Équipe complète</strong>{NB}: {TEAM_TERMS}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
