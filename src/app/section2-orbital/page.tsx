import { Section2OrbitalPath } from "@/components/sections-demo/Section2OrbitalPath";

export const metadata = { title: "Vtensor — Section 2 path orbital" };

export default function Page() {
  return (
    <main className="bg-vt-bg-deep min-h-screen">
      <Section2OrbitalPath />
      <div className="h-[60vh] bg-vt-bg-deep" />
    </main>
  );
}
