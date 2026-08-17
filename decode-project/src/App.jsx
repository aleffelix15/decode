import { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react";
import { C, rgba } from "./theme";
import { INSIGHT_BY_ID } from "./data";

import { Sidebar, MobileNav } from "./components/Nav";
import { ExitOverlay } from "./components/ExitOverlay";

import { Landing } from "./screens/Landing";
import { Onboarding } from "./screens/Onboarding";
import { Dashboard } from "./screens/Dashboard";
import { LevelSelect } from "./screens/LevelSelect";
import { InsightsScreen } from "./screens/InsightsScreen";
import { ShieldScreen } from "./screens/ShieldScreen";
import { HelpScreen } from "./screens/HelpScreen";
import { AlgorithmScreen } from "./screens/AlgorithmScreen";
import { HiddenFilesScreen } from "./screens/HiddenFilesScreen";
import { FirewallScreen } from "./screens/FirewallScreen";
import { DataDashboardScreen } from "./screens/DataDashboardScreen";
import { RecoveredFilesScreen } from "./screens/RecoveredFilesScreen";

import { NarrativeGame } from "./game/NarrativeGame";

/* ------------------------------------------------------------------ */
/* MAIN APP — routing (manual, no router) + all shared state          */
/* ------------------------------------------------------------------ */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [storyStage, setStoryStage] = useState("intro"); // "intro" | 0..4 | "result"
  const [story, setStory] = useState({ chapter: 0, finished: false });
  const [detected, setDetected] = useState(new Set());
  const [unlockedInsights, setUnlockedInsights] = useState(new Set());
  const [profileId, setProfileId] = useState(null);
  const [exitOpen, setExitOpen] = useState(false);
  const escCount = useRef(0);
  const escTimer = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        escCount.current += 1;
        clearTimeout(escTimer.current);
        escTimer.current = setTimeout(() => (escCount.current = 0), 1200);
        if (escCount.current >= 3) { setExitOpen(true); escCount.current = 0; }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (s) => setScreen(s);

  const unlockPattern = (patternId) => {
    if (!patternId) return;
    setDetected((prev) => new Set(prev).add(patternId));
    if (INSIGHT_BY_ID[patternId]) {
      setUnlockedInsights((prev) => new Set(prev).add(patternId));
    }
  };

  const openStory = () => {
    setScreen("game");
    if (story.finished) setStoryStage("result");
    else setStoryStage(story.chapter < 5 ? (story.chapter === 0 ? "intro" : story.chapter) : "result");
  };

  const handleChapterDone = (payload) => {
    if (storyStage === "intro") {
      setStoryStage(0);
      return;
    }
    if (storyStage === 0 || storyStage === 1 || storyStage === 2) {
      unlockPattern(payload);
      const next = storyStage + 1;
      setStory((s) => ({ ...s, chapter: next }));
      setStoryStage(next);
      return;
    }
    if (storyStage === 3) {
      unlockPattern("psicologica");
      unlockPattern("ciclo");
      setDetected((prev) => new Set(prev).add("patrimonial"));
      setStory((s) => ({ ...s, chapter: 4 }));
      setStoryStage(4);
      return;
    }
    if (storyStage === 4) {
      const { good, bad, manipulacaoDetected } = payload;
      if (manipulacaoDetected) unlockPattern("manipulacao");
      const earlyScore = ["controle", "privacidade", "isolamento"].filter((id) => detected.has(id)).length;
      const total = earlyScore + good - bad;
      const profile = total >= 6 ? "apoio" : total >= 2 ? "alerta" : "invisiveis";
      setProfileId(profile);
      setStory({ chapter: 5, finished: true });
      setStoryStage("result");
    }
  };

  let content;
  if (screen === "landing") {
    content = <Landing onStart={() => setScreen("onboarding")} onHow={() => setScreen("onboarding")} />;
  } else if (screen === "onboarding") {
    content = <Onboarding onDone={() => setScreen("dashboard")} />;
  } else {
    let body;
    if (screen === "dashboard") body = <Dashboard story={story} unlockedInsights={unlockedInsights} go={go} onPlay={openStory} />;
    else if (screen === "levels") body = <LevelSelect story={story} onPlay={openStory} />;
    else if (screen === "insights") body = <InsightsScreen unlockedInsights={unlockedInsights} />;
    else if (screen === "shield") body = <ShieldScreen story={story} unlockedInsights={unlockedInsights} />;
    else if (screen === "help") body = <HelpScreen />;
    else if (screen === "algorithm") body = <AlgorithmScreen />;
    else if (screen === "hiddenfiles") body = <HiddenFilesScreen />;
    else if (screen === "firewall") body = <FirewallScreen />;
    else if (screen === "data") body = <DataDashboardScreen />;
    else if (screen === "recovered") body = <RecoveredFilesScreen onDiscover={unlockPattern} />;
    else if (screen === "game") {
      body = (
        <NarrativeGame
          stage={storyStage}
          detected={detected}
          profileId={profileId}
          onChapterDone={handleChapterDone}
          onExit={() => setScreen("dashboard")}
          onModule={(s) => setScreen(s)}
        />
      );
    }

    content = (
      <div className="flex min-h-screen w-full">
        <Sidebar screen={screen} go={go} onExit={() => setExitOpen(true)} />
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="flex-1 p-3 xs:p-4 sm:p-5 pt-16 xs:pt-18 sm:pt-20 md:p-8 md:pt-20 lg:p-10 pb-28 xs:pb-32 sm:pb-36 md:pb-10 lg:pb-10 max-w-7xl lg:mx-auto w-full min-w-0 focus:outline-none"
          style={{
            paddingTop: "max(4.5rem, calc(4.5rem + env(safe-area-inset-top, 0px)))",
          }}
        >{body}</main>
        <MobileNav screen={screen} go={go} />
        <button
          onClick={() => setExitOpen(true)}
          aria-label="Saída rápida"
          className="md:hidden fixed right-3 sm:right-4 z-20 min-h-[40px] min-w-[40px] xs:min-h-[44px] xs:min-w-[44px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 focus:outline-none focus-visible:ring-2 shadow-lg"
          style={{
            top: "max(0.75rem, env(safe-area-inset-top, 0px))",
            background: rgba(C.red, 0.18),
            color: C.red,
            border: `1px solid ${rgba(C.red, 0.4)}`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <LogOut size={14} aria-hidden="true" className="sm:w-3.5 sm:h-3.5" /> SAIR
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" style={{ background: C.bg, color: C.text, fontFamily: "'Manrope', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
        button:focus-visible { outline: 2px solid ${C.lilac}; outline-offset: 2px; }
        :focus-visible { --tw-ring-color: ${rgba(C.lilac, 0.5)}; }
        .skip-link {
          position: absolute; top: -100px; left: 1rem; z-index: 100;
          background: ${C.lilac}; color: #fff; padding: 0.6rem 1rem;
          border-radius: 0.5rem; font-weight: 700; font-size: 0.8rem;
          transition: top 0.15s ease;
        }
        .skip-link:focus { top: 1rem; }
      `}</style>
      {screen !== "landing" && screen !== "onboarding" && (
        <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      )}
      {content}
      {exitOpen && <ExitOverlay onClose={() => setExitOpen(false)} />}
      {screen !== "landing" && screen !== "onboarding" && (
        <div
          className="hidden md:block fixed left-0 right-0 text-center pointer-events-none"
          style={{
            bottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <span className="text-[10px]" style={{ color: rgba(C.sub, 0.6) }}>DECODE · Agosto Lilás — não armazenamos dados pessoais</span>
        </div>
      )}
    </div>
  );
}
