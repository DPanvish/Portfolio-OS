"use client";

import { useState, useEffect } from "react";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import Window from "@/components/os/Window";
import BootSequence from "@/components/os/BootSequence";
import LoginScreen from "@/components/os/LoginScreen";
import { useWindowStore } from "@/store/useWindowStore";

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
  const [appState, setAppState] = useState<'booting' | 'login' | 'desktop'>('booting');
  const { windows } = useWindowStore();
  const openApps = Object.values(windows);

  useEffect(() => {
    // If they already logged in this session, skip straight to desktop
    const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
    if (hasLoggedIn === "true") {
      setAppState('desktop');
    }
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-900 text-slate-100">
      
      {/* 1. Cinematic Boot Sequence */}
      {appState === 'booting' && (
        <BootSequence onComplete={() => setAppState('login')} />
      )}

      {/* 2. Real-style OS Login Screen */}
      {appState === 'login' && (
        <LoginScreen onLogin={() => {
          sessionStorage.setItem("hasLoggedIn", "true");
          setAppState('desktop');
        }} />
      )}

      {/* 3. The Desktop Environment */}
      {appState === 'desktop' && (
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

    </main>
  );
}
