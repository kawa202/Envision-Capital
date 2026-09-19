/**
 * Builds a labelled contact sheet of every image in /public/images so the
 * whole photography set can be art-directed in one pass instead of opened
 * file by file.
 *
 *   node scripts/contact-sheet.js
 *
 * Writes to the path given by CONTACT_SHEET_OUT (default: ./contact-sheet.jpg).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "images");
const OUT = process.env.CONTACT_SHEET_OUT || path.join(__dirname, "..", "contact-sheet.jpg");

const CELL_W = 300;
const CELL_H = 200;
const LABEL_H = 26;
const COLS = 5;

function walk(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, rel));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) out.push({ rel, full });
  }
  return out;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

(async () => {
  const files = walk(ROOT).sort((a, b) => a.rel.localeCompare(b.rel));
  const rows = Math.ceil(files.length / COLS);
  const cellTotalH = CELL_H + LABEL_H;

  const composites = [];

  for (let i = 0; i < files.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = col * CELL_W;
    const top = row * cellTotalH;

    const thumb = await sharp(files[i].full)
      .resize(CELL_W - 4, CELL_H - 4, { fit: "cover" })
      .jpeg({ quality: 78 })
      .toBuffer();

    composites.push({ input: thumb, left: left + 2, top: top + 2 });

    const label = `${i + 1}. ${files[i].rel}`;
    const svg = Buffer.from(
      `<svg width="${CELL_W}" height="${LABEL_H}">
         <rect width="100%" height="100%" fill="#0B1F3A"/>
         <text x="6" y="17" font-family="monospace" font-size="12" fill="#D5AD6A">${escapeXml(label)}</text>
       </svg>`,
    );
    composites.push({ input: svg, left, top: top + CELL_H });
  }

  await sharp({
    create: {
      width: COLS * CELL_W,
      height: rows * cellTotalH,
      channels: 3,
      background: { r: 245, g: 243, b: 238 },
    },
  })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(OUT);

  console.log(`${files.length} images -> ${OUT}`);
  files.forEach((f, i) => console.log(`${i + 1}. ${f.rel}`));
})();
