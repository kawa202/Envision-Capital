import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { spotlights, type Spotlight } from "@/content/home";

/**
 * Two alternating half-and-half splits: photograph bleeding to the viewport
 * edge on one side, positioning copy on the other. They carry the firm's
 * point of view on the homepage now that the long About section lives on
 * /about.
 */
export function Spotlights() {
  return (
    <>
      {spotlights.map((spotlight, index) => (
        <SpotlightSplit
          key={spotlight.id}
          spotlight={spotlight}
          tint={index % 2 === 1}
        />
      ))}
    </>
  );
}

function SpotlightSplit({
  spotlight,
  tint,
}: {
  spotlight: Spotlight;
  tint: boolean;
}) {
  const headingId = `spotlight-${spotlight.id}`;
  const imageFirst = spotlight.imageSide === "left";

  return (
    <section
      aria-labelledby={headingId}
      className={`grid lg:grid-cols-2 ${tint ? "bg-paper-2" : "bg-paper"}`}
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden bg-navy lg:aspect-auto lg:min-h-[26.5rem] ${
          imageFirst ? "" : "lg:order-2"
        }`}
      >
        <Image
          src={spotlight.image.src}
          alt={spotlight.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        className={`flex items-center px-[clamp(1.25rem,4.5vw,4.5rem)] py-12 md:py-14 lg:py-16 ${
          imageFirst
            ? "lg:pr-[var(--shell-edge)] lg:pl-[clamp(3rem,7vw,7rem)]"
            : "lg:pr-[clamp(3rem,7vw,7rem)] lg:pl-[var(--shell-edge)]"
        }`}
      >
        <Reveal className="max-w-[36rem]">
          <h2 id={headingId} className="font-display text-display-l text-navy">
            {spotlight.heading}
          </h2>
          <p className="mt-5 text-lede text-graphite">{spotlight.body}</p>

          {spotlight.button && (
            <Link
              href={spotlight.button.href}
              className="mt-8 inline-flex items-center border border-navy px-7 py-3.5 text-[0.875rem] font-medium text-navy transition-colors duration-300 hover:bg-navy hover:text-white"
            >
              {spotlight.button.label}
            </Link>
          )}

          {spotlight.links && (
            <ul className="mt-7 space-y-4">
              {spotlight.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold text-analytical transition-colors duration-300 hover:text-navy"
                  >
                    <span className="link-draw">{link.label}</span>
                    <span
                      className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
