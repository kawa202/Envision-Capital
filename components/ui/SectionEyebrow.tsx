import type { ReactNode } from "react";

/**
 * Section eyebrow: a short brass rule over a mono label.
 *
 * Deliberately unnumbered — running "01 / 02 / 03" down a professional-services
 * homepage reads as a design system showing its work.
 */
export function SectionEyebrow({
  children,
  invert = false,
  className = "",
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`brass-rule eyebrow ${invert ? "text-white/55" : "text-muted"} ${className}`}
    >
      {children}
    </p>
  );
}
