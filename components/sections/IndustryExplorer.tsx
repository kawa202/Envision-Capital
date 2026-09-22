import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { industries } from "@/content/industries";

/**
 * Sector coverage as an editorial index.
 *
 * No photography and no cards: each sector earns its line by naming the
 * financial constraint that actually shapes mandates there. That says more
 * about sector fluency than eight recycled stock frames would, and it keeps
 * the section free of JavaScript entirely.
 */
export function IndustryExplorer() {
  return (
    <section
      id="industries"
      className="section-y bg-navy"
      aria-labelledby="industries-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2
              id="industries-heading"
              className="font-display text-display-l text-white"
            >
              Sector insight. Financial discipline.
            </h2>
          </div>
          <p className="max-w-lg text-lede text-white/60 lg:col-span-5 lg:col-start-8 lg:pt-12">
            Financial technique transfers between sectors. Judgement does not —
            it comes from knowing which constraint actually governs the
            decision in front of you.
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 border-t border-line-invert lg:mt-20"
          stagger={0.05}
        >
          {industries.map((industry) => (
            <RevealItem as="li" key={industry.index}>
              <div className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-line-invert-soft py-6 transition-colors duration-[var(--ec-dur)] hover:bg-white/3 md:grid-cols-12 md:py-7">
                <span className="text-meta text-on-navy tnum md:col-span-1">
                  {industry.index}
                </span>

                <h3 className="font-display text-h4 leading-snug text-white transition-colors duration-300 group-hover:text-brass-light md:col-span-4 md:text-h4">
                  {industry.name}
                </h3>

                <p className="text-meta leading-relaxed text-white/60 md:col-span-5">
                  {industry.focus}
                </p>

                <p className="text-meta leading-snug text-on-navy md:col-span-2 md:text-right">
                  {industry.constraint}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
