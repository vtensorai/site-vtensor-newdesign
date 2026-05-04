import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

// V0.18.2 — Cohérence avec app.vtensor.ai après redesign : Inter partout (sans
// + display via alias CSS dans globals.css). Le site reflète exactement
// l'expérience que le client aura dans l'app.
const fontInter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vtensor — Agence d'agents IA",
  description:
    "Une agence d'agents IA qui automatisent vos opérations métier — SAV, devis, relances, contenus — sans que vous touchiez à un outil. RGPD-first, hébergé en Allemagne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${fontInter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
