import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

// V3 (2026-09-08) — Newsreader (titres) · Geist (texte) · JetBrains Mono (logo, repères).
const fontGeist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const fontNewsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_TITLE = "Vtensor — Agence d'agents IA";
const SITE_DESCRIPTION =
  "Des agents IA développés sur mesure pour votre entreprise : SAV, commercial, administratif, webmaster, marketing, standard. Vous leur parlez en direct. Hébergés en Allemagne, conçus en France.";

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

/** Applique le thème mémorisé avant le premier rendu (pas de flash). Sans choix mémorisé : préférence système via CSS. */
const BUILD_STAMP = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('vt-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fontGeist.variable} ${fontNewsreader.variable} ${fontMono.variable} h-full`}
    >
      <head>
        <meta name="build" content={BUILD_STAMP} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
