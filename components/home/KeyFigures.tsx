import { figures, FIGURES_FOOTNOTE } from "@/content/figures";

/**
 * Three figures on navy, in the largest serif the page uses outside the hero.
 *
 * Two of them are empty brackets, and they stay that way on the live site
 * until Envision supplies numbers. That looks unfinished, which is the point:
 * a figure on a band like this is the most quotable thing on the page, and a
 * plausible invented number is far more damaging to an advisory firm than a
 * visible gap. The one real claim is marked client-stated in the source.
 */
export function KeyFigures() {
  return (
    <section className="section-y bg-navy" aria-labelledby="figures-heading">
      <div className="shell">
        <h2 id="figures-heading" className="sr-only">
          Envision Capital in numbers
        </h2>

        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {figures.map((figure) => (
            <div key={figure.label}>
              <dt className="sr-only">{figure.label}</dt>
              <dd>
                <span className="block font-serif text-display-xl leading-none text-white">
                  {figure.value}
                </span>
                <span className="mt-5 block text-body text-on-navy">
                  {figure.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-14 text-meta text-on-navy/80">{FIGURES_FOOTNOTE}</p>
      </div>
    </section>
  );
}
