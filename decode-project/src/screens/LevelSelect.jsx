import { ScreenHeader } from "../components/ui";
import { StoryEntryCard } from "./Dashboard";

export function LevelSelect({ story, onPlay }) {
  return (
    <div>
      <ScreenHeader title="Jogar" />
      <div className="max-w-md">
        <StoryEntryCard story={story} onClick={onPlay} />
      </div>
    </div>
  );
}
