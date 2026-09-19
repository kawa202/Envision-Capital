/**
 * The top of every spoke page.
 *
 * A navy band carrying the page's `h1`, sitting directly beneath the fixed
 * navigation. It does the job the hero does on the homepage: establishes where
 * you are before any content appears, and gives the fixed bar something solid
 * to sit against on pages that have no hero image.
 *
 * `meta` is for facts that belong to the page — an article's category, a
 * mandate type — printed under the title. It is not a decorative label, which
 * is why nothing sits above the heading any more.
 */
export function PageHeader({
  title,
  lede,
  meta,
}: {
  title: string;
  lede?: string;
  meta?: string;
}) {
  return (
    <header className="bg-navy pt-[calc(72px+clamp(2.5rem,5vw,4.5rem))] pb-[clamp(2.5rem,4.5vw,4rem)]">
      <div className="shell">
        <h1 className="max-w-4xl font-display text-display-xl text-white">
          {title}
        </h1>
        {meta && <p className="mt-5 text-meta text-white/70">{meta}</p>}
        {lede && (
          <p className="mt-5 max-w-2xl text-lede text-white/75">{lede}</p>
        )}
      </div>
    </header>
  );
}
