import { ArrowLink } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Homepage section header: a plain heading with an optional "see all" link
 * aligned to its right.
 *
 * The hub sections are a sequence of doors into other routes, so each one is
 * named by what it is ("Featured insights") rather than dressed with an
 * eyebrow and a line of positioning copy.
 */
export function HubHeader({
  id,
  title,
  link,
  invert = false,
}: {
  id: string;
  title: string;
  link?: { label: string; href: string };
  invert?: boolean;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
      <h2
        id={id}
        className={`font-display text-display-l ${invert ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {link && (
        <ArrowLink href={link.href} invert={invert} className="pb-1.5">
          {link.label}
        </ArrowLink>
      )}
    </Reveal>
  );
}
