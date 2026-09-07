import type { MetadataRoute } from "next";

// Export statique (output: "export") → out/robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://vtensor.ai/sitemap.xml",
  };
}
