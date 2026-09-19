"use client";

import { useEffect, useState } from "react";
import {
  readDemoBookings,
  writeDemoBookings,
  STAGES,
  type DemoBooking,
  type Stage,
} from "@/lib/demo";

/**
 * The other half of the demonstration: what the firm sees after someone
 * books. Reads the same localStorage array /book writes, moves a record
 * between four stages, and writes it straight back.
 *
 * No drag and drop. Two buttons per card are operable from a keyboard, work
 * on a phone, and are the thing being demonstrated — the pipeline, not the
 * interaction.
 */
export function CrmBoard() {
  /* Hydration: localStorage cannot be read on the server, so the board starts
     empty and fills after mount. `ready` keeps the empty state from flashing
     before the first read. */
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setBookings(readDemoBookings());
    setReady(true);
  }, []);

  function move(ref: string, direction: 1 | -1) {
    setBookings((current) => {
      const next = current.map((booking) => {
        if (booking.ref !== ref) return booking;
        const index = STAGES.indexOf(booking.stage) + direction;
        if (index < 0 || index >= STAGES.length) return booking;
        return { ...booking, stage: STAGES[index] as Stage };
      });
      writeDemoBookings(next);
      return next;
    });
  }

  function reset() {
    writeDemoBookings([]);
    setBookings([]);
  }

  if (!ready) return null;

  if (bookings.length === 0) {
    return (
      <div className="measure">
        <p className="text-body text-muted">
          No demo bookings yet. Complete the flow on{" "}
          <a href="/book" className="link-inline">
            /book
          </a>{" "}
          and the record appears here, in this browser.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage) => {
          const column = bookings.filter((booking) => booking.stage === stage);
          return (
            <section key={stage} aria-labelledby={`stage-${stage}`}>
              <h2
                id={`stage-${stage}`}
                className="flex items-baseline justify-between gap-3 border-b border-line pb-3 font-sans text-meta text-ink"
              >
                {stage}
                <span className="tnum text-muted">{column.length}</span>
              </h2>

              {column.length === 0 ? (
                <p className="mt-5 text-meta text-muted">Empty</p>
              ) : (
                <ul className="mt-5 space-y-8">
                  {column.map((booking) => (
                    <li key={booking.ref}>
                      <p className="text-body text-navy">{booking.company}</p>
                      <p className="mt-1 text-body text-muted">{booking.name}</p>
                      <p className="mt-3 text-meta text-muted">{booking.service}</p>
                      <p className="mt-1 text-meta text-muted">{booking.slot}</p>
                      <p className="mt-1 text-meta tnum text-muted">{booking.ref}</p>

                      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        <button
                          type="button"
                          onClick={() => move(booking.ref, -1)}
                          disabled={booking.stage === STAGES[0]}
                          className="link-inline min-h-11 disabled:text-muted disabled:no-underline"
                        >
                          Previous stage
                          <span className="sr-only"> for {booking.company}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => move(booking.ref, 1)}
                          disabled={booking.stage === STAGES[STAGES.length - 1]}
                          className="link-inline min-h-11 disabled:text-muted disabled:no-underline"
                        >
                          Next stage
                          <span className="sr-only"> for {booking.company}</span>
                        </button>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <p className="mt-16 border-t border-line pt-8">
        <button type="button" onClick={reset} className="btn-secondary">
          Reset demo data
        </button>
      </p>
    </>
  );
}
