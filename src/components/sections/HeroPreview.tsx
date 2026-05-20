"use client";

import Image from "next/image";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react/dist/ssr";

const NAV_LINKS = [
  { label: "Tarifs", href: "#tarifs" },
  { label: "Agents", href: "#agents" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

/**
 * HeroPreview — copie statique du Hero principal pour l'usage en overlay
 * sur la galerie de fonds animés. Pas d'animations Motion (trop lourd avec
 * 30+ instances). Overlay sombre configurable via `overlayOpacity` selon la
 * luminosité du fond.
 */
export function HeroPreview({
  overlayOpacity = 0.45,
}: {
  overlayOpacity?: number;
}) {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col">
      {/* Overlay sombre + léger blur entre fond animé et texte pour la lisibilité */}
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-[1px]"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
        aria-hidden="true"
      />

      {/* Top fade radial violet (cohérent avec Hero principal) */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade vers noir */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Mini-nav top */}
      <nav className="relative z-20 mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-5 sm:px-12 lg:px-20">
        <a href="#" className="inline-flex items-center" aria-label="Vtensor">
          <Image
            src="/logos/vtensor-wordmark-white.svg"
            alt="Vtensor"
            width={104}
            height={26}
            className="h-6 w-auto"
          />
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <span className="text-sm text-white/80 transition-colors hover:text-white">
                {link.label}
              </span>
            </li>
          ))}
        </ul>
        <span className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm text-white/90 sm:inline-flex">
          Audit gratuit
          <ArrowRight size={14} weight="bold" />
        </span>
      </nav>

      {/* Hero content */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-10 md:py-20">
        {/* Kicker */}
        <span className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
          L&apos;agence qui automatise votre entreprise
        </span>

        {/* H1 */}
        <h1 className="mb-6 max-w-[16ch] font-display text-[clamp(48px,7.5vw,88px)] font-bold leading-[1.05] tracking-[-0.02em]">
          <span className="block text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
            Pilotez votre entreprise
          </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #A78BFA 0%, #22D3EE 100%)",
            }}
          >
            Pas votre quotidien
          </span>
        </h1>

        {/* Sub */}
        <p className="mb-9 max-w-[58ch] text-base leading-relaxed text-white/85 md:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          Des assistants intelligents qui gèrent votre service client, vos
          devis, vos relances et vos contenus marketing à votre place. Vous
          récupérez vos heures pour faire avancer votre entreprise.
        </p>

        {/* CTAs */}
        <div className="mb-9 flex flex-col items-center gap-3 sm:flex-row">
          <span
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]"
            style={{
              background: "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
            }}
          >
            Audit gratuit · 30 min
            <ArrowRight size={16} weight="bold" />
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-white/95">
            Voir les tarifs
          </span>
        </div>

        {/* Réassurances */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/65">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle size={14} weight="fill" className="text-[#22D3EE]" />
            Données sécurisées en Europe
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle size={14} weight="fill" className="text-[#22D3EE]" />
            Sans engagement de durée
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle size={14} weight="fill" className="text-[#22D3EE]" />
            Réponse sous 24 h
          </span>
        </div>
      </div>
    </div>
  );
}
