"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import type { ResolvedNavItem } from "@/content/navigation";
import { PRIMARY_CTA } from "@/lib/brand";

/* Small enough to live here rather than reach into the content layer. */
const utilityNav = {
  searchLabel: "Search",
  loginLabel: "Client login",
  loginHref: "/portal",
};

/* The overlay carries the whole search index. It arrives the first time
   someone asks for it and never burdens a page that is only being read. */
const SearchOverlay = dynamic(
  () => import("@/components/search/SearchOverlay").then((m) => m.SearchOverlay),
  { ssr: false },
);

/**
 * The header, and the only one on the site.
 *
 * Fixed rather than sticky, with a spacer of its full height in the flow.
 * That is what lets it shrink on scroll without moving anything: the page
 * runs underneath it, so a shorter bar reveals more of the page rather than
 * pulling the content up. A sticky bar that changes height drags the whole
 * document with it, and that shift is charged to CLS.
 *
 * Panels open on click and from the keyboard. Hover opens them too, but only
 * where there is a real pointer, and never on focus — a panel that sprang
 * open for every tab stop would make the bar impossible to move across.
 */

/** A section is current on its own route and on every route beneath it. */
function isCurrentSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SiteHeader({ navItems }: { navItems: ResolvedNavItem[] }) {
  const pathname = usePathname();
  const baseId = useId();

  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* Navigating closes everything: otherwise a panel survives the route change
     and covers the page the reader just asked for. */
  useEffect(() => {
    setOpenPanel(null);
    setMobileOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  /* 80px at the top, 64px once moving. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closePanel = useCallback(
    (returnFocusTo?: string) => {
      setOpenPanel(null);
      if (returnFocusTo) triggerRefs.current[returnFocusTo]?.focus();
    },
    [],
  );

  /* Escape closes the open panel and puts focus back on its trigger; a click
     or a focus landing outside the header closes it silently. */
  useEffect(() => {
    if (!openPanel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel(openPanel);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenPanel(null);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenPanel(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [openPanel, closePanel]);

  /* The mobile menu is full-screen, so the page behind it must not scroll. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  /* Hover is an enhancement for real pointers only. Touch reports hover on
     some browsers, which turns the first tap into an open-and-close. */
  const hoverCapable = useRef(false);
  useEffect(() => {
    hoverCapable.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const barHeight = scrolled ? "h-16" : "h-16 lg:h-20";
  const navLink =
    "flex items-center gap-1.5 text-meta text-on-navy transition-colors duration-200 hover:text-white";

  return (
    <>
      {/* Reserves the header's full height for good, so the shrink moves
          nothing. */}
      <div className="h-16 lg:h-20" aria-hidden="true" />

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 bg-navy text-white"
        onMouseLeave={() => {
          if (hoverCapable.current) setOpenPanel(null);
        }}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-200 ease-[var(--ec-ease)] ${barHeight}`}
        >
          {/* The accessible name is built from the visible wordmark plus
              one hidden word, rather than replacing it with an aria-label
              that does not contain what is on screen. */}
          <Link href="/" className="-mx-2 flex items-center px-2 py-2 text-white">
            <Logo />
            <span className="sr-only">home</span>
          </Link>

          {/* ---------------- Desktop navigation ---------------- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const panelId = `${baseId}-${item.label}`;
                const open = openPanel === item.label;
                const current = isCurrentSection(pathname, item.href);

                if (!item.panel) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className={`${navLink} aria-[current=page]:text-white`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => {
                      if (hoverCapable.current) setOpenPanel(item.label);
                    }}
                  >
                    <button
                      type="button"
                      ref={(node) => {
                        triggerRefs.current[item.label] = node;
                      }}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenPanel(open ? null : item.label)}
                      className={`${navLink} min-h-11 ${current || open ? "text-white" : ""}`}
                    >
                      {item.label}
                      <Chevron open={open} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ---------------- Utilities ---------------- */}
          <div className="flex items-center gap-2 lg:gap-5">
            <button
              type="button"
              ref={searchButtonRef}
              onClick={() => setSearchOpen(true)}
              aria-label={utilityNav.searchLabel}
              aria-haspopup="dialog"
              className="flex h-11 w-11 items-center justify-center text-on-navy transition-colors duration-200 hover:text-white"
            >
              <SearchIcon />
            </button>

            <Link
              href={utilityNav.loginHref}
              className="hidden min-h-11 items-center text-meta text-on-navy transition-colors duration-200 hover:text-white lg:inline-flex"
            >
              {utilityNav.loginLabel}
            </Link>

            <Link href={PRIMARY_CTA.href} className="btn-primary hidden lg:inline-flex">
              {PRIMARY_CTA.label}
            </Link>

            {/* The only hamburger on the site. */}
            <button
              type="button"
              ref={menuButtonRef}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={`${baseId}-mobile`}
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                if (!next) menuButtonRef.current?.focus();
              }}
              className="-mr-3 flex h-11 w-11 items-center justify-center text-white lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
                {mobileOpen ? (
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" fill="none" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ---------------- Mega-menu panel ---------------- */}
        {navItems.map((item) =>
          item.panel && openPanel === item.label ? (
            <MegaPanel
              key={item.label}
              id={`${baseId}-${item.label}`}
              item={item}
              onClose={() => closePanel(item.label)}
            />
          ) : null,
        )}

        {/* ---------------- Mobile menu ---------------- */}
        {mobileOpen && (
          <div
            id={`${baseId}-mobile`}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-invert bg-navy lg:hidden"
          >
            <nav aria-label="Primary" className="shell py-6">
              <ul className="flex flex-col">
                {navItems.map((item) => {
                  const expanded = mobileGroup === item.label;
                  const groupId = `${baseId}-m-${item.label}`;

                  if (!item.panel) {
                    return (
                      <li key={item.label} className="border-b border-line-invert">
                        <Link
                          href={item.href}
                          className="flex min-h-14 items-center text-h4 text-on-navy"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label} className="border-b border-line-invert">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={groupId}
                        onClick={() => setMobileGroup(expanded ? null : item.label)}
                        className="flex min-h-14 w-full items-center justify-between gap-4 text-left text-h4 text-on-navy"
                      >
                        {item.label}
                        <Chevron open={expanded} />
                      </button>

                      {expanded && (
                        <div id={groupId} className="pb-5">
                          <Link
                            href={item.href}
                            className="flex min-h-11 items-center text-meta text-white underline underline-offset-[0.3em]"
                          >
                            {item.panel.exploreLabel}
                          </Link>
                          {item.panel.groups.map((group) => (
                            <div key={group.heading} className="mt-4">
                              <p className="text-meta text-on-navy/70">{group.heading}</p>
                              <ul>
                                {group.links.map((link) => (
                                  <li key={`${group.heading}-${link.label}`}>
                                    <Link
                                      href={link.href}
                                      className="flex min-h-11 items-center text-meta text-on-navy"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Link
                href={utilityNav.loginHref}
                className="mt-6 flex min-h-11 items-center text-meta text-on-navy"
              >
                {utilityNav.loginLabel}
              </Link>

              <Link href={PRIMARY_CTA.href} className="btn-primary mt-4 w-full">
                {PRIMARY_CTA.label}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && (
        <SearchOverlay
          onClose={() => {
            setSearchOpen(false);
            searchButtonRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

/**
 * One mega-menu panel: positioning on the left, grouped links in the middle,
 * one article on the right. Rendered only while open, so the article's
 * photograph is never fetched by a reader who does not open the menu.
 */
function MegaPanel({
  id,
  item,
  onClose,
}: {
  id: string;
  item: ResolvedNavItem;
  onClose: () => void;
}) {
  const panel = item.panel!;
  const featured = panel.featured;

  return (
    <div id={id} className="hidden border-t border-line-invert bg-navy lg:block">
      <div className="shell grid gap-10 py-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-body text-on-navy">{panel.description}</p>
          <Link
            href={panel.exploreHref}
            onClick={onClose}
            className="link-draw mt-5 inline-flex min-h-11 items-center text-meta text-white"
          >
            {panel.exploreLabel}
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6">
          {panel.groups.map((group) => (
            <div key={group.heading}>
              <p className="text-meta text-on-navy/70">{group.heading}</p>
              <ul className="mt-2">
                {group.links.map((link) => (
                  <li key={`${group.heading}-${link.label}`}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      prefetch={false}
                      className="link-draw flex min-h-11 items-center text-meta text-on-navy transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {featured && (
          <div className="lg:col-span-3">
            <p className="text-meta text-on-navy/70">Featured</p>
            <Link
              href={featured.href}
              onClick={onClose}
              prefetch={false}
              className="group mt-3 block"
            >
              {featured.image && (
                <span className="relative block aspect-[4/3] w-full overflow-hidden bg-navy">
                  <Image
                    src={featured.image.src}
                    alt=""
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="mt-3 block text-meta text-on-navy/70">
                {featured.category}
              </span>
              <span className="mt-1 block text-meta leading-snug text-white decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                {featured.title}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
