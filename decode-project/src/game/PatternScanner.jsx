import { useState } from "react";
import { Scan, ChevronRight } from "lucide-react";
import { C, rgba } from "../theme";
import { Panel } from "../components/ui";
import { REPORT_CONCEPTS } from "../data";

function ScannerList({ items }) {
  return (
    <>
      {items.length === 0 && <p className="text-xs" style={{ color: C.sub }}>Nenhum padrão detectado ainda.</p>}
      <div className="flex flex-col gap-2">
        {items.map((c, idx) => (
          <div key={c.id} className="flex items-center gap-2 text-xs font-medium" style={{ color: C.text }}>
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" style={{ background: rgba(C.lilac, 0.18), color: C.lilac }}>
              {String(idx + 1).padStart(2, "0")}
            </span>
            {c.label}
          </div>
        ))}
      </div>
    </>
  );
}

export function PatternScanner({ detected, concepts = REPORT_CONCEPTS }) {
  const [open, setOpen] = useState(false);
  const items = concepts.filter((c) => detected.has(c.id));
  return (
    <>
      {/* desktop */}
      <Panel className="p-3.5 sm:p-4 hidden md:block w-64 shrink-0 h-fit sticky top-6">
        <div className="flex items-center gap-2 mb-3" style={{ color: C.lilac }}>
          <Scan size={15} aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-widest">ANÁLISE DE PADRÕES</span>
        </div>
        <ScannerList items={items} />
      </Panel>
      {/* mobile expandable */}
      <div className="md:hidden mb-3 sm:mb-4 order-first w-full">
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 rounded-lg border text-xs font-bold tracking-widest focus:outline-none focus-visible:ring-2 min-h-[44px]" style={{ borderColor: C.line, color: C.lilac, background: C.panel2 }}>
          <span className="flex items-center gap-2 min-w-0"><Scan size={14} aria-hidden="true" /> <span className="truncate">ANÁLISE DE PADRÕES ({items.length})</span></span>
          <ChevronRight size={14} aria-hidden="true" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </button>
        {open && (
          <Panel className="p-3 mt-2">
            <ScannerList items={items} />
          </Panel>
        )}
      </div>
    </>
  );
}
