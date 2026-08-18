import { C, rgba } from "../theme";

/* SVG progress ring used to communicate "you detected N of M" in a
   visually compact way. Self-contained — no JS-driven animation beyond
   the CSS transition on the foreground circle. */
export function ProgressRing({
  value,
  max = 100,
  size = 88,
  stroke = 8,
  color = C.lilac,
  label,
  sub,
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - pct);
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={label ? `${label}: ${Math.round(pct * 100)}%` : `${Math.round(pct * 100)}%`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={rgba(C.lilac, 0.18)}
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="decode-ring-fg"
            style={{ filter: `drop-shadow(0 0 6px ${rgba(color, 0.6)})` }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-black"
          style={{
            color: C.text,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: size * 0.22,
          }}
        >
          {Math.round(pct * 100)}%
        </div>
      </div>
      {label && (
        <p className="text-[10px] font-bold tracking-widest text-center" style={{ color: C.sub }}>
          {label}
        </p>
      )}
      {sub && (
        <p className="text-xs text-center max-w-[10rem] leading-snug" style={{ color: C.text }}>
          {sub}
        </p>
      )}
    </div>
  );
}
