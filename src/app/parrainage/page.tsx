/**
 * Programme de parrainage (2026-10-20, décision de Victor) : 20 % de l'abonnement hors taxes de chaque
 * entreprise parrainée, tant qu'elle reste abonnée. Page indexée, liée depuis le pied de page.
 * Règles : data/referral.ts et article « Programme de parrainage » des conditions générales ; montants : data/pricing.ts.
 */

import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Icon } from "@/components/site/Icons";
import { Nav } from "@/components/site/Nav";
import { ReferralFaq, ReferralSimulator } from "@/components/site/Parrainage";
import { SectionHead } from "@/components/site/SectionHead";
import { eur } from "@/data/pricing";
import {
  CONSTELLATION_URL,
  PARTNER_MAILTO,
  RATE_LABEL,
  REFERRAL_EXAMPLES,
  REFERRAL_FAQS,
  REFERRAL_HOLD_DAYS,
  REFERRAL_RATE_PERCENT,
  REFERRAL_TERMS_HREF,
  commission,
} from "@/data/referral";

const NB = " ";
const TITLE = "Programme de parrainage — Vtensor";
const DESCRIPTION = `Recommandez Vtensor à une entreprise : vous touchez ${REFERRAL_RATE_PERCENT}${NB}% de son abonnement hors taxes, chaque mois, tant qu'elle reste abonnée. Pour les clients Vtensor et les partenaires professionnels.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/parrainage/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/parrainage/",
    siteName: "Vtensor",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vtensor — Agents IA sur mesure" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
};

const STEPS = [
  {
    meta: "votre lien ou votre code",
    title: "Vous partagez votre lien",
    text: "Envoyez votre lien de parrainage, ou donnez simplement votre code, à une entreprise de votre réseau.",
  },
  {
    meta: "une entreprise qui n'était pas cliente",
    title: "L'entreprise s'abonne",
    text: "Elle s'abonne en ligne par votre lien, ou saisit votre code au moment de s'abonner, dans la rubrique Tarifs.",
  },
  {
    meta: "tant qu'elle reste abonnée",
    title: `Vous touchez ${RATE_LABEL}, chaque mois`,
    text: `${RATE_LABEL} du montant hors taxes de chaque facture d'abonnement qu'elle paie. Les frais d'intégration n'en font pas partie.`,
  },
];

const HIGHLIGHTS = ["Sur chaque facture d'abonnement payée", "Tant que l'entreprise reste abonnée", "Déduit de votre facture ou versé par virement"];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REFERRAL_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function ParrainagePage() {
  const exampleTotal = REFERRAL_EXAMPLES.reduce((sum, x) => sum + commission(x.base), 0);

  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1">
        {/* Haut de page */}
        <section className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-7">
            <div className="kicker">Programme de parrainage</div>
            <h1 className="h1-hero min-h-0">
              Recommandez Vtensor. <span className="text-accent">Touchez {RATE_LABEL} chaque mois.</span>
            </h1>
            <p className="lead max-w-[580px]">
              {`Vous touchez ${RATE_LABEL} de l'abonnement hors taxes de chaque entreprise parrainée, tant qu'elle reste abonnée. Pour les clients Vtensor et les partenaires professionnels.`}
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={CONSTELLATION_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Ouvrir l'application" data-umami-event-emplacement="parrainage-haut" className="btn">
                Mon lien de parrainage <Icon.arrow size={16} />
              </a>
              <a href={PARTNER_MAILTO} data-umami-event="Écrire par mail" data-umami-event-emplacement="parrainage-haut" className="btn-ghost">
                Devenir partenaire
              </a>
            </div>
            <ul className="small m-0 p-0 list-none flex flex-wrap gap-x-5 gap-y-1.5">
              {HIGHLIGHTS.map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="text-accent">
                    <Icon.check size={14} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Exemple chiffré (prix de data/pricing.ts) */}
          <div className="lg:col-span-5 box flex flex-col" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-rule-2">
              <span className="serif text-[22px]">Exemple</span>
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">Par mois, HT</span>
            </div>
            <div className="px-5 py-1 flex flex-col">
              {REFERRAL_EXAMPLES.map((x) => (
                <div key={x.label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-3.5 border-b border-rule-2 last:border-b-0">
                  <span className="text-[14.5px] text-ink">Une entreprise · {x.label}</span>
                  <span className="mono text-[15px] text-ink text-right">{eur(commission(x.base))}</span>
                  <span className="small col-span-2">
                    Abonnement de {eur(x.base)}
                    {NB}HT par mois × {RATE_LABEL}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-ink flex justify-between items-baseline gap-4">
              <span className="font-semibold">Vous touchez</span>
              <span className="mono text-[24px] font-medium">
                {eur(exampleTotal)}
                {NB}HT
              </span>
            </div>
            <div className="px-5 py-3 border-t border-rule-2 small">Chaque mois, tant que ces deux entreprises restent abonnées.</div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="section" id="comment-ca-marche">
          <div className="shell flex flex-col gap-12">
            <SectionHead kicker="Comment ça marche" title="Un lien, un abonnement, une commission chaque mois." />
            <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="mono inline-flex items-center justify-center w-9 h-9 rounded-full border border-ink text-[13px] font-medium shrink-0">{i + 1}</span>
                    <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                  </div>
                  <span className="num">{s.meta}</span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="p text-[15px]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Simulateur */}
        <section className="section" id="simulateur">
          <div className="shell flex flex-col gap-10 lg:gap-12">
            <SectionHead kicker="Simulateur" title="Calculez votre commission." lead="Choisissez le nombre d'entreprises et leur abonnement. Les prix sont ceux de la rubrique Tarifs." />
            <ReferralSimulator />
          </div>
        </section>

        {/* Versement */}
        <section className="section" id="versement">
          <div className="shell flex flex-col gap-10 lg:gap-12">
            <SectionHead
              kicker="Versement"
              title="Déduite de votre facture, ou versée par virement."
              lead={`Chaque commission est validée ${REFERRAL_HOLD_DAYS} jours après le paiement de la facture de votre filleul, le temps de couvrir un remboursement ou un impayé.`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="flex flex-col gap-3 pt-5 border-t border-ink">
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">Client au mois</span>
                <h3 className="h3">Déduite de votre facture Vtensor</h3>
                <p className="p text-[15px]">Vos commissions validées sont déduites automatiquement de votre facture Vtensor suivante, sur une ligne «{NB}Parrainage{NB}».</p>
              </div>
              <div className="flex flex-col gap-3 pt-5 border-t border-ink">
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">Partenaire, ou client à l&apos;année</span>
                <h3 className="h3">Versée par virement</h3>
                <p className="p text-[15px]">Vos commissions validées vous sont versées chaque mois par virement, sur votre facture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className="section" id="pour-qui">
          <div className="shell flex flex-col gap-10 lg:gap-12">
            <SectionHead kicker="Pour qui" title="Clients et partenaires." lead="Le programme est réservé aux entreprises. Le parrainage ne porte que sur un niveau." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="box flex flex-col gap-5 p-7 md:p-9">
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-accent">Vous êtes client Vtensor</span>
                <span className="serif text-[28px] leading-tight text-ink">Votre lien vous attend dans votre espace.</span>
                <p className="p text-[15px]">Rubrique «{NB}Constellation{NB}» de l&apos;application{NB}: votre lien de parrainage, prêt à partager.</p>
                <a href={CONSTELLATION_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Ouvrir l'application" data-umami-event-emplacement="parrainage-clients" className="btn self-start mt-auto">
                  Ouvrir Constellation <Icon.external size={16} />
                </a>
              </div>
              <div className="strong flex flex-col gap-5 p-7 md:p-9">
                <span className="mono accent text-[11px] tracking-[0.14em] uppercase">Vous n&apos;êtes pas client</span>
                <span className="serif text-[28px] leading-tight">Vous conseillez des entreprises{NB}?</span>
                <p className="muted text-[15px] leading-[1.55] m-0">
                  Experts-comptables, consultants, intégrateurs, dirigeants de réseau{NB}: rejoignez le programme en tant que partenaire, sans être client de Vtensor.
                </p>
                <a href={PARTNER_MAILTO} data-umami-event="Écrire par mail" data-umami-event-emplacement="parrainage-partenaires" className="btn-inv self-start mt-auto">
                  Devenir partenaire <Icon.arrow size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="section" id="questions">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
          <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="kicker">Questions fréquentes</div>
              <h2 className="h2">Le programme en détail.</h2>
              <p className="p">
                Les règles complètes figurent dans les{" "}
                <a href={REFERRAL_TERMS_HREF} className="text-accent underline underline-offset-4 hover:text-ink transition-colors">
                  conditions générales, article «{NB}Programme de parrainage{NB}»
                </a>
                .
              </p>
            </div>
            <div className="lg:col-start-6 lg:col-span-7">
              <ReferralFaq />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
