import { useState } from "react";
import { C, rgba } from "../theme";
import { PrimaryButton } from "../components/ui";
import { ONBOARD_SLIDES } from "../data";

export function Onboarding({ onDone }) {
  const [i, setI] = useState(0);
  const slide = ONBOARD_SLIDES[i];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 p-5 rounded-2xl" style={{ background: rgba(C.lilac, 0.12), border: `1px solid ${C.line}` }}>
        <slide.icon size={40} style={{ color: C.lilac }} />
      </div>
      <p className="text-2xl font-bold max-w-xs leading-snug" style={{ color: C.text }} aria-live="polite">{slide.text}</p>
      <div className="flex gap-2 mt-8">
        {ONBOARD_SLIDES.map((_, idx) => (
          <div key={idx} className="h-1.5 rounded-full transition-all" style={{ width: idx === i ? 24 : 8, background: idx === i ? C.lilac : rgba(C.lilac, 0.25) }} />
        ))}
      </div>
      <div className="mt-10">
        <PrimaryButton onClick={() => (i < ONBOARD_SLIDES.length - 1 ? setI(i + 1) : onDone())}>
          {i < ONBOARD_SLIDES.length - 1 ? "CONTINUAR" : "COMEÇAR"}
        </PrimaryButton>
      </div>
    </div>
  );
}
