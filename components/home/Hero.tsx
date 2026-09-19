import Image from "next/image";
import Link from "next/link";
import { PRIMARY_CTA } from "@/lib/brand";
import { site } from "@/content/site";

/**
 * The hero. One photograph, held still.
 *
 * The carousel it replaces rotated three claims past a reader who had not
 * finished the first, and every slide needed its own scrim tuned to its own
 * photograph. A single image is faster, quieter and says one thing — which is
 * what a firm that sells judgement should do at the top of its homepage.
 *
 * The scrim is navy, bottom to top, so the type sits on the darkest part of
 * the frame. The `h1` is not a link: it is the page's statement, not a door.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[32rem] items-end lg:min-h-[38rem]">
      <Image
        src="/images/hero/positioning-boardroom.jpg"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell pt-24 pb-[clamp(3rem,7vw,5.5rem)]">
        <h1 className="max-w-[18ch] text-hero font-normal text-white">
          {site.hero.headline}
        </h1>

        <p className="mt-6 max-w-xl text-lede text-white/85">
          Envision Capital helps boards, investors and lenders resolve complex
          financial decisions into a position that holds under scrutiny.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={PRIMARY_CTA.href} className="btn-primary">
            {PRIMARY_CTA.label}
          </Link>
          <Link
            href="/what-we-do"
            className="text-white underline underline-offset-[0.35em]"
          >
            Our services
          </Link>
        </div>
      </div>
    </section>
  );
}
