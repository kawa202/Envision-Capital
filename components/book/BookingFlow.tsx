"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { addDemoBooking, makeReference, type DemoBooking } from "@/lib/demo";

/**
 * DEMO SERVICES — illustrative only.
 *
 * These three services, their durations and their prices exist to demonstrate
 * the booking flow in a client presentation. Envision has not published a
 * price list; none of this is an offer, and all of it is replaced by the
 * firm's own scope and fees before anything here goes near a real visitor.
 */
const services = [
  {
    id: "initial-consultation",
    name: "Initial consultation",
    detail: "45 minutes",
    price: 0,
    priceLabel: "No charge",
  },
  {
    id: "investor-readiness",
    name: "Investor Readiness Review",
    detail: "Defined-scope diagnostic",
    price: 500,
    priceLabel: "US$500",
  },
  {
    id: "valuation-diagnostic",
    name: "Valuation Diagnostic",
    detail: "Defined-scope diagnostic",
    price: 750,
    priceLabel: "US$750",
  },
];

type Service = (typeof services)[number];

const TIMES = ["09:00", "11:00", "14:30"];

/**
 * The next five weekdays, computed in the browser.
 *
 * This is a static export: anything derived from the date at build time would
 * still be offering last month's Tuesdays. The dates are therefore produced
 * after mount, which also keeps the server and client markup identical.
 */
function nextWeekdays(count: number, from = new Date()) {
  const days: Date[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(cursor));
  }
  return days;
}

