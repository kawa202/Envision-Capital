/**
 * The Envision Capital lockup from the approved design direction: a brass
 * ring holding an "E", beside the name set in two lines with "Capital" in
 * brass. Inter, not the heading serif — it is a mark, not a headline.
 *
 * TODO — replace with the client's supplied artwork when it arrives
 * (public/brand/). Every surface renders <Logo />, so this is the only file
 * that changes.
 *
 * Decorative by itself; the accessible name comes from the link around it.
 */
export function Logo({
  className = "",
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {showMark && (
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brass font-sans text-[14px] font-bold text-brass"
        >
          E
        </span>
      )}
      <span className="font-sans text-[1.2rem] leading-[1.1] font-semibold tracking-[1px] text-white">
        Envision
        <br />
        <span className="text-brass">Capital</span>
      </span>
    </span>
  );
}
