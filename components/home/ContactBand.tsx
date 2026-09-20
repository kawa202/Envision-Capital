import Image from "next/image";
import Link from "next/link";
import { PRIMARY_CTA } from "@/lib/brand";

/**
 * The last thing before the footer: one sentence and one action, over a
 * photograph held well back.
 *
 * The image is scrimmed almost to texture and marked decorative — it is
 * there to give the band weight, not to say anything, and the sentence over
 * it has to stay legible on every crop. Measured against the darkest and
 * lightest pixels beneath the type rather than against the scrim colour.
 */
export function ContactBand() {
  return (
    <section className="relative isolate bg-navy" aria-labelledby="contact-heading">
      <Image
        src="/images/hero/insight-reading.jpg"
        alt=""
        fill
        loading="lazy"
        quality={60}
        sizes="100vw"
        className="-z-10 object-cover opacity-25"
      />
      {/* A flat navy wash rather than a gradient: the type sits anywhere in
          the band, so the contrast has to be the same everywhere. */}
      <div className="absolute inset-0 -z-10 bg-navy/75" aria-hidden="true" />

      <div className="shell section-y">
        <h2 id="contact-heading" className="max-w-[16ch] text-display-l text-white">
          Begin the conversation.
        </h2>
        <p className="measure mt-6 text-lede text-on-navy">
          Tell us what decision is in front of you, and we will tell you what
          it would take to make it defensible.
        </p>
        <p className="mt-9">
          <Link href={PRIMARY_CTA.href} className="btn-primary">
            {PRIMARY_CTA.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
