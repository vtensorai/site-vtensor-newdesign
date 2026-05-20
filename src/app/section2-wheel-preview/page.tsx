import { Section2WheelPreview } from "@/components/sections-demo/Section2WheelPreview";

export const metadata = {
  title: "Vtensor — Section 2 wheel preview (problème/solution)",
};

export default function Section2WheelPreviewPage() {
  return (
    <main className="bg-vt-bg-deep min-h-screen">
      <Section2WheelPreview />
      {/* Espace après pour qu'on voie la sticky se détacher proprement */}
      <div className="h-[60vh] bg-vt-bg-deep" />
    </main>
  );
}
