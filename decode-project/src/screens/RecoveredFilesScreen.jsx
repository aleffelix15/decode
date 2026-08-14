import { C } from "../theme";
import { ScreenHeader } from "../components/ui";
import { RedFlagText } from "../game/RedFlagText";
import { FRAGMENTS } from "../data";

/* Um celular corrompido de Ana, recuperado em fragmentos. Trechos com
   sinal de alerta são clicáveis e revelam o conceito por trás — o mesmo
   mecanismo de "descriptografar" do resto do app, aplicado a uma
   conversa real em vez de uma escolha de múltipla escolha. */
export function RecoveredFilesScreen({ onDiscover }) {
  return (
    <div>
      <ScreenHeader title="Arquivos Recuperados" />
      <p className="text-sm mb-6" style={{ color: C.sub }}>
        Fragmentos de conversa recuperados de um celular corrompido. Toque nos trechos sublinhados para analisar o que está por trás deles.
      </p>
      <div className="max-w-2xl flex flex-col gap-6">
        {FRAGMENTS.map((fragment) => (
          <RedFlagText key={fragment.id} fragment={fragment} onDiscover={onDiscover} />
        ))}
      </div>
    </div>
  );
}
