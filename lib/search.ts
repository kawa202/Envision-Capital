/**
 * Site search for a static export.
 *
 * There is no search server on GitHub Pages, so scripts/build-search-index
 * writes the content collections out as public/search-index.json and the
 * overlay fetches it the first time someone opens search. Keeping it out of
 * the bundle means no page pays for search it never uses, and the browser
 * caches the index separately from the code that reads it.
 */
export type SearchResult = {
  title: string;
  kind: string;
  href: string;
  summary: string;
  /** Extra words matched against but not shown. */
  keywords?: string;
};

let cached: SearchResult[] | null = null;
let inFlight: Promise<SearchResult[]> | null = null;

/** Fetched once per page load; opening search twice does not fetch twice. */
export function loadSearchIndex(): Promise<SearchResult[]> {
  if (cached) return Promise.resolve(cached);
  if (inFlight) return inFlight;

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  inFlight = fetch(`${base}/search-index.json`)
    .then((response) => (response.ok ? response.json() : []))
    .then((data: SearchResult[]) => {
      cached = Array.isArray(data) ? data : [];
      return cached;
    })
    .catch(() => {
      /* A failed index should leave the overlay usable and empty, not
         broken: the reader can still reach the contact link inside it. */
      cached = [];
      return cached;
    });

  return inFlight;
}

/**
 * Every term has to appear somewhere in the entry, so "valuation africa"
 * narrows rather than widens. A title hit outranks a body hit; beyond that
 * the index order stands, which puts services above pages.
 */
export function search(index: SearchResult[], query: string, limit = 8): SearchResult[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: { entry: SearchResult; score: number }[] = [];

  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const body = `${entry.summary} ${entry.keywords ?? ""} ${entry.kind}`.toLowerCase();
    if (!terms.every((term) => title.includes(term) || body.includes(term))) continue;

    const score = terms.reduce(
      (total, term) => total + (title.includes(term) ? 2 : 1),
      0,
    );
    scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);
}
