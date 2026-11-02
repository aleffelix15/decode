import { ScreenHeader } from "../components/ui";
import { StoryEntryCard } from "./Dashboard";

export function LevelSelect({ story, onPlay, onBack }) {
  return (
    <div>
      <ScreenHeader title="Jogar" onBack={onBack} />
      <div className="max-w-md">
        <StoryEntryCard story={story} onClick={onPlay} />
      </div>
    </div>
  );
}
