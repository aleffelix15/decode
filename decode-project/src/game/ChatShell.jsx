import { C, rgba } from "../theme";
import { Panel } from "../components/ui";

/* Shared bubble/typing rendering for every chat-style chapter. The
   message list is a polite live region so screen-reader users hear
   each new line as it arrives, the same way a sighted user sees it. */
export function ChatShell({ transition, messages, visibleMsgs, typing, children, name = "Sofia", initial = "S" }) {
  return (
    <div>
      {transition && (
        <p className="text-center text-[10px] sm:text-[11px] font-semibold tracking-widest mb-3 sm:mb-4 px-2" style={{ color: C.sub }}>{transition}</p>
      )}
      <Panel className="p-3.5 sm:p-4 mb-3 sm:mb-4 max-w-xl">
        <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 border-b" style={{ borderColor: C.line }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: rgba(C.lilac, 0.25), color: C.text }} aria-hidden="true">{initial}</div>
          <div className="min-w-0">
            <p className="text-sm font-bold" style={{ color: C.text }}>{name}</p>
            <p className="text-[11px]" style={{ color: C.green }}><span aria-hidden="true">●</span> online</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-h-[100px]" aria-live="polite" aria-relevant="additions">
          {messages.slice(0, visibleMsgs).map((m, i) => (
            <div key={i} className="self-start max-w-[88%] sm:max-w-[85%] px-3 py-2 rounded-xl rounded-tl-sm text-sm break-words msg-enter" style={{ background: C.panel2, color: C.text }}>{m}</div>
          ))}
          {typing && (
            <div className="self-start px-3 py-2 rounded-xl rounded-tl-sm text-xs italic msg-enter" style={{ background: C.panel2, color: C.sub }}>{name} está digitando...</div>
          )}
        </div>
      </Panel>
      {children}
    </div>
  );
}
