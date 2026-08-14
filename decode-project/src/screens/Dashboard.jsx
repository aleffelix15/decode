import { MessageCircle, ShieldCheck, Radio, FileWarning, Lock, BarChart3, Smartphone } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel, ProgressBar, ModuleTile } from "../components/ui";

export function StoryEntryCard({ story, onClick }) {
  const done = story.finished;
  const chapter = story.chapter; // 0..5
  return (
    <button onClick={onClick} className="text-left p-5 rounded-xl border w-full transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 relative overflow-hidden" style={{ background: C.panel2, borderColor: C.line }}>
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: `radial-gradient(circle at 90% 0%, ${rgba(C.lilac, 0.18)}, transparent 60%)` }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-widest" style={{ color: C.sub }}>JOGO PRINCIPAL</span>
          <MessageCircle size={16} style={{ color: C.lilac }} />
        </div>
        <p className="font-bold text-base leading-snug" style={{ color: C.text }}>A Terceira Pessoa</p>
        <p className="text-xs mt-1 mb-4" style={{ color: C.sub }}>Acompanhe a história de Sofia e aprenda a perceber os sinais.</p>
        <ProgressBar value={chapter} max={5} label={`Progresso da história: capítulo ${chapter} de 5`} />
        <p className="text-[11px] mt-1.5 font-semibold" style={{ color: C.sub }}>
          {done ? "História concluída — SISTEMA DECODED" : chapter === 0 ? "Ainda não iniciado" : `Capítulo ${chapter}/5`}
        </p>
      </div>
    </button>
  );
}

export function Dashboard({ story, unlockedInsights, go, onPlay }) {
  return (
    <div>
      <ScreenHeader title="" right={null} />
      <div className="mb-6 sm:mb-8">
        <p className="text-xl sm:text-2xl font-bold" style={{ color: C.text }}>Olá, Guardiã(o).</p>
        <p className="text-xs sm:text-sm mt-1" style={{ color: C.sub }}>Cada escolha pode ajudar alguém.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Panel className="p-4">
          <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.sub }}>SEU PROGRESSO</p>
          <p className="font-bold mb-2" style={{ color: C.text }}>{story.chapter}/5 capítulos</p>
          <ProgressBar value={story.chapter} max={5} label={`${story.chapter} de 5 capítulos`} />
        </Panel>
        <Panel className="p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.sub }}>ESCUDO DE PROTEÇÃO</p>
            <p className="font-bold" style={{ color: C.text }}>{unlockedInsights.size}/6 insights</p>
          </div>
          <ShieldCheck size={28} style={{ color: C.lilac }} aria-hidden="true" />
        </Panel>
      </div>

      <p className="text-xs font-bold tracking-widest mb-3" style={{ color: C.sub }}>JOGAR</p>
      <div className="max-w-md w-full mb-8">
        <StoryEntryCard story={story} onClick={onPlay} />
      </div>

      <p className="text-xs font-bold tracking-widest mt-8 mb-3" style={{ color: C.sub }}>OUTROS MÓDULOS</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <ModuleTile icon={Smartphone} title="Arquivos Recuperados" desc="Analise uma conversa real, trecho por trecho" onClick={() => go("recovered")} />
        <ModuleTile icon={Radio} title="O Algoritmo" desc="Identifique quando um feed vira tóxico" onClick={() => go("algorithm")} />
        <ModuleTile icon={FileWarning} title="Arquivos Ocultos" desc="Decodifique frases do dia a dia" onClick={() => go("hiddenfiles")} />
        <ModuleTile icon={Lock} title="Firewall" desc="Lei Maria da Penha e proteção" onClick={() => go("firewall")} />
        <ModuleTile icon={BarChart3} title="Relatório de Dados" desc="Por que o sistema precisa mudar" onClick={() => go("data")} />
      </div>
    </div>
  );
}
