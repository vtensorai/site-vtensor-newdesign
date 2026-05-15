import { Hero } from "@/components/sections/Hero";
import { HiddenCostB } from "@/components/sections-demo/HiddenCostB";
import { SolutionV3Tabs } from "@/components/sections-demo/SolutionV3Tabs";
import {
  SolutionFeaturesSection,
  PricingSection,
} from "@/components/sections-demo/SolutionPricingVariants";
import { AppPreview } from "@/components/sections-demo/AppPreview";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <HiddenCostB withGrid />
      <SolutionFeaturesSection />
      <SolutionV3Tabs withGrid compactTop />
      <PricingSection />
      <AppPreview />
    </main>
  );
}
