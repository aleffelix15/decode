import { ShieldCheck, Phone, AlertTriangle, Shield } from "lucide-react";
import { C } from "../theme";
import { ScreenHeader, Panel, PrimaryButton } from "../components/ui";

export function ShieldScreen({ story, unlockedInsights }) {
  const tier = story.finished ? 3 : story.chapter >= 3 ? 2 : story.chapter >= 1 ? 1 : 0;
  return (
    <div>
      <ScreenHeader title="Escudo de Proteção" />
      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <Panel className="p-4 sm:p-5 md:p-6 flex flex-col items-center text-center">
          <ShieldCheck size={48} className="sm:w-14 sm:h-14" style={{ color: tier > 0 ? C.lilac : C.sub }} aria-hidden="true" />
          <p className="font-bold mt-3 text-sm sm:text-base" style={{ color: C.text }}>{story.chapter}/5 capítulos concluídos</p>
          <p className="text-xs mt-1" style={{ color: C.sub }}>{unlockedInsights.size}/6 insights desbloqueados</p>
          {story.finished && <p className="text-xs font-bold mt-4" style={{ color: C.green }}>Você sabe reconhecer os sinais.</p>}
        </Panel>
        <Panel className="p-4 sm:p-5 md:p-6">
          <p className="font-bold text-sm mb-3" style={{ color: C.text }}>Rede de Proteção</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Phone size={16} style={{ color: C.lilac, marginTop: 2 }} className="shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: C.text }}>Ligue 180</p>
                <p className="text-[11px] leading-snug" style={{ color: C.sub }}>Central de Atendimento à Mulher</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} style={{ color: C.red, marginTop: 2 }} className="shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: C.text }}>Ligue 190</p>
                <p className="text-[11px] leading-snug" style={{ color: C.sub }}>Emergência policial</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={16} style={{ color: C.lilac, marginTop: 2 }} className="shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: C.text }}>DEAM</p>
                <p className="text-[11px] leading-snug" style={{ color: C.sub }}>Delegacia Especializada de Atendimento à Mulher mais próxima de você</p>
              </div>
            </div>
          </div>
          <PrimaryButton className="w-full mt-5">COMPARTILHAR ESCUDO</PrimaryButton>
        </Panel>
      </div>
    </div>
  );
}
