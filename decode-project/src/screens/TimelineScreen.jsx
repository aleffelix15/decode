import { ScreenHeader, ChapterSubtitle } from "../components/ui";
import { TimelineGame } from "../game/TimelineGame";

export function TimelineScreen() {
  return (
    <div>
      <ScreenHeader title="Linha do Tempo" />
      <ChapterSubtitle>Como uma relação abusiva pode escalar — mesmo após o término.</ChapterSubtitle>
      <TimelineGame />
    </div>
  );
}
