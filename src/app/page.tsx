/**
 * Home — V3 « Cabinet / Infrastructure » (2026-09-08).
 *
 * Flux : nav → hero (carrousel métiers) → ce que ça change → agents (6 postes,
 * sur mesure) → comment ça marche → aperçu application → tarifs → sécurité
 * → FAQ → CTA final → footer. Plus d'agent maître : le client parle à chaque
 * agent en direct.
 */

import { Agents } from "@/components/site/Agents";
import { AppPreview } from "@/components/site/AppPreview";
import { ChangeSection } from "@/components/site/ChangeSection";
import { Faq } from "@/components/site/Faq";
import { FinalCta, Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";
import { Security } from "@/components/site/Security";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1">
        <Hero />
        <ChangeSection />
        <Agents />
        <HowItWorks />
        <AppPreview />
        <Pricing />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
