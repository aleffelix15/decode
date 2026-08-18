import { useEffect, useRef, useState } from "react";
import { Play, Square, ChevronRight, Clock, SkipForward, Sparkles } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel, PrimaryButton, GhostButton } from "../components/ui";
import { SectionEyebrow } from "../components/SectionEyebrow";

/* Guided tour for the day-of-presentation. Each step is a `go(target)`
   with a recommended dwell time (seconds). The user can press "Iniciar
   roteiro" and the app will walk through each step automatically,
   or click any step manually. Timer cancels on unmount or stop. */
const SCRIPT = [
  { n: 1, title: "Landing", target: "landing", seconds: 25, why: "Glitch + tagline + 'O bug está no sistema'." },
  { n: 2, title: "Caso Sofia — Cap 1 → 2", target: "sofia-1-2", seconds: 75, why: "Mostrar escolha + PatternReveal. Dois capítulos de uma vez." },
  { n: 3, title: "Caso Marcos — Cap 1 (stalking)", target: "marcos-1", seconds: 60, why: "Diferenciar: o ciclo começa antes do namoro ou após o término." },
  { n: 4, title: "Triagem Rápida", target: "triagem", seconds: 60, why: "Mini-game: a banca vê 3 rodadas e a animação de acerto/erro." },
  { n: 5, title: "Linha do Tempo", target: "timeline", seconds: 60, why: "Reordenar 6 eventos + análise da escalada." },
  { n: 6, title: "DataLab", target: "datalab", seconds: 60, why: "Gráficos SVG e fonte oficial. O dado fecha a narrativa." },
  { n: 7, title: "Escudo + 180", target: "shield", seconds: 30, why: "Encerrar com o canal de proteção: ligue 180." },
];

