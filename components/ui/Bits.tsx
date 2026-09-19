import Link from "next/link";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Shared, server-rendered pieces. Nothing here needs interactivity.
   -------------------------------------------------------------------------- */

/**
 * The Envision wordmark — typographic, not an image, so it stays crisp at
 * every size and inherits the brand serif.
 */
export function Wordmark({
  invert = false,
  className = "",
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex flex-col gap-[2px] ${className}`}>
      <span
        className={`font-display text-[1.0625rem] leading-none tracking-[0.13em] uppercase ${
          invert ? "text-white" : "text-navy"
        }`}
      >
        Envision
      </span>
      <span
        className={`text-meta text-[0.5rem] ${invert ? "text-white/45" : "text-muted"}`}
      >
        Capital
      </span>
    </span>
  );
}

/** Text link with an arrow that steps forward on hover of its group. */
export function ArrowLink({
  href,
  children,
  invert = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 text-[0.8125rem] transition-colors duration-300 ${
        invert ? "text-white/85 hover:text-white" : "text-analytical hover:text-navy"
      } ${className}`}
    >
      <span className="link-draw">{children}</span>
      <span
        className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}

/**
 * Development-only flag for content that is not yet verified. In production
 * the wrapper disappears so unverified copy can never ship behind a silent
 * badge — it has to be resolved, not hidden.
 */
export function UnverifiedFlag({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <span className="inline-flex items-center gap-1.5 border border-ink/35 px-2 py-1 text-meta text-ink">
      {children}
    </span>
  );
}
