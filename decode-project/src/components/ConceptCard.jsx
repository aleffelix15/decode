import { C, rgba } from "../theme";
import { Panel } from "./ui";

/* A reusable concept/insight card with hover lift, optional glow-pulse
   when `fresh` is true (just unlocked), and a soft inner gradient so
   they read as a matched set. Used in Insights, Result, and the
   case Marcos unlock screen. */
export function ConceptCard({
  icon: Icon,
  title,
  text,
  fresh = false,
  locked = false,
  footer,
  as: Tag = Panel,
}) {
  return (
    <Tag
      className="p-3.5 sm:p-4 decode-card"
      style={{
        opacity: locked ? 0.55 : 1,
        background: locked
          ? C.panel
          : `linear-gradient(180deg, ${rgba(C.lilac, 0.05)}, ${C.panel})`,
      }}
    >
      <div className={`flex items-center gap-2 mb-2 ${fresh ? "decode-glow-pulse rounded-lg" : ""}`}>
        {Icon && (
          <div
            className="p-1.5 rounded-lg shrink-0"
            style={{
              background: locked ? rgba(C.sub, 0.12) : rgba(C.lilac, 0.18),
              boxShadow: locked ? "none" : `0 0 16px ${rgba(C.lilac, 0.25)}`,
            }}
            aria-hidden="true"
          >
            <Icon
              size={16}
              className="sm:w-[18px] sm:h-[18px]"
              style={{ color: locked ? C.sub : C.lilac }}
            />
          </div>
        )}
        <p
          className="font-bold text-sm sm:text-base break-words flex-1 min-w-0"
          style={{ color: C.text }}
        >
          {title}
        </p>
      </div>
      <p
        className="text-xs leading-relaxed break-words"
        style={{ color: C.sub }}
        aria-hidden={locked || undefined}
      >
        {locked ? "████████████████████████" : text}
      </p>
      {footer && !locked && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: C.line }}>
          {footer}
        </div>
      )}
    </Tag>
  );
}
