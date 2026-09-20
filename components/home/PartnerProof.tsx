/**
 * The partner, on stone.
 *
 * A pull quote signed by the person who stands behind it — which is the
 * proof an advisory firm actually has. The portrait is a reserved frame
 * rather than a stock photograph of someone unconnected to the firm, and
 * certainly not a generated face: a fabricated person presented as a
 * partner is the one thing this page must never do. The name is a slot
 * until Envision fills it.
 */
export function PartnerProof() {
  return (
    <section className="section-y bg-stone" aria-labelledby="partner-heading">
      <div className="shell grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <div className="flex aspect-[4/5] w-full max-w-xs items-end bg-navy p-6">
            <p className="text-meta text-on-navy">
              [PORTRAIT REQUIRED] — commissioned photography, one art
              direction across the firm.
            </p>
          </div>
        </div>

        <figure className="lg:col-span-7 lg:col-start-6">
          <blockquote>
            <p id="partner-heading" className="text-display-l text-navy">
              &ldquo;Our role is to build the evidence a board needs in order
              to commit.&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-10">
            <span className="block text-h4 font-serif text-navy">
              [PARTNER NAME]
            </span>
            <span className="mt-3 block text-meta text-muted">
              Managing Partner · ACCA · RPA · MBA Financial Services · AIBZ ·
              20+ years
            </span>
          </figcaption>

          <p className="mt-10 measure text-meta leading-relaxed text-muted">
            [PARTNER DETAILS REQUIRED] — The name is a slot, and the
            qualifications above were supplied for the prototype. Confirm both
            with Envision, and commission the portrait, before launch.
          </p>
        </figure>
      </div>
    </section>
  );
}
