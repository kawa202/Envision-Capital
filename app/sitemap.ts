import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { insights } from "@/content/insights";
import { news } from "@/content/news";

/* Generated once at build time — required for the static export. */
export const dynamic = "force-static";

const SITE_URL = "https://www.envisioncapital.co.zw";

/**
 * Built from the content collections, so publishing an article or an
 * announcement adds it to the sitemap without anyone remembering to.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/what-we-do", priority: 0.9 },
    { path: "/industries", priority: 0.8 },
    { path: "/insights", priority: 0.9 },
    { path: "/newsroom", priority: 0.7 },
    { path: "/work", priority: 0.8 },
    { path: "/method", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const insightRoutes = insights.map((insight) => ({
    url: `${SITE_URL}/insights/${insight.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const newsRoutes = news.map((item) => ({
    url: `${SITE_URL}/newsroom/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const workRoutes = caseStudies.map((item) => ({
    url: `${SITE_URL}/work/${item.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...insightRoutes, ...newsRoutes, ...workRoutes];
}
