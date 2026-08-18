import { Play } from "lucide-react";
import { C, rgba } from "../theme";
import { GlitchTitle, PrimaryButton, GhostButton } from "../components/ui";
import { ParticleField } from "../components/ParticleField";

export function Landing({ onStart, onHow }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 py-10 xs:py-12 sm:py-14 md:py-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: `radial-gradient(circle at 50% 20%, ${rgba(C.lilac, 0.28)}, transparent 60%)` }} />
      <ParticleField count={28} seed={1} />
      <div className="relative z-10 max-w-lg xs:max-w-xl w-full px-1 xs:px-2 sm:px-3">
        <div className="flex items-center justify-center gap-2 mb-3 xs:mb-4 sm:mb-5 md:mb-6 text-2xs xs:text-xs tracking-[0.2em]" style={{ color: C.sub }}>
          <span>PROJETO</span>
          <span aria-hidden="true" style={{ color: rgba(C.lilac, 0.5) }}>·</span>
          <span style={{ color: C.lilac }}>AGOSTO LILÁS</span>
        </div>
        <GlitchTitle>DECODE</GlitchTitle>
        <p className="mt-2 xs:mt-3 sm:mt-4 text-2xs xs:text-xs sm:text-sm font-bold tracking-wide" style={{ color: C.lilac }}>DESCRIPTOGRAFANDO A VIOLÊNCIA.</p>
        <p className="mt-3 xs:mt-4 sm:mt-5 text-xs xs:text-sm leading-relaxed" style={{ color: C.sub }}>&quot;O bug está no sistema.<br />Ajude a reescrever o código.&quot;</p>
        <p className="mt-4 xs:mt-5 sm:mt-7 md:mt-8 text-2xs xs:text-xs sm:text-sm leading-relaxed px-1" style={{ color: C.sub }}>Você vai analisar situações, tomar decisões e descobrir sinais de violência que muitas vezes são confundidos com cuidado.</p>
        <div className="mt-5 xs:mt-6 sm:mt-8 md:mt-10 flex flex-col gap-2 xs:gap-2.5 sm:gap-3 justify-center">
          <PrimaryButton onClick={onStart} className="flex items-center gap-2 justify-center text-2xs xs:text-xs sm:text-sm">
            <Play size={12} className="xs:w-3 xs:h-3 sm:w-4 sm:h-4" /> INICIAR EXPERIÊNCIA
          </PrimaryButton>
          <GhostButton onClick={onHow} className="text-2xs xs:text-xs sm:text-sm">COMO FUNCIONA</GhostButton>
        </div>
      </div>
    </div>
  );
}
