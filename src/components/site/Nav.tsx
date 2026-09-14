"use client";

/**
 * Navigation : logo, 5 ancres, accès à l'app, audit gratuit, bascule de thème.
 * Mobile : menu plein écran sous le bandeau.
 */

import { useEffect, useState } from "react";
import { APP_URL, AUDIT_URL } from "@/lib/links";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { label: "Agents", href: "/#agents" },
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
  { label: "Témoignages", href: "/#temoignages" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Sécurité", href: "/#securite" },
  { label: "FAQ", href: "/#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-rule" style={{ background: "color-mix(in srgb, var(--bg) 92%, transparent)" }}>
      <div className="container flex items-center justify-between gap-6 py-4 xl:py-5">
        <a href="/" className="inline-flex items-center text-ink" aria-label="Vtensor — accueil">
          <Logo id="nav" height={36} />
        </a>

        <nav className="hidden xl:flex items-center gap-8" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] text-ink hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline text-[15px] text-muted hover:text-ink transition-colors">
            Accéder à l&apos;app
          </a>
          <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-sm hidden sm:inline-flex">
            Audit gratuit
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 border border-rule text-ink hover:border-ink transition-colors cursor-pointer"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-rule bg-paper" style={{ background: "var(--bg)" }}>
          <nav className="container flex flex-col py-4" aria-label="Navigation mobile">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3.5 text-[17px] text-ink border-b border-rule-2 hover:text-accent transition-colors">
                {l.label}
              </a>
            ))}
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="py-3.5 text-[17px] text-muted hover:text-ink transition-colors">
              Accéder à l&apos;app
            </a>
            <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="btn mt-3 self-start">
              Réserver un audit gratuit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
