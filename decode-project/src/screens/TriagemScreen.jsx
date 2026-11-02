import { ScreenHeader, ChapterSubtitle } from "../components/ui";
import { TriagemGame } from "../game/TriagemGame";

export function TriagemScreen({ onBack }) {
  return (
    <div>
      <ScreenHeader title="Triagem Rápida" onBack={onBack} />
      <ChapterSubtitle>
        10 relatos curtos. Para cada um, marque se é comportamento normal, sinal de alerta, ou se depende do contexto. Pontuação final.
      </ChapterSubtitle>
      <TriagemGame />
    </div>
  );
}
