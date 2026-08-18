import { useState, useMemo } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, RotateCcw } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel, ProgressBar, PrimaryButton, GhostButton } from "../components/ui";
import { TRIAGEM_CARDS, TRIAGEM_TRIAGE_OPTIONS } from "../data";

/* Mini-game logic: shuffle the deck on mount, present one card at a
   time with 3 triage options. Hit = green pulse + reason shown; miss
   = red pulse + reason explaining why. After 10 cards, summary. */
export function TriagemGame() {
  const deck = useMemo(() => {
    // Stable shuffle (Fisher–Yates with a simple LCG so re-mounts don't
    // reshuffle mid-game if React strict-mode double-invokes effects).
    const a = [...TRIAGEM_CARDS].slice(0, 10);
    let s = 1234567;
    const rand = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null); // "ok" | "red" | "context"
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]); // { card, picked, correct }
  const [done, setDone] = useState(false);

  const card = deck[i];
  const isCorrect = picked === card.type;

  const handlePick = (val) => {
    if (picked) return;
    setPicked(val);
    const correct = val === card.type;
    if (correct) setScore((s) => s + 1);
    setHistory((h) => [...h, { card, picked: val, correct }]);
  };

  const next = () => {
    if (i + 1 >= deck.length) {
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setHistory([]);
    setDone(false);
  };

  if (done) {
    return (
      <ResultPanel score={score} total={deck.length} history={history} onRestart={restart} />
    );
  }

  return (
    <div className="max-w-xl w-full">
      <ProgressBar value={i} max={deck.length} label={`Rodada ${i + 1} de ${deck.length}`} />
      <p className="text-[11px] mt-1.5 font-bold tracking-widest" style={{ color: C.sub }}>
        RODADA {i + 1}/{deck.length} · ACERTOS: {score}
      </p>

      <Panel
        className="p-4 sm:p-5 mt-3 sm:mt-4"
        style={{
          borderColor: picked
            ? isCorrect
              ? rgba(C.green, 0.55)
              : rgba(C.red, 0.55)
            : C.line,
        }}
      >
        <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mb-3" style={{ color: C.lilac }}>
          RELATO
        </p>
        <p className="text-sm sm:text-base leading-relaxed break-words" style={{ color: C.text }}>
          {card.text}
        </p>
      </Panel>

      <p className="text-[11px] sm:text-xs mt-4 mb-2 font-bold tracking-widest" style={{ color: C.sub }}>
        COMO VOCÊ CLASSIFICA?
      </p>
      <div className="grid sm:grid-cols-3 gap-2 sm:gap-3">
        {TRIAGEM_TRIAGE_OPTIONS.map((opt) => {
          const isPicked = picked === opt.value;
          const isAnswer = card.type === opt.value;
          let bg = C.panel2;
          let border = C.line;
          let color = C.text;
          if (picked) {
            if (isAnswer) { bg = rgba(C.green, 0.16); border = rgba(C.green, 0.5); color = C.green; }
            else if (isPicked) { bg = rgba(C.red, 0.16); border = rgba(C.red, 0.5); color = C.red; }
          }
          return (
            <button
              key={opt.value}
              onClick={() => handlePick(opt.value)}
              disabled={!!picked}
              className="px-3.5 sm:px-4 py-3 rounded-lg border text-sm font-semibold focus:outline-none focus-visible:ring-2 min-h-[48px] break-words"
              style={{ background: bg, borderColor: border, color }}
              aria-pressed={isPicked}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {picked && (
        <div
          className={`mt-4 p-3.5 sm:p-4 rounded-xl border ${isCorrect ? "decode-glow-pulse" : ""}`}
          style={{
            background: rgba(isCorrect ? C.green : C.red, 0.1),
            borderColor: rgba(isCorrect ? C.green : C.red, 0.45),
          }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-1">
            {isCorrect ? (
              <CheckCircle2 size={16} style={{ color: C.green }} aria-hidden="true" />
            ) : (
              <AlertTriangle size={16} style={{ color: C.red }} aria-hidden="true" />
            )}
            <p className="text-xs font-bold tracking-widest" style={{ color: isCorrect ? C.green : C.red }}>
              {isCorrect ? "ACERTOU" : "REVEJA"}
            </p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
            {card.reason}
          </p>
          <PrimaryButton onClick={next} className="mt-3 w-full">
            {i + 1 >= deck.length ? "VER RESULTADO" : "PRÓXIMA"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

function ResultPanel({ score, total, history, onRestart }) {
  const pct = Math.round((score / total) * 100);
  const tone = pct >= 80 ? C.green : pct >= 50 ? C.amber : C.red;
  return (
    <div className="max-w-2xl w-full">
      <Panel className="p-5 sm:p-6 text-center mb-5" style={{ borderColor: rgba(tone, 0.45) }}>
        <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.lilac }}>TRIAGEM CONCLUÍDA</p>
        <p
          className="text-4xl sm:text-5xl font-black"
          style={{ color: tone, fontFamily: "'IBM Plex Mono', monospace", textShadow: `0 0 24px ${rgba(tone, 0.4)}` }}
        >
          {score}/{total}
        </p>
        <p className="text-sm mt-1" style={{ color: C.text }}>
          {pct >= 80
            ? "Olhar afiado. Você enxerga o que passa despercebido."
            : pct >= 50
            ? "Bom caminho. Revise os relatos marcados em vermelho."
            : "Volte e releia. Os sinais estão no padrão, não no evento isolado."}
        </p>
        <p className="text-xs mt-3" style={{ color: C.sub }}>
          Cada padrão ignorado é uma oportunidade perdida. Volte, releia, repita.
        </p>
      </Panel>

      <p className="text-xs font-bold tracking-widest mb-3" style={{ color: C.sub }}>RESUMO DAS RODADAS</p>
      <div className="flex flex-col gap-2 mb-5">
        {history.map((h, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 p-2.5 sm:p-3 rounded-lg border"
            style={{
              background: h.correct ? rgba(C.green, 0.06) : rgba(C.red, 0.06),
              borderColor: h.correct ? rgba(C.green, 0.3) : rgba(C.red, 0.3),
            }}
          >
            {h.correct ? (
              <CheckCircle2 size={14} style={{ color: C.green, marginTop: 2 }} className="shrink-0" aria-hidden="true" />
            ) : (
              <HelpCircle size={14} style={{ color: C.red, marginTop: 2 }} className="shrink-0" aria-hidden="true" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs leading-snug" style={{ color: C.text }}>{h.card.text}</p>
              <p className="text-[10px] mt-0.5" style={{ color: C.sub }}>
                Resposta: {h.card.type === "ok" ? "normal" : h.card.type === "red" ? "alerta" : "depende"} · Você: {h.picked === "ok" ? "normal" : h.picked === "red" ? "alerta" : "depende"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
        <GhostButton onClick={onRestart} className="flex items-center gap-1.5 justify-center">
          <RotateCcw size={12} aria-hidden="true" /> JOGAR DE NOVO
        </GhostButton>
      </div>
    </div>
  );
}
