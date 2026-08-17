import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, ChapterSubtitle, ProgressBar, Panel, PrimaryButton } from "../components/ui";
import { useTypedMessages } from "../hooks/useTypedMessages";
import { ChatShell } from "./ChatShell";
import { CHAPTER4 } from "../data";

export function Chapter4({ onDone, onExit }) {
  const { visible, typing } = useTypedMessages(CHAPTER4.messages, "cap4");
  const allShown = visible >= CHAPTER4.messages.length;
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      <ScreenHeader title="Capítulo 4/5" onBack={onExit} right={<div className="w-24"><ProgressBar value={allShown ? 4 : 3} max={5} /></div>} />
      <ChapterSubtitle>{CHAPTER4.title}</ChapterSubtitle>
      <div className="sm:hidden mb-4"><ProgressBar value={allShown ? 4 : 3} max={5} /></div>
      <ChatShell transition={CHAPTER4.transition} messages={CHAPTER4.messages} visibleMsgs={visible} typing={typing}>
        {allShown && !revealed && (
          <PrimaryButton onClick={() => setRevealed(true)} className="w-full max-w-xl">ANALISAR PADRÃO</PrimaryButton>
        )}
        {allShown && revealed && (
          <Panel className="p-4 sm:p-5 w-full max-w-xl">
            <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: C.lilac }}>PADRÃO DETECTADO</p>
            <div className="flex flex-wrap items-center gap-2 mb-5 text-xs font-semibold" style={{ color: C.text }}>
              <span className="px-2 py-1 rounded" style={{ background: rgba(C.lilac, 0.15) }}>Controle</span>
              <ChevronRight size={12} style={{ color: C.sub }} aria-hidden="true" />
              <span className="px-2 py-1 rounded" style={{ background: rgba(C.lilac, 0.15) }}>Isolamento</span>
              <ChevronRight size={12} style={{ color: C.sub }} aria-hidden="true" />
              <span className="px-2 py-1 rounded" style={{ background: rgba(C.red, 0.15), color: C.red }}>Agressividade</span>
              <ChevronRight size={12} style={{ color: C.sub }} aria-hidden="true" />
              <span className="px-2 py-1 rounded" style={{ background: rgba(C.lilac, 0.15) }}>Pedido de desculpas</span>
            </div>
            <p className="text-[11px] font-bold tracking-widest mb-3" style={{ color: C.lilac }}>CICLO DA VIOLÊNCIA</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-semibold mb-4" style={{ color: C.text }}>
              <div className="p-2 rounded-lg" style={{ background: C.panel2 }}>TENSÃO</div>
              <div className="p-2 rounded-lg" style={{ background: rgba(C.red, 0.15), color: C.red }}>AGRESSÃO</div>
              <div className="p-2 rounded-lg" style={{ background: C.panel2 }}>RECONCILIAÇÃO</div>
              <div className="p-2 rounded-lg" style={{ background: C.panel2 }}>NOVO CICLO</div>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: C.sub }}>
              Esse padrão tende a se repetir e se intensificar com o tempo. Quebrar objetos durante uma briga também é reconhecido como violência patrimonial.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: rgba(C.lilac, 0.15), color: C.text }}>Violência Psicológica</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: rgba(C.lilac, 0.15), color: C.text }}>Violência Patrimonial</span>
            </div>
            <PrimaryButton onClick={onDone} className="w-full">CONTINUAR</PrimaryButton>
          </Panel>
        )}
      </ChatShell>
    </div>
  );
}
