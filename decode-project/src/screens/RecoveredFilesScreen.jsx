import { C } from "../theme";
import { ScreenHeader } from "../components/ui";
import { RedFlagText } from "../game/RedFlagText";
import { FRAGMENTS, FRAGMENTS_B } from "../data";

export function RecoveredFilesScreen({ onDiscover, onBack }) {
  const all = [...FRAGMENTS, ...FRAGMENTS_B];

  return (
    <div>
      <ScreenHeader title="Arquivos Recuperados" onBack={onBack} />
      <p className="text-sm mb-6" style={{ color: C.sub }}>
        Fragmentos de conversa recuperados de celulares corrompidos. Toque nos trechos sublinhados para analisar o que está por trás deles.
      </p>
      <div className="max-w-2xl flex flex-col gap-4 sm:gap-5 md:gap-6">
        {all.map((fragment) => (
          <RedFlagText key={fragment.id} fragment={fragment} onDiscover={onDiscover} />
        ))}
      </div>
    </div>
  );
}
