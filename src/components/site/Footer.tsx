import { APP_URL, AUDIT_URL, CONTACT_EMAIL } from "@/lib/links";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

const NB = " ";

export function FinalCta() {
  return (
    <section className="container pb-16 lg:pb-24">
      <div className="strong grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-7 py-12 md:px-12 md:py-16 lg:px-16 lg:py-[72px]">
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-[18px]">
          <span className="mono accent text-[11px] tracking-[0.14em] uppercase">On en parle</span>
          <h2 className="serif m-0" style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.015em" }}>
            Parlons de votre équipe IA.
          </h2>
          <p className="muted m-0 text-[17px] leading-[1.5] max-w-[560px]">
            Un audit gratuit de 30{NB}minutes pour cartographier vos outils et vos chronophages. Vous repartez avec une proposition d&apos;équipe chiffrée. Sans engagement.
          </p>
        </div>
        <div className="lg:col-start-9 lg:col-span-4 flex flex-col gap-3 items-start">
          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn-inv" style={{ padding: "18px 26px", fontSize: 15 }}>
            Réserver un audit gratuit · 30{NB}min <Icon.arrow size={16} />
          </a>
          <span className="muted text-[14px]">
            ou écrivez-nous :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-strong-accent transition-colors">
              {CONTACT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

const NAV = [
  ["Agents", "/#agents"],
  ["Comment ça marche", "/#comment-ca-marche"],
  ["Tarifs", "/#tarifs"],
  ["Sécurité", "/#securite"],
  ["FAQ", "/#faq"],
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="kicker text-[11px]">{title}</span>
      {children}
    </div>
  );
}

const link = "text-[14px] text-muted hover:text-ink transition-colors";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="container grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 py-12 lg:py-14">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3.5">
          <a href="/" className="inline-flex text-ink" aria-label="Vtensor — accueil">
            <Logo id="foot" height={36} />
          </a>
          <p className="small max-w-[34ch] m-0">Agence d&apos;agents IA. Des agents développés sur mesure pour votre entreprise, hébergés en Allemagne, conçus en France.</p>
        </div>
        <Col title="Navigation">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className={link}>
              {l}
            </a>
          ))}
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={link}>
            Accéder à l&apos;app
          </a>
        </Col>
        <Col title="Contact">
          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className={link}>
            Réserver un audit gratuit
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
            {CONTACT_EMAIL}
          </a>
        </Col>
        <Col title="Légal">
          <a href="/mentions-legales/" className={link}>
            Mentions légales
          </a>
          <a href="/conditions-generales/" className={link}>
            Conditions générales
          </a>
          <a href="/politique-de-confidentialite/" className={link}>
            Politique de confidentialité
          </a>
        </Col>
      </div>
      <div className="border-t border-rule">
        <div className="container mono flex flex-col sm:flex-row sm:justify-between gap-1 py-5 text-[11px] text-faint">
          <span>© 2026 V TENSOR AI SAS · Saint-Forget, France</span>
          <span>Hébergé en Allemagne · Données en Europe</span>
        </div>
      </div>
    </footer>
  );
}
