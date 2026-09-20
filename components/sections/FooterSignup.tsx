"use client";

import Link from "next/link";
import { useId, useState } from "react";

/**
 * Insights sign-up, footer size.
 *
 * Nothing leaves the browser: there is no subscription endpoint yet, and a
 * form that silently swallows an address is worse than no form. The consent
 * line sits next to the button rather than in a policy nobody opens.
 */
export function FooterSignup() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a complete email address.");
      setSubmitted(false);
      return;
    }

    setError(null);
    setSubmitted(true);
    // TODO: post `value` to a real subscription endpoint before launch.
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <h2 className="text-h4 font-serif text-white">Capital Insights</h2>
      <p className="mt-3 text-meta text-on-navy/80">
        One considered email a month on markets, valuation and deal flow.
      </p>

      <label htmlFor={id} className="mt-6 block text-meta text-on-navy">
        Email address
      </label>
      <div className="mt-2 flex flex-wrap gap-3">
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-12 min-w-0 flex-1 border bg-transparent px-3 text-body text-white placeholder:text-on-navy/60 ${
            error ? "border-error-invert" : "border-line-invert"
          }`}
        />
        <button type="submit" className="btn-primary">
          Sign up
        </button>
      </div>

      <p aria-live="polite" className="mt-3 text-meta">
        {error && (
          <span id={`${id}-error`} className="text-error-invert">
            {error}
          </span>
        )}
        {submitted && !error && (
          <span className="text-on-navy">
            Demo only — no address is stored or sent.
          </span>
        )}
      </p>

      <p className="mt-3 text-meta leading-relaxed text-on-navy/80">
        By subscribing you agree that Envision Capital may email you about its
        insights. We do not share your address, and every email carries a
        one-click unsubscribe. See the{" "}
        <Link href="/legal#privacy" className="underline underline-offset-[0.2em]">
          privacy note
        </Link>
        .
      </p>
    </form>
  );
}
