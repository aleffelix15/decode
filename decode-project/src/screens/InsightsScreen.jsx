import { Lock } from "lucide-react";
import { C } from "../theme";
import { ScreenHeader, Panel } from "../components/ui";
import { INSIGHTS } from "../data";

export function InsightsScreen({ unlockedInsights }) {
  return (
    <div>
      <ScreenHeader title="Meus Insights" />
      <p className="text-sm mb-4 sm:mb-5 md:mb-6 leading-relaxed" style={{ color: C.sub }}>Cada capítulo da história pode revelar um insight sobre sinais de violência.</p>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {INSIGHTS.map((ins) => {
          const unlocked = unlockedInsights.has(ins.id);
          return (
            <Panel key={ins.id} className="p-3.5 sm:p-4" style={{ opacity: unlocked ? 1 : 0.55 }}>
              <div className="flex items-center gap-2 mb-2">
                {unlocked ? <ins.icon size={18} style={{ color: C.lilac }} className="shrink-0" /> : <Lock size={18} style={{ color: C.sub }} className="shrink-0" aria-hidden="true" />}
                <span className="font-bold text-sm break-words" style={{ color: C.text }}>{unlocked ? ins.title : "INSIGHT BLOQUEADO"}</span>
              </div>
              <p className="text-xs leading-relaxed break-words" style={{ color: C.sub }} aria-hidden={!unlocked}>{unlocked ? ins.text : "████████████████████████"}</p>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
