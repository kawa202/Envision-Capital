import widths from "./image-widths.json";

/**
 * next/image loader for the static GitHub Pages build (see next.config.ts).
 *
 * There is no image server on a static host, so scripts/build-images.mjs
 * writes WebP copies of every photograph in /public/images at the widths in
 * image-widths.json, under /_img/<width>/. This loader maps the width the
 * browser asks for to the smallest copy that covers it, and adds the
 * repository sub-path, which next/image does not apply to `src` by itself.
 */
export default function pagesImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  /* Unsplash resizes on its own CDN, so a remote photograph is asked for at
     exactly the width the browser wants rather than one pre-rendered copy.
     Quality 80 matches the design reference these images came from. */
  if (src.startsWith("https://images.unsplash.com/")) {
    return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 80}`;
  }

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!/^\/images\/.+\.(jpe?g|png)$/i.test(src)) return `${base}${src}`;
  const size = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return `${base}/_img/${size}${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
}
