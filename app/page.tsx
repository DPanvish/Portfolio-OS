"use client";

import { useState, useEffect } from "react";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import Window from "@/components/os/Window";
import BootSequence from "@/components/os/BootSequence";
import LoginScreen from "@/components/os/LoginScreen";
import { useWindowStore } from "@/store/useWindowStore";
import MobileDesktop from "@/components/os/MobileDesktop";
import { useIsMobile } from "@/hooks/useIsMobile";

// Import Apps
import About from "@/components/apps/About";
import Experience from "@/components/apps/Experience";
import Projects from "@/components/apps/Projects";
import ProjectDetail from "@/components/apps/ProjectDetail";
import Skills from "@/components/apps/Skills";
import Contact from "@/components/apps/Contact";
import Terminal from "@/components/apps/Terminal";

// Dynamically render the correct app component based on the window state
const renderApp = (app: OSWindow) => {
  switch (app.component) {
    case 'About': return <About />;
    case 'Experience': return <Experience />;
    case 'Projects': return <Projects />;
    case 'ProjectDetail': return <ProjectDetail projectId={app.id} />;
    case 'Skills': return <Skills />;
    case 'Contact': return <Contact />;
    case 'Terminal': return <Terminal />;
    default:
      return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-slate-400 text-center">
          <span className="text-4xl mb-4">🚧</span>
          <p>The <strong>{app.component}</strong> app is currently under construction.</p>
        </div>
      );
  }
};

export default function Home() {
  const [appState, setAppState] = useState<'pre-boot' | 'booting' | 'login' | 'desktop'>('pre-boot');
  const { windows } = useWindowStore();
  const openApps = Object.values(windows);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Intentionally removed sessionStorage check per user request.
    // On hard reload, the OS will always reset to the power-on/login sequence.
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-900 text-slate-100">
      
      {/* 0. Audio Authorization Screen (Browsers require a click to play audio) */}
      {appState === 'pre-boot' && (
        <div 
          onClick={() => setAppState('booting')}
          className="absolute inset-0 z-[10000] bg-black flex flex-col items-center justify-center cursor-pointer hover:bg-slate-950 transition-colors"
        >
          <div className="w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center mb-6 animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-2xl text-slate-300">⏻</span>
          </div>
          <p className="text-slate-400 font-mono tracking-widest text-sm animate-bounce">CLICK TO POWER ON</p>
        </div>
      )}

      {/* 1. Cinematic Boot Sequence */}
      {appState === 'booting' && (
        <BootSequence onComplete={() => setAppState('login')} />
      )}

      {/* 2. Real-style OS Login Screen */}
      {appState === 'login' && (
        <LoginScreen onLogin={() => {
          setAppState('desktop');
        }} />
      )}

      {/* 3. The Desktop Environment */}
      {appState === 'desktop' && (
        <>
          {isMobile ? (
            <MobileDesktop renderApp={renderApp} />
          ) : (
            <>
              <Desktop>
                {/* Dynamically render all open windows */}
                {openApps.map((app) => (
                  <Window key={app.id} id={app.id} title={app.title}>
                    {renderApp(app)}
                  </Window>
                ))}
              </Desktop>
              <Taskbar />
            </>
          )}
        </>
      )}

    </main>
  );
}
