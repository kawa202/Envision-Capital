import type { MetadataRoute } from "next";

/* Generated once at build time — required for the static export. */
export const dynamic = "force-static";

const SITE_URL = "https://www.envisioncapital.co.zw";

export default function robots(): MetadataRoute.Robots {
  /* Preview build (GitHub Pages): keep crawlers out entirely. */
  if (process.env.GITHUB_PAGES === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
