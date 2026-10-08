import { APP_URL, AUDIT_URL, CONTACT_EMAIL } from "@/lib/links";
import { Logo } from "./Logo";

const NB = " ";

const NAV = [
  ["Agents", "/#agents"],
  ["Comment ça marche", "/#comment-ca-marche"],
  ["Témoignages", "/#temoignages"],
  ["Tarifs", "/#tarifs"],
  ["Sécurité", "/#securite"],
  ["Questions", "/#faq"],
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
      <div className="shell grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 py-12 lg:py-14">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3.5">
          <a href="/" className="inline-flex text-ink" aria-label="Vtensor — accueil">
            <Logo id="foot" height={36} />
          </a>
          <p className="small max-w-[34ch] m-0">Agents IA sur mesure, développés pour votre entreprise, hébergés en Allemagne, conçus en France.</p>
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
        <div className="shell mono flex flex-col sm:flex-row sm:justify-between gap-1 py-5 text-[11px] text-faint">
          <span>© 2026 V TENSOR AI SAS · Saint-Forget, France</span>
          <span>Hébergé en Allemagne · Données en Europe</span>
        </div>
      </div>
    </footer>
  );
}
