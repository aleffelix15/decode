import { useState } from "react";
import { C } from "../theme";
import { ScreenHeader, ChapterSubtitle, ProgressBar, Panel, PrimaryButton } from "../components/ui";
import { useTypedMessages } from "../hooks/useTypedMessages";
import { ChatShell } from "./ChatShell";
import { CHAPTER5 } from "../data";

export function Chapter5({ onDone, onExit }) {
  const { visible, typing } = useTypedMessages(CHAPTER5.messages, "cap5");
  const allShown = visible >= CHAPTER5.messages.length;
  const [checked, setChecked] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (i) => setChecked((c) => ({ ...c, [i]: !c[i] }));

  const handleConfirm = () => {
    const selected = CHAPTER5.checklist.map((item, i) => ({ ...item, i })).filter((it) => checked[it.i]);
    const good = selected.filter((s) => s.good).length;
    const bad = selected.filter((s) => !s.good).length;
    const blamedVictim = !!checked[1]; // "Dizer que a culpa é dela"
    const listened = !!checked[0]; // "Escutar sem julgar"
    setConfirmed(true);
    onDone({ good, bad, manipulacaoDetected: listened && !blamedVictim });
  };

  return (
    <div>
      <ScreenHeader title="Capítulo 5/5" onBack={onExit} right={<div className="w-24"><ProgressBar value={4} max={5} /></div>} />
      <ChapterSubtitle>{CHAPTER5.title}</ChapterSubtitle>
      <div className="sm:hidden mb-4"><ProgressBar value={4} max={5} /></div>
      <ChatShell transition={null} messages={CHAPTER5.messages} visibleMsgs={visible} typing={typing}>
        {allShown && !confirmed && (
          <Panel className="p-3.5 sm:p-4 w-full max-w-xl">
            <p className="font-bold text-sm mb-1 tracking-wide leading-snug" style={{ color: C.text }}>{CHAPTER5.question}</p>
            <p className="text-xs mb-3" style={{ color: C.sub }}>Selecione todas as atitudes que você considera adequadas.</p>
            <div className="flex flex-col gap-2 mb-4">
              {CHAPTER5.checklist.map((item, i) => (
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
