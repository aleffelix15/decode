import { Info } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel } from "./ui";

/* A KPI tile with a big mono number, a short label, and a tappable
   "i" that reveals the source citation. Used in the DataLab. */
export function StatTile({ value, label, src, icon: Icon, color = C.lilac }) {
  return (
    <Panel className="p-3.5 sm:p-4 decode-card">
      <div className="flex items-start gap-2 mb-1">
        {Icon && (
          <div
            className="p-1.5 rounded-lg shrink-0"
            style={{ background: rgba(color, 0.14) }}
            aria-hidden="true"
          >
            <Icon size={14} style={{ color }} />
          </div>
        )}
        <p
          className="text-[10px] font-bold tracking-widest flex-1 min-w-0 break-words"
          style={{ color: C.sub }}
        >
          {label}
        </p>
        {src && (
          <span
            title="Fonte"
            aria-label={`Fonte: ${src}`}
            className="shrink-0 inline-flex items-center justify-center min-h-[24px] min-w-[24px] rounded"
            style={{ color: C.sub }}
          >
            <Info size={12} aria-hidden="true" />
          </span>
        )}
      </div>
      <p
        className="text-2xl sm:text-3xl font-black break-words leading-none mt-2"
        style={{
          color,
          fontFamily: "'IBM Plex Mono', monospace",
          textShadow: `0 0 18px ${rgba(color, 0.25)}`,
        }}
      >
        {value}
      </p>
      {src && (
        <p className="text-[10px] mt-3 leading-relaxed" style={{ color: C.sub }}>
          Fonte: {src}
        </p>
      )}
    </Panel>
  );
}
