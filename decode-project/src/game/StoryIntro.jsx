import { MessageCircle } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, GlitchTitle, PrimaryButton } from "../components/ui";

export function StoryIntro({ onStart, onExit }) {
  return (
    <div className="max-w-lg mx-auto text-center py-6 sm:py-8 md:py-10 px-1">
      <ScreenHeader title="" onBack={onExit} />
      <div className="p-4 sm:p-5 rounded-2xl inline-flex mb-4 sm:mb-5" style={{ background: rgba(C.lilac, 0.12) }}>
        <MessageCircle size={32} className="sm:w-9 sm:h-9" style={{ color: C.lilac }} aria-hidden="true" />
      </div>
      <GlitchTitle size="text-2xl xs:text-3xl sm:text-4xl md:text-5xl">A TERCEIRA PESSOA</GlitchTitle>
      <p className="mt-3 sm:mt-4 text-sm leading-relaxed" style={{ color: C.sub }}>
        "Você não está vivendo essa história.<br />Você está aprendendo a perceber os sinais."
      </p>
      <div className="mt-5 sm:mt-6 flex flex-col gap-1.5 sm:gap-2 text-sm leading-relaxed" style={{ color: C.text }}>
        <p>Você será a rede de apoio.</p>
        <p style={{ color: C.sub }}>Seu papel não é decidir por Sofia.</p>
        <p style={{ color: C.sub }}>Seu papel é ouvir, perceber e saber como apoiar.</p>
      </div>
      <div className="mt-7 sm:mt-8">
        <PrimaryButton onClick={onStart}>COMEÇAR HISTÓRIA</PrimaryButton>
      </div>
    </div>
  );
}
