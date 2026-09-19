/**
 * The demo booking store.
 *
 * /book writes here and /demo/crm reads it. It is localStorage, so it never
 * leaves the browser it was typed into — which is the point: this is a
 * walkthrough for a client presentation, not a booking system. Every read and
 * write is wrapped, because storage throws in private windows and returns
 * whatever a previous version of this page happened to leave behind.
 */

export const DEMO_BOOKINGS_KEY = "ec-demo-bookings";

export const STAGES = ["New", "Qualified", "Proposal", "Won"] as const;
export type Stage = (typeof STAGES)[number];

export type DemoBooking = {
  /** "EC-4K2P9X" */
  ref: string;
  service: string;
  /** Human-readable slot, e.g. "Tuesday 23 September 2026, 11:00". */
  slot: string;
  name: string;
  company: string;
  email: string;
  stage: Stage;
  /** ISO timestamp of when the demo booking was made. */
  at: string;
};

function isBooking(value: unknown): value is DemoBooking {
  if (!value || typeof value !== "object") return false;
  const b = value as Record<string, unknown>;
  return (
    typeof b.ref === "string" &&
    typeof b.service === "string" &&
    typeof b.slot === "string" &&
    typeof b.name === "string" &&
    typeof b.company === "string" &&
    typeof b.email === "string" &&
    typeof b.at === "string" &&
    STAGES.includes(b.stage as Stage)
  );
}

export function readDemoBookings(): DemoBooking[] {
  try {
    const raw = window.localStorage.getItem(DEMO_BOOKINGS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isBooking) : [];
  } catch {
    return [];
  }
}

export function writeDemoBookings(bookings: DemoBooking[]) {
  try {
    window.localStorage.setItem(DEMO_BOOKINGS_KEY, JSON.stringify(bookings));
  } catch {
    /* Storage unavailable. The flow still completes on screen; only the CRM
       demo goes without the record. */
  }
}

/** Newest first, so the CRM's New column reads top-down as most recent. */
export function addDemoBooking(booking: DemoBooking) {
  writeDemoBookings([booking, ...readDemoBookings()]);
}

/** "EC-" plus six characters, no vowels and no 0/1/I/O, so it can be read out. */
export function makeReference() {
  const alphabet = "23456789BCDFGHJKLMNPQRSTVWXYZ";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `EC-${out}`;
}
