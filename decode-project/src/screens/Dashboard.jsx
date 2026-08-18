import { MessageCircle, ShieldCheck, Radio, FileWarning, Lock, BarChart3, Smartphone, Zap, Clock } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel, ProgressBar } from "../components/ui";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { ProgressRing } from "../components/ProgressRing";

/* Story entry card — used on the case-select hub. */
export function StoryEntryCard({ tag, title, desc, story, onClick, accent = C.lilac }) {
  return (
    <button onClick={onClick} className="text-left p-4 sm:p-5 rounded-xl border w-full transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 relative overflow-hidden decode-card" style={{ background: C.panel2, borderColor: C.line }}>
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: `radial-gradient(circle at 90% 0%, ${rgba(accent, 0.18)}, transparent 60%)` }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-bold tracking-widest truncate" style={{ color: C.sub }}>{tag}</span>
          <MessageCircle size={16} style={{ color: accent }} className="shrink-0" />
        </div>
        <p className="font-bold text-base leading-snug" style={{ color: C.text }}>{title}</p>
        <p className="text-xs mt-1 mb-4 leading-relaxed" style={{ color: C.sub }}>{desc}</p>
        <ProgressBar value={story.chapter} max={5} color={accent} label={`Progresso ${title}: capítulo ${story.chapter} de 5`} />
        <p className="text-[11px] mt-1.5 font-semibold" style={{ color: C.sub }}>
          {story.finished ? "Concluído — SISTEMA DECODED" : story.chapter === 0 ? "Ainda não iniciado" : `Capítulo ${story.chapter}/5`}
        </p>
      </div>
    </button>
  );
}

export function Dashboard({ storySofia, storyMarcos, unlockedInsights, go, onPlaySofia, onPlayMarcos, onTriagem, onDataLab }) {
  const totalInsights = unlockedInsights.size;
  const totalChapters = (storySofia.finished ? 5 : storySofia.chapter) + (storyMarcos.finished ? 5 : storyMarcos.chapter);
  return (
    <div>
      <ScreenHeader title="" right={null} />
      <div className="mb-6 sm:mb-8">
        <p className="text-lg xs:text-xl sm:text-2xl font-bold leading-tight" style={{ color: C.text }}>Olá, Guardiã(o).</p>
        <p className="text-xs sm:text-sm mt-1" style={{ color: C.sub }}>Cada escolha pode ajudar alguém. Cada padrão, uma chave.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Panel className="p-4 flex items-center gap-4">
          <ProgressRing value={totalChapters} max={10} size={64} stroke={6} label={`${totalChapters} de 10 capítulos jogados`} />
          <div>
            <p className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.sub }}>PROGRESSO</p>
            <p className="font-bold" style={{ color: C.text }}>{totalChapters}/10 capítulos</p>
            <p className="text-[10px] mt-0.5" style={{ color: C.sub }}>2 casos · 5 cada</p>
          </div>
        </Panel>
        <Panel className="p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.sub }}>ESCUDO</p>
            <p className="font-bold" style={{ color: C.text }}>{totalInsights}/11 insights</p>
            <p className="text-[10px] mt-0.5" style={{ color: C.sub }}>6 de Sofia + 5 de Marcos</p>
          </div>
          <ShieldCheck size={28} style={{ color: C.lilac }} aria-hidden="true" />
        </Panel>
      </div>

      <div className="mb-3"><SectionEyebrow accent>DECODE // MÓDULO 01 — JOGAR</SectionEyebrow></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
        <StoryEntryCard
          tag="CASO 01 — A TERCEIRA PESSOA"
          title="SOFIA"
          desc="Acompanhe a história de Sofia e aprenda a perceber os sinais."
          story={storySofia}
          onClick={onPlaySofia}
          accent={C.lilac}
        />
        <StoryEntryCard
          tag="CASO 02 — O SILÊNCIO DEPOIS"
          title="MARCOS"
          desc="Pós-término: stalking, chantagem e ameaça indireta."
          story={storyMarcos}
          onClick={onPlayMarcos}
          accent={C.amber}
        />
      </div>

      <div className="mb-3"><SectionEyebrow color={C.amber} accent>DECODE // MÓDULOS — TREINAR</SectionEyebrow></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
        <ModuleCard icon={Zap} title="Triagem Rápida" desc="10 relatos. Ok, alerta ou contexto?" onClick={onTriagem} accent={C.amber} />
        <ModuleCard icon={Clock} title="Linha do Tempo" desc="Ordene os eventos do pós-término" onClick={() => go("timeline")} accent={C.lilacBright} />
        <ModuleCard icon={Smartphone} title="Arquivos Recuperados" desc="Análise de conversas reais" onClick={() => go("recovered")} accent={C.lilac} />
        <ModuleCard icon={Radio} title="O Algoritmo" desc="Quando o feed vira tóxico" onClick={() => go("algorithm")} accent={C.lilac} />
        <ModuleCard icon={FileWarning} title="Arquivos Ocultos" desc="Frases do cotidiano decodificadas" onClick={() => go("hiddenfiles")} accent={C.lilac} />
        <ModuleCard icon={Lock} title="Firewall" desc="Leis e direitos" onClick={() => go("firewall")} accent={C.lilac} />
      </div>

      <div className="mb-3"><SectionEyebrow color={C.green} accent>DECODE // MÓDULO — DADOS</SectionEyebrow></div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <ModuleCard icon={BarChart3} title="DataLab" desc="Visualizações interativas dos dados" onClick={onDataLab} accent={C.green} />
      </div>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, desc, onClick, accent = C.lilac }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 sm:p-4 rounded-xl border text-left decode-card focus:outline-none focus-visible:ring-2 min-h-[64px] w-full"
      style={{ background: C.panel2, borderColor: C.line }}
    >
      <div
        className="p-1.5 sm:p-2 rounded-lg shrink-0"
        style={{
          background: rgba(accent, 0.15),
          boxShadow: `0 0 12px ${rgba(accent, 0.15)}`,
        }}
      >
        <Icon size={16} className="sm:w-5 sm:h-5" style={{ color: accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-xs xs:text-sm sm:text-sm" style={{ color: C.text }}>{title}</p>
        <p className="text-[11px] xs:text-xs leading-tight" style={{ color: C.sub }}>{desc}</p>
      </div>
    </button>
  );
}
