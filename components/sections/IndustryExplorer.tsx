import { industries } from "@/content/industries";

/**
 * Sector coverage, as a light card grid under the navy page header.
 *
 * Built on the homepage's "What We Do" pattern — a brass rule, the sector in
 * serif, one line on the work, and the constraint that shapes mandates there
 * — so the page moves navy → light → close, as the homepage does, instead of
 * running two dark blocks together.
 *
 * No photography: there is a fitting frame for seven sectors and none for
 * mining, and seven stock images plus a gap would read worse than eight
 * clean cards. The layout takes an image per card later without restructuring.
 * Server-rendered with no motion library, so the section ships no JavaScript.
 */
export function IndustryExplorer() {
  return (
    <section
      id="industries"
      className="border-b border-line bg-card px-[6%] py-20 md:py-32"
      aria-labelledby="industries-heading"
    >
      <span className="eyebrow">Sectors We Cover</span>
      {/* Sized as the homepage's section headings are. The page's h1 already
          carries the statement, so this one does not repeat it. */}
      <h2 id="industries-heading" className="text-[1.5rem] leading-normal">
        Eight sectors, one standard of rigour.
      </h2>

      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <li key={industry.index} className="flex flex-col border-t-2 border-brass pt-8">
            <span className="mb-4 font-sans text-[0.85rem] font-semibold tracking-[1px] text-brass-ink">
              {industry.index}
            </span>
            <h3 className="mb-4 text-[1.4rem] leading-snug">{industry.name}</h3>
            <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted">{industry.focus}</p>
            <p className="mt-auto border-t border-line pt-4 text-[0.85rem] leading-snug text-ink">
              <span className="mb-1 block text-[0.7rem] font-bold tracking-[1.5px] text-brass-ink uppercase">
                Key constraint
              </span>
              {industry.constraint}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
