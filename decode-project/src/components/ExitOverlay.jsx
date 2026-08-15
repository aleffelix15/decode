import { useEffect, useRef } from "react";
import { LogOut, X } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel } from "./ui";

/* A safety-critical modal: reachable via ESC×3 or the always-visible
   "SAÍDA RÁPIDA" button, so someone can leave fast if they're interrupted.
   Gets full dialog semantics (focus moves in, Escape closes, focus
   returns to the trigger) since this is exactly the moment keyboard
   and screen-reader users most need a predictable exit. */
export function ExitOverlay({ onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: rgba("#000000", 0.75),
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "max(1rem, env(safe-area-inset-top, 0px)) max(1rem, env(safe-area-inset-right, 0px)) max(1rem, env(safe-area-inset-bottom, 0px)) max(1rem, env(safe-area-inset-left, 0px))",
      }}
    >
      <Panel
        className="w-full max-w-sm p-5 sm:p-6 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-overlay-title"
      >
        <button ref={closeBtnRef} onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 focus:outline-none focus-visible:ring-2" style={{ color: C.sub }}>
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 mb-4" style={{ color: C.red }}>
          <LogOut size={18} />
          <span id="exit-overlay-title" className="font-bold text-sm tracking-wide">SAÍDA RÁPIDA</span>
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: C.text }}>Precisa sair rápido?</p>
        <p className="text-xs mb-5" style={{ color: C.sub }}>
          Clique no botão abaixo para sair imediatamente desta página. Isso apenas fecha a experiência — não apaga o histórico do navegador nem garante, por si só, sua segurança digital.
        </p>
        <button onClick={() => window.open("https://www.google.com", "_blank")} className="w-full py-3 rounded-lg font-bold text-sm mb-3 focus:outline-none focus-visible:ring-2" style={{ background: C.red, color: "#fff" }}>
          SAIR AGORA
        </button>
        <p className="text-[11px]" style={{ color: C.sub }}>Você será direcionado(a) para uma nova aba neutra.</p>
      </Panel>
    </div>
  );
}
