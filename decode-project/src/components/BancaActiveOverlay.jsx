import { useEffect, useRef, useState } from "react";
import { Play, Square, ChevronRight, Clock, SkipForward } from "lucide-react";
import { C, rgba } from "../theme";
import { PrimaryButton, GhostButton } from "../components/ui";

export const BANCASCRIPT = [
  { n: 1, title: "Landing", target: "landing", seconds: 25, why: "Glitch + tagline + 'O bug está no sistema'." },
  { n: 2, title: "Caso Sofia — Cap 1 → 2", target: "sofia-1-2", seconds: 75, why: "Mostrar escolha + PatternReveal. Dois capítulos de uma vez." },
  { n: 3, title: "Caso Marcos — Cap 1 (stalking)", target: "marcos-1", seconds: 60, why: "Diferenciar: o ciclo começa antes do namoro ou após o término." },
  { n: 4, title: "Triagem Rápida", target: "triagem", seconds: 60, why: "Mini-game: a banca vê 3 rodadas e a animação de acerto/erro." },
  { n: 5, title: "Linha do Tempo", target: "timeline", seconds: 60, why: "Reordenar 6 eventos + análise da escalada." },
  { n: 6, title: "DataLab", target: "datalab", seconds: 60, why: "Gráficos SVG e fonte oficial. O dado fecha a narrativa." },
  { n: 7, title: "Escudo + 180", target: "shield", seconds: 30, why: "Encerrar com o canal de proteção: ligue 180." },
];

export function BancaActiveOverlay({ running, setRunning, go, onPlaySofia, onPlayMarcos, stepIdx, setStepIdx }) {
  const [remaining, setRemaining] = useState(0);
  const tickRef = useRef(null);
  const timeoutRef = useRef(null);

  const advance = (idx) => {
    const step = BANCASCRIPT[idx];
    if (!step) {
      setRunning(false);
      return;
    }
    if (step.target === "sofia-1-2") {
      onPlaySofia();
    } else if (step.target === "marcos-1") {
      onPlayMarcos();
    } else {
      go(step.target);
    }
    setRemaining(step.seconds);
  };

  // When stepIdx changes (e.g. from jump) or we start running
  useEffect(() => {
    if (!running) return;
    advance(stepIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, running]);

  // Tick the timer
  useEffect(() => {
    if (!running) return;
    tickRef.current = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => {
      clearInterval(tickRef.current);
    };
  }, [running]);

  // Auto-advance when remaining hits 0
  useEffect(() => {
    if (!running) return;
    if (remaining > 0) return;
    timeoutRef.current = setTimeout(() => {
      if (stepIdx + 1 < BANCASCRIPT.length) {
        setStepIdx((i) => i + 1);
      } else {
        setRunning(false); // End of script
      }
    }, 0);
    return () => clearTimeout(timeoutRef.current);
  }, [remaining, running, stepIdx, setStepIdx, setRunning]);

  if (!running) return null;

  const current = BANCASCRIPT[Math.min(stepIdx, BANCASCRIPT.length - 1)];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 pointer-events-none flex justify-center"
    >
      <div
        className="bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 shadow-2xl flex items-center gap-4 pointer-events-auto max-w-3xl w-full"
        style={{ borderColor: rgba(C.lilac, 0.4) }}
      >
        <div className="shrink-0">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
            style={{ background: C.lilac, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {current.n}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-white truncate">{current.title}</p>
            <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded bg-white/10 text-white/70">
              <Clock size={10} className="inline -mt-0.5 mr-1" />
              {String(Math.floor(remaining / 60)).padStart(2, "0")}:{String(remaining % 60).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs text-white/60 truncate mt-0.5">{current.why}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setStepIdx(i => i + 1 < BANCASCRIPT.length ? i + 1 : i)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
            title="Pular Passo"
          >
            <SkipForward size={16} />
          </button>
          <button
            onClick={() => setRunning(false)}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            title="Parar Roteiro"
          >
            <Square size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
