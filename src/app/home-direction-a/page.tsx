import { Hero } from "@/components/sections/Hero";
import { HiddenCostB } from "@/components/sections-demo/HiddenCostB";
import { SolutionV3Tabs } from "@/components/sections-demo/SolutionV3Tabs";
import {
  SolutionFeaturesSection,
  PricingSection,
} from "@/components/sections-demo/SolutionPricingVariants";
import { AppPreview } from "@/components/sections-demo/AppPreview";
import { SectionDivider } from "@/components/sections-demo/SectionDivider";
import { CaseStudySection } from "@/components/sections-demo/CaseStudyVariants";
import { FaqSplitSection } from "@/components/sections-demo/FaqVariants";

export const metadata = {
  title: "Vtensor — Home Direction A (preview dashboard look)",
};

/**
 * Home version Direction A — preview avec tous les ajouts dashboard look :
 *   - Section 2 (douleurs) avec hover scale sur chips
 *   - Solution (4 piliers) avec hover scale + label `// pillier_NN`
 *   - Catalogue agents avec acronymes colorés (sidebar + organigramme + panneau)
 *   - AppPreview placée AVANT le pricing (séquence vente : ce que vous obtenez → le prix)
 *   - Pricing avec layout dashboard (borders fines, mono labels, CTA mono)
 *
 * Quand Victor valide, on cascade ces ajouts vers /app/page.tsx.
 */
export default function HomeDirectionAPage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SectionDivider label="ce que vous vivez" />
      <HiddenCostB withGrid hideKickerLabel />
      <SolutionFeaturesSection />
      <SolutionV3Tabs withGrid compactTop compactBottom coloredAcronyms />
      <AppPreview compactTop compactBottom useMockup />
      <PricingSection compactTop />
      <CaseStudySection />
      <FaqSplitSection />
    </main>
  );
}
