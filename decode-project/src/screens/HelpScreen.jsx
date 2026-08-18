
import { C, rgba } from "../theme";
import { ScreenHeader, Panel, PrimaryButton } from "../components/ui";

export function HelpScreen() {
  return (
    <div>
      <ScreenHeader title="Ajuda" />
      <div className="max-w-xl flex flex-col gap-3 sm:gap-4">
        <Panel className="p-3.5 sm:p-4">
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Sobre o DECODE</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>Você interpreta a rede de apoio — nunca a vítima ou o agressor. Em cada caso: perceba, decida, veja a consequência, aprenda e desbloqueie proteção.</p>
        </Panel>
        <Panel className="p-3.5 sm:p-4">
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Casos disponíveis</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>Sofia — durante o namoro. Marcos — após o término. Cada um revela um conjunto diferente de sinais e exige um conjunto diferente de respostas.</p>
        </Panel>
        <Panel className="p-3.5 sm:p-4">
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Privacidade</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>Não pedimos login. Não armazenamos dados pessoais. Seu progresso fica apenas nesta sessão.</p>
        </Panel>
        <Panel className="p-3.5 sm:p-4">
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Precisa de ajuda real, agora?</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>Ligue 180 (Central de Atendimento à Mulher) ou 190 em emergências. Use o botão SAÍDA RÁPIDA (ESC×3) a qualquer momento.</p>
        </Panel>
      </div>
    </div>
  );
}
