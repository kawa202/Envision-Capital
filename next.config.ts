import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* No on-screen dev badge: in client reviews it sat over the hero and read
     as part of the design. Compile and runtime errors still surface. */
  devIndicators: false,
  images: {
    /* Modern formats first; Next falls back automatically. */
    formats: ["image/avif", "image/webp"],
    /* 75 is the default for editorial imagery; 85 is reserved for the hero. */
    qualities: [75, 85],
    /* Breakpoints matched to the layout's actual image widths, so we never
       ship a 1920px file to fill a 32rem column. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [256, 384, 512],
  },
};

export default nextConfig;
