"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { site } from "@/content/site";

type Errors = { name?: string; email?: string };

const field =
  "w-full border-b border-line bg-transparent py-2.5 text-[0.9375rem] text-graphite transition-colors duration-300 hover:border-navy/40 focus:border-brass focus:outline-none";
const fieldError = "border-error hover:border-error";

export function FinalCTA() {
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "Please provide an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email address does not look complete.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setNotice(null);
      return;
    }

    setNotice(
      "Prototype only — no submission endpoint is connected. Wire this form to Envision's CRM or mail handler before launch.",
    );
  };

  return (
    <section id="contact" className="section-y bg-paper" aria-labelledby="contact-heading">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Invitation ---------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="contact-heading" className="font-display text-display-l text-navy">
                {site.finalCta.heading}
              </h2>
              <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                {site.finalCta.body}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-9">
              <a
                href={`mailto:${site.contact.email}`}
                className="group inline-flex items-center gap-3 bg-navy px-7 py-4 text-[0.8125rem] tracking-[0.02em] text-white transition-colors duration-400 hover:bg-brass"
              >
                {site.finalCta.label}
                <span
                  className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <dl className="grid gap-6 sm:grid-cols-2">
                <div className="border-t border-line pt-4">
                  <dt className="text-meta text-muted">Email</dt>
                  <dd className="mt-2 text-[0.9rem] text-graphite">
                    <a href={`mailto:${site.contact.email}`} className="link-draw text-analytical">
                      {site.contact.email}
                    </a>
                    <span className="mt-1 block font-mono text-[0.6rem] tracking-[0.06em] text-analytical">
                      {site.contact.emailNote}
                    </span>
                  </dd>
                </div>
                <div className="border-t border-line pt-4">
                  <dt className="text-meta text-muted">Office</dt>
                  <dd className="mt-2 text-[0.9rem] text-graphite">
                    {site.contact.address}
                    <span className="mt-1 block font-mono text-[0.6rem] tracking-[0.06em] text-analytical">
                      {site.contact.phoneNote}
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* ---------------- Enquiry ---------------- */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <form noValidate onSubmit={onSubmit} className="border-t border-line pt-8 lg:border-t-0 lg:pt-0">
              <p className="text-meta text-muted">Enquiry</p>

              <div className="mt-7 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[0.8125rem] text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`mt-1 ${field} ${errors.name ? fieldError : ""}`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-meta text-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="organisation" className="block text-[0.8125rem] text-muted">
                      Organisation
                    </label>
                    <input
                      id="organisation"
                      name="organisation"
                      type="text"
                      autoComplete="organization"
                      className={`mt-1 ${field}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[0.8125rem] text-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`mt-1 ${field} ${errors.email ? fieldError : ""}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-meta text-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-[0.8125rem] text-muted">
                    Area of interest
                  </label>
                  <select id="interest" name="interest" defaultValue="" className={`mt-1 cursor-pointer ${field}`}>
                    <option value="" disabled>
                      Select a capability
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[0.8125rem] text-muted">
                    What are you weighing up?
                  </label>
                  <textarea id="message" name="message" rows={3} className={`mt-1 resize-none ${field}`} />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-8 inline-flex cursor-pointer items-center gap-3 border border-navy px-7 py-3.5 text-[0.8125rem] tracking-[0.02em] text-navy transition-colors duration-400 hover:bg-navy hover:text-white"
              >
                Send enquiry
                <span
                  className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>

              <p
                role="status"
                aria-live="polite"
                className="mt-4 min-h-[2.25rem] font-mono text-[0.68rem] leading-relaxed tracking-[0.04em] text-analytical"
              >
                {notice}
              </p>

              <p className="text-[0.78rem] leading-relaxed text-muted">
                Enquiries are treated in confidence. We will respond within two
                business days.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
