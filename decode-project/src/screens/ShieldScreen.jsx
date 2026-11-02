import { useState } from "react";
import { Phone, AlertTriangle, Shield, Share2, Check } from "lucide-react";
import { C } from "../theme";
import { ScreenHeader, Panel, PrimaryButton } from "../components/ui";
import { ProgressRing } from "../components/ProgressRing";

export function ShieldScreen({ storySofia, storyMarcos, unlockedInsights, onBack }) {
  const [copied, setCopied] = useState(false);
  const totalChapters =
    ((storySofia?.finished ? 5 : storySofia?.chapter) || 0) +
    ((storyMarcos?.finished ? 5 : storyMarcos?.chapter) || 0);
  const insightsCount = unlockedInsights?.size || 0;
  const tier = totalChapters >= 8 ? 3 : totalChapters >= 4 ? 2 : totalChapters >= 1 ? 1 : 0;

  const handleShare = async () => {
    const text = `Estou no nível ${tier} do DECODE — Descriptografando a Violência. Aprenda a reconhecer sinais de relacionamentos abusivos e ajude a proteger quem você ama.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "DECODE — Descriptografando a Violência",
          text,
          url: window.location.origin,
        });
        return;
      } catch {
        // Fallback para cópia
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <ScreenHeader title="Escudo de Proteção" onBack={onBack} />
      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <Panel className="p-4 sm:p-5 md:p-6 flex flex-col items-center text-center">
          <ProgressRing
            value={totalChapters}
            max={10}
            size={120}
            stroke={10}
            color={tier >= 2 ? C.lilac : C.amber}
            label={`${totalChapters} de 10 capítulos jogados`}
            sub={`${insightsCount} de 11 insights desbloqueados`}
          />
          <p className="text-xs font-bold mt-3" style={{ color: C.lilac }}>
            NÍVEL {tier} — {tier === 0 ? "INICIANTE" : tier === 1 ? "APRENDIZ" : tier === 2 ? "GUARDIÃ(O)" : "DECODED"}
          </p>
          {tier === 3 && (
            <p className="text-xs font-bold mt-2" style={{ color: C.green }}>
              Você sabe reconhecer os sinais. Continue compartilhando.
            </p>
          )}
        </Panel>

        <Panel className="p-4 sm:p-5 md:p-6">
          <p className="font-bold text-sm mb-3" style={{ color: C.text }}>Rede de Proteção</p>
          <div className="flex flex-col gap-3">
            <ChannelRow icon={Phone} color={C.lilac} title="Ligue 180" sub="Central de Atendimento à Mulher (ligação gratuita e confidencial)" />
            <ChannelRow icon={AlertTriangle} color={C.red} title="Ligue 190" sub="Emergência policial imediata" />
            <ChannelRow icon={Shield} color={C.lilac} title="DEAM" sub="Delegacia Especializada de Atendimento à Mulher" />
            <ChannelRow icon={Shield} color={C.amber} title="Lei 14.132/2021" sub="Stalking e perseguição são crimes. Guarde provas e mensagens." />
          </div>
          <PrimaryButton
            onClick={handleShare}
            aria-label="Compartilhar informações do escudo de proteção"
            className="w-full mt-5 flex items-center justify-center gap-2"
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Share2 size={14} aria-hidden="true" />}
            {copied ? "LINK COPIADO!" : "COMPARTILHAR ESCUDO"}
          </PrimaryButton>
        </Panel>
      </div>
    </div>
  );
}

function ChannelRow({ icon: Icon, color, title, sub }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} style={{ color, marginTop: 2 }} className="shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" style={{ color: C.text }}>{title}</p>
        <p className="text-[11px] leading-snug" style={{ color: C.sub }}>{sub}</p>
      </div>
    </div>
  );
}
