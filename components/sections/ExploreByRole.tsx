import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { roles } from "@/content/home";

/**
 * Explore by role — a centred index of the audiences Envision serves, each
 * opening the capability it most often needs. Navigation, not content: the
 * tiles are plain outlined links with no copy of their own.
 */
export function ExploreByRole() {
  return (
    <section className="section-y bg-navy" aria-labelledby="roles-heading">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="roles-heading" className="font-display text-display-l text-white">
            Where are you coming from?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lede text-white/75">
            Boards, investors, lenders and business leaders arrive at a
            financial decision from different places. Start from yours.
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5"
          stagger={0.05}
        >
          {roles.map((role) => (
            <RevealItem as="li" key={role.label}>
              <Link
                href={role.href}
                className="flex min-h-[4.25rem] items-center justify-center border border-white/35 px-6 py-4 text-center text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:border-brass-light hover:bg-white/6"
              >
                {role.label}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