function formatDay(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Step = "service" | "slot" | "details" | "payment" | "confirmation";

export function BookingFlow() {
  const ids = useId();
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<Service | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", company: "", email: "" });
  const [method, setMethod] = useState("ecocash");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [booking, setBooking] = useState<DemoBooking | null>(null);

  const [days, setDays] = useState<Date[]>([]);
  useEffect(() => {
    setDays(nextWeekdays(5));
  }, []);

  const slots = useMemo(
    () => days.flatMap((day) => TIMES.map((time) => `${formatDay(day)}, ${time}`)),
    [days],
  );

  function validateDetails() {
    const next: Record<string, string> = {};
    if (!details.name.trim()) next.name = "Enter your full name.";
    if (!details.company.trim()) next.company = "Enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) {
      next.email = "Enter a complete work email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function confirm() {
    if (!service || !slot) return;
    setProcessing(true);

    /* 1.6 seconds of nothing, so the demo shows the state a real payment or
       calendar call would put the reader in. */
    window.setTimeout(() => {
      const record: DemoBooking = {
        ref: makeReference(),
        service: service.name,
        slot,
        name: details.name.trim(),
        company: details.company.trim(),
        email: details.email.trim(),
        stage: "New",
        at: new Date().toISOString(),
      };
      addDemoBooking(record);
      setBooking(record);
      setProcessing(false);
      setStep("confirmation");
    }, 1600);
  }

  const field =
    "mt-2 min-h-12 w-full border border-line bg-transparent px-3 text-body text-ink";

  return (
    <div className="measure">
      {/* ---------------- Step 1: service ---------------- */}
      {step === "service" && (
        <fieldset>
          <legend className="font-serif text-display-m text-navy">Choose a service</legend>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {services.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setService(item);
                    setStep("slot");
                  }}
                  className="flex min-h-14 w-full items-baseline justify-between gap-6 py-5 text-left"
                >
                  <span>
                    <span className="block text-body text-navy">{item.name}</span>
                    <span className="mt-1 block text-meta text-muted">
                      {item.detail}
                    </span>
                  </span>
                  <span className="shrink-0 text-meta text-muted">
                    {item.priceLabel}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      {/* ---------------- Step 2: slot ---------------- */}
      {step === "slot" && service && (
        <fieldset>
          <legend className="font-serif text-display-m text-navy">Choose a time</legend>
          <p className="mt-3 text-meta text-muted">
            {service.name} · {service.priceLabel}
          </p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {slots.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    setSlot(option);
                    setStep("details");
                  }}
                  className="flex min-h-12 w-full items-center py-3 text-left text-body text-navy"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setStep("service")}
            className="link-inline mt-8 min-h-11"
          >
            Back to services
          </button>
        </fieldset>
      )}

      {/* ---------------- Step 3: details ---------------- */}
      {step === "details" && service && slot && (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (!validateDetails()) return;
            if (service.price > 0) setStep("payment");
            else confirm();
          }}
        >
          <h2 className="text-display-m text-navy">Your details</h2>
          <p className="mt-3 text-meta text-muted">
            {service.name} · {slot}
          </p>

          {(
            [
              { key: "name", label: "Full name", type: "text", autoComplete: "name" },
              {
                key: "company",
                label: "Company",
                type: "text",
                autoComplete: "organization",
              },
              {
                key: "email",
                label: "Work email",
                type: "email",
                autoComplete: "email",
              },
            ] as const
          ).map((input) => (
            <p key={input.key} className="mt-6">
              <label htmlFor={`${ids}-${input.key}`} className="text-meta text-ink">
                {input.label}
              </label>
              <input
                id={`${ids}-${input.key}`}
                name={input.key}
                type={input.type}
                autoComplete={input.autoComplete}
                value={details[input.key]}
                onChange={(event) =>
                  setDetails((prev) => ({ ...prev, [input.key]: event.target.value }))
                }
                aria-invalid={errors[input.key] ? true : undefined}
                aria-describedby={
                  errors[input.key] ? `${ids}-${input.key}-error` : undefined
                }
                className={`${field} ${errors[input.key] ? "border-error" : ""}`}
              />
              {errors[input.key] && (
                <span
                  id={`${ids}-${input.key}-error`}
                  className="mt-2 block text-meta text-error"
                >
                  {errors[input.key]}
                </span>
              )}
            </p>
          ))}

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button type="submit" className="btn-primary" disabled={processing}>
              {service.price > 0
                ? "Continue to payment"
                : processing
                  ? "Confirming…"
                  : "Confirm booking"}
            </button>
            <button
              type="button"
              onClick={() => setStep("slot")}
              className="link-inline min-h-11"
            >
              Back to times
            </button>
          </div>

          <p aria-live="polite" className="mt-4 text-meta text-muted">
            {processing && "Processing — this is a simulation."}
          </p>
        </form>
      )}

      {/* ---------------- Step 4: payment (priced services only) ---------- */}
      {step === "payment" && service && slot && (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            confirm();
          }}
        >
          <fieldset>
            <legend className="font-serif text-display-m text-navy">Payment</legend>
            <p className="mt-3 text-meta text-muted">
              {service.name} · {service.priceLabel} · {slot}
            </p>

            <ul className="mt-8">
              {[
                { value: "ecocash", label: "EcoCash" },
                { value: "card", label: "Visa / Mastercard" },
              ].map((option) => (
                <li key={option.value}>
                  <label className="flex min-h-12 items-center gap-3 text-body text-navy">
                    <input
                      type="radio"
                      name="payment-method"
                      value={option.value}
                      checked={method === option.value}
                      onChange={() => setMethod(option.value)}
                      className="h-5 w-5 accent-[color:var(--ec-navy)]"
                    />
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button type="submit" className="btn-primary" disabled={processing}>
              {processing ? "Processing…" : `Pay ${service.priceLabel}`}
            </button>
            <button
              type="button"
              onClick={() => setStep("details")}
              className="link-inline min-h-11"
            >
              Back to your details
            </button>
          </div>

          <p aria-live="polite" className="mt-4 text-meta text-muted">
            {processing
              ? "Processing — no payment is taken."
              : "No card details are collected. Selecting a method completes the demo."}
          </p>
        </form>
      )}

      {/* ---------------- Step 5: confirmation ---------------- */}
      {step === "confirmation" && booking && (
        <div aria-live="polite">
          <h2 className="text-display-m text-navy">Booking confirmed</h2>
          <p className="mt-4 text-body text-muted">
            Reference <span className="text-navy">{booking.ref}</span>
          </p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              ["Service", booking.service],
              ["Time", booking.slot],
              ["Name", booking.name],
              ["Company", booking.company],
              ["Email", booking.email],
            ].map(([term, value]) => (
              <div key={term} className="flex flex-wrap gap-x-6 gap-y-1 py-4">
                <dt className="w-24 shrink-0 text-meta text-muted">{term}</dt>
                <dd className="text-body text-navy">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-meta leading-relaxed text-muted">
            Demo — nothing was booked, charged or emailed. The record is held in
            this browser only.
          </p>
        </div>
      )}
    </div>
  );
}
