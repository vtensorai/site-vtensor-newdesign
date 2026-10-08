import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

// V3 (2026-09-08) — Newsreader (titres) · Geist (texte) · JetBrains Mono (logo, repères).
const fontGeist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const fontNewsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
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

const SITE_TITLE = "Vtensor — Agents IA sur mesure";
const SITE_DESCRIPTION =
  "Des agents IA développés sur mesure pour votre entreprise : service après-vente, commercial, administratif, référencement Google, marketing, standard téléphonique. Vous leur parlez en direct. Hébergés en Allemagne, conçus en France.";

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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vtensor — Agents IA sur mesure" }],
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

/** Données structurées de l'entreprise (identité des mentions légales). */
const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vtensor",
  legalName: "V TENSOR AI",
  url: "https://vtensor.ai",
  logo: "https://vtensor.ai/icon.png",
  email: "victor@vtensor.ai",
  description: SITE_DESCRIPTION,
  founder: { "@type": "Person", name: "Victor Arnoul" },
  address: { "@type": "PostalAddress", streetAddress: "15 rue de la Motte", postalCode: "78720", addressLocality: "Saint-Forget", addressCountry: "FR" },
  identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: "929701217" },
};

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
