"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(
  () => import("@/components/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false },
);

/**
 * Loads the concierge after the page has finished loading and the browser is
 * idle. Nobody needs it in the first seconds, and hydrating it up front cost
 * main-thread time on every page before the hero had painted.
 */
export function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let handle: number | undefined;
    const schedule = () => {
      const idle = window.requestIdleCallback?.bind(window);
      handle = idle
        ? idle(() => setReady(true), { timeout: 4000 })
        : window.setTimeout(() => setReady(true), 2000);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (handle !== undefined) {
        window.cancelIdleCallback?.(handle);
        window.clearTimeout(handle);
      }
    };
  }, []);

  return ready ? <ChatWidget /> : null;
}
