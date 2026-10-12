/**
 * Retour après paiement d'une commande passée sur la page Tarifs (2026-10-12).
 * Non indexée. Le mail de confirmation est envoyé par l'application (webhook Stripe).
 */

import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Icon } from "@/components/site/Icons";
import { Nav } from "@/components/site/Nav";
import { AUDIT_URL, CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Commande confirmée — Vtensor",
  robots: { index: false, follow: false },
  alternates: { canonical: "/merci/" },
};

const NB = "\u00a0";

const STEPS = [
  { title: "On vous appelle", text: `Sous 24${NB}heures ouvrées, pour préparer la mise en service : vos outils, vos documents, vos règles.` },
  { title: "On met en place", text: "Nous développons et branchons vos agents. Vous les testez en conditions réelles avant de les activer." },
  { title: "Vos agents travaillent", text: "Vous recevez vos accès à l'application et vous parlez à vos agents par email, téléphone ou depuis l'application." },
];

export default function MerciPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1">
        <section className="shell max-w-[960px] py-16 md:py-24 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="kicker">Commande confirmée</div>
            <h1 className="h2">Merci, votre commande est enregistrée.</h1>
            <p className="lead max-w-[640px]">Un email de confirmation vous attend dans votre boîte. Voici la suite.</p>
          </div>
          <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 pt-5 border-t border-ink">
                <span className="num">0{i + 1}</span>
                <h2 className="h3">{s.title}</h2>
                <p className="p text-[15px]">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Réserver un échange" data-umami-event-emplacement="merci" className="btn">
              Choisir un créneau maintenant <Icon.arrow size={16} />
            </a>
            <span className="text-[15px] text-muted">
              ou écrivez-moi{NB}:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4 hover:text-ink transition-colors">
                {CONTACT_EMAIL}
              </a>
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
