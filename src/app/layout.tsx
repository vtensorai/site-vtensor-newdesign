import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const fontDisplay = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`dark ${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
