import { StoryIntro } from "./StoryIntro";
import { ResultScreen } from "./ResultScreen";
import { ChoiceChapter } from "./ChoiceChapter";
import { MarcosChapter4 } from "./MarcosChapter4";
import { MarcosChapter5 } from "./MarcosChapter5";
import { PatternScanner } from "./PatternScanner";
import { CHAPTERS_B, REPORT_CONCEPTS_B } from "../data";

/* Case Marcos — same shape as Sofia's NarrativeGame but with its own
   stage key prefix ("b"), so the parent's storyStage tracks both cases
   independently. The "intro" / "result" sentinel values stay the same
   so the parent App.jsx can keep a single storyStage. */
export function MarcosStory({ stage, detected, profileId, onChapterDone, onExit, onModule, metrics }) {
  if (stage === "b-intro") return <StoryIntro label="MARCOS" onStart={() => onChapterDone("b-start")} onExit={onExit} />;
  if (stage === "b-result") {
    return (
      <ResultScreen
        detected={detected}
        profileId={profileId}
        metrics={metrics}
        onModule={onModule}
        onDashboard={onExit}
        concepts={REPORT_CONCEPTS_B}
        title="MARCOS // DECODE"
      />
    );
  }

  let body = null;
  const n = typeof stage === "string" && stage.startsWith("b-") ? Number(stage.slice(2)) : stage;
  if (n === 0) body = <ChoiceChapter chapter={CHAPTERS_B[0]} detected={detected} onChapterDone={onChapterDone} onExit={onExit} />;
  else if (n === 1) body = <ChoiceChapter chapter={CHAPTERS_B[1]} detected={detected} onChapterDone={onChapterDone} onExit={onExit} />;
  else if (n === 2) body = <ChoiceChapter chapter={CHAPTERS_B[2]} detected={detected} onChapterDone={onChapterDone} onExit={onExit} />;
  else if (n === 3) body = <MarcosChapter4 onDone={() => onChapterDone("b-cap4-done")} onExit={onExit} />;
  else if (n === 4) body = <MarcosChapter5 onDone={onChapterDone} onExit={onExit} />;

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-start w-full">
      <div className="flex-1 min-w-0 w-full">{body}</div>
      <div className="w-full lg:w-auto">
        <PatternScanner detected={detected} concepts={REPORT_CONCEPTS_B} />
      </div>
    </div>
  );
}
