import { MessageCircle } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, GlitchTitle, PrimaryButton } from "../components/ui";

export function StoryIntro({ onStart, onExit }) {
  return (
    <div className="max-w-lg mx-auto text-center py-10">
      <ScreenHeader title="" onBack={onExit} />
      <div className="p-5 rounded-2xl inline-flex mb-5" style={{ background: rgba(C.lilac, 0.12) }}>
        <MessageCircle size={36} style={{ color: C.lilac }} aria-hidden="true" />
      </div>
      <GlitchTitle size="text-3xl">A TERCEIRA PESSOA</GlitchTitle>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: C.sub }}>
        "Você não está vivendo essa história.<br />Você está aprendendo a perceber os sinais."
      </p>
      <div className="mt-6 flex flex-col gap-2 text-sm" style={{ color: C.text }}>
        <p>Você será a rede de apoio.</p>
        <p style={{ color: C.sub }}>Seu papel não é decidir por Sofia.</p>
        <p style={{ color: C.sub }}>Seu papel é ouvir, perceber e saber como apoiar.</p>
      </div>
      <div className="mt-8">
        <PrimaryButton onClick={onStart}>COMEÇAR HISTÓRIA</PrimaryButton>
      </div>
    </div>
  );
}
