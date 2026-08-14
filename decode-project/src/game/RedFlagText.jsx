import { useState } from "react";
import { ScanLine, CheckCircle2 } from "lucide-react";
import { C, rgba } from "../theme";
import { INSIGHT_BY_ID } from "../data";

/* Renderiza um fragmento de conversa recuperado. Mensagens com `flag`
   ficam clicáveis: ao clicar, revela o conceito (sem dizer "certo/errado")
   e chama onDiscover(conceptId) para registrar a pista descoberta. */
export function RedFlagText({ fragment, onDiscover }) {
  const [revealing, setRevealing] = useState(null); // id da mensagem em animação
  const [revealed, setRevealed] = useState({}); // { [messageId]: true }

  const handleClick = (msg) => {
    if (!msg.flag || revealed[msg.id]) return;
    setRevealing(msg.id);
    window.setTimeout(() => {
      setRevealed((r) => ({ ...r, [msg.id]: true }));
      setRevealing(null);
      onDiscover(msg.flag);
    }, 550);
  };

  return (
    <div className="rounded-2xl border p-4" style={{ background: C.panel, borderColor: C.line }}>
      <p className="text-[11px] tracking-widest mb-4" style={{ color: C.sub }}>
        {fragment.title}
      </p>

      <div className="flex flex-col gap-2">
        {fragment.messages.map((msg) => {
          const concept = msg.flag ? INSIGHT_BY_ID[msg.flag] : null;
          const isAna = msg.from === "Ana";
          const clickable = !!msg.flag;
          const isRevealed = revealed[msg.id];
          const isRevealing = revealing === msg.id;

          return (
            <div key={msg.id} className="flex flex-col">
              <div
                className="self-start max-w-[90%] sm:max-w-[80%] px-3 py-2 rounded-xl rounded-tl-sm text-sm"
                style={{ background: isAna ? C.panel2 : rgba(C.lilac, 0.12), color: C.text }}
              >
                <span className="block text-[10px] font-bold tracking-widest mb-1" style={{ color: C.sub }}>
                  {msg.from.toUpperCase()}
                </span>
                {clickable ? (
                  <button
                    onClick={() => handleClick(msg)}
                    disabled={isRevealed}
                    aria-label={isRevealed ? `Sinal descriptografado: ${concept.title}` : "Analisar trecho"}
                    className="text-left underline decoration-dashed underline-offset-4 focus:outline-none focus-visible:ring-2 disabled:no-underline"
                    style={{
                      color: isRevealed ? C.lilac : C.text,
                      textDecorationColor: isRevealed ? C.lilac : rgba(C.lilac, 0.6),
                      cursor: isRevealed ? "default" : "pointer",
                    }}
                  >
                    {msg.text}
                  </button>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

              {isRevealing && (
                <div
                  className="self-start mt-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest animate-pulse"
                  style={{ color: C.lilac, background: rgba(C.lilac, 0.1) }}
                  role="status"
                  aria-live="polite"
                >
                  <ScanLine size={12} className="inline mr-1.5" style={{ verticalAlign: "-2px" }} aria-hidden="true" />
                  DECRYPTING...
                </div>
              )}

              {isRevealed && concept && (
                <div
                  className="self-start mt-1.5 max-w-[90%] sm:max-w-[80%] px-3 py-2.5 rounded-lg"
                  style={{ background: rgba(C.green, 0.08), border: `1px solid ${rgba(C.green, 0.3)}` }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 size={13} style={{ color: C.green }} aria-hidden="true" />
                    <span className="text-[10px] font-bold tracking-widest" style={{ color: C.green }}>
                      SINAL DESCRIPTOGRAFADO
                    </span>
                  </div>
                  <p className="text-xs font-bold mb-1" style={{ color: C.text }}>{concept.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: C.sub }}>{concept.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] mt-4" style={{ color: C.sub }}>
        Toque nas mensagens sublinhadas para analisar o trecho.
      </p>
    </div>
  );
}
