import { StoryIntro } from "./StoryIntro";
import { ResultScreen } from "./ResultScreen";
import { ChoiceChapter } from "./ChoiceChapter";
import { Chapter4 } from "./Chapter4";
import { Chapter5 } from "./Chapter5";
import { PatternScanner } from "./PatternScanner";
import { CHAPTERS } from "../data";

/* Orchestrates chapters 1–5 + the final result screen, keyed off the
   numeric/"intro"/"result" storyStage owned by the top-level App. */
export function NarrativeGame({ stage, detected, onChapterDone, onExit, onModule, profileId, metrics }) {
  if (stage === "intro") {
    return <StoryIntro onStart={() => onChapterDone("start")} onExit={onExit} />;
  }
  if (stage === "result") {
    return <ResultScreen detected={detected} profileId={profileId} metrics={metrics} onModule={onModule} onDashboard={onExit} />;
  }

  let chapterBody = null;
  if (stage === 0) chapterBody = <ChoiceChapter chapter={CHAPTERS[0]} detected={detected} onChapterDone={onChapterDone} onExit={onExit} />;
  else if (stage === 1) chapterBody = <ChoiceChapter chapter={CHAPTERS[1]} detected={detected} onChapterDone={onChapterDone} onExit={onExit} />;
  else if (stage === 2) chapterBody = <ChoiceChapter chapter={CHAPTERS[2]} detected={detected} onChapterDone={onChapterDone} onExit={onExit} />;
  else if (stage === 3) chapterBody = <Chapter4 onDone={() => onChapterDone("cap4-done")} onExit={onExit} />;
  else if (stage === 4) chapterBody = <Chapter5 onDone={onChapterDone} onExit={onExit} />;

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-start w-full">
      <div className="flex-1 min-w-0 w-full">{chapterBody}</div>
      <div className="w-full lg:w-auto">
        <PatternScanner detected={detected} />
      </div>
    </div>
  );
}
