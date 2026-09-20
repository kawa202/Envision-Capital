"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const SearchOverlay = dynamic(
  () => import("@/components/search/SearchOverlay").then((m) => m.SearchOverlay),
  { ssr: false },
);

/**
 * The last door on the page.
 *
 * A reader who has come this far and not found what they wanted needs
 * somewhere to go other than back to the top. It opens the same overlay the
 * header's search icon opens — one search on the site, not two — and the
 * module only arrives if someone actually asks for it.
 *
 * It is a button rather than an input, because an input here that did not
 * search as you typed would be a second, worse search box.
 */
export function DiscoverMore() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="section-y bg-stone" aria-labelledby="discover-heading">
      <div className="shell">
        <h2 id="discover-heading" className="max-w-[20ch] text-display-l text-navy">
          Looking for something in particular?
        </h2>
        <p className="measure mt-6 text-body text-muted">
          Search the whole site — services, sectors, insights and announcements.
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="mt-9 flex min-h-14 w-full max-w-xl items-center gap-4 border border-navy/30 px-5 text-left text-body text-muted transition-colors duration-200 hover:border-navy"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-navy" aria-hidden="true" focusable="false">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Search Envision Capital
        </button>
      </div>

      {open && (
        <SearchOverlay
          onClose={() => {
            setOpen(false);
            buttonRef.current?.focus();
          }}
        />
      )}
    </section>
  );
}
