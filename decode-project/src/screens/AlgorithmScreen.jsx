import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel, GhostButton } from "../components/ui";
import { ALGO_FEED, ALGO_TOXIC_START } from "../data";

export function AlgorithmScreen() {
  const [answered, setAnswered] = useState(null);
  return (
    <div>
      <ScreenHeader title="O Algoritmo" />
      <p className="text-sm mb-4" style={{ color: C.sub }}>Role o feed e identifique em que momento o conteúdo deixou de ser inofensivo.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 max-w-sm">
          {ALGO_FEED.map((item, i) => (
            <Panel key={i} className="p-3" style={{ borderColor: item.toxic && answered !== null ? rgba(C.red, 0.5) : C.line }}>
              <p className="text-sm" style={{ color: item.toxic && answered !== null ? C.red : C.text }}>{item.text}</p>
            </Panel>
          ))}
        </div>
        <div>
          <Panel className="p-4">
            <p className="font-bold text-sm mb-3" style={{ color: C.text }}>Em que momento o conteúdo se tornou tóxico?</p>
            {answered === null ? (
              <div className="flex flex-col gap-2">
                {ALGO_FEED.map((item, i) => (
                  <button key={i} onClick={() => setAnswered(i)} className="text-left px-3 py-2 rounded-lg border text-xs font-medium focus:outline-none focus-visible:ring-2" style={{ borderColor: C.line, background: C.panel2, color: C.text }}>
                    Item {i + 1}: "{item.text.slice(0, 28)}..."
                  </button>
                ))}
              </div>
            ) : (
              <div role="status" aria-live="polite">
                <div className="flex items-center gap-2 mb-2" style={{ color: answered === ALGO_TOXIC_START ? C.green : C.red }}>
                  {answered === ALGO_TOXIC_START ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span className="text-sm font-bold">{answered === ALGO_TOXIC_START ? "Você identificou o ponto de virada!" : `A virada real foi no item ${ALGO_TOXIC_START + 1}.`}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
                  Algoritmos podem reforçar conteúdos semelhantes aos que prendem nossa atenção. Pensamento crítico ajuda a reconhecer quando um conteúdo começa a normalizar misoginia ou violência — isso não significa que todo algoritmo automaticamente radicaliza alguém.
                </p>
                <GhostButton onClick={() => setAnswered(null)} className="mt-4">TENTAR DE NOVO</GhostButton>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
