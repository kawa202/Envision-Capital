"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";

type Message = { from: "bot" | "user"; text: string };
type Option = "services" | "insights" | "mandate";

const OPTION_LABEL: Record<Option, string> = {
  services: "Explore our services",
  insights: "Read latest insights",
  mandate: "Discuss a mandate",
};

const OPTION_REPLY: Record<Option, string> = {
  services:
    "We offer M&A, Capital Raising, and Strategic Advisory. The Services page sets out every capability in full.",
  insights:
    "Our latest thinking covers market volatility, cross-border M&A, and infrastructure financing. You'll find it all under Insights.",
  mandate: `To discuss a mandate, use the 'Discuss a mandate' button at the top of the page, or write to ${site.contact.email}.`,
};

function replyTo(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("service")) {
    return "We specialise in Mergers & Acquisitions, Capital Raising, and Strategic Advisory. Which area are you interested in?";
  }
  if (lower.includes("contact") || lower.includes("mandate")) {
    return `You can discuss a mandate with the 'Discuss a mandate' button at the top of the page, or by writing to ${site.contact.email}.`;
  }
  return "Thank you for your message. For anything specific, please write to us directly — in the meantime, feel free to explore the Insights section.";
}

/**
 * The concierge from the design reference: a brass button bottom-right that
 * opens a small chat panel with three quick options.
 *
 * Two deliberate departures from the reference. It says what it is — the
 * reference labels it "AI Assistant • Online", but every reply is scripted
 * and nobody is on the other end, so claiming either would mislead a visitor
 * about to share something confidential. And the email address is the one
 * Envision actually uses (content/site.ts), not the invented one in the
 * reference. Messages render as text, never as HTML.
 */
export function ChatWidget() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const respond = (text: string, delay: number) => {
    window.setTimeout(() => setMessages((list) => [...list, { from: "bot", text }]), delay);
  };

  const choose = (option: Option) => {
    setMessages((list) => [...list, { from: "user", text: OPTION_LABEL[option] }]);
    respond(OPTION_REPLY[option], 800);
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((list) => [...list, { from: "user", text }]);
    setDraft("");
    respond(replyTo(text), 1000);
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? "Close the Envision concierge" : "Open the Envision concierge"}
        className="fixed right-5 bottom-5 z-[1000] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brass text-navy shadow-[0_10px_25px_rgb(0_0_0_/_0.2)] transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-brass-hover md:right-[30px] md:bottom-[30px]"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true" focusable="false">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      </button>

      <div
        id={`${id}-panel`}
        role="dialog"
        aria-label="Envision concierge"
        /* Always rendered so it can animate in, as in the reference; inert
           while closed so none of it is reachable by Tab or read out. */
        inert={!open}
        className={`fixed right-5 bottom-[90px] z-[1000] flex h-[400px] w-[calc(100%-40px)] flex-col overflow-hidden rounded-lg bg-card shadow-[0_15px_40px_rgb(0_0_0_/_0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] md:right-[30px] md:bottom-[100px] md:h-[450px] md:w-[350px] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-navy p-5 text-white">
          <div>
            <p className="font-sans text-base font-bold text-white">Envision Concierge</p>
            <p className="text-[0.75rem] text-brass">Demo · scripted replies</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            aria-label="Close the Envision concierge"
            className="flex h-11 w-11 items-center justify-center text-2xl leading-none text-white"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          className="flex flex-1 flex-col gap-4 overflow-y-auto bg-white p-6"
        >
          <div className="max-w-[85%] self-start rounded border border-line bg-card px-4 py-3 text-[0.9rem] leading-[1.5] text-ink">
            Welcome to Envision Capital. How can I assist you today?
            <div className="mt-2 flex flex-col gap-2">
              {(Object.keys(OPTION_LABEL) as Option[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  className="min-h-11 rounded border border-brass bg-card px-4 text-left text-[0.85rem] text-navy transition-colors duration-200 hover:bg-brass"
                >
                  {OPTION_LABEL[option]}
                </button>
              ))}
            </div>
          </div>
          {messages.map((message, position) => (
            <div
              key={position}
              className={`max-w-[80%] rounded px-4 py-3 text-[0.9rem] leading-[1.5] ${
                message.from === "user"
                  ? "self-end bg-navy text-white"
                  : "self-start border border-line bg-card text-ink"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form
          className="flex gap-2 border-t border-line bg-card p-4"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <label htmlFor={`${id}-input`} className="sr-only">
            Type a message
          </label>
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a message..."
            className="min-h-11 flex-1 rounded border border-navy/40 px-3 font-sans text-[0.9rem] text-ink"
          />
          <button
            type="submit"
            className="min-h-11 rounded bg-brass px-4 font-semibold text-navy"
          >
            Send
          </button>
        </form>
        <p className="border-t border-line bg-card p-2 text-center text-[0.7rem] text-muted">
          Demonstration only — scripted replies, not an AI and not staffed. Not
          financial advice.
        </p>
      </div>
    </>
  );
}
