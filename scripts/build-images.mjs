/**
 * Pre-generates responsive WebP copies of every photograph for the static
 * GitHub Pages build, where the Next image optimiser (which needs a server)
 * is not available. Output: public/_img/<width>/images/...webp — read by
 * lib/image-loader.ts. The folder is git-ignored and rebuilt in CI.
 *
 *   node scripts/build-images.mjs
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "images");
const out = path.join(root, "public", "_img");
const widths = JSON.parse(readFileSync(path.join(root, "lib", "image-widths.json"), "utf8"));

async function* photos(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* photos(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

let count = 0;
for await (const file of photos(src)) {
  const rel = path.relative(path.join(root, "public"), file).replace(/\.(jpe?g|png)$/i, ".webp");
  const { width: original } = await sharp(file).metadata();
  for (const w of widths) {
    const target = path.join(out, String(w), rel);
    const exists = await stat(target).then(() => true, () => false);
    if (exists) continue;
    await mkdir(path.dirname(target), { recursive: true });
    /* Never upscale: a copy requested wider than the original is the
       original size, so every URL the loader can produce exists. */
    await sharp(file).resize({ width: Math.min(w, original), withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
  }
  count++;
}
console.log(`build-images: ${count} photographs × ${widths.length} widths → public/_img`);
