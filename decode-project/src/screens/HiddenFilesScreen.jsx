import { useState } from "react";
import { FileWarning } from "lucide-react";
import { C, rgba } from "../theme";
import { ScreenHeader } from "../components/ui";
import { HIDDEN_FILES } from "../data";

export function HiddenFilesScreen() {
  const [open, setOpen] = useState({});
  return (
    <div>
      <ScreenHeader title="Arquivos Ocultos" />
      <p className="text-sm mb-4" style={{ color: C.sub }}>Toque em cada arquivo para decodificar o tipo de violência.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {HIDDEN_FILES.map((f, i) => (
          <button
            key={i}
            onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
            aria-expanded={!!open[i]}
            className="text-left p-4 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2"
            style={{ borderColor: open[i] ? rgba(C.lilac, 0.5) : C.line, background: C.panel2 }}
          >
            <div className="flex items-center gap-2 mb-2" style={{ color: C.sub }}>
              <FileWarning size={14} aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-widest">ARQUIVO {i + 1}</span>
            </div>
            <p className="text-sm font-semibold" style={{ color: C.text }}>{f.text}</p>
            {open[i] && <p className="text-xs font-bold mt-3 pt-3 border-t" style={{ color: C.lilac, borderColor: C.line }}>{f.reveal}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}
