import { Play, Square, ChevronRight, Sparkles } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel, PrimaryButton } from "../components/ui";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { BANCASCRIPT } from "../components/BancaActiveOverlay";

export function BancaModeScreen({ running, setRunning, stepIdx, setStepIdx, go, onPlaySofia, onPlayMarcos }) {
  const start = () => {
    setStepIdx(0);
    setRunning(true);
  };
  const stop = () => {
    setRunning(false);
    setStepIdx(0);
  };
  const jump = (i) => {
    setStepIdx(i);
    if (!running) {
      // manual jump: go to the target immediately without starting the full script
      const step = BANCASCRIPT[i];
      if (step.target === "sofia-1-2") {
        onPlaySofia();
      } else if (step.target === "marcos-1") {
        onPlayMarcos();
      } else {
        go(step.target);
      }
    }
  };

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
        <p className="text-xs leading-relaxed mb-4" style={{ color: C.sub }}>
          Ao iniciar, um controlador flutuante aparecerá na parte inferior da tela, guiando você pelos passos e cronometrando o tempo automaticamente.
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {!running ? (
            <PrimaryButton onClick={start} className="flex items-center gap-1.5">
              <Play size={12} aria-hidden="true" /> INICIAR ROTEIRO
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={stop} className="flex items-center gap-1.5" >
              <Square size={12} aria-hidden="true" /> PARAR
            </PrimaryButton>
          )}
        </div>
      </Panel>

      <p className="text-xs font-bold tracking-widest mb-3" style={{ color: C.sub }}>ROTEIRO COMPLETO</p>
      <ol className="flex flex-col gap-2 max-w-2xl">
        {BANCASCRIPT.map((s, i) => {
          const active = running && i === stepIdx;
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
