import { CheckCircle2, Radio, FileWarning, Lock, BarChart3, Smartphone, Zap, Clock, Crosshair } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel, ProgressBar, GhostButton, PrimaryButton, ModuleTile } from "../components/ui";
import { PROFILES, PROFILES_B, REPORT_CONCEPTS } from "../data";

export function ResultScreen({ detected, profileId, onModule, onDashboard, concepts = REPORT_CONCEPTS, title = "# SEU DECODE" }) {
  const isB = concepts !== REPORT_CONCEPTS;
  const profiles = isB ? PROFILES_B : PROFILES;
  const profile = profiles[profileId] || profiles.alerta || profiles.apoio;
  const profileColor = C[profile.color] || C.lilac;
  return (
    <div className="max-w-2xl w-full">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mb-2" style={{ color: C.lilac }}>{title}</p>
        <p className="text-sm" style={{ color: C.sub }}>Durante a história, você identificou:</p>
      </div>

      <Panel className="p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
          {concepts.map((c) => {
            const on = detected.has(c.id);
            return (
              <div key={c.id} className="flex items-center gap-2 text-sm break-words" style={{ color: on ? C.text : C.sub }}>
                {on ? <CheckCircle2 size={16} style={{ color: C.green }} className="shrink-0" aria-hidden="true" /> : <span className="w-4 h-4 shrink-0" />}
                <span className="flex-1 min-w-0">{c.label}</span>
                {!on && <span className="hidden sm:inline text-[10px] ml-auto shrink-0" style={{ color: C.sub }}>você pode aprender mais sobre isso</span>}
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-4 sm:p-5 mb-5 sm:mb-6 text-center" style={{ borderColor: rgba(profileColor, 0.4) }}>
        <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mb-2" style={{ color: profileColor }}>{profile.title}</p>
        <p className="text-sm leading-relaxed" style={{ color: C.text }}>{profile.text}</p>
      </Panel>

      <div className="text-center mb-6 sm:mb-8">
        <p className="text-sm leading-relaxed" style={{ color: C.text }}>
          {isB
            ? '"Você não precisava salvar Camila.\nVocê precisava estar ao lado dela e guardar as provas."'
            : '"Você não precisava salvar Sofia.\nVocê precisava estar ao lado dela."'}
        </p>
        <p className="text-xs mt-3" style={{ color: C.sub }}>A prevenção começa quando conseguimos reconhecer os sinais.</p>
        <p className="mt-4 sm:mt-5 font-black tracking-tight text-lg sm:text-xl" style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}># SISTEMA DECODED</p>
        <div className="max-w-xs mx-auto mt-2"><ProgressBar value={100} max={100} color={C.green} label="História concluída" /></div>
      </div>

      <p className="text-xs font-bold tracking-widest mb-3 text-center" style={{ color: C.sub }}>QUER CONTINUAR DECODIFICANDO?</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
        <ModuleTile icon={Smartphone} title="Arquivos Recuperados" desc="Analise conversas reais, trecho por trecho" onClick={() => onModule("recovered")} />
        <ModuleTile icon={Zap} title="Triagem Rápida" desc="Treine o olhar: ok, alerta ou contexto?" onClick={() => onModule("triagem")} />
        <ModuleTile icon={Clock} title="Linha do Tempo" desc="Ordene os eventos do pós-término" onClick={() => onModule("timeline")} />
        <ModuleTile icon={Crosshair} title="O Algoritmo" desc="Quando o feed vira tóxico" onClick={() => onModule("algorithm")} />
        <ModuleTile icon={FileWarning} title="Arquivos Ocultos" desc="Frases do cotidiano decodificadas" onClick={() => onModule("hiddenfiles")} />
        <ModuleTile icon={Lock} title="Firewall" desc="Leis de proteção e seus direitos" onClick={() => onModule("firewall")} />
        <ModuleTile icon={BarChart3} title="DataLab" desc="Os dados por trás do problema" onClick={() => onModule("datalab")} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3">
        <GhostButton onClick={onDashboard}>VOLTAR AO SISTEMA</GhostButton>
        <PrimaryButton onClick={() => onModule("shield")}>VER ESCUDO</PrimaryButton>
      </div>
    </div>
  );
}
