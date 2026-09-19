import { SectionLabel, UnverifiedFlag } from "@/components/ui/Bits";
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
            <SectionLabel>Leadership</SectionLabel>
            <h2
              id="leadership-heading"
              className="mt-6 font-display text-display-l text-navy"
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
                    className="grayscale transition-all duration-[1.1s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02] group-hover:grayscale-0"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="font-display text-[1.125rem] leading-snug text-navy">
                    {person.role}
                  </h3>

                  {person.placeholder ? (
                    <p className="mt-2.5">
                      <UnverifiedFlag>Profile required</UnverifiedFlag>
                    </p>
                  ) : (
                    <p className="mt-1 text-[0.875rem] text-muted">{person.name}</p>
                  )}

                  <dl className="mt-4 space-y-2.5 text-[0.8125rem] leading-relaxed">
                    <div>
                      <dt className="text-muted/70">Expertise</dt>
                      <dd className="mt-0.5 text-graphite">
                        {person.expertise.join(" · ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted/70">Industries</dt>
                      <dd className="mt-0.5 text-graphite">
                        {person.industries.join(" · ")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-12 border-t border-line pt-5 font-mono text-[0.68rem] leading-relaxed tracking-[0.04em] text-muted">
          [LEADERSHIP PROFILES REQUIRED] — Names, biographies, qualifications and
          contact details are withheld pending verified profiles from Envision
          Capital. The portraits are placeholders of people unconnected to the
          firm and must be replaced with commissioned photography shot to a
          single art direction.
        </p>
      </div>
    </section>
  );
}
