import type { NextConfig } from "next";

/**
 * GitHub Pages build.
 *
 * The deploy workflow sets GITHUB_PAGES=true and nothing else. The site is
 * then exported as static files (Pages has no Node server), served from the
 * repository sub-path, and images come from pre-generated WebP sizes instead
 * of the Next image optimiser, which needs a server. Local development and a
 * plain `next build` are unaffected.
 */
const isPages = process.env.GITHUB_PAGES === "true";

/** The repository sub-path the site is served from on Pages. */
const BASE_PATH = "/Envision-Capital";

const nextConfig: NextConfig = {
  /* No on-screen dev badge: in client reviews it sat over the hero and read
     as part of the design. Compile and runtime errors still surface. */
  devIndicators: false,

  ...(isPages
    ? {
        output: "export" as const,
        basePath: BASE_PATH,
        /* /what-we-do/ → what-we-do/index.html, which static hosts serve
           without any rewrite rules. */
        trailingSlash: true,
        /* No assetPrefix. With basePath set, Next already serves /_next
           from under the sub-path, and the docs say plainly that basePath
           is the supported way to host on a sub-path — an assetPrefix on
           top of it only risks a doubled slash. */

        /* The image loader runs in the browser, where process.env does not
           exist unless Next inlines it. This is what puts the sub-path in
           front of every generated WebP. */
        env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
      }
    : {}),

  images: {
    /* Modern formats first; Next falls back automatically. */
    formats: ["image/avif", "image/webp"],
    /* 75 is the default for editorial imagery, 85 is reserved for the hero,
       and 60 is for photographs used as texture behind a scrim, where
       detail is never seen. Next 16 refuses any quality not listed here. */
    qualities: [60, 75, 85],
    /* Breakpoints matched to the layout's actual image widths, so we never
       ship a 1920px file to fill a 32rem column. */
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [256, 384, 512],
    /* Rather than images.unoptimized, which would ship the full-size JPEGs:
       scripts/build-images.mjs pre-renders WebP at four widths and this
       loader picks the smallest one that covers the request. */
    ...(isPages
      ? { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" }
      : {}),
  },
};

export default nextConfig;
