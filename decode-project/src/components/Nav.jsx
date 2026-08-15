import { LogOut } from "lucide-react";
import { C, rgba } from "../theme";
import { NAV_ITEMS } from "../data";

export function Sidebar({ screen, go, onExit }) {
  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 p-5 border-r" style={{ borderColor: C.line, background: C.panel }}>
      <div className="mb-8">
        <div className="font-black text-xl tracking-tight" style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}>DECODE</div>
        <div className="text-[10px] tracking-widest mt-1" style={{ color: C.lilac }}>AGOSTO LILÁS</div>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Navegação principal">
        {NAV_ITEMS.map((it) => {
          const active = screen === it.id || (it.id === "levels" && screen === "game");
          return (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              aria-current={active ? "page" : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left focus:outline-none focus-visible:ring-2"
              style={{
                background: active ? rgba(C.lilac, 0.15) : "transparent",
                color: active ? C.text : C.sub,
                borderLeft: active ? `2px solid ${C.lilac}` : "2px solid transparent",
              }}
            >
              <it.icon size={17} />
              {it.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-6">
        <button onClick={onExit} className="w-full flex items-center gap-2 justify-center px-3 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus-visible:ring-2" style={{ background: rgba(C.red, 0.12), color: C.red, border: `1px solid ${rgba(C.red, 0.3)}` }}>
          <LogOut size={14} /> SAÍDA RÁPIDA
        </button>
      </div>
    </aside>
  );
}

export function MobileNav({ screen, go }) {
  return (
    <nav
      className="md:hidden fixed left-0 right-0 flex justify-around items-center py-2 border-t z-30"
      style={{
        bottom: "max(0px, env(safe-area-inset-bottom, 0px))",
        background: C.panel,
        borderColor: C.line,
      }}
      aria-label="Navegação principal"
    >
      {NAV_ITEMS.map((it) => {
        const active = screen === it.id || (it.id === "levels" && screen === "game");
        return (
          <button key={it.id} onClick={() => go(it.id)} aria-current={active ? "page" : undefined} className="flex flex-col items-center gap-1 px-2 py-2 min-h-[48px] min-w-[48px] text-[10px] font-medium focus:outline-none" style={{ color: active ? C.lilac : C.sub }}>
            <it.icon size={19} />
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}
