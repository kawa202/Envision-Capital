"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Newsletter capture.
 *
 * Deliberately low-commitment and sits ahead of the contact section: it gives
 * a reader who is not ready to start a conversation somewhere to go.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter an email address.");
      setSubmitted(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("That email address does not look complete.");
      setSubmitted(false);
      return;
    }

    setError(null);
    setSubmitted(true);

    // TODO: send `value` to a real subscription endpoint (Mailchimp /
    // Campaign Monitor / CRM). Until then nothing leaves the browser — do not
    // present this as a working sign-up to a client.
  };

  return (
    <section className="bg-navy-2 py-10 md:py-12" aria-labelledby="newsletter-heading">
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="newsletter-heading"
              className="font-display text-display-m text-white"
            >
              Capital Insights, monthly.
            </h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/65">
              One considered email a month on markets, valuation and deal flow.
              No noise.
            </p>
          </div>

          <form
            noValidate
            onSubmit={onSubmit}
            className="lg:col-span-6 lg:col-start-7"
          >
            <label htmlFor="newsletter-email" className="block text-[0.8125rem] text-white/60">
              Email address
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                placeholder="you@company.com"
                className={`w-full border-b bg-transparent py-3 text-[0.9375rem] text-graphite transition-colors duration-300 placeholder:text-muted/50 focus:outline-none ${
                  error
                    ? "border-error-invert"
                    : "border-white/25 hover:border-white/45 focus:border-brass"
                }`}
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer bg-brass px-8 py-3.5 text-[0.8125rem] tracking-[0.02em] whitespace-nowrap text-white transition-colors duration-400 hover:bg-navy"
              >
                Subscribe
              </button>
            </div>

            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-[1.25rem] text-[0.8rem]"
            >
              {error && (
                <span id="newsletter-error" className="text-error-invert">
                  {error}
                </span>
              )}
              {submitted && !error && (
                <span className="text-meta text-on-navy">
                  Prototype only — no subscription endpoint is connected.
                </span>
              )}
            </p>

            <p className="mt-1 text-[0.78rem] text-white/50">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
