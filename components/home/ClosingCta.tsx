import Link from "next/link";
import { CLOSING_CTA } from "@/content/home";

/** The closing call to action, centred on warm white. */
export function ClosingCta() {
  return (
    <section
      className="border-t border-line px-[6%] py-20 text-center md:py-32"
      aria-labelledby="cta-heading"
    >
      <h2 id="cta-heading" className="mb-6 text-[clamp(2rem,4vw,3rem)] leading-normal">
        {CLOSING_CTA.heading}
      </h2>
      <p className="mx-auto mb-10 max-w-[600px] text-[1.1rem] leading-[1.7] text-muted">
        {CLOSING_CTA.body}
      </p>
      <Link href={CLOSING_CTA.cta.href} className="btn-large">
        {CLOSING_CTA.cta.text}
      </Link>
    </section>
  );
}
