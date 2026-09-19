import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * The positioning statement directly beneath the hero — the section that has
 * to convert a visual impression into an understanding of what the firm does.
 * Asymmetric: statement left, argument right.
 */
export function IntroStatement() {
  return (
    <section className="section-y bg-paper" aria-labelledby="intro-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2
                id="intro-heading"
                className="font-display text-display-l text-navy"
              >
                {site.intro.heading}
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="space-y-6 lg:col-span-6 lg:col-start-7" stagger={0.1}>
            {site.intro.body.map((paragraph, index) => (
              <RevealItem
                key={paragraph.slice(0, 24)}
                as="p"
                className={
                  index === 0
                    ? "text-lede text-graphite"
                    : "text-[0.9375rem] leading-relaxed text-muted"
                }
              >
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* The questions Envision is brought in to answer. Presented as a
            plain index, not as marketing copy. */}
        <Reveal className="mt-16 border-t border-line pt-10 lg:mt-24">
          <p className="text-meta text-muted">
            The questions we are usually asked to settle
          </p>
          <RevealGroup
            as="ul"
            className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.07}
          >
            {site.challengeQuestions.map((question) => (
              <RevealItem
                as="li"
                key={question}
                className="font-display text-[1.0625rem] leading-snug text-navy"
              >
                {question}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
