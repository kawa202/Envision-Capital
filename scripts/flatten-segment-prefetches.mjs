/**
 * Post-export fix-up for Next 16.3.5 segment prefetches.
 *
 * The App Router prefetches each route's RSC payload as a flat filename with
 * dots for separators:
 *
 *   /what-we-do/__next.what-we-do.__PAGE__.txt
 *
 * `output: "export"` writes the same payload as a nested directory instead:
 *
 *   out/what-we-do/__next.what-we-do/__PAGE__.txt
 *
 * On a server the router never notices, because nothing is served from disk
 * by path. On a static host every prefetch 404s — one per link in the
 * viewport. Navigation still works (the router falls back to a full document
 * load) but the console fills with errors and the requests are wasted.
 *
 * This writes the flat name alongside the nested one, so both spellings
 * resolve. Delete this script and its build step once Next writes the flat
 * form itself.
 */
import { cpSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const OUT = "out";
let copied = 0;

/** Every file under `dir`, as paths relative to it. */
function walk(dir, prefix = "") {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full, `${prefix}${entry}/`));
    else found.push(`${prefix}${entry}`);
  }
  return found;
}

function visit(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;

    if (entry.startsWith("__next.")) {
      for (const rel of walk(full)) {
        /* "$d$slug/__PAGE__.txt" → "__next.insights.$d$slug.__PAGE__.txt" */
        const flat = `${entry}.${rel.split("/").join(".")}`;
        cpSync(full + "/" + rel, join(dirname(full), flat));
        copied += 1;
      }
      continue;
    }
    visit(full);
  }
}

visit(OUT);
console.log(`flatten-segment-prefetches: wrote ${copied} flat segment payloads`);
