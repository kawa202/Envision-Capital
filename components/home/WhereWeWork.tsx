import { site } from "@/content/site";

/**
 * Where we work.
 *
 * One office card and one line about the region. No map: an embedded map is
 * a third-party script, a set of cookies and a consent question, and all a
 * reader wants here is an address they can copy and a number they can press.
 *
 * The street address is a slot. The phone, the email and the city came from
 * Envision; a street they have not given us is not something to invent.
 */
export function WhereWeWork() {
  const tel = site.contact.phone.replace(/[^+\d]/g, "");

  return (
    <section className="section-y bg-white" aria-labelledby="where-heading">
      <div className="shell grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="where-heading" className="max-w-[14ch] text-display-l text-navy">
            Where we work
          </h2>
          <p className="mt-8 text-body text-muted">
            One office, and mandates that travel. We advise from Harare across
            Zimbabwe and into the wider region, working in the regulatory and
            currency conditions our clients actually operate in rather than
            the ones a template assumes.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border-t border-line pt-8">
            <h3 className="font-serif text-h4 text-navy">Harare</h3>

            <address className="mt-5 space-y-3 text-body not-italic text-muted">
              <p>[Office address]</p>
              <p>{site.contact.address}</p>
              <p>
                <a href={`tel:${tel}`} className="link-inline inline-flex min-h-11 items-center">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-inline inline-flex min-h-11 items-center"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>

            <p className="mt-8 text-meta leading-relaxed text-muted">
              [OFFICE ADDRESS REQUIRED] — The city, the phone number and the
              email came from Envision. The street address has not been
              supplied and is not invented here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
