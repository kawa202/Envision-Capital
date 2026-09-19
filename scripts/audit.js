/**
 * Layout & accessibility audit, run in the page via the browser console.
 *
 * Catches the classes of defect that are easy to miss by eye:
 *   - horizontal page overflow at any breakpoint
 *   - siblings whose boxes overlap (content escaping an undersized track)
 *   - images without alt text
 *   - skipped heading levels
 *   - interactive targets below the 44px touch minimum
 *
 * Paste the contents of this file into the console, or run:
 *   window.__audit()
 */
(() => {
  const OVERLAP_TOLERANCE = 2; // px — sub-pixel rounding is not a defect

  function settle() {
    // Force Motion's entrance states to their resting values so geometry is
    // measured on the final layout, not mid-animation.
    const style =
      document.getElementById("__settle") || document.createElement("style");
    style.id = "__settle";
    style.textContent =
      "main [style],footer [style],header [style]{opacity:1!important;transform:none!important}";
    document.head.appendChild(style);
  }

  function pageOverflow() {
    const doc = document.documentElement;
    return {
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      overflowing: doc.scrollWidth > doc.clientWidth + 1,
    };
  }

  /** Siblings in a flex/grid row whose rendered boxes intersect. */
  function overlappingSiblings() {
    const hits = [];
    const containers = document.querySelectorAll("main div, main ul, main dl");

    for (const container of containers) {
      const display = getComputedStyle(container).display;
      if (display !== "flex" && display !== "grid") continue;

      // Only in-flow children can be "pushed" into each other by a track that
      // is too narrow. Absolutely and fixed positioned children are *meant* to
      // sit on top of their siblings (scrims, badges, frame marks), so counting
      // them produces nothing but false positives.
      const kids = [...container.children].filter((el) => {
        const position = getComputedStyle(el).position;
        if (position === "absolute" || position === "fixed") return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });

      for (let i = 0; i < kids.length; i++) {
        for (let j = i + 1; j < kids.length; j++) {
          const a = kids[i].getBoundingClientRect();
          const b = kids[j].getBoundingClientRect();
          const overlapX =
            Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const overlapY =
            Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);

          if (overlapX > OVERLAP_TOLERANCE && overlapY > OVERLAP_TOLERANCE) {
            hits.push({
              container: container.className.slice(0, 60),
              a: kids[i].className.slice(0, 50),
              b: kids[j].className.slice(0, 50),
              overlapX: Math.round(overlapX),
              overlapY: Math.round(overlapY),
            });
          }
        }
      }
    }
    return hits;
  }

  function imagesWithoutAlt() {
    return [...document.images]
      .filter((img) => img.alt === null || img.alt === undefined)
      .map((img) => img.currentSrc?.slice(-60));
  }

  function headingOutline() {
    const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
      (h) => ({
        level: Number(h.tagName[1]),
        text: h.textContent.trim().replace(/\s+/g, " ").slice(0, 46),
      }),
    );

    const skips = [];
    for (let i = 1; i < levels.length; i++) {
      if (levels[i].level - levels[i - 1].level > 1) {
        skips.push(`${levels[i - 1].text} (h${levels[i - 1].level}) -> ${levels[i].text} (h${levels[i].level})`);
      }
    }
    return { count: levels.length, h1s: levels.filter((l) => l.level === 1).length, skips };
  }

  function smallTouchTargets() {
    return [...document.querySelectorAll("a,button,select,input,textarea")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
      })
      .map((el) => ({
        tag: el.tagName,
        text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 34),
        size: `${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`,
      }));
  }

  window.__audit = () => {
    settle();

    // A collapsed or hidden viewport reports zero width, which makes every
    // geometry check below meaningless (and makes un-decoded images look
    // broken). Fail loudly rather than reporting phantom defects.
    if (document.documentElement.clientWidth === 0) {
      return {
        error:
          "Viewport reports zero width — the page is hidden or collapsed. Bring the window forward and re-run; geometry results would be meaningless.",
      };
    }

    return {
      width: window.innerWidth,
      pageOverflow: pageOverflow(),
      overlaps: overlappingSiblings(),
      imagesMissingAlt: imagesWithoutAlt(),
      headings: headingOutline(),
      smallTargets: smallTouchTargets(),
    };
  };

  return window.__audit();
})();
