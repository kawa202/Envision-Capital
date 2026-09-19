"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Wordmark } from "@/components/ui/Bits";
import { navItems, utilityNav } from "@/content/navigation";
import { site } from "@/content/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** A section is current on its own route and on every route beneath it. */
function isCurrentSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
      <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.8 17c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="10" cy="10" rx="3" ry="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Institutional navigation with full-width mega panels.
 *
 * The bar is solid navy at all times rather than transparent over the hero:
 * with a full-bleed photograph behind it, a translucent bar makes the links
 * legible only on whichever frame happens to be showing.
 *
 * Panels open on hover or on click — never merely on focus, which would pop
 * a panel open for every keyboard user tabbing across the bar. Opened from
 * the keyboard, focus moves into the panel, because the panel sits after the
 * whole bar in the document; Escape closes it and returns focus.
 */
export function Navigation() {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const focusPanelOnOpen = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openPanel) {
        panelButtons.current[openPanel]?.focus();
        setOpenPanel(null);
      }
      if (mobileOpen) closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPanel, mobileOpen, closeDrawer]);

  /* Keyboard-opened panel: hand focus to its first link. */
  useEffect(() => {
    if (!openPanel || !focusPanelOnOpen.current) return;
    focusPanelOnOpen.current = false;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, [openPanel]);

  /* The drawer is modal: lock the page behind it and start focus inside. */
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("[data-drawer-close]")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Keep Tab inside the open drawer. */
  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !drawerRef.current) return;
    const items = [...drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  /* Grace period so the pointer can cross the gap into the panel. */
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenPanel(null), 150);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const active = navItems.find((item) => item.label === openPanel);

  const utilityLink =
    "flex h-11 items-center gap-2.5 text-[0.8125rem] text-white/85 transition-colors duration-300 hover:text-white";

  return (
    <header
      className="fixed inset-x-0 top-0 z-100"
      onMouseLeave={() => setOpenPanel(null)}
    >
      <div className="border-b border-white/10 bg-navy">
        <nav aria-label="Primary" className="shell flex h-[72px] items-center gap-6 xl:gap-10">
          <Link href="/" aria-label={`${site.name} — home`} className="flex h-11 shrink-0 items-center">
            <Wordmark invert />
          </Link>

          {/* ---------- Primary ---------- */}
          <ul className="ml-2 hidden items-stretch self-stretch lg:flex xl:ml-4">
            {navItems.map((item) => {
              const isOpen = openPanel === item.label;
              const isCurrent = isCurrentSection(pathname, item.href);
              const marked = isOpen || isCurrent;
              const shared = `relative flex h-full items-center px-3 text-[0.8125rem] tracking-[0.01em] transition-colors duration-300 focus-visible:outline-offset-[-6px] xl:px-4 xl:text-[0.875rem] ${
                marked ? "text-white" : "text-white/80 hover:text-white"
              }`;
              /* Brass rule: open panel or current section. Hover draws a
                 fainter one, so the state change is not colour alone. */
              const rule = (
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-[3px] transition-opacity duration-300 xl:inset-x-4 ${
                    marked
                      ? "bg-brass opacity-100"
                      : "bg-white/40 opacity-0 group-hover:opacity-100"
                  }`}
                />
              );

              return (
                <li key={item.label} className="flex">
                  {item.panel ? (
                    <button
                      ref={(node) => {
                        panelButtons.current[item.label] = node;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls="mega-panel"
                      onMouseEnter={() => {
                        cancelClose();
                        setOpenPanel(item.label);
                      }}
                      onMouseLeave={scheduleClose}
                      onClick={(event) => {
                        /* detail === 0: activated from the keyboard. */
                        if (event.detail === 0) focusPanelOnOpen.current = !isOpen;
                        setOpenPanel(isOpen ? null : item.label);
                      }}
                      className={`group ${shared} cursor-pointer ${isOpen ? "bg-white/6" : ""}`}
                    >
                      {item.label}
                      {isCurrent && <span className="sr-only"> (current section)</span>}
                      {rule}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      onMouseEnter={scheduleClose}
                      className={`group ${shared}`}
                    >
                      {item.label}
                      {rule}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ---------- Utility ----------
              Between 1024 and 1280 the bar is tight: Search and the region
              collapse to icons with accessible names, so nothing wraps. */}
          <div className="ml-auto hidden items-center gap-5 lg:flex xl:gap-7">
            <Link
              href={utilityNav.contactHref}
              aria-current={isCurrentSection(pathname, utilityNav.contactHref) ? "page" : undefined}
              className={`${utilityLink} aria-[current=page]:text-white aria-[current=page]:underline aria-[current=page]:decoration-brass aria-[current=page]:underline-offset-8`}
            >
              {utilityNav.contactLabel}
            </Link>

            {/* TODO: open site search once a search backend exists. */}
            <button type="button" aria-label={utilityNav.searchLabel} className={`${utilityLink} cursor-pointer`}>
              <SearchIcon />
              <span className="hidden xl:inline" aria-hidden="true">
                {utilityNav.searchLabel}
              </span>
            </button>

            {/* A restrained utility button: the one bordered item in the bar,
                because it is the one that leads somewhere different in kind. */}
            <Link
              href={utilityNav.portalHref}
              className="flex h-9 items-center gap-2 border border-white/30 px-3.5 text-[0.8125rem] whitespace-nowrap text-white transition-colors duration-300 hover:border-brass-light hover:bg-white/6"
            >
              <PersonIcon />
              {utilityNav.portalLabel}
            </Link>

            <button
              type="button"
              aria-label={`Region: ${utilityNav.region.country}, ${utilityNav.region.language}`}
              className={`${utilityLink} cursor-pointer`}
            >
              <GlobeIcon />
              <span className="hidden xl:inline" aria-hidden="true">
                {utilityNav.region.country}{" "}
                <span className="text-white/60">{utilityNav.region.language}</span>
              </span>
            </button>
          </div>

          {/* ---------- Mobile: search and menu ---------- */}
          {/* TODO: open site search once a search backend exists. */}
          <button
            type="button"
            aria-label={utilityNav.searchLabel}
            className="ml-auto flex h-11 w-11 cursor-pointer items-center justify-center text-white lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <span className="h-6 w-px bg-white/25 lg:hidden" aria-hidden="true" />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="-mr-2.5 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[6px] text-white lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <span className="block h-px w-6 bg-current" aria-hidden="true" />
            <span className="block h-px w-6 bg-current" aria-hidden="true" />
          </button>
        </nav>
      </div>

      {/* ---------------- Mega panel ---------------- */}
      <AnimatePresence>
        {active?.panel && (
          <motion.div
            ref={panelRef}
            id="mega-panel"
            initial={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={() => setOpenPanel(null)}
            className="hidden border-b border-white/10 bg-navy shadow-[0_28px_60px_-30px_rgba(0,0,0,0.6)] lg:block"
          >
            <div className="shell grid grid-cols-12 gap-x-12 pt-12 pb-8">
              {/* Left: section identity */}
              <div className="col-span-3">
                <h2 className="font-display text-display-m text-white">
                  {active.label}
                </h2>
                <p className="mt-4 max-w-[17rem] text-[0.875rem] leading-relaxed text-white/70">
                  {active.panel.description}
                </p>
                <Link
                  href={active.panel.exploreHref}
                  onClick={() => setOpenPanel(null)}
                  className="btn-secondary-invert mt-7"
                >
                  {active.panel.exploreLabel}
                  <ArrowIcon />
                </Link>
              </div>

              {/* Centre: the section index */}
              <ul className="col-span-6">
                {active.panel.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpenPanel(null)}
                      className="flex items-center justify-between gap-6 border-b border-white/12 py-3.5 text-[0.9375rem] text-white transition-colors duration-300 hover:text-brass-light"
                    >
                      {link.label}
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Right: spotlight */}
              <div className="col-span-3">
                <h3 className="eyebrow text-brass-light">
                  {active.panel.spotlight.heading}
                </h3>
                <ul className="mt-5 space-y-5">
                  {active.panel.spotlight.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpenPanel(null)}
                        className="group block"
                      >
                        {item.kind && (
                          <span className="block text-[0.75rem] tracking-[0.02em] text-white/60">
                            {item.kind}
                          </span>
                        )}
                        <span className="mt-0.5 block text-[0.875rem] leading-snug text-white transition-colors duration-300 group-hover:text-brass-light group-hover:underline group-hover:decoration-brass-light group-hover:underline-offset-4">
                          {item.label}
                        </span>
                        {item.meta && (
                          <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.04em] text-white/60">
                            {item.meta}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (openPanel) panelButtons.current[openPanel]?.focus();
                setOpenPanel(null);
              }}
              aria-label="Close menu"
              className="mx-auto mb-3 flex h-11 w-11 cursor-pointer items-center justify-center text-white/60 transition-colors duration-300 hover:text-white"
            >
              <svg viewBox="0 0 20 12" className="h-3 w-5" aria-hidden="true">
                <path d="M1 10L10 2l9 8" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Mobile drawer ----------------
          A modal dialog: focus starts on the close button, Tab is held inside,
          Escape or the close button returns focus to the menu button. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={trapFocus}
            initial={{ opacity: 0, x: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduce ? 0 : 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-200 flex flex-col overflow-y-auto bg-navy lg:hidden"
          >
            <div className="shell flex h-[72px] shrink-0 items-center border-b border-white/10">
              <Link
                href="/"
                aria-label={`${site.name} — home`}
                onClick={() => setMobileOpen(false)}
                className="flex h-11 items-center"
              >
                <Wordmark invert />
              </Link>
              <button
                type="button"
                data-drawer-close
                onClick={closeDrawer}
                className="-mr-2.5 ml-auto flex h-11 w-11 cursor-pointer items-center justify-center text-white"
              >
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>

            <div className="shell flex flex-1 flex-col pt-4 pb-10">
              <ul>
                {navItems.map((item) => {
                  const expanded = mobileSection === item.label;
                  const isCurrent = isCurrentSection(pathname, item.href);
                  const sectionId = `drawer-${item.href.slice(1)}`;
                  return (
                    <li key={item.label} className="border-b border-white/12">
                      {item.panel ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-controls={sectionId}
                            onClick={() => setMobileSection(expanded ? null : item.label)}
                            className="flex min-h-14 w-full cursor-pointer items-center justify-between py-3 text-left font-display text-[1.375rem] text-white"
                          >
                            <span className="flex items-center gap-3">
                              {isCurrent && <span className="h-5 w-[3px] bg-brass" aria-hidden="true" />}
                              {item.label}
                              {isCurrent && <span className="sr-only"> (current section)</span>}
                            </span>
                            <svg
                              viewBox="0 0 16 16"
                              className={`h-4 w-4 text-white/70 transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
                              aria-hidden="true"
                            >
                              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" />
                            </svg>
                          </button>
                          {expanded && (
                            <ul id={sectionId} className="pb-4">
                              <li>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-medium text-brass-light"
                                >
                                  {item.panel.exploreLabel}
                                  <ArrowIcon />
                                </Link>
                              </li>
                              {item.panel.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex min-h-11 items-center text-[0.9375rem] text-white/80 transition-colors duration-300 hover:text-white"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? "page" : undefined}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-14 items-center gap-3 py-3 font-display text-[1.375rem] text-white"
                        >
                          {isCurrent && <span className="h-5 w-[3px] bg-brass" aria-hidden="true" />}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-6 grid grid-cols-2 gap-x-6 text-[0.875rem] text-white/85">
                <li>
                  <Link href={utilityNav.contactHref} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center">
                    {utilityNav.contactLabel}
                  </Link>
                </li>
                <li>
                  <button type="button" className="flex min-h-11 cursor-pointer items-center gap-2.5">
                    <SearchIcon />
                    {utilityNav.searchLabel}
                  </button>
                </li>
                <li>
                  <Link href={utilityNav.portalHref} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center gap-2.5">
                    <PersonIcon />
                    {utilityNav.portalLabel}
                  </Link>
                </li>
                <li>
                  <button type="button" className="flex min-h-11 cursor-pointer items-center gap-2.5">
                    <GlobeIcon />
                    {utilityNav.region.country}
                    <span className="text-white/60">{utilityNav.region.language}</span>
                  </button>
                </li>
              </ul>

              {/* Pinned to the foot of the drawer on tall screens. */}
              <div className="mt-auto pt-10">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  Talk to Envision
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
