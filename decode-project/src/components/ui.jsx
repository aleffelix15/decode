import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { C, rgba } from "../theme";

/* ------------------------------------------------------------------ */
/* GlitchTitle — the app's signature moment: text decodes from random */
/* glyphs into the final word, echoing "Descriptografando a Violência" */
/* ------------------------------------------------------------------ */
const DECODE_GLYPHS = "!<>-_\\/[]{}=+*^?#01";
export function GlitchTitle({ children, size = "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl" }) {
  const target = typeof children === "string" ? children : "";
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(target);
      return;
    }
    let frame = 0;
    const totalFrames = 16;
    const id = setInterval(() => {
      frame += 1;
      const revealCount = Math.ceil((frame / totalFrames) * target.length);
      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealCount) return ch;
            return DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)];
          })
          .join("")
      );
      if (frame >= totalFrames) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [target]);

  return (
    <h1
      className={`${size} font-black tracking-tight leading-[0.95] break-words`}
      style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "-0.02em", wordBreak: "break-word" }}
      aria-label={target}
    >
      <span aria-hidden="true">{display}</span>
      <span className="decode-cursor" aria-hidden="true" style={{ color: C.lilac }}>_</span>
    </h1>
  );
}

export function PrimaryButton({ children, onClick, className = "", disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold text-xs xs:text-sm tracking-wide transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 disabled:opacity-40 whitespace-nowrap ${className}`}
      style={{
        background: disabled ? C.lilacDim : `linear-gradient(135deg, ${C.lilac}, #7B2FBF)`,
        color: "#fff",
        boxShadow: disabled ? "none" : `0 0 24px ${rgba(C.lilac, 0.35)}`,
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold text-xs xs:text-sm tracking-wide border transition-colors focus:outline-none focus-visible:ring-2 whitespace-nowrap ${className}`}
      style={{ borderColor: C.line, color: C.text, background: "transparent" }}
    >
      {children}
    </button>
  );
}

export function Panel({ children, className = "", style = {} }) {
  return (
    <div className={`rounded-2xl border ${className}`} style={{ background: C.panel, borderColor: C.line, ...style }}>
      {children}
    </div>
  );
}

export function ProgressBar({ value, max, color = C.lilac, label }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className="w-full h-2 rounded-full overflow-hidden"
      style={{ background: rgba(C.lilac, 0.15) }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || `Progresso: ${pct}%`}
    >
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function ScreenHeader({ title, subtitle, onBack, right }) {
  return (
    <div className="flex items-center justify-between gap-1 xs:gap-2 sm:gap-3 mb-2 xs:mb-3">
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 min-w-0">
        {onBack && (
          <button onClick={onBack} aria-label="Voltar" className="p-1 xs:p-1.5 sm:p-2 rounded-lg border shrink-0 focus:outline-none focus-visible:ring-2" style={{ borderColor: C.line, color: C.text }}>
            <ChevronLeft size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold tracking-wide truncate" style={{ color: C.text }}>{title}</h2>
      </div>
      {right && <div className="shrink-0 hidden sm:block text-xs xs:text-sm">{right}</div>}
    </div>
  );
}

export function ChapterSubtitle({ children }) {
  return <p className="text-xs xs:text-sm mb-3 xs:mb-4 sm:mb-5" style={{ color: C.sub }}>{children}</p>;
}

/* Small tile used both on the Dashboard and on the story ResultScreen */
export function ModuleTile({ icon: Icon, title, desc, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 p-2.5 xs:p-3 sm:p-4 rounded-xl border text-left transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2" style={{ background: C.panel2, borderColor: C.line }}>
      <div className="p-1 xs:p-1.5 sm:p-2 rounded-lg shrink-0" style={{ background: rgba(C.lilac, 0.15) }}>
        <Icon size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" style={{ color: C.lilac }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-2xs xs:text-xs sm:text-sm truncate" style={{ color: C.text }}>{title}</p>
        <p className="text-2xs xs:text-xs leading-tight" style={{ color: C.sub }}>{desc}</p>
      </div>
      <ChevronRight size={12} className="ml-1 xs:ml-2 shrink-0 sm:ml-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" style={{ color: C.sub }} />
    </button>
  );
}
