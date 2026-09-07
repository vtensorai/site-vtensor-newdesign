/**
 * Page 404 — exportée en `out/404.html` (nginx : `error_page 404 /404.html`).
 * Même direction artistique que les pages légales : fond sombre, kicker mono,
 * titre display, lien de retour, footer commun.
 */

import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center" aria-label="Vtensor — accueil">
            <Image src="/logos/vtensor.svg" alt="Vtensor" width={140} height={36} className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-[12px] uppercase tracking-[0.12em] text-white/60 hover:text-[#22D3EE] transition-colors"
            style={mono}
          >
            {"← retour au site"}
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 py-24 md:py-32">
        <div className="max-w-[640px] text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
            {"// 404"}
          </div>
          <h1
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
          >
            Page{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              introuvable
            </span>
            .
          </h1>
          <p className="text-white/60 text-base md:text-lg mb-10">
            L&apos;adresse demandée n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-white/90 hover:bg-white/[0.05] hover:border-[#22D3EE]/40 transition-colors duration-150"
            style={{
              ...mono,
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.15)",
              letterSpacing: "0.05em",
            }}
          >
            {"← retour à l'accueil"}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
