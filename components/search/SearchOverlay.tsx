"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { search } from "@/lib/search";

/**
 * Full-width search overlay.
 *
 * A modal dialog in behaviour if not in element: focus moves to the field on
 * open, Tab is held inside, Escape and a click on the backdrop close it, and
 * focus returns to whatever opened it. The page behind does not scroll.
 *
 * Results are announced through a live region rather than a visual count
 * alone, because the list updates as you type and a screen reader otherwise
 * has no way to know anything happened.
 */
const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);
  const trimmed = query.trim();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-navy/70"
      /* A click that starts and ends on the backdrop closes; one that began
         inside the panel and drifted out does not. */
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="max-h-dvh overflow-y-auto bg-white"
      >
        <div className="shell py-8 md:py-10">
          <div className="flex items-start justify-between gap-8">
            <h2 id={`${id}-title`} className="text-display-m text-navy">
              Search
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="-mr-3 flex h-11 w-11 shrink-0 items-center justify-center text-navy"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </div>

          <label htmlFor={`${id}-input`} className="sr-only">
            Search Envision Capital
          </label>
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Valuation, capital advisory, a sector…"
            className="mt-6 min-h-14 w-full border-b border-line bg-transparent pb-3 text-display-m text-navy placeholder:text-muted focus:border-navy focus:outline-none"
          />

          <p aria-live="polite" className="mt-4 text-meta text-muted">
            {trimmed === ""
              ? "Type to search services, sectors, insights and pages."
              : `${results.length} ${results.length === 1 ? "result" : "results"} for “${trimmed}”`}
          </p>

          {results.length > 0 && (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {results.map((result) => (
                <li key={`${result.kind}-${result.href}-${result.title}`}>
                  <Link
                    href={result.href}
                    onClick={onClose}
                    prefetch={false}
                    className="group flex min-h-14 flex-col justify-center py-4"
                  >
                    <span className="text-meta text-muted">{result.kind}</span>
                    <span className="mt-1 text-body text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                      {result.title}
                    </span>
                    <span className="mt-1 text-meta text-muted">{result.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {trimmed !== "" && results.length === 0 && (
            <p className="mt-6 text-body text-muted">
              Nothing matched. Try a service, a sector, or{" "}
              <Link href="/contact" onClick={onClose} className="link-inline">
                ask us directly
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
