/**
 * Directional arrow for calls to action. Decorative — the link text carries
 * the meaning. It nudges right when its parent link or button is hovered or
 * focused (see `.btn-arrow` in globals.css), so it works without the parent
 * having to be marked as a Tailwind `group`.
 */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      className={`btn-arrow h-3 w-5 shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6h17M12.5 1.5 17 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
