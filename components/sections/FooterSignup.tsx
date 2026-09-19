"use client";

import { useId, useState } from "react";

/**
 * Insights sign-up, footer size.
 *
 * Nothing leaves the browser: there is no subscription endpoint yet, and a
 * form that silently swallows an address is worse than no form. The TODO
 * below is the whole of the work outstanding.
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
      <label htmlFor={id} className="block text-meta text-on-navy">
        Insights, monthly
      </label>

      <div className="mt-3 flex flex-wrap gap-3">
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
        {submitted && (
          <span className="text-on-navy">
            Demo only — no address is stored or sent.
          </span>
        )}
      </p>
    </form>
  );
}
