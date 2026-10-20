"use client";

/**
 * Arrivée par un lien de parrainage (2026-10-20) : lit `?parrain=` (alias `?ref=`), vérifie le code auprès
 * de l'API ; s'il existe, le mémorise 90 jours (lib/referral.ts), retire le paramètre de l'adresse et affiche
 * un bandeau discret « Vous venez de la part de … ». Code inconnu ou API injoignable : rien n'est affiché.
 *
 * Bandeau : sous la barre de navigation (z-50), à droite, en z-40 comme le rond de l'agent vocal qui reste
 * en bas à droite ; le menu mobile, dans la barre de navigation, passe donc par-dessus.
 */

import { useEffect, useState } from "react";
import { getStoredReferral, saveReferral, validateReferral } from "@/lib/referral";

const PARAMS = ["parrain", "ref"] as const;

/** Bas de la barre de navigation (0 si la page n'en a pas). */
function headerBottom(): number {
  const header = document.querySelector("header");
  return header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
}

export function ReferralCapture() {
  const [parrain, setParrain] = useState<string | null>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    // Purge d'un code expiré (plus de 90 jours), à chaque visite.
    getStoredReferral();

    const url = new URL(window.location.href);
    const raw = PARAMS.map((p) => url.searchParams.get(p)).find((v) => v !== null && v.trim() !== "");
    if (!raw) return;

    let cancelled = false;
    void validateReferral(raw).then((check) => {
      if (cancelled || check.status !== "valid") return;
      saveReferral({ code: check.code, parrain: check.parrain });
      const clean = new URL(window.location.href);
      PARAMS.forEach((p) => clean.searchParams.delete(p));
      window.history.replaceState(null, "", `${clean.pathname}${clean.search}${clean.hash}`);
      setTop(headerBottom());
      setParrain(check.parrain);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Position : juste sous la barre de navigation collante (sa hauteur varie avec la largeur d'écran).
  useEffect(() => {
    if (!parrain) return;
    const header = document.querySelector("header");
    if (!header) return;
    // La barre est collée en haut : seule sa hauteur change (largeur d'écran, menu mobile ouvert).
    const ro = new ResizeObserver(() => setTop(headerBottom()));
    ro.observe(header);
    return () => ro.disconnect();
  }, [parrain]);

  // Zone d'annonce présente en permanence (lecteurs d'écran) ; vide et sans effet tant qu'il n'y a pas de bandeau.
  return (
    <div role="status" aria-live="polite" className="fixed z-40 right-4 left-4 sm:left-auto sm:right-6 flex justify-end pointer-events-none" style={{ top: top + 12 }}>
      {parrain && (
        <div className="box pointer-events-auto flex items-center gap-3 pl-4 pr-1.5 py-1.5 max-w-full sm:max-w-[420px]" style={{ boxShadow: "var(--shadow-soft)" }}>
          <span className="w-[7px] h-[7px] rounded-full bg-accent shrink-0" aria-hidden="true" />
          <span className="text-[14px] text-ink leading-snug py-1.5 min-w-0">
            Vous venez de la part de <span className="font-medium">{parrain}</span>.
          </span>
          <button
            type="button"
            onClick={() => setParrain(null)}
            aria-label="Fermer le message"
            className="w-8 h-8 shrink-0 flex items-center justify-center text-muted hover:text-ink hover:bg-alt transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
