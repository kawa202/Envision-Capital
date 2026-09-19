import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { capabilityOverview } from "@/content/home";
import { services } from "@/content/services";

/**
 * Capability overview — the chapter that follows the hero and answers the
 * question the hero raises: what does the firm actually do?
 *
 * Positioning on the left, four capabilities on the right as an editorial
 * index rather than boxed cards: a numbered entry under a hairline, the
 * brass segment of which runs the full width on hover or focus. Each entry
 * opens that capability on /what-we-do.
 */
export function CapabilityOverview() {
  const entries = capabilityOverview.serviceIds.flatMap((id) => {
    const service = services.find((item) => item.id === id);
    return service ? [service] : [];
  });

  return (
    <section className="section-y bg-paper" aria-labelledby="capabilities-heading">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 xl:col-span-4">
          <SectionEyebrow>{capabilityOverview.eyebrow}</SectionEyebrow>
          <h2 id="capabilities-heading" className="mt-6 font-display text-display-l text-navy">
            {capabilityOverview.heading}
          </h2>
          <p className="mt-6 max-w-md text-lede text-graphite">{capabilityOverview.lede}</p>
          <a href={capabilityOverview.link.href} className="btn-secondary mt-8">
            {capabilityOverview.link.label}
            <ArrowIcon />
          </a>
        </Reveal>

        <RevealGroup
          as="ol"
          className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 xl:col-start-6"
          stagger={0.07}
        >
          {entries.map((service, position) => (
            <RevealItem as="li" key={service.id}>
              <a
                href={`/what-we-do#${service.id}`}
                className="group relative flex h-full flex-col pt-5 pb-6"
              >
                {/* Hairline with a brass segment that runs the full width on
                    hover and focus — movement and colour, not colour alone. */}
                <span className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
                <span
                  className="absolute top-0 left-0 h-[2px] w-10 bg-brass transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-focus-visible:w-full"
                  aria-hidden="true"
                />

                {/* Numbered by position here, not by the catalogue index in
                    services.ts, which would read 01, 04, 02, 03. */}
                <span className="font-mono text-[0.75rem] tracking-[0.08em] text-muted tnum" aria-hidden="true">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[1.3125rem] leading-snug text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {service.name}
                </h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-graphite">
                  {service.summary}
                </p>
                <span className="mt-auto flex items-center gap-2.5 pt-5 text-[0.875rem] font-medium text-analytical">
                  Explore
                  <span className="sr-only"> {service.name}</span>
                  <ArrowIcon />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
