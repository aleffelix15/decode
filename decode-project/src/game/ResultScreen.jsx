import { CheckCircle2, Radio, FileWarning, Lock, BarChart3, Smartphone } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel, ProgressBar, GhostButton, PrimaryButton, ModuleTile } from "../components/ui";
import { PROFILES, REPORT_CONCEPTS } from "../data";

export function ResultScreen({ detected, profileId, onModule, onDashboard }) {
  const profile = PROFILES[profileId];
  const profileColor = C[profile.color] || C.lilac;
  return (
    <div className="max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: C.lilac }}># SEU DECODE</p>
        <p className="text-sm" style={{ color: C.sub }}>Durante a história, você identificou:</p>
      </div>

      <Panel className="p-5 mb-6">
        <div className="grid sm:grid-cols-2 gap-3">
          {REPORT_CONCEPTS.map((c) => {
            const on = detected.has(c.id);
            return (
              <div key={c.id} className="flex items-center gap-2 text-sm" style={{ color: on ? C.text : C.sub }}>
                {on ? <CheckCircle2 size={16} style={{ color: C.green }} aria-hidden="true" /> : <span className="w-4 h-4 shrink-0" />}
                <span>{c.label}</span>
                {!on && <span className="text-[11px] ml-auto" style={{ color: C.sub }}>você pode aprender mais sobre isso</span>}
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-5 mb-6 text-center" style={{ borderColor: rgba(profileColor, 0.4) }}>
        <p className="text-[11px] font-bold tracking-widest mb-2" style={{ color: profileColor }}>{profile.title}</p>
        <p className="text-sm leading-relaxed" style={{ color: C.text }}>{profile.text}</p>
      </Panel>

      <div className="text-center mb-8">
        <p className="text-sm leading-relaxed" style={{ color: C.text }}>
          "Você não precisava salvar Sofia.<br />Você precisava estar ao lado dela."
        </p>
        <p className="text-xs mt-3" style={{ color: C.sub }}>A prevenção começa quando conseguimos reconhecer os sinais.</p>
        <p className="mt-5 font-black tracking-tight" style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}># SISTEMA DECODED</p>
        <div className="max-w-xs mx-auto mt-2"><ProgressBar value={100} max={100} color={C.green} label="História concluída" /></div>
      </div>

      <p className="text-xs font-bold tracking-widest mb-3 text-center" style={{ color: C.sub }}>QUER CONTINUAR DECODIFICANDO?</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <ModuleTile icon={Smartphone} title="Arquivos Recuperados" desc="Analise uma conversa real, trecho por trecho" onClick={() => onModule("recovered")} />
        <ModuleTile icon={Radio} title="O Algoritmo" desc="Como conteúdos podem normalizar comportamentos tóxicos" onClick={() => onModule("algorithm")} />
        <ModuleTile icon={FileWarning} title="Arquivos Ocultos" desc="Violências que muitas vezes passam despercebidas" onClick={() => onModule("hiddenfiles")} />
        <ModuleTile icon={Lock} title="Firewall" desc="Seus direitos e as leis de proteção" onClick={() => onModule("firewall")} />
        <ModuleTile icon={BarChart3} title="Relatório" desc="Os dados por trás do problema" onClick={() => onModule("data")} />
      </div>
      <div className="flex justify-center gap-3">
        <GhostButton onClick={onDashboard}>VOLTAR AO SISTEMA</GhostButton>
        <PrimaryButton onClick={() => onModule("shield")}>VER ESCUDO</PrimaryButton>
      </div>
    </div>
  );
}
