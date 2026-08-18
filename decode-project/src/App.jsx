import { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react";
import { C, rgba } from "./theme";
import { INSIGHT_BY_ID } from "./data";

import { Sidebar, MobileNav } from "./components/Nav";
import { ExitOverlay } from "./components/ExitOverlay";
import { BackdropGradient } from "./components/BackdropGradient";

import { Landing } from "./screens/Landing";
import { Onboarding } from "./screens/Onboarding";
import { Dashboard } from "./screens/Dashboard";
import { CaseSelectScreen } from "./screens/CaseSelectScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { ShieldScreen } from "./screens/ShieldScreen";
import { HelpScreen } from "./screens/HelpScreen";
import { AlgorithmScreen } from "./screens/AlgorithmScreen";
import { HiddenFilesScreen } from "./screens/HiddenFilesScreen";
import { FirewallScreen } from "./screens/FirewallScreen";
import { DataDashboardScreen } from "./screens/DataDashboardScreen";
import { RecoveredFilesScreen } from "./screens/RecoveredFilesScreen";
import { TriagemScreen } from "./screens/TriagemScreen";
import { TimelineScreen } from "./screens/TimelineScreen";
import { DataLabScreen } from "./screens/DataLabScreen";
import { BancaModeScreen } from "./screens/BancaModeScreen";

import { NarrativeGame } from "./game/NarrativeGame";
import { MarcosStory } from "./game/MarcosStory";

/* ------------------------------------------------------------------ */
/* MAIN APP — manual routing + all shared state                      */
/* Two story timelines tracked independently (Sofia / Marcos) so the  */
/* user can play both without losing progress in the current session. */
/* No persistence (privacy promise); all state resets on reload.      */
/* ------------------------------------------------------------------ */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [stage, setStage] = useState("intro"); // shared storyStage for whichever case is running
  const [activeCase, setActiveCase] = useState("sofia"); // "sofia" | "marcos"
  const [storySofia, setStorySofia] = useState({ chapter: 0, finished: false });
  const [storyMarcos, setStoryMarcos] = useState({ chapter: 0, finished: false });
  const [detectedSofia, setDetectedSofia] = useState(new Set());
  const [detectedMarcos, setDetectedMarcos] = useState(new Set());
  const [unlockedInsights, setUnlockedInsights] = useState(new Set());
  const [profileId, setProfileId] = useState(null);
  const [profileIdMarcos, setProfileIdMarcos] = useState(null);
  const [exitOpen, setExitOpen] = useState(false);
  const [bancascript, setBancascript] = useState(false);
  const [metricsSofia, setMetricsSofia] = useState({ awareness: 0, support: 0, risk: 0 });
  const [metricsMarcos, setMetricsMarcos] = useState({ awareness: 0, support: 0, risk: 0 });
  const [finalMetricsSofia, setFinalMetricsSofia] = useState(null);
  const [finalMetricsMarcos, setFinalMetricsMarcos] = useState(null);
  const escCount = useRef(0);
  const escTimer = useRef(null);

  // Map the active case's data onto the shared stage.
  const detected = activeCase === "sofia" ? detectedSofia : detectedMarcos;
  const setDetected = activeCase === "sofia" ? setDetectedSofia : setDetectedMarcos;
  const currentStory = activeCase === "sofia" ? storySofia : storyMarcos;
  const setCurrentStory = activeCase === "sofia" ? setStorySofia : setStoryMarcos;
  const currentProfile = activeCase === "sofia" ? profileId : profileIdMarcos;
  const setCurrentProfile = activeCase === "sofia" ? setProfileId : setProfileIdMarcos;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        escCount.current += 1;
        clearTimeout(escTimer.current);
        escTimer.current = setTimeout(() => (escCount.current = 0), 1200);
        if (escCount.current >= 3) { setExitOpen(true); escCount.current = 0; }
      }
      if (e.shiftKey && (e.key === "B" || e.key === "b")) {
        if (screen !== "landing" && screen !== "onboarding") setScreen("banca");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

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
    if (currentStory.finished) {
      setStage("result");
    } else if (currentStory.chapter === 0) {
      setStage("intro");
    } else {
      setStage(currentStory.chapter);
    }
  };

  const openMarcos = () => {
    setActiveCase("marcos");
    setScreen("game");
    if (storyMarcos.finished) setStage("b-result");
    else if (storyMarcos.chapter === 0) setStage("b-intro");
    else setStage(`b-${storyMarcos.chapter}`);
  };

  const handleChapterDone = (payload, impact) => {
    if (activeCase === "sofia") handleSofiaChapterDone(payload, impact);
    else handleMarcosChapterDone(payload, impact);
  };

  const handleSofiaChapterDone = (payload, impact) => {
    if (stage === "intro") { setStage(0); return; }
    if (stage === 0 || stage === 1 || stage === 2) {
      unlockPattern(payload);
      if (impact) {
        setMetricsSofia((m) => ({ awareness: m.awareness + (impact.awareness || 0), support: m.support + (impact.support || 0), risk: m.risk + (impact.risk || 0) }));
      }
      const next = stage + 1;
      setStorySofia((s) => ({ ...s, chapter: next }));
      setStage(next);
      return;
    }
    if (stage === 3) {
      unlockPattern("psicologica");
      unlockPattern("ciclo");
      setDetectedSofia((prev) => new Set(prev).add("patrimonial"));
      setStorySofia((s) => ({ ...s, chapter: 4 }));
      setStage(4);
      return;
    }
    if (stage === 4) {
      const { good, bad, manipulacaoDetected } = payload;
      if (manipulacaoDetected) unlockPattern("manipulacao");
      const earlyScore = ["controle", "privacidade", "isolamento"].filter((id) => detectedSofia.has(id)).length;
      const total = earlyScore + good - bad;
      const profile = total >= 6 ? "apoio" : total >= 2 ? "alerta" : "invisiveis";
      setProfileId(profile);
      const allPatterns = ["controle", "privacidade", "isolamento", "psicologica", "ciclo", "manipulacao"].every((id) => detectedSofia.has(id) || id === "manipulacao" && manipulacaoDetected);
      setFinalMetricsSofia({ ...metricsSofia, good, bad, allPatterns });
      setStorySofia({ chapter: 5, finished: true });
      setStage("result");
    }
  };

  const handleMarcosChapterDone = (payload, impact) => {
    if (stage === "b-intro") { setStage("b-0"); return; }
    if (stage === "b-0" || stage === "b-1" || stage === "b-2") {
      unlockPattern(payload);
      if (impact) {
        setMetricsMarcos((m) => ({ awareness: m.awareness + (impact.awareness || 0), support: m.support + (impact.support || 0), risk: m.risk + (impact.risk || 0) }));
      }
      const next = Number(stage.slice(2)) + 1;
      setStoryMarcos((s) => ({ ...s, chapter: next }));
      setStage(`b-${next}`);
      return;
    }
    if (stage === "b-3") {
      unlockPattern("chantagem");
      unlockPattern("ameaca-indireta");
      setStoryMarcos((s) => ({ ...s, chapter: 4 }));
      setStage("b-4");
      return;
    }
    if (stage === "b-4") {
      const { good, bad, manipulacaoDetected } = payload;
      if (manipulacaoDetected) unlockPattern("stalkerware");
      const earlyScore = ["stalking", "dependencia", "stalkerware"].filter((id) => detectedMarcos.has(id)).length;
      const total = earlyScore + good - bad;
      const profile = total >= 5 ? "blindada" : total >= 2 ? "alerta" : "acomodada";
      setProfileIdMarcos(profile);
      const allPatterns = ["stalking", "dependencia", "stalkerware", "chantagem", "ameaca-indireta"].every((id) => detectedMarcos.has(id) || id === "stalkerware" && manipulacaoDetected);
      setFinalMetricsMarcos({ ...metricsMarcos, good, bad, allPatterns });
      setStoryMarcos({ chapter: 5, finished: true });
      setStage("b-result");
    }
  };

  const onModule = (s) => setScreen(s);

  // Pick a backdrop stage that matches the current surface.
  const backdropStage = (() => {
    if (screen === "landing" || screen === "onboarding") return "landing";
    if (screen === "game" && (stage === "result" || stage === "b-result")) return "result";
    if (screen === "game") return "story";
    if (screen === "datalab") return "data";
    return "module";
  })();

  let content;
  if (screen === "landing") {
    content = <Landing onStart={() => setScreen("onboarding")} onHow={() => setScreen("onboarding")} />;
  } else if (screen === "onboarding") {
    content = <Onboarding onDone={() => setScreen("dashboard")} />;
  } else {
    let body;
    if (screen === "dashboard") body = <Dashboard storySofia={storySofia} storyMarcos={storyMarcos} unlockedInsights={unlockedInsights} go={go} onPlaySofia={() => { setActiveCase("sofia"); openStory(); }} onPlayMarcos={openMarcos} onTriagem={() => go("triagem")} onDataLab={() => go("datalab")} onBanca={() => go("banca")} />;
    else if (screen === "levels") body = <CaseSelectScreen storySofia={storySofia} storyMarcos={storyMarcos} onPlaySofia={() => { setActiveCase("sofia"); openStory(); }} onPlayMarcos={openMarcos} />;
    else if (screen === "insights") body = <InsightsScreen unlockedInsights={unlockedInsights} />;
    else if (screen === "shield") body = <ShieldScreen storySofia={storySofia} storyMarcos={storyMarcos} unlockedInsights={unlockedInsights} />;
    else if (screen === "help") body = <HelpScreen onBanca={() => go("banca")} />;
    else if (screen === "algorithm") body = <AlgorithmScreen />;
    else if (screen === "hiddenfiles") body = <HiddenFilesScreen />;
    else if (screen === "firewall") body = <FirewallScreen />;
    else if (screen === "data") body = <DataDashboardScreen />;
    else if (screen === "datalab") body = <DataLabScreen />;
    else if (screen === "recovered") body = <RecoveredFilesScreen onDiscover={unlockPattern} />;
    else if (screen === "triagem") body = <TriagemScreen />;
    else if (screen === "timeline") body = <TimelineScreen />;
    else if (screen === "banca") body = <BancaModeScreen go={go} running={bancascript} setRunning={setBancascript} onPlaySofia={() => { setActiveCase("sofia"); openStory(); }} onPlayMarcos={openMarcos} />;
    else if (screen === "game") {
      const onExit = () => setScreen("dashboard");
      if (activeCase === "marcos") {
        body = (
          <MarcosStory
            stage={stage}
            detected={detectedMarcos}
            profileId={profileIdMarcos}
            metrics={finalMetricsMarcos}
            onChapterDone={handleChapterDone}
            onExit={onExit}
            onModule={onModule}
          />
        );
      } else {
        body = (
          <NarrativeGame
            stage={stage}
            detected={detectedSofia}
            profileId={profileId}
            metrics={finalMetricsSofia}
            onChapterDone={handleChapterDone}
            onExit={onExit}
            onModule={onModule}
          />
        );
      }
    }

    content = (
      <div className="relative flex min-h-screen w-full">
        <BackdropGradient stage={backdropStage} />
        <div className="relative z-10 flex min-h-screen w-full">
          <Sidebar screen={screen} go={go} onExit={() => setExitOpen(true)} />
          <main
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
            zIndex: 5,
          }}
        >
          <span className="text-[10px]" style={{ color: rgba(C.sub, 0.6) }}>DECODE · Agosto Lilás — não armazenamos dados pessoais</span>
        </div>
      )}
    </div>
  );
}
