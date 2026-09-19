import Image from "next/image";
import Link from "next/link";

/**
 * One case study, held still.
 *
 * Three rotating cards behind arrows was a way of avoiding the choice; a
 * homepage that shows one piece of work is making a claim about which piece
 * matters. Title and outcome are neutral slots until Envision supplies
 * verified, client-consented content.
 */
export function CaseStudyFeature() {
  return (
    <section className="section-y bg-white" aria-labelledby="case-study-heading">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-navy">
            <Image
              src="/images/hero/work-manufacturing.jpg"
              alt="Production floor of a mid-sized manufacturing business."
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <h2 id="case-study-heading" className="text-display-l text-navy">
            [Case study title]
          </h2>
          <p className="mt-6 text-body text-muted">[Outcome]</p>
          <p className="mt-8">
            <Link href="/work" className="link-inline">
              Selected work
            </Link>
          </p>
          <p className="mt-10 text-meta leading-relaxed text-muted">
            [CASE STUDY CONTENT REQUIRED] — An empty placeholder. No client,
            mandate or outcome shown here represents work Envision Capital has
            performed.
          </p>
        </div>
      </div>
    </section>
  );
}
