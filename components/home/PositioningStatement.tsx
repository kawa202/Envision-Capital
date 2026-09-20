/**
 * The firm's position, stated once, in the largest serif on the page after
 * the hero.
 *
 * No image, no action, nothing to click. A reader who has just been shown
 * three stories needs one sentence telling them what the firm is for, and
 * then room to absorb it — which is what the whitespace here is doing. The
 * call to action comes later, once there is a reason for it.
 */
export function PositioningStatement() {
  return (
    <section className="section-y bg-white" aria-labelledby="positioning-heading">
      <div className="shell grid gap-y-10 lg:grid-cols-12">
        <h2
          id="positioning-heading"
          className="max-w-[22ch] text-display-l text-navy lg:col-span-8"
        >
          Complexity demands a clear position.
        </h2>

        <p className="measure text-lede text-muted lg:col-span-6 lg:col-start-7">
          Significant financial decisions rarely fail for want of information.
          They fail because the information was never resolved into a position
          that could withstand challenge — from a lender, an investment
          committee, an auditor or a board. Envision Capital exists at that
          point.
        </p>
      </div>
    </section>
  );
}
