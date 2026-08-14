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
      <div className="flex min-h-screen">
        <Sidebar screen={screen} go={go} onExit={() => setExitOpen(true)} />
        <main ref={mainRef} id="main-content" tabIndex={-1} className="flex-1 p-5 pt-16 md:p-8 pb-24 md:pb-8 max-w-5xl w-full min-w-0 focus:outline-none">{body}</main>
        <MobileNav screen={screen} go={go} />
        <button onClick={() => setExitOpen(true)} className="md:hidden fixed top-4 right-4 z-20 px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 focus:outline-none focus-visible:ring-2" style={{ background: rgba(C.red, 0.15), color: C.red, border: `1px solid ${rgba(C.red, 0.3)}` }}>
          <LogOut size={11} aria-hidden="true" /> SAÍDA
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
        <div className="fixed bottom-16 md:bottom-4 left-0 right-0 text-center pointer-events-none">
          <span className="text-[10px]" style={{ color: rgba(C.sub, 0.6) }}>DECODE · Agosto Lilás — não armazenamos dados pessoais</span>
        </div>
      )}
    </div>
  );
}
