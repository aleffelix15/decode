import { useEffect, useRef } from "react";
import { LogOut, X } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel } from "./ui";

export function ExitOverlay({ onClose }) {
  const exitBtnRef = useRef(null);

  const handleFastExit = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Ignora erro caso armazenamento esteja bloqueado pelo navegador
    }
    window.location.replace("https://www.google.com");
  };

  useEffect(() => {
    exitBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleFastExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4"
      style={{
        background: rgba("#000000", 0.8),
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      role="presentation"
    >
      <Panel
        className="w-full max-w-sm p-4 sm:p-5 md:p-6 relative shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-overlay-title"
        aria-describedby="exit-overlay-desc"
      >
        <button
          onClick={onClose}
          aria-label="Cancelar saída rápida e voltar à aplicação"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none focus-visible:ring-2 rounded-lg"
          style={{ color: C.sub }}
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 mb-3 sm:mb-4" style={{ color: C.red }}>
          <LogOut size={18} aria-hidden="true" />
          <span id="exit-overlay-title" className="font-bold text-sm tracking-wide">
            SAÍDA RÁPIDA DE EMERGÊNCIA
          </span>
        </div>

        <p className="text-sm font-semibold mb-1" style={{ color: C.text }}>
          Precisa fechar imediatamente?
        </p>

        <p id="exit-overlay-desc" className="text-xs mb-4 sm:mb-5 leading-relaxed" style={{ color: C.sub }}>
          Ao clicar no botão abaixo, seus dados locais desta sessão serão limpos e você será redirecionada(o) imediatamente para uma página neutra.
        </p>

        <button
          ref={exitBtnRef}
          onClick={handleFastExit}
          aria-label="Sair imediatamente e redirecionar para página neutra"
          className="w-full py-3 rounded-lg font-bold text-sm mb-3 focus:outline-none focus-visible:ring-2 min-h-[44px] transition-transform active:scale-[0.98]"
          style={{ background: C.red, color: "#fff" }}
        >
          SAIR AGORA (ESC)
        </button>

        <p className="text-[11px] text-center" style={{ color: C.sub }}>
          Você será direcionada(o) para o Google sem salvar rastros no histórico recente.
        </p>
      </Panel>
    </div>
  );
}
