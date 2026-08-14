import React, { useState, useEffect } from "react";
import { C, rgba } from "../theme";
import { ScreenHeader, ChapterSubtitle, ProgressBar, Panel, PrimaryButton } from "../components/ui";
import { useTypedMessages } from "../hooks/useTypedMessages";
import { ChatShell } from "./ChatShell";
import { PatternReveal } from "./PatternReveal";
import { INSIGHT_BY_ID } from "../data";

export function ChoiceChapter({ chapter, detected, onChapterDone, onExit }) {
  const { visible, typing } = useTypedMessages(chapter.messages, chapter.key);
  const [choice, setChoice] = useState(null);
  const [revealing, setRevealing] = useState(false);

  useEffect(() => { setChoice(null); setRevealing(false); }, [chapter.key]);

  const answered = choice !== null;
  const opt = answered ? chapter.options[choice] : null;
  const allMsgsShown = visible >= chapter.messages.length;

  const handleChoose = (i) => {
    setChoice(i);
    const o = chapter.options[i];
    if (o.pattern) setRevealing(true);
  };

  return (
    <div>
      <ScreenHeader
        title={`Capítulo ${chapter.n}/5`}
        onBack={onExit}
        right={<div className="w-24"><ProgressBar value={chapter.n - 1 + (answered ? 1 : 0)} max={5} /></div>}
      />
      <ChapterSubtitle>{chapter.title}</ChapterSubtitle>
      <div className="sm:hidden mb-4"><ProgressBar value={chapter.n - 1 + (answered ? 1 : 0)} max={5} /></div>
      <ChatShell transition={chapter.transition} messages={chapter.messages} visibleMsgs={visible} typing={typing}>
        {allMsgsShown && !answered && (
          <Panel className="p-4 max-w-xl">
            <p className="font-bold text-sm mb-3" style={{ color: C.text }}>{chapter.question}</p>
            <div className="flex flex-col gap-2">
              {chapter.options.map((o, i) => (
                <button key={i} onClick={() => handleChoose(i)} className="text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2" style={{ borderColor: C.line, background: C.panel2, color: C.text }}>
                  <span className="font-bold mr-2" style={{ color: C.lilac }}>{String.fromCharCode(65 + i)}</span>
                  {o.text}
                </button>
              ))}
            </div>
          </Panel>
        )}

        {answered && revealing && (
          <PatternReveal label={chapter.patternLabel} onDone={() => setRevealing(false)} />
        )}

        {answered && !revealing && (
          <Panel className="p-4 max-w-xl">
            <p className="text-sm leading-relaxed" style={{ color: C.text }}>"{opt.reply}"</p>
            {opt.pattern && (
              <div className="flex items-center gap-2 mt-3 p-3 rounded-lg" style={{ background: rgba(C.lilac, 0.1) }}>
                {INSIGHT_BY_ID[opt.pattern] && (
                  <>
                    {React.createElement(INSIGHT_BY_ID[opt.pattern].icon, { size: 16, style: { color: C.lilac } })}
                    <span className="text-xs font-semibold" style={{ color: C.text }}>{INSIGHT_BY_ID[opt.pattern].title}</span>
                  </>
                )}
              </div>
            )}
            <PrimaryButton onClick={() => onChapterDone(opt.pattern)} className="mt-4 w-full">CONTINUAR</PrimaryButton>
          </Panel>
        )}
      </ChatShell>
    </div>
  );
}
