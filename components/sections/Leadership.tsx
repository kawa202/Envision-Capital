import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { people } from "@/content/people";

/**
 * Editorial portraiture on an open white ground — no cards, no borders, no
 * circular avatars. The portraits are rendered in greyscale because the source
 * images were shot to four different art directions; a single tonal treatment
 * is what imposes the consistency the photography itself lacks.
 */
export function Leadership() {
  return (
    <section
      id="leadership"
      className="section-y bg-paper"
      aria-labelledby="leadership-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2
              id="leadership-heading"
              className="font-display text-display-l text-navy"
            >
              Advice carries the name of whoever gives it.
            </h2>
          </div>
          <p className="max-w-lg text-lede text-muted lg:col-span-5 lg:col-start-8 lg:pt-12">
            Engagements are led personally. You will know who is responsible for
            your mandate, and you will deal with them directly.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          stagger={0.08}
        >
          {people.map((person) => (
            <RevealItem key={person.id}>
              <article className="group">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-navy">
                  <EditorialImage
                    image={person.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 22vw"
                    className="grayscale"
                  />
                </div>

                <div className="mt-5">
                  {/* Sample profiles carry a title and a practice, not an
                      invented name: a prototype can show structure without
                      putting words in a real person's mouth. */}
                  <h3 className="font-display text-h4 leading-snug text-navy">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-meta text-muted">{person.role}</p>

                  <dl className="mt-4 space-y-2.5 text-meta leading-relaxed">
                    <div>
                      <dt className="text-muted">Expertise</dt>
                      <dd className="mt-0.5 text-graphite">
                        {person.expertise.join(" · ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Industries</dt>
                      <dd className="mt-0.5 text-graphite">
                        {person.industries.join(" · ")}
                      </dd>
                    </div>
                    {person.qualifications.length > 0 && (
                      <div>
                        <dt className="text-muted">Qualifications</dt>
                        <dd className="mt-0.5 text-graphite">
                          {person.qualifications.join(" · ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
