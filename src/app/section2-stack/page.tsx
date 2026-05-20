import { Section2CardStack } from "@/components/sections-demo/Section2CardStack";

export const metadata = { title: "Vtensor — Section 2 stack de cartes" };

export default function Page() {
  return (
    <main className="bg-vt-bg-deep min-h-screen">
      <Section2CardStack />
      <div className="h-[60vh] bg-vt-bg-deep" />
    </main>
  );
}
