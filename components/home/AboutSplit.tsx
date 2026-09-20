import Image from "next/image";
import Link from "next/link";

/**
 * The firm, in one statement and one paragraph, beside a photograph of the
 * city it works from.
 *
 * It replaces the partner pull quote, which needed a name and a face
 * Envision has not supplied. A statement about where the firm is and what it
 * advises on can be made honestly today; a signed quotation from a person
 * who does not yet have a name on the site cannot.
 */
export function AboutSplit() {
  return (
    <section className="section-y bg-stone" aria-labelledby="about-heading">
      <div className="shell grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
            <Image
              src="/images/gallery/harare-city.jpg"
              alt="Harare seen from above, the city centre under a clear sky."
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="about-heading" className="max-w-[16ch] text-display-l text-navy">
            Harare-based, advising across Zimbabwe and Africa.
          </h2>

          <p className="mt-8 text-body text-muted">
            We work where the capital actually moves: between a business with
            a plan and the lender, investor or board that has to back it. That
            means knowing the regulatory ground here, reading the numbers the
            way a credit committee will, and being in the room when the
            question is asked rather than filing an opinion afterwards.
          </p>

          <p className="mt-9">
            <Link
              href="/about"
              className="link-inline inline-flex min-h-11 items-center"
            >
              About us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
