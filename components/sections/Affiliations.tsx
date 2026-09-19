import Image from "next/image";
import { UnverifiedFlag } from "@/components/ui/Bits";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { affiliationSlots, affiliations } from "@/content/home";

/**
 * Professional standing — registrations, memberships and relationships, shown
 * as a strip of logo tiles.
 *
 * Renders only what has been verified. With `affiliations` empty it shows
 * labelled placeholder tiles in development and nothing in production, so an
 * unconfirmed relationship can never ship by accident.
 */
export function Affiliations() {
  const isProduction = process.env.NODE_ENV === "production";
  if (affiliations.length === 0 && isProduction) return null;

  const placeholders = affiliations.length === 0;

  return (
    <section className="section-y bg-paper" aria-labelledby="affiliations-heading">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <h2 id="affiliations-heading" className="font-display text-display-l text-navy">
            Our professional standing
          </h2>
          <p className="mt-5 text-lede text-graphite">
            The registrations, memberships and relationships that stand behind
            our work.
          </p>
          {placeholders && (
            <div className="mt-5">
              <UnverifiedFlag>Hidden in production until supplied</UnverifiedFlag>
            </div>
          )}
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-5"
          stagger={0.04}
        >
          {placeholders
            ? affiliationSlots.map((slot, index) => (
                <RevealItem
                  as="li"
                  key={`${slot}-${index}`}
                  className="flex aspect-[5/2] items-center justify-center border border-dashed border-line bg-white px-4 text-center font-mono text-[0.625rem] leading-relaxed tracking-[0.08em] text-muted uppercase"
                >
                  [{slot}]
                </RevealItem>
              ))
            : affiliations.map((item) => (
                <RevealItem
                  as="li"
                  key={item.name}
                  className="relative flex aspect-[5/2] items-center justify-center bg-white px-6"
                >
                  {item.logo ? (
                    <Image
                      src={item.logo.src}
                      alt={item.logo.alt}
                      fill
                      sizes="(min-width: 1024px) 14vw, 45vw"
                      className="object-contain p-6"
                    />
                  ) : (
                    <span className="text-center text-[0.875rem] font-medium text-navy">
                      {item.name}
                    </span>
                  )}
                </RevealItem>
              ))}
        </RevealGroup>
      </div>
    </section>
  );
}
