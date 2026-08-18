import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, CheckCircle2, AlertTriangle, Eye } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel, PrimaryButton, GhostButton } from "../components/ui";
import { TIMELINE_EVENTS, TIMELINE_INSIGHT } from "../data";

const KIND_LABEL = {
  showup: "Aparição",
  contact: "Contato",
  gift: "Presente",
  apology: "Desculpa",
  threat: "Ameaça",
  monitoring: "Monitoramento",
};
const KIND_COLOR = {
  showup: C.amber,
  contact: C.lilac,
  gift: C.lilacBright,
  apology: C.amber,
  threat: C.red,
  monitoring: C.red,
};

/* Sort 6 post-breakup events chronologically. We pre-shuffle on mount
   so the user has something to do. Moves are +/- via onClick buttons
   (no drag library); reveal compares the user's order to the source
   order and marks each card green (correct) or amber (out of place). */
export function TimelineGame() {
  const source = TIMELINE_EVENTS;
  const [order, setOrder] = useState(() => {
    // deterministic shuffle (LCG) so re-mounts in strict mode don't reshuffle
    const a = source.map((_, i) => i);
    let s = 7;
    const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  });
  const [revealed, setRevealed] = useState(false);

  const move = (i, delta) => {
    if (revealed) return;
    const j = i + delta;
    if (j < 0 || j >= order.length) return;
    const next = order.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
  };

  const score = useMemo(() => {
    if (!revealed) return 0;
    return order.reduce((acc, srcIdx, pos) => {
      const event = source[srcIdx];
      return acc + (event.day === source[pos].day ? 1 : 0);
    }, 0);
  }, [revealed, order, source]);

  return (
    <div className="max-w-2xl w-full">
      <p className="text-xs leading-relaxed mb-3 sm:mb-4" style={{ color: C.sub }}>
        Estes 6 eventos aconteceram após o término de Camila. Ordene-os do mais antigo (topo) para o mais recente (final). Depois, analise a escalada.
      </p>

      <ol className="flex flex-col gap-2 sm:gap-2.5">
        {order.map((srcIdx, pos) => {
          const ev = source[srcIdx];
          const isHere = revealed && ev.day === source[pos].day;
          const kindColor = KIND_COLOR[ev.kind] || C.lilac;
          return (
            <li
              key={ev.id}
              className="p-3 sm:p-3.5 rounded-xl border decode-card"
              style={{
                background: revealed
                  ? isHere
                    ? rgba(C.green, 0.08)
                    : rgba(C.amber, 0.08)
                  : C.panel2,
                borderColor: revealed
                  ? isHere
                    ? rgba(C.green, 0.45)
                    : rgba(C.amber, 0.45)
                  : C.line,
              }}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="shrink-0 flex flex-col gap-1"
                  aria-label="Mover evento"
                >
                  <button
                    onClick={() => move(pos, -1)}
                    disabled={pos === 0 || revealed}
                    aria-label="Mover para cima"
                    className="p-1.5 rounded border focus:outline-none focus-visible:ring-2 min-h-[28px] min-w-[28px] flex items-center justify-center disabled:opacity-30"
                    style={{ borderColor: C.line, color: C.text, background: C.panel }}
                  >
                    <ArrowUp size={12} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => move(pos, 1)}
                    disabled={pos === order.length - 1 || revealed}
                    aria-label="Mover para baixo"
                    className="p-1.5 rounded border focus:outline-none focus-visible:ring-2 min-h-[28px] min-w-[28px] flex items-center justify-center disabled:opacity-30"
                    style={{ borderColor: C.line, color: C.text, background: C.panel }}
                  >
                    <ArrowDown size={12} aria-hidden="true" />
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded"
                      style={{ background: rgba(kindColor, 0.15), color: kindColor }}
                    >
                      {KIND_LABEL[ev.kind] || ev.kind.toUpperCase()}
                    </span>
                    {revealed && (
                      <span
                        className="text-[10px] font-bold tracking-widest inline-flex items-center gap-1"
                        style={{ color: isHere ? C.green : C.amber }}
                      >
                        {isHere ? <CheckCircle2 size={11} aria-hidden="true" /> : <AlertTriangle size={11} aria-hidden="true" />}
                        DIA {ev.day}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-snug" style={{ color: C.text }}>{ev.text}</p>
                  {revealed && (
                    <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: C.sub }}>
                      {ev.insight}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        {!revealed ? (
          <PrimaryButton onClick={() => setRevealed(true)} className="flex items-center gap-1.5 justify-center">
            <Eye size={12} aria-hidden="true" /> ANALISAR ESCALADA
          </PrimaryButton>
        ) : (
          <>
            <GhostButton onClick={() => { setRevealed(false); }} className="flex items-center gap-1.5 justify-center">
              REORDENAR
            </GhostButton>
            <PrimaryButton onClick={() => { setOrder(source.map((_, i) => i)); setRevealed(false); }} className="flex items-center gap-1.5 justify-center">
              RESETAR
            </PrimaryButton>
          </>
        )}
      </div>

      {revealed && (
        <Panel className="p-4 sm:p-5 mt-5" style={{ borderColor: rgba(C.lilac, 0.5) }}>
          <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.lilac }}>PADRÃO DETECTADO</p>
          <p className="text-sm leading-relaxed" style={{ color: C.text }}>{TIMELINE_INSIGHT}</p>
          <p className="text-[11px] mt-3 font-bold tracking-widest" style={{ color: C.sub }}>
            ACERTOS: {score}/6
          </p>
        </Panel>
      )}
    </div>
  );
}
