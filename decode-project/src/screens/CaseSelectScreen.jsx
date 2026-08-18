import { MessageCircle, Crosshair, Play, CheckCircle2, Shield } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, PrimaryButton } from "../components/ui";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { ProgressBar } from "../components/ui";
import { ChapterSubtitle } from "../components/ui";

/* Hub: two large cards, one per case. The "done" seal + progress bar
   differ based on story.chapter / story.finished, so users see their
   place in either story. Clicking the card starts that case. */
function CaseCard({ tag, title, blurb, progress, done, onPlay, accent = C.lilac }) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border decode-card"
      style={{
        background: `linear-gradient(180deg, ${rgba(accent, 0.05)}, ${C.panel})`,
        borderColor: C.line,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background: `radial-gradient(circle at 90% 0%, ${rgba(accent, 0.18)}, transparent 60%)`,
        }}
      />
      <div className="relative p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold tracking-widest truncate" style={{ color: C.sub }}>
            {tag}
          </span>
          {done ? (
            <span
              className="text-[10px] font-bold tracking-widest inline-flex items-center gap-1"
              style={{ color: C.green }}
            >
              <CheckCircle2 size={12} aria-hidden="true" /> DECODED
            </span>
          ) : (
            <span className="text-[10px] font-bold tracking-widest" style={{ color: accent }}>
              {progress.value === 0 ? "NOVO" : `CAP ${progress.value}/5`}
            </span>
          )}
        </div>
        <h3
          className="font-black text-xl sm:text-2xl leading-tight break-words"
          style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {title}
        </h3>
        <p className="text-xs sm:text-sm mt-2 mb-4 leading-relaxed" style={{ color: C.sub }}>
          {blurb}
        </p>
        <ProgressBar
          value={progress.value}
          max={progress.max}
          color={accent}
          label={`Progresso ${title}: ${progress.value} de ${progress.max}`}
        />
        <p className="text-[11px] mt-1.5 font-semibold" style={{ color: C.sub }}>
          {done ? "História concluída" : progress.value === 0 ? "Ainda não iniciado" : `Capítulo ${progress.value}/5`}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <PrimaryButton onClick={onPlay} className="flex items-center gap-2 text-xs xs:text-sm">
            <Play size={12} aria-hidden="true" />
            {done ? "REVISITAR" : progress.value === 0 ? "INICIAR CASO" : "CONTINUAR"}
          </PrimaryButton>
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest"
            style={{ color: accent }}
          >
            <Shield size={11} aria-hidden="true" /> {done ? "100%" : `${Math.round((progress.value / progress.max) * 100)}%`}
          </span>
        </div>
      </div>
    </article>
  );
}

export function CaseSelectScreen({ storySofia, storyMarcos, onPlaySofia, onPlayMarcos }) {
  return (
    <div>
      <ScreenHeader title="Escolha um caso" />
      <ChapterSubtitle>Cada caso revela um conjunto diferente de sinais. Você pode jogar os dois.</ChapterSubtitle>
      <div className="mb-4">
        <SectionEyebrow accent>DECODE // MÓDULO 01 — JOGAR</SectionEyebrow>
      </div>
      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <CaseCard
          tag="CASO 01 — A TERCEIRA PESSOA"
          title="SOFIA"
          icon={MessageCircle}
          accent={C.lilac}
          blurb="Durante o namoro, a amiga percebe os primeiros sinais: localização, senha, isolamento, agressão."
          progress={{ value: storySofia.chapter, max: 5 }}
          done={storySofia.finished}
          onPlay={onPlaySofia}
        />
        <CaseCard
          tag="CASO 02 — O SILÊNCIO DEPOIS"
          title="MARCOS"
          accent={C.amber}
          icon={Crosshair}
          blurb="Após o término, o stalking digital escala até a chantagem e a ameaça. O que fazer quando 'não' não basta?"
          progress={{ value: storyMarcos.chapter, max: 5 }}
          done={storyMarcos.finished}
          onPlay={onPlayMarcos}
        />
      </div>
    </div>
  );
}
