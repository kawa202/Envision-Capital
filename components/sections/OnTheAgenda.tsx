import Link from "next/link";
import Image from "next/image";
import { agenda } from "@/content/home";
import { services } from "@/content/services";

/**
 * On the agenda — a full-bleed strip of photograph panels, one per
 * capability, each opening that capability on /what-we-do.
 *
 * Static by design: no rotation. On a pointer device the summary and the
 * "Discover" cue rise into place on hover or focus; on touch they are simply
 * shown, because there is no hover to reveal them.
 */
export function OnTheAgenda() {
  const panels = agenda.flatMap((entry) => {
    const service = services.find((item) => item.id === entry.serviceId);
    return service ? [{ ...entry, summary: service.summary, href: `/what-we-do#${service.id}` }] : [];
  });

  return (
    <section className="relative bg-navy" aria-labelledby="agenda-heading">
      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 md:top-10">
        <h2 id="agenda-heading" className="shell font-display text-display-m text-white">
          On the agenda
        </h2>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {panels.map((panel, index) => (
          <li key={panel.serviceId} className="relative">
            <Link
              href={panel.href}
              className={`group relative flex h-[15rem] flex-col justify-end overflow-hidden p-6 sm:h-[20rem] md:h-[26rem] md:p-8 lg:h-[32rem] ${
                index > 0 ? "lg:border-l lg:border-white/15" : ""
              }`}
            >
              <Image
                src={panel.image.src}
                alt={panel.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
              />
              {/* Top scrim holds the overlaid heading; the bottom one holds
                  the label. The middle of the photograph stays clear. */}
              <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-transparent via-35% to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 via-45% to-transparent transition-opacity duration-500 group-hover:opacity-100 lg:opacity-85" aria-hidden="true" />

              <div className="relative">
                <h3 className="font-display text-[1.5rem] leading-tight text-white md:text-[1.75rem]">
                  {panel.label}
                </h3>
                <div className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/80">
                    {panel.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold text-white">
                    Discover
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
