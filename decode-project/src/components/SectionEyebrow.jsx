import { C, rgba } from "../theme";

/* "DECODE // MÓDULO 02" style header used above every screen. Always
   mono + tracked so it reads as system chrome rather than copy. */
export function SectionEyebrow({ children, color = C.lilac, accent = false }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.2em]"
      style={{ color }}
      aria-label={typeof children === "string" ? children : undefined}
    >
      <span
        aria-hidden="true"
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: accent ? `0 0 8px ${rgba(color, 0.7)}` : "none" }}
      />
      {children}
    </div>
  );
}
