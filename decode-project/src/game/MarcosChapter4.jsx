import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, ChapterSubtitle, ProgressBar, Panel, PrimaryButton } from "../components/ui";
import { useTypedMessages } from "../hooks/useTypedMessages";
import { ChatShell } from "./ChatShell";
import { CHAPTERS_B } from "../data";

/* Marcos chapter 4 — Chantagem + ameaça indireta. Two patterns unlock
   in one reveal so the screen shows both, mirroring Sofia's cap 4. */
export function MarcosChapter4({ onDone, onExit }) {
  const ch = CHAPTERS_B[3];
  const { visible, typing } = useTypedMessages(ch.messages, ch.key);
  const allShown = visible >= ch.messages.length;
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      <ScreenHeader
        title={`Capítulo ${ch.n}/5`}
        onBack={onExit}
        right={<div className="w-24"><ProgressBar value={allShown ? 4 : 3} max={5} /></div>}
      />
      <ChapterSubtitle>{ch.title}</ChapterSubtitle>
      <div className="sm:hidden mb-4"><ProgressBar value={allShown ? 4 : 3} max={5} /></div>
      <ChatShell transition={ch.transition} messages={ch.messages} visibleMsgs={visible} typing={typing} name="Camila" initial="C">
        {allShown && !revealed && (
          <PrimaryButton onClick={() => setRevealed(true)} className="w-full max-w-xl">ANALISAR PADRÃO</PrimaryButton>
        )}
        {allShown && revealed && (
          <Panel className="p-4 sm:p-5 w-full max-w-xl">
            <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: C.red }}>PADRÃO DETECTADO</p>
            <div className="flex flex-wrap items-center gap-2 mb-5 text-xs font-semibold" style={{ color: C.text }}>
              <span className="px-2 py-1 rounded" style={{ background: rgba(C.red, 0.18), color: C.red }}>Chantagem</span>
              <ChevronRight size={12} style={{ color: C.sub }} aria-hidden="true" />
              <span className="px-2 py-1 rounded" style={{ background: rgba(C.red, 0.18), color: C.red }}>Ameaça</span>
            </div>
            <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: C.lilac }}>CUIDADO</p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: C.sub }}>
              Usar autolesão como argumento para manter alguém por perto é chantagem emocional. Você não é responsável pelas escolhas dele — e isso também é violência psicológica.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: rgba(C.lilac, 0.15), color: C.text }}>Chantagem Emocional</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: rgba(C.lilac, 0.15), color: C.text }}>Ameaça Indireta</span>
            </div>
            <PrimaryButton onClick={onDone} className="w-full">CONTINUAR</PrimaryButton>
          </Panel>
        )}
      </ChatShell>
    </div>
  );
}
