import { Lock, Sparkles, Crosshair } from "lucide-react";
import { C } from "../theme";
import { ScreenHeader, Panel } from "../components/ui";
import { ConceptCard } from "../components/ConceptCard";
import { SectionEyebrow } from "../components/SectionEyebrow";
import { INSIGHTS, INSIGHTS_B } from "../data";

export function InsightsScreen({ unlockedInsights }) {
  return (
    <div>
      <ScreenHeader title="Meus Insights" />
      <p className="text-sm mb-4 sm:mb-5 md:mb-6 leading-relaxed" style={{ color: C.sub }}>Cada capítulo da história pode revelar um insight sobre sinais de violência.</p>

      <div className="mb-5 sm:mb-6">
        <div className="mb-3"><SectionEyebrow>CASO 01 — SOFIA</SectionEyebrow></div>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {INSIGHTS.map((ins) => {
            const unlocked = unlockedInsights.has(ins.id);
            return (
              <ConceptCard
                key={ins.id}
                icon={unlocked ? ins.icon : Lock}
                title={unlocked ? ins.title : "INSIGHT BLOQUEADO"}
                text={ins.text}
                locked={!unlocked}
              />
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-3"><SectionEyebrow color={C.amber} accent>CASO 02 — MARCOS</SectionEyebrow></div>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {INSIGHTS_B.map((ins) => {
            const unlocked = unlockedInsights.has(ins.id);
            return (
              <ConceptCard
                key={ins.id}
                icon={unlocked ? ins.icon : Lock}
                title={unlocked ? ins.title : "INSIGHT BLOQUEADO"}
                text={ins.text}
                locked={!unlocked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
