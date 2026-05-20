import { Section2HorizontalCarousel } from "@/components/sections-demo/Section2HorizontalCarousel";

export const metadata = { title: "Vtensor — Section 2 carousel horizontal" };

export default function Page() {
  return (
    <main className="bg-vt-bg-deep min-h-screen">
      <Section2HorizontalCarousel />
      <div className="h-[60vh] bg-vt-bg-deep" />
    </main>
  );
}
