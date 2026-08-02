"use client";

import React from "react";
import { useWindowStore } from "@/store/useWindowStore";

// The apps available on the desktop
const desktopApps = [
  { id: "about", title: "About.txt", component: "About" },
  { id: "experience", title: "Experience", component: "Experience" },
  { id: "projects", title: "Projects", component: "Projects" },
  { id: "skills", title: "Task Manager", component: "Skills" },
  { id: "terminal", title: "Terminal", component: "Terminal" }
];

export default function Desktop({ children }: { children: React.ReactNode }) {
  const { openWindow } = useWindowStore();

  return (
    // h-[calc(100vh-3rem)] leaves exactly 3rem (48px) at the bottom for the Taskbar
    <div className="relative w-full h-[calc(100vh-3rem)] os-wallpaper-pattern flex flex-col p-4">
      
      {/* Desktop Icons Grid (Top-to-bottom layout, typical of classic OS) */}
      <div className="flex flex-col flex-wrap h-full gap-6 w-24 align-start">
        {desktopApps.map((app) => (
          <button
            key={app.id}
            // Classic OS behavior: Double-click to open
            onDoubleClick={() => openWindow(app.id, app.title, app.component)}
            // Fallback for mobile/touch: Single click opens
            onTouchEnd={() => openWindow(app.id, app.title, app.component)}
            className="flex flex-col items-center gap-1.5 group focus:outline-none"
          >
            {/* Icon Visual */}
            <div className="w-12 h-12 bg-slate-800/80 border border-slate-600/50 rounded-xl shadow-lg flex items-center justify-center group-hover:bg-slate-700 group-hover:border-os-accent/50 transition-all group-active:scale-95">
              <span className="text-xl text-os-accent group-hover:scale-110 transition-transform">
                {app.id === 'terminal' ? '>_' : app.id === 'about' ? '📝' : '📁'}
              </span>
            </div>
            
            {/* Icon Label */}
            <span className="text-xs font-medium text-slate-100 bg-slate-900/60 px-2 py-0.5 rounded shadow-sm backdrop-blur-sm group-hover:bg-os-accent group-hover:text-slate-900 transition-colors pointer-events-none">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* Render open windows here */}
      {children}
    </div>
  );
}
