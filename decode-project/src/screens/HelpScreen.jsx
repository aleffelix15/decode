import { Phone, AlertTriangle, ExternalLink } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel } from "../components/ui";

export function HelpScreen({ onBack }) {
  return (
    <div>
      <ScreenHeader title="Ajuda e Suporte" onBack={onBack} />
      <div className="max-w-xl flex flex-col gap-3 sm:gap-4">
        <Panel className="p-3.5 sm:p-4 border-l-4" style={{ borderLeftColor: C.lilac }}>
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Sobre o DECODE</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
            Você interpreta a rede de apoio — nunca a vítima ou o agressor. Em cada caso: perceba, decida, veja a consequência, aprenda e desbloqueie estratégias de proteção.
          </p>
        </Panel>

        <Panel className="p-3.5 sm:p-4">
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Casos Disponíveis</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
            <strong>Sofia:</strong> durante o relacionamento amoroso.<br />
            <strong>Marcos:</strong> perseguição e stalking digital após o término.<br />
            Cada um revela um conjunto específico de sinais e exige abordagens distintas de apoio.
          </p>
        </Panel>

        <Panel className="p-3.5 sm:p-4">
          <p className="font-bold text-sm mb-2" style={{ color: C.text }}>Privacidade e Sigilo</p>
          <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
            Não exigimos cadastro ou login. Nenhum dado pessoal é transmitido ou armazenado em servidores externos. Seu progresso existe apenas na sessão atual do seu navegador.
          </p>
        </Panel>

        <Panel className="p-4 sm:p-5 border-l-4" style={{ borderLeftColor: C.red, background: rgba(C.red, 0.04) }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: C.red }}>
            <AlertTriangle size={18} aria-hidden="true" />
            <p className="font-bold text-sm">Precisa de Ajuda Real Imediata?</p>
          </div>
          <p className="text-xs leading-relaxed mb-4" style={{ color: C.sub }}>
            Em situações de perigo iminente ou violência física/psicológica em andamento, utilize os canais públicos gratuitos e confidenciais:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <a
              href="tel:180"
              className="flex items-center justify-between p-3 rounded-lg border font-semibold text-xs focus:outline-none focus-visible:ring-2 transition-transform hover:scale-[1.01]"
              style={{ background: C.panel2, borderColor: C.line, color: C.text }}
            >
              <div className="flex items-center gap-2">
                <Phone size={15} style={{ color: C.lilac }} aria-hidden="true" />
                <span>Central 180</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ background: rgba(C.lilac, 0.2), color: C.lilac }}>LIGAR</span>
            </a>

            <a
              href="tel:190"
              className="flex items-center justify-between p-3 rounded-lg border font-semibold text-xs focus:outline-none focus-visible:ring-2 transition-transform hover:scale-[1.01]"
              style={{ background: C.panel2, borderColor: rgba(C.red, 0.4), color: C.text }}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} style={{ color: C.red }} aria-hidden="true" />
                <span>Polícia Militar 190</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ background: rgba(C.red, 0.2), color: C.red }}>EMERGÊNCIA</span>
            </a>
          </div>

          <a
            href="https://www.gov.br/mulheres/pt-br/central-de-atendimento-a-mulher-ligue-180"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 rounded py-1"
            style={{ color: C.lilac }}
          >
            <span>Conheça os canais digitais do Ligue 180 (Gov.br)</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>

          <p className="text-[11px] mt-4 pt-3 border-t" style={{ borderColor: C.line, color: C.sub }}>
            Dica de segurança: Use a tecla <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: C.line }}>ESC</kbd> duas vezes rápidas para ativar a <strong>Saída Rápida de Emergência</strong> a qualquer instante.
          </p>
        </Panel>
      </div>
    </div>
  );
}
