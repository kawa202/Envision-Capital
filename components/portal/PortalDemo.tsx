"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { readDemoBookings, type DemoBooking } from "@/lib/demo";

/**
 * Demonstration client portal.
 *
 * Deliberately has no password field. A prototype that presents a realistic
 * sign-in box invites someone to type a password they use elsewhere into a
 * page that does nothing with it — and a static export could not protect it
 * if they did. An email address is enough to show the idea, and the page says
 * on every screen that it authenticates nobody.
 *
 * What it shows is the same localStorage store /book writes and /demo/crm
 * reads, filtered to the address given. Nothing leaves the browser.
 */
export function PortalDemo() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signedInAs, setSignedInAs] = useState<string | null>(null);
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a complete email address.");
      return;
    }
    setError(null);
    setSignedInAs(value);
    setBookings(
      readDemoBookings().filter(
        (booking) => booking.email.toLowerCase() === value.toLowerCase(),
      ),
    );
  }

  if (!ready) return null;

  if (!signedInAs) {
    return (
      <form noValidate onSubmit={signIn} className="measure">
        <h2 className="text-display-m text-navy">Client login</h2>
        <p className="mt-5 text-body text-muted">
          Demo — no account is checked and no password is asked for. Enter the
          address you used on the booking page to see what a client would.
        </p>

        <p className="mt-8">
          <label htmlFor={id} className="text-meta text-ink">
            Work email
          </label>
          <input
            id={id}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`mt-2 min-h-12 w-full border bg-transparent px-3 text-body text-ink ${
              error ? "border-error" : "border-line"
            }`}
          />
          {error && (
            <span id={`${id}-error`} className="mt-2 block text-meta text-error">
              {error}
            </span>
          )}
        </p>

        <button type="submit" className="btn-primary mt-8">
          Continue
        </button>
      </form>
    );
  }

  return (
    <div className="measure">
      <h2 className="text-display-m text-navy">Your engagements</h2>
      <p className="mt-5 text-meta text-muted">Signed in as {signedInAs}</p>

      {bookings.length === 0 ? (
        <p className="mt-8 text-body text-muted">
          Nothing booked against this address in this browser. Complete the
          flow on{" "}
          <Link href="/book" className="link-inline">
            /book
          </Link>{" "}
          with the same email and it appears here.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {bookings.map((booking) => (
            <li key={booking.ref} className="py-6">
              <p className="text-body text-navy">{booking.service}</p>
              <p className="mt-2 text-body text-muted">{booking.slot}</p>
              <p className="mt-2 text-meta text-muted">
                Reference {booking.ref} · Status {booking.stage}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <button
          type="button"
          onClick={() => {
            setSignedInAs(null);
            setBookings([]);
          }}
          className="link-inline min-h-11"
        >
          Sign out
        </button>
        <Link href="/book" className="link-inline inline-flex min-h-11 items-center">
          Book another session
        </Link>
      </p>
    </div>
  );
}
