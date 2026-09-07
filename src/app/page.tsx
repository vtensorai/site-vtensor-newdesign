/**
 * Home — V2 (2026-09-07).
 *
 * Flux : Hero → blocages → piliers → catalogue (6 exemples de postes, sur mesure)
 *        → comment ça marche → aperçu app → tarifs par agent → sécurité → FAQ
 *        → CTA final → footer.
 * Plus d'agent maître : le client parle à chaque agent en direct.
 */

import { Hero } from "@/components/sections/Hero";
import { HiddenCostB } from "@/components/sections-demo/HiddenCostB";
import { SolutionV3Tabs } from "@/components/sections-demo/SolutionV3Tabs";
import { SolutionFeaturesSection } from "@/components/sections-demo/SolutionPricingVariants";
import { PricingV2 } from "@/components/sections-demo/PricingV2";
import { AppPreview } from "@/components/sections-demo/AppPreview";
import { SectionDivider } from "@/components/sections-demo/SectionDivider";
import { FaqSplitSection } from "@/components/sections-demo/FaqVariants";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FinalCta, SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SectionDivider label="ce que vous vivez" />
      <HiddenCostB withGrid hideKickerLabel />
      <SolutionFeaturesSection />
      <SolutionV3Tabs withGrid compactTop compactBottom coloredAcronyms customFraming />
      <HowItWorks />
      <AppPreview compactTop compactBottom useMockup />
      <PricingV2 compactTop />
      <SecuritySection />
      <FaqSplitSection />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
