import { CheckCircle2, Radio, FileWarning, Lock, BarChart3, Smartphone, Zap, Clock, Crosshair, Star } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel, ProgressBar, GhostButton, PrimaryButton, ModuleTile } from "../components/ui";
import { PROFILES, PROFILES_B, REPORT_CONCEPTS, ENDINGS } from "../data";

/* ------------------------------------------------------------------ */
/* determineEnding — picks an ending based on accumulated metrics      */
/* Called with { awareness, support, risk, good, bad, allPatterns }    */
/* ------------------------------------------------------------------ */
function determineEnding(metrics) {
  if (!metrics) return null;
  const { awareness = 0, support = 0, risk = 0, good = 0, bad = 0, allPatterns = false } = metrics;
  const total = awareness + support;

  // Secret ending — perfect play
  if (allPatterns && total >= 12 && risk === 0 && bad === 0) return ENDINGS.terceiraPessoa;
  // Best ending
  if (total >= 12 && risk <= 1 && bad <= 1) return ENDINGS.decoded;
  // Great ending
  if (total >= 10 && risk <= 2) return ENDINGS.rede;
  // Good ending
  if (total >= 7 && risk <= 3) return ENDINGS.recomeco;
  // Mixed — tried but rushed (low support, some awareness)
  if (awareness >= 4 && support <= 2 && risk >= 3) return ENDINGS.pressa;
  // Mixed — spoke up but inconsistent
  if (total >= 4 && risk <= 4) return ENDINGS.voz;
  // Passive — observed but didn't act
  if (awareness >= 2 && support <= 1) return ENDINGS.silencio;
  // Bad — isolation
  if (risk >= 5 && total <= 4) return ENDINGS.isolamento;
  // Worst — too late
  if (risk >= 4 && total <= 2) return ENDINGS.tardeDemais;
  // Default fallback
  if (total >= 4) return ENDINGS.voz;
  return ENDINGS.silencio;
}

/* ------------------------------------------------------------------ */
/* Backward compatibility: if no metrics, fall back to old profiles    */
/* ------------------------------------------------------------------ */
function getProfile(profileId, isB) {
  const profiles = isB ? PROFILES_B : PROFILES;
  return profiles[profileId] || profiles.alerta || profiles.apoio;
}

export function ResultScreen({ detected, profileId, onModule, onDashboard, concepts = REPORT_CONCEPTS, title = "# SEU DECODE", metrics }) {
  const isB = concepts !== REPORT_CONCEPTS;

  // Try new endings system first, fall back to old profiles
  const ending = metrics ? determineEnding(metrics) : null;
  const profile = ending || getProfile(profileId, isB);
  const profileColor = C[profile.color] || C.lilac;
  const isSecret = ending && ending.secret;

  return (
    <div className="max-w-2xl w-full">
      <div className="text-center mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "50ms", animationFillMode: "both" }}>
        <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mb-2" style={{ color: C.lilac }}>{title}</p>
        <p className="text-sm" style={{ color: C.sub }}>Durante a história, você identificou:</p>
      </div>

      <Panel className="p-4 sm:p-5 mb-5 sm:mb-6 animate-slide-up" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
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

      {/* Ending / Profile card */}
      <Panel className="p-4 sm:p-5 mb-5 sm:mb-6 text-center animate-slide-up" style={{ borderColor: rgba(profileColor, 0.4), animationDelay: "300ms", animationFillMode: "both" }}>
        {ending && (
          <p className="text-[10px] font-bold tracking-widest mb-1" style={{ color: C.sub }}>
            {isSecret ? "★ FINAL SECRETO" : `FINAL ${ending.n} DE 9`}
          </p>
        )}
        <p className="text-[10px] sm:text-[11px] font-bold tracking-widest mb-2" style={{ color: profileColor }}>
          {ending ? ending.title : profile.title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: C.text }}>
          {ending ? ending.text : profile.text}
        </p>
        {isSecret && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <Star size={14} style={{ color: C.amber, fill: C.amber }} />
            <span className="text-[10px] font-bold tracking-widest" style={{ color: C.amber }}>CONQUISTA DESBLOQUEADA</span>
            <Star size={14} style={{ color: C.amber, fill: C.amber }} />
          </div>
        )}
      </Panel>

      <div className="text-center mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "450ms", animationFillMode: "both" }}>
        <p className="text-sm leading-relaxed" style={{ color: C.text }}>
          {isB
            ? '"Você não precisava salvar Camila.\nVocê precisava estar ao lado dela e guardar as provas."'
            : '"Você não precisava salvar Sofia.\nVocê precisava estar ao lado dela."'}
        </p>
        <p className="text-xs mt-3" style={{ color: C.sub }}>A prevenção começa quando conseguimos reconhecer os sinais.</p>
        <p className="mt-4 sm:mt-5 font-black tracking-tight text-lg sm:text-xl" style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}># SISTEMA DECODED</p>
        <div className="max-w-xs mx-auto mt-2"><ProgressBar value={100} max={100} color={C.green} label="História concluída" /></div>
      </div>

      <p className="text-xs font-bold tracking-widest mb-3 text-center animate-fade-in" style={{ color: C.sub, animationDelay: "600ms", animationFillMode: "both" }}>QUER CONTINUAR DECODIFICANDO?</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: "650ms", animationFillMode: "both" }}>
        <ModuleTile icon={Smartphone} title="Arquivos Recuperados" desc="Analise conversas reais, trecho por trecho" onClick={() => onModule("recovered")} />
        <ModuleTile icon={Zap} title="Triagem Rápida" desc="Treine o olhar: ok, alerta ou contexto?" onClick={() => onModule("triagem")} />
        <ModuleTile icon={Clock} title="Linha do Tempo" desc="Ordene os eventos do pós-término" onClick={() => onModule("timeline")} />
        <ModuleTile icon={Crosshair} title="O Algoritmo" desc="Quando o feed vira tóxico" onClick={() => onModule("algorithm")} />
        <ModuleTile icon={FileWarning} title="Arquivos Ocultos" desc="Frases do cotidiano decodificadas" onClick={() => onModule("hiddenfiles")} />
        <ModuleTile icon={Lock} title="Firewall" desc="Leis de proteção e seus direitos" onClick={() => onModule("firewall")} />
        <ModuleTile icon={BarChart3} title="DataLab" desc="Os dados por trás do problema" onClick={() => onModule("datalab")} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 animate-fade-in" style={{ animationDelay: "800ms", animationFillMode: "both" }}>
        <GhostButton onClick={onDashboard}>VOLTAR AO SISTEMA</GhostButton>
        <PrimaryButton onClick={() => onModule("shield")}>VER ESCUDO</PrimaryButton>
      </div>
    </div>
  );
}
