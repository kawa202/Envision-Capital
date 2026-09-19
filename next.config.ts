import type { NextConfig } from "next";

/**
 * GitHub Pages preview build.
 *
 * The deploy workflow sets NEXT_PUBLIC_PAGES_PREVIEW=true and
 * NEXT_PUBLIC_BASE_PATH=/Envision-Capital. The site is then exported as
 * static files (Pages has no Node server), served from the repository
 * sub-path, and images come from pre-generated WebP sizes instead of the
 * Next image optimiser, which needs a server. Local development and a normal
 * `next build` are unaffected.
 */
const pagesPreview = process.env.NEXT_PUBLIC_PAGES_PREVIEW === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* No on-screen dev badge: in client reviews it sat over the hero and read
     as part of the design. Compile and runtime errors still surface. */
  devIndicators: false,
  ...(pagesPreview
    ? {
        output: "export" as const,
        basePath,
        /* /what-we-do/ → what-we-do/index.html, which static hosts serve
           without any rewrite rules. */
        trailingSlash: true,
      }
    : {}),
  images: {
    /* Modern formats first; Next falls back automatically. */
    formats: ["image/avif", "image/webp"],
    /* 75 is the default for editorial imagery; 85 is reserved for the hero. */
    qualities: [75, 85],
    /* Breakpoints matched to the layout's actual image widths, so we never
       ship a 1920px file to fill a 32rem column. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [256, 384, 512],
    ...(pagesPreview
      ? { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" }
      : {}),
  },
};

export default nextConfig;
