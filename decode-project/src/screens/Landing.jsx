import { Play } from "lucide-react";
import { C, rgba } from "../theme";
import { GlitchTitle, PrimaryButton, GhostButton } from "../components/ui";

export function Landing({ onStart, onHow }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: `radial-gradient(circle at 50% 20%, ${rgba(C.lilac, 0.25)}, transparent 60%)` }} />
      <div className="relative z-10 max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-6 text-xs tracking-[0.2em]" style={{ color: C.sub }}>
          <span>PROJETO</span>
        </div>
        <GlitchTitle size="text-6xl">DECODE</GlitchTitle>
        <p className="mt-3 text-sm font-bold tracking-wide" style={{ color: C.lilac }}>DESCRIPTOGRAFANDO A VIOLÊNCIA.</p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: C.sub }}>"O bug está no sistema.<br />Ajude a reescrever o código."</p>
        <div className="flex items-center justify-center gap-2 mt-6 text-xs font-semibold" style={{ color: rgba(C.lilac, 0.9) }}>
          <div className="w-4 h-4 rounded-full border" style={{ borderColor: C.lilac }} />
          AGOSTO LILÁS
        </div>
        <p className="mt-8 text-sm leading-relaxed" style={{ color: C.sub }}>Você vai analisar situações, tomar decisões e descobrir sinais de violência que muitas vezes são confundidos com cuidado.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <PrimaryButton onClick={onStart} className="flex items-center gap-2 justify-center">
            <Play size={16} /> INICIAR EXPERIÊNCIA
          </PrimaryButton>
          <GhostButton onClick={onHow}>COMO FUNCIONA</GhostButton>
        </div>
      </div>
    </div>
  );
}
