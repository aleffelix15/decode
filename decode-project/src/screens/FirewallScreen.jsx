import { Lock } from "lucide-react";
import { C } from "../theme";
import { ScreenHeader, Panel } from "../components/ui";
import { FIREWALL_ITEMS } from "../data";

export function FirewallScreen() {
  return (
    <div>
      <ScreenHeader title="Firewall" />
      <p className="text-sm mb-4" style={{ color: C.sub }}>Informação em linguagem simples. Para orientação jurídica completa, procure a Defensoria Pública ou a Delegacia da Mulher.</p>
      <div className="flex flex-col gap-3 max-w-2xl">
        {FIREWALL_ITEMS.map((it, i) => (
          <Panel key={i} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock size={14} style={{ color: C.lilac }} aria-hidden="true" />
              <p className="font-bold text-sm" style={{ color: C.text }}>{it.title}</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: C.sub }}>{it.text}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
