import { ScreenHeader, ChapterSubtitle } from "../components/ui";
import { TriagemGame } from "../game/TriagemGame";

export function TriagemScreen() {
  return (
    <div>
      <ScreenHeader title="Triagem Rápida" />
      <ChapterSubtitle>
        10 relatos curtos. Para cada um, marque se é comportamento normal, sinal de alerta, ou se depende do contexto. Pontuação final.
      </ChapterSubtitle>
      <TriagemGame />
    </div>
  );
}
