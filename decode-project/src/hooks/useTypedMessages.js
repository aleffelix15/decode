import { useState, useEffect } from "react";

export function useTypedMessages(messages = [], resetKey) {
  const total = Array.isArray(messages) ? messages.length : 0;
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setVisible(0);
    setTyping(total > 0);
  }, [resetKey, total]);

  useEffect(() => {
    if (total === 0 || visible >= total) {
      setTyping(false);
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(total);
      setTyping(false);
      return;
    }

    setTyping(true);
    const timer = setTimeout(() => {
      setVisible((prev) => Math.min(prev + 1, total));
    }, 700);

    return () => clearTimeout(timer);
  }, [visible, total, resetKey]);

  return { visible, typing: typing && visible < total };
}
