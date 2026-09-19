"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { PRIMARY_CTA } from "@/lib/brand";

/**
 * The header, and the only one on the site.
 *
 * Solid navy on every route rather than transparent over the hero: with a
 * photograph behind it, a translucent bar is legible only on whichever part
 * of the image happens to sit under it. It is sticky, so it takes up real
 * space in the flow and nothing below it has to be padded down past a fixed
 * bar — which is where the old layout-shift came from.
 *
 * Four links, one action. The mega-menu is gone: a four-item bar does not
 * need a panel to explain itself, and the panels were the only reason the
 * site carried two navigations.
 */

/** A section is current on its own route and on every route beneath it. */
function isCurrentSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Primary navigation. Deliberately short. Industries, Selected work, The
 * Envision Method and the Newsroom are reachable from the footer on every
 * page, and from the secondary list in the mobile panel.
 */
const primaryNav = [
  { label: "Services", href: "/what-we-do" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const secondaryNav = [
  { label: "Industries", href: "/industries" },
  { label: "Selected work", href: "/work" },
  { label: "The Envision Method", href: "/method" },
  { label: "Newsroom", href: "/newsroom" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Navigating closes the panel. Without this it survives the route change
     and covers the page the reader just asked for. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* While the panel is open: Escape closes it, focus moves into it, and the
     page behind does not scroll. Closing returns focus to the button that
     opened it, so a keyboard reader is put back where they were. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.querySelector("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navLink =
    "text-[0.9375rem] text-on-navy transition-colors duration-200 hover:text-white aria-[current=page]:text-white";

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          aria-label="Envision Capital — home"
          className="-mx-2 flex items-center px-2 py-2 text-white"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrentSection(pathname, item.href) ? "page" : undefined}
                  className={navLink}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={PRIMARY_CTA.href} className="btn-primary hidden lg:inline-flex">
          {PRIMARY_CTA.label}
        </Link>

        {/* The only hamburger on the site, and only below the desktop bar. */}
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (!next) buttonRef.current?.focus();
          }}
          className="-mr-3 flex h-11 w-11 items-center justify-center text-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
            {open ? (
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Rendered only when open, so the links are never in the tab order
          behind a closed panel. */}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-invert bg-navy lg:hidden"
        >
          <nav aria-label="Primary" className="shell py-6">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrentSection(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-12 items-center py-2 text-[1.125rem] text-on-navy aria-[current=page]:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-col border-t border-line-invert pt-5">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrentSection(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-11 items-center py-1.5 text-on-navy aria-[current=page]:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href={PRIMARY_CTA.href} className="btn-primary mt-7 w-full">
              {PRIMARY_CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
