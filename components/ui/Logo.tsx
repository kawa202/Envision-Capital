/**
 * The Envision Capital lockup: a drawn mark beside a typographic wordmark.
 *
 * The mark is inline SVG rather than a file so it inherits `currentColor` and
 * stays crisp at any size — on navy it is white, on warm white it is navy,
 * and only the top bar carries brass. Three bars rising inside a ring: the
 * ring is the firm's view of a business, the bars are what it does to it.
 *
 * Decorative by itself; the accessible name comes from the link that wraps it.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0 md:h-9 md:w-9"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Top bar is the single brass detail in the header, and it
            takes the token rather than a literal so the palette stays in
            one file. */}
        <rect x="11" y="12.5" width="18" height="2.5" className="fill-brass" />
        <rect x="11" y="18.75" width="13" height="2.5" fill="currentColor" />
        <rect x="11" y="25" width="8" height="2.5" fill="currentColor" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.0625rem] font-medium md:text-[1.125rem]">
          Envision
        </span>
        {/* Set as "Capital" and uppercased in CSS, so the text a screen
            reader announces matches the words a sighted reader sees — which
            is what WCAG 2.5.3 asks of any control carrying this lockup. */}
        <span className="mt-[3px] font-sans text-[0.5rem] font-medium tracking-[0.5em] uppercase md:text-[0.5625rem]">
          Capital
        </span>
      </span>
    </span>
  );
}
