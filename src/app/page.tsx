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

export default function Home() {
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
