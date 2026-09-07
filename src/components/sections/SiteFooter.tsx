/**
 * FinalCta + SiteFooter — bas de page du site (2026-09-07).
 *
 *  - FinalCta : dernier appel à l'action avant le footer (audit gratuit).
 *  - SiteFooter : navigation, contact, liens légaux, copyright.
 *
 * Composants serveur (pas de state) — réutilisés par la home et les pages légales.
 */

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AUDIT_URL, APP_URL, CONTACT_EMAIL } from "@/lib/links";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

export function FinalCta() {
  return (
    <section className="relative py-16 md:py-24" id="contact">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="relative overflow-hidden border border-white/8 bg-[#0E0E13] px-6 py-12 md:px-14 md:py-16 text-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-vt-violet to-vt-cyan" />
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
            // on en parle ?
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            Parlons de{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              votre équipe IA
            </span>
            .
          </h2>
          <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Un audit gratuit de 30 minutes pour cartographier vos outils et vos
            chronophages. Vous repartez avec une proposition d&apos;équipe chiffrée.
            Sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-white hover:-translate-y-0.5 transition-all"
              style={{
                ...mono,
                fontWeight: 700,
                background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                letterSpacing: "0.05em",
                boxShadow: "0 0 16px rgba(139,92,246,0.35)",
              }}
            >
              audit gratuit · 30 min
              <ArrowRight size={12} weight="bold" />
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-white/90 hover:bg-white/[0.05] transition-colors"
              style={{
                ...mono,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.15)",
                letterSpacing: "0.05em",
              }}
            >
              accéder à l&apos;app
              <ArrowRight size={12} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type FooterLink = { label: string; href: string; external?: boolean };

const NAV: FooterLink[] = [
  { label: "agents", href: "/#agents" },
  { label: "tarifs", href: "/#tarifs" },
  { label: "faq", href: "/#faq" },
  { label: "accéder à l'app", href: APP_URL, external: true },
];

const CONTACT: FooterLink[] = [
  { label: "réserver un audit gratuit", href: AUDIT_URL, external: true },
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
];

const LEGAL: FooterLink[] = [
  { label: "mentions légales", href: "/mentions-legales/" },
  { label: "politique de confidentialité", href: "/politique-de-confidentialite/" },
];

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 md:py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="/" className="inline-flex items-center mb-4" aria-label="Vtensor">
            <Image
              src="/logos/vtensor.svg"
              alt="Vtensor"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
          </a>
          <p className="text-[13px] text-white/55 leading-relaxed max-w-[36ch]">
            Agence d&apos;agents IA. Des agents développés sur mesure pour votre
            entreprise, hébergés en Allemagne, conçus en France.
          </p>
        </div>
        <FooterCol title="// navigation" links={NAV} />
        <FooterCol title="// contact" links={CONTACT} />
        <FooterCol title="// légal" links={LEGAL} />
      </div>
      <div className="border-t border-white/8">
        <div
          className="max-w-[1200px] mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40"
          style={mono}
        >
          <span>© 2026 V TENSOR AI SAS · Tous droits réservés</span>
          <span>Hébergé en Allemagne · Données en Europe</span>
        </div>
      </div>
    </footer>
  );
}
