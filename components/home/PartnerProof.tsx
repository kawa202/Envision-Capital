/**
 * The partner, on stone.
 *
 * A pull quote signed by the person who stands behind it — which is the
 * proof an advisory firm actually has. The portrait is a reserved frame
 * rather than a stock photograph of someone unconnected to the firm, and the
 * name is a slot: putting a face or a name here that Envision has not
 * supplied would be the one thing this page must never do.
 */
export function PartnerProof() {
  return (
    <section className="section-y bg-stone" aria-labelledby="partner-heading">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="flex aspect-[4/5] w-full max-w-sm items-end bg-navy p-6">
            <p className="text-meta text-on-navy">
              [PORTRAIT REQUIRED] — commissioned photography, single art
              direction.
            </p>
          </div>
        </div>

        <figure className="lg:col-span-8">
          <blockquote>
            <p id="partner-heading" className="text-display-l text-navy">
              &ldquo;Our role is to build the evidence a board needs in order
              to commit.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8">
            <span className="block text-body font-medium text-navy">
              [PARTNER NAME]
            </span>
            <span className="mt-2 block text-meta text-muted">
              Managing Partner · ACCA · RPA · MBA Financial Services · AIBZ ·
              20+ years
            </span>
          </figcaption>
        </figure>

        <p className="text-meta leading-relaxed text-muted lg:col-span-8 lg:col-start-5">
          [PARTNER DETAILS REQUIRED] — The name is a slot, and the
          qualifications above were supplied for the prototype. Confirm both
          with Envision, and commission the portrait, before launch.
        </p>
      </div>
    </section>
  );
}
