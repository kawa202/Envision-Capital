import Link from "next/link";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Shared, server-rendered pieces. Nothing here needs interactivity.
   -------------------------------------------------------------------------- */

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
