/**
 * Display-only typographic helpers. Content keeps plain text — it also feeds
 * page titles and search metadata — and these adjust it at render time.
 */

/**
 * Swaps hyphens inside words for non-breaking hyphens (U+2011), so a
 * compound such as "mid-market" never splits across two lines of a
 * headline. Spaced dashes are left alone.
 */
export function keepCompoundsTogether(text: string): string {
  return text.replace(/(\w)-(?=\w)/g, "$1‑");
}