export function BancaModeScreen({ go, running, setRunning }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [remaining, setRemaining] = useState(SCRIPT[0].seconds);
  const tickRef = useRef(null);
  const timeoutRef = useRef(null);

  const advance = (idx) => {
    const step = SCRIPT[idx];
    if (!step) {
      setRunning(false);
      return;
    }
    if (step.target === "sofia-1-2") {
      // Open Sofia cap 1; user can press next to continue to cap 2.
      go("dashboard");
      setTimeout(() => go("game"), 50);
    } else if (step.target === "marcos-1") {
      go("dashboard");
      setTimeout(() => go("marcos-open"), 50);
    } else {
      go(step.target);
    }
    setRemaining(step.seconds);
  };

  useEffect(() => {
    if (!running) return;
    advance(stepIdx);
    tickRef.current = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => {
      clearInterval(tickRef.current);
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, stepIdx]);

  useEffect(() => {
    if (!running) return;
    if (remaining > 0) return;
    // Auto-advance to next step
    timeoutRef.current = setTimeout(() => {
      setStepIdx((i) => (i + 1 < SCRIPT.length ? i + 1 : SCRIPT.length - 1));
    }, 0);
    return () => clearTimeout(timeoutRef.current);
  }, [remaining, running]);

  const start = () => {
    setStepIdx(0);
    setRunning(true);
  };
  const stop = () => {
    setRunning(false);
    setStepIdx(0);
    setRemaining(SCRIPT[0].seconds);
  };
  const skip = () => {
    if (stepIdx + 1 < SCRIPT.length) setStepIdx(stepIdx + 1);
    else stop();
  };
  const jump = (i) => {
    setStepIdx(i);
    if (running) {
      setRemaining(SCRIPT[i].seconds);
    } else {
      // manual jump: go to the target immediately
      const step = SCRIPT[i];
      if (step.target === "sofia-1-2") {
        go("levels");
      } else if (step.target === "marcos-1") {
        go("levels");
      } else {
        go(step.target);
      }
    }
  };

  const current = SCRIPT[Math.min(stepIdx, SCRIPT.length - 1)];

  return (
    <div>
      <ScreenHeader title="Modo Banca" />
      <div className="mb-3">
        <SectionEyebrow accent>DECODE // ROTEIRO DE APRESENTAÇÃO</SectionEyebrow>
      </div>
      <p className="text-sm mb-5 sm:mb-6 leading-relaxed max-w-2xl" style={{ color: C.sub }}>
        Tour guiado de ~5 min para o dia da banca. Cada passo tem tempo sugerido. Você pode iniciar o roteiro automático ou pular manualmente para qualquer passo.
      </p>

      <Panel className="p-4 sm:p-5 mb-5 sm:mb-6" style={{ borderColor: rgba(C.lilac, 0.5) }}>
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div>
            <p className="text-[10px] sm:text-[11px] font-bold tracking-widest" style={{ color: C.lilac }}>PASSO ATUAL</p>
            <p className="font-bold text-base sm:text-lg mt-0.5" style={{ color: C.text }}>
              {current.n}. {current.title}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-lg font-black text-sm sm:text-base"
            style={{
              background: rgba(C.lilac, 0.15),
              color: C.lilac,
              fontFamily: "'IBM Plex Mono', monospace",
              minWidth: "5.5rem",
              textAlign: "center",
            }}
            aria-label={`Tempo restante: ${remaining} segundos`}
          >
            <Clock size={12} aria-hidden="true" className="inline -mt-0.5 mr-1" />
            {String(Math.floor(remaining / 60)).padStart(2, "0")}:{String(remaining % 60).padStart(2, "0")}
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: C.sub }}>{current.why}</p>
        <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
          {!running ? (
            <PrimaryButton onClick={start} className="flex items-center gap-1.5">
              <Play size={12} aria-hidden="true" /> INICIAR ROTEIRO
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={stop} className="flex items-center gap-1.5" >
              <Square size={12} aria-hidden="true" /> PARAR
            </PrimaryButton>
          )}
          <GhostButton onClick={skip} className="flex items-center gap-1.5">
            <SkipForward size={12} aria-hidden="true" /> PULAR PASSO
          </GhostButton>
        </div>
      </Panel>

      <p className="text-xs font-bold tracking-widest mb-3" style={{ color: C.sub }}>ROTEIRO COMPLETO</p>
      <ol className="flex flex-col gap-2 max-w-2xl">
        {SCRIPT.map((s, i) => {
          const active = i === stepIdx;
          return (
            <li key={s.n}>
              <button
                onClick={() => jump(i)}
                className="w-full text-left p-3 sm:p-3.5 rounded-xl border decode-card focus:outline-none focus-visible:ring-2"
                style={{
                  background: active ? rgba(C.lilac, 0.1) : C.panel2,
                  borderColor: active ? rgba(C.lilac, 0.55) : C.line,
                }}
                aria-current={active ? "step" : undefined}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: active ? C.lilac : rgba(C.lilac, 0.15),
                      color: active ? "#fff" : C.lilac,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="font-bold text-sm" style={{ color: C.text }}>{s.title}</p>
                      <span className="text-[10px] font-bold tracking-widest" style={{ color: C.sub }}>
                        ~{s.seconds}s
                      </span>
                    </div>
                    <p className="text-xs leading-snug mt-0.5" style={{ color: C.sub }}>{s.why}</p>
                  </div>
                  <ChevronRight size={14} style={{ color: active ? C.lilac : C.sub }} className="shrink-0 mt-1" aria-hidden="true" />
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <Panel className="p-4 sm:p-5 mt-6 sm:mt-8 max-w-2xl" style={{ borderColor: rgba(C.amber, 0.4) }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} style={{ color: C.amber }} aria-hidden="true" />
          <p className="text-xs font-bold tracking-widest" style={{ color: C.amber }}>DICA DE OURO</p>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
          Comece pela Landing e pelo Glitch — eles criam o "uau" inicial. Feche com o Escudo: a banca lembra do canal 180, não do app.
        </p>
      </Panel>
    </div>
  );
}
