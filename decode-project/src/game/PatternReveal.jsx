import { useState, useEffect } from "react";
import { C, rgba } from "../theme";

export function PatternReveal({ label, onDone }) {
  const [phase, setPhase] = useState(0); // 0 scan, 1 decrypting, 2 found
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 550);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => onDone && onDone(), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  const labels = ["SCAN...", "DECRYPTING...", "PADRÃO ENCONTRADO"];
  return (
    <div className="w-full max-w-xl mb-3 sm:mb-4 px-3.5 sm:px-4 py-3 rounded-lg border" style={{ borderColor: rgba(C.lilac, 0.4), background: rgba(C.lilac, 0.08) }} role="status" aria-live="polite">
      <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mb-1" style={{ color: C.lilac }}>{labels[phase]}</p>
      {phase === 2 && (
        <p className="text-sm font-semibold break-words" style={{ color: C.text }}>{label.toUpperCase()} DETECTADO</p>
      )}
    </div>
  );
}
