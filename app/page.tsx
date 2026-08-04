"use client";

import { useState } from "react";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import Window from "@/components/os/Window";
import BootSequence from "@/components/os/BootSequence";
import { useWindowStore } from "@/store/useWindowStore";

// Import Apps
import About from "@/components/apps/About";
import Experience from "@/components/apps/Experience";
import Projects from "@/components/apps/Projects";
import ProjectDetail from "@/components/apps/ProjectDetail";
import Skills from "@/components/apps/Skills";
import Contact from "@/components/apps/Contact";
import { OSWindow } from "@/store/useWindowStore";

// Dynamically render the correct app component based on the window state
const renderApp = (app: OSWindow) => {
  switch (app.component) {
    case 'About': return <About />;
    case 'Experience': return <Experience />;
    case 'Projects': return <Projects />;
    case 'ProjectDetail': return <ProjectDetail projectId={app.id} />;
    case 'Skills': return <Skills />;
    case 'Contact': return <Contact />;
    default:
      return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-slate-400 text-center">
          <span className="text-4xl mb-4">🚧</span>
          <p>The <strong>{app.component}</strong> app is currently under construction.</p>
          <p className="text-xs mt-2 opacity-60">We will build this out next in Phase 3.</p>
        </div>
      );
  }
};

export default function Home() {
  const [booted, setBooted] = useState(false);
  const { windows } = useWindowStore();
  const openApps = Object.values(windows);

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-900 text-slate-100">
      
      {/* The boot sequence will run once and then unmount */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Once booted, render the actual OS */}
      {booted && (
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
