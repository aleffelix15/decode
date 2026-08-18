import { useState } from "react";
import { C } from "../theme";
import { ScreenHeader, ChapterSubtitle, ProgressBar, Panel, PrimaryButton } from "../components/ui";
import { useTypedMessages } from "../hooks/useTypedMessages";
import { ChatShell } from "./ChatShell";
import { CHAPTERS_B } from "../data";

/* Marcos chapter 5 — final checklist: which of these moves break the
   cycle, and which put the victim back in danger. Same shape as
   Sofia's cap 5, but keyed to the threats encountered in this case. */
export function MarcosChapter5({ onDone, onExit }) {
  const ch = CHAPTERS_B[4];
  const { visible, typing } = useTypedMessages(ch.messages, ch.key);
  const allShown = visible >= ch.messages.length;
  const [checked, setChecked] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const handleConfirm = () => {
    const selected = ch.checklist.map((item, i) => ({ ...item, i })).filter((it) => checked[it.i]);
    const good = selected.filter((s) => s.good).length;
    const bad = selected.filter((s) => !s.good).length;
    const enabledAllGood = selected.every((s) => s.good) && selected.length >= 4;
    setConfirmed(true);
    onDone({ good, bad, manipulacaoDetected: enabledAllGood });
  };

  return (
    <div>
      <ScreenHeader title="Capítulo 5/5" onBack={onExit} right={<div className="w-24"><ProgressBar value={4} max={5} /></div>} />
      <ChapterSubtitle>{ch.title}</ChapterSubtitle>
      <div className="sm:hidden mb-4"><ProgressBar value={4} max={5} /></div>
      <ChatShell transition={null} messages={ch.messages} visibleMsgs={visible} typing={typing} name="Camila" initial="C">
        {allShown && !confirmed && (
          <Panel className="p-3.5 sm:p-4 w-full max-w-xl">
            <p className="font-bold text-sm mb-1 tracking-wide leading-snug" style={{ color: C.text }}>{ch.question}</p>
            <p className="text-xs mb-3" style={{ color: C.sub }}>Selecione todas as atitudes que você considera adequadas.</p>
            <div className="flex flex-col gap-2 mb-4">
              {ch.checklist.map((item, i) => (
                <label key={i} className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 rounded-lg border text-sm font-medium cursor-pointer break-words" style={{ borderColor: checked[i] ? C.lilac : C.line, background: C.panel2, color: C.text }}>
                  <input type="checkbox" checked={!!checked[i]} onChange={() => toggle(i)} className="w-4 h-4 shrink-0 focus:outline-none focus-visible:ring-2" style={{ accentColor: C.lilac }} />
                  <span className="flex-1 min-w-0">{item.text}</span>
                </label>
              ))}
            </div>
            <PrimaryButton onClick={handleConfirm} className="w-full">CONFIRMAR DECISÃO</PrimaryButton>
          </Panel>
        )}
      </ChatShell>
    </div>
  );
}
