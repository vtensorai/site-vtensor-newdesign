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

const SITE_TITLE = "Vtensor — Agence d'agents IA";
const SITE_DESCRIPTION =
  "Une agence d'agents IA qui automatisent vos opérations métier — SAV, devis, relances, contenus — sans que vous touchiez à un outil. RGPD-first, hébergé en Allemagne.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vtensor.ai"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Vtensor",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vtensor — Agence d'agents IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
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
