import { C } from "../theme";
import { ScreenHeader, Panel } from "../components/ui";
import { DATA_STATS } from "../data";

export function DataDashboardScreen() {
  return (
    <div>
      <ScreenHeader title="Relatório de Dados" />
      <p className="text-sm mb-1 font-bold" style={{ color: C.text }}>Por que precisamos atualizar o sistema?</p>
      <p className="text-xs mb-6" style={{ color: C.sub }}>Dados oficiais mais recentes sobre violência contra a mulher no Brasil.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {DATA_STATS.map((s, i) => (
          <Panel key={i} className="p-4">
            <p className="text-2xl font-black" style={{ color: C.lilac, fontFamily: "'IBM Plex Mono', monospace" }}>{s.n}</p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: C.text }}>{s.label}</p>
            <p className="text-[10px] mt-2" style={{ color: C.sub }}>Fonte: {s.src}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
