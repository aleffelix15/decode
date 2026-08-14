import { useState, useEffect } from "react";

/* Reveals messages one by one with typing pauses, resetting whenever
   resetKey changes (e.g. moving to a new chapter). */
export function useTypedMessages(messages, resetKey) {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    setVisible(0);
    setTyping(true);
  }, [resetKey]);
  useEffect(() => {
    if (visible >= messages.length) { setTyping(false); return; }
    setTyping(true);
    const t = setTimeout(() => {
      setVisible((v) => v + 1);
    }, 700);
    return () => clearTimeout(t);
  }, [visible, messages, resetKey]);
  return { visible, typing: typing && visible < messages.length };
}
