import { useState, useEffect } from "react";
import { C, rgba } from "../theme";

export function PatternReveal({ label, onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setPhase(3);
      const t = setTimeout(() => {
        onDone?.();
      }, 700);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => onDone?.(), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  const labels = [
    "ANALISANDO FRASE...",
    "CRUZANDO HISTÓRICO...",
    "AVALIANDO CONTEXTO...",
    "PADRÃO DETECTADO",
  ];

  return (
    <div
      className="w-full max-w-xl mb-3 sm:mb-4 px-3.5 sm:px-4 py-3 rounded-lg border scanner-container animate-fade-in"
      style={{ borderColor: rgba(C.lilac, 0.4), background: rgba(C.lilac, 0.08) }}
      role="status"
      aria-live="polite"
    >
      {phase < 3 && <div className="scanner-line" />}
      <p
        className={`text-[10px] sm:text-[11px] font-bold tracking-widest mb-1 ${
          phase === 1 || phase === 2 ? "scanner-glitch" : ""
        }`}
        style={{ color: C.lilac }}
      >
        {labels[phase]}
      </p>
      {phase === 3 && (
        <div className="decode-glow-pulse animate-slide-up inline-block p-1">
          <p className="text-sm font-semibold break-words" style={{ color: C.text }}>
            {label?.toUpperCase?.()} DETECTADO
          </p>
        </div>
      )}
    </div>
  );
}
