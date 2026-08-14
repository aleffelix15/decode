import { useState } from "react";
import { C, rgba } from "../theme";
import { PrimaryButton } from "../components/ui";
import { ONBOARD_SLIDES } from "../data";

export function Onboarding({ onDone }) {
  const [i, setI] = useState(0);
  const slide = ONBOARD_SLIDES[i];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 text-center py-8 sm:py-10">
      <div className="mb-6 sm:mb-8 p-3 sm:p-5 rounded-2xl" style={{ background: rgba(C.lilac, 0.12), border: `1px solid ${C.line}` }}>
        <slide.icon size={32} className="sm:w-10 sm:h-10" style={{ color: C.lilac }} />
      </div>
      <p className="text-xl xs:text-2xl sm:text-3xl font-bold max-w-xs xs:max-w-sm leading-snug" style={{ color: C.text }} aria-live="polite">{slide.text}</p>
      <div className="flex gap-2 mt-6 sm:mt-8">
        {ONBOARD_SLIDES.map((_, idx) => (
          <div key={idx} className="h-1 sm:h-1.5 rounded-full transition-all" style={{ width: idx === i ? 24 : 8, background: idx === i ? C.lilac : rgba(C.lilac, 0.25) }} />
        ))}
      </div>
      <div className="mt-8 sm:mt-10">
        <PrimaryButton onClick={() => (i < ONBOARD_SLIDES.length - 1 ? setI(i + 1) : onDone())} className="text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6">
          {i < ONBOARD_SLIDES.length - 1 ? "CONTINUAR" : "COMEÇAR"}
        </PrimaryButton>
      </div>
    </div>
  );
}
