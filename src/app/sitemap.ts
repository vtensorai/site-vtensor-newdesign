import type { MetadataRoute } from "next";

// Export statique (output: "export") → out/sitemap.xml
export const dynamic = "force-static";

const BASE = "https://vtensor.ai";
/** Date de dernière mise à jour affichée sur les pages légales. */
const LEGAL_UPDATED = new Date("2026-09-07");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/mentions-legales/`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/conditions-generales/`,
      lastModified: new Date("2026-09-08"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/politique-de-confidentialite/`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
