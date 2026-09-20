import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * A short institutional statement between the editorial body of the page and
 * the call to action. Deliberately spare: one line of argument, generous
 * space, no imagery. It is a pause, not another section.
 */
export function CredibilityStatement() {
  return (
    <section
      className="section-y bg-navy"
      aria-labelledby="credibility-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h2
            id="credibility-heading"
            className="font-display text-display-m text-white lg:col-span-5"
          >
            {site.credibilityStatement.heading}
          </h2>
          <p className="max-w-2xl text-lede text-white/65 lg:col-span-6 lg:col-start-7">
            {site.credibilityStatement.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
