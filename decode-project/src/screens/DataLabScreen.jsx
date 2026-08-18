import { useState } from "react";
import { ChevronDown, ChevronUp, Activity, Scale, MapPin, Phone } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader, Panel } from "../components/ui";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { StatTile } from "../components/StatTile";
import { DATA_LAB } from "../data";

/* DataLab — the data module's "premium" sibling. Same numbers as
   DataDashboardScreen, but interactive (toggle series, hover for
   exact values), with SVG-rendered charts and per-tile methodology
   reveal. We don't add a chart library; one good inline chart per
   series is enough. */

function LineChart({ points, values, label, color = C.lilac, height = 180 }) {
  const W = 600;
  const H = height;
  const padL = 36;
  const padR = 12;
  const padT = 16;
  const padB = 26;
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const xStep = (W - padL - padR) / Math.max(1, points.length - 1);
  const yFor = (v) => {
    const t = (v - minV) / Math.max(1, maxV - minV);
    return padT + (1 - t) * (H - padT - padB);
  };
  const xFor = (i) => padL + i * xStep;
  const path = points
    .map((_, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(values[i])}`)
    .join(" ");
  // Y-axis ticks: 3 evenly spaced
  const yTicks = [0, 0.5, 1].map((t) => {
    const v = minV + t * (maxV - minV);
    return { v: Math.round(v), y: yFor(v) };
  });
  // X-axis labels: every other point to avoid overlap
  const xLabels = points.map((p, i) => ({ p, x: xFor(i), show: i === 0 || i === points.length - 1 || i % Math.ceil(points.length / 4) === 0 }));
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      role="img"
      aria-label={label}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      {/* grid */}
      {yTicks.map((t, i) => (
        <line key={i} x1={padL} x2={W - padR} y1={t.y} y2={t.y} stroke={rgba(C.lilac, 0.12)} strokeDasharray="2 4" />
      ))}
      {/* y ticks */}
      {yTicks.map((t, i) => (
        <text key={i} x={padL - 6} y={t.y + 3} textAnchor="end" fontSize="9" fill={C.sub}>
          {t.v.toLocaleString("pt-BR")}
        </text>
      ))}
      {/* x labels */}
      {xLabels.map((l, i) =>
        l.show ? (
          <text key={i} x={l.x} y={H - 8} textAnchor="middle" fontSize="9" fill={C.sub}>
            {l.p}
          </text>
        ) : null
      )}
      {/* area under line */}
      <path
        d={`${path} L ${xFor(points.length - 1)} ${H - padB} L ${xFor(0)} ${H - padB} Z`}
        fill={rgba(color, 0.18)}
      />
      {/* line */}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${rgba(color, 0.5)})` }} />
      {/* points */}
      {points.map((_, i) => (
        <g key={i}>
          <circle cx={xFor(i)} cy={yFor(values[i])} r="3.5" fill={color} stroke={C.bg} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

function BarChart({ data, label, color = C.lilac, height = 180 }) {
  const W = 600;
  const H = height;
  const padL = 40;
  const padR = 12;
  const padT = 12;
  const padB = 32;
  const maxV = Math.max(...data.map((d) => d.value));
  const barW = (W - padL - padR) / data.length - 14;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      role="img"
      aria-label={label}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      {/* baseline */}
      <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} stroke={rgba(C.lilac, 0.2)} />
      {data.map((d, i) => {
        const h = (d.value / maxV) * (H - padT - padB);
        const x = padL + i * ((W - padL - padR) / data.length) + 7;
        const y = H - padB - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} fill={color} rx="3" style={{ filter: `drop-shadow(0 0 4px ${rgba(color, 0.4)})` }} />
            <text x={x + barW / 2} y={H - padB + 14} textAnchor="middle" fontSize="9" fill={C.sub}>
              {d.label}
            </text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="10" fill={C.text} fontWeight="700">
              {d.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DataCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <Panel className="p-4 sm:p-5 decode-card" style={{ background: C.panel }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold tracking-widest" style={{ color: C.lilac }}>{item.title}</p>
          {item.label && <p className="text-xs mt-0.5" style={{ color: C.sub }}>{item.label}</p>}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Ocultar fonte" : "Ver fonte"}
          className="p-1.5 rounded-lg focus:outline-none focus-visible:ring-2 min-h-[32px] min-w-[32px] flex items-center justify-center shrink-0"
          style={{ background: rgba(C.lilac, 0.1), color: C.lilac }}
        >
          {open ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
        </button>
      </div>
      {item.kind === "series" && (
        <LineChart points={item.points} values={item.values} label={`${item.title}: ${item.values[0]} a ${item.values[item.values.length - 1]} ${item.unit}`} color={C.lilac} />
      )}
      {item.kind === "compare" && (
        <BarChart data={item.data} label={`${item.title}: comparativo percentual`} color={C.amber} />
      )}
      {open && (
        <p className="text-[10px] mt-3 leading-relaxed" style={{ color: C.sub }}>
          Fonte: {item.src}
        </p>
      )}
    </Panel>
  );
}

export function DataLabScreen() {
  const series = DATA_LAB.filter((d) => d.kind === "series");
  const compare = DATA_LAB.filter((d) => d.kind === "compare");
  const kpis = DATA_LAB.filter((d) => d.kind === "kpi");
  return (
    <div>
      <ScreenHeader title="DataLab" />
      <p className="text-sm mb-1 font-bold leading-snug" style={{ color: C.text }}>Os dados por trás do sistema.</p>
      <p className="text-xs mb-5 sm:mb-6 leading-relaxed" style={{ color: C.sub }}>
        Visualizações interativas baseadas no Anuário Brasileiro de Segurança Pública 2025. Clique no canto superior direito de cada gráfico para ver a fonte.
      </p>

      <div className="mb-3"><SectionEyebrow accent>DECODE // KPI — NÚMEROS-CHAVE</SectionEyebrow></div>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {kpis.map((k) => (
          <StatTile
            key={k.id}
            value={k.value}
            label={k.title}
            src={k.src}
            color={C.lilac}
          />
        ))}
      </div>

      <div className="mb-3"><SectionEyebrow color={C.amber} accent>DECODE // SÉRIE HISTÓRICA</SectionEyebrow></div>
      <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {series.map((s) => <DataCard key={s.id} item={s} />)}
      </div>

      <div className="mb-3"><SectionEyebrow color={C.green} accent>DECODE // COMPARATIVO</SectionEyebrow></div>
      <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
        {compare.map((c) => <DataCard key={c.id} item={c} />)}
      </div>
    </div>
  );
}
