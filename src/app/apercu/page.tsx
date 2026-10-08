/**
 * Aperçu V4 (2026-10-08), non indexé : proposition de refonte à valider par
 * Victor avant de remplacer la page d'accueil. Contenus dans `src/data/v4.ts`,
 * composants dans `src/components/v4/`.
 */

import type { Metadata } from "next";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { Testimonials } from "@/components/site/Testimonials";
import { AgentsV4 } from "@/components/v4/AgentsV4";
import { AppPhone } from "@/components/v4/AppPhone";
import { FinalCtaV4, Founder, SecurityV4, StickyCta } from "@/components/v4/Closing";
import { HeroV4 } from "@/components/v4/HeroV4";
import { HowV4 } from "@/components/v4/HowV4";
import { Journee } from "@/components/v4/Journee";
import { PricingV4 } from "@/components/v4/PricingV4";
import { ProofFigures } from "@/components/v4/ProofFigures";

export const metadata: Metadata = {
  title: "Aperçu V4 — Vtensor",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function ApercuV4() {
  return (
    <>
      <Nav base="/apercu/" />
      <main className="flex flex-col flex-1">
        <HeroV4 />
        <Journee />
        <AgentsV4 />
        <Testimonials intro={<ProofFigures />} />
        <AppPhone />
        <HowV4 />
        <PricingV4 />
        <SecurityV4 />
        <Faq />
        <Founder />
        <FinalCtaV4 />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
