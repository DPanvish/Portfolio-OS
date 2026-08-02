"use client";

import React, { useState, useEffect } from "react";
import { useWindowStore } from "@/store/useWindowStore";

export default function Taskbar() {
  const { windows, windowOrder, restoreWindow, focusWindow } = useWindowStore();
  const [time, setTime] = useState("");

  // Live Clock effect for the system tray
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openApps = Object.values(windows);
  const focusedWindowId = windowOrder.length > 0 ? windowOrder[windowOrder.length - 1] : null;

  return (
    <div className="h-12 w-full bg-slate-900/90 backdrop-blur-md border-t border-slate-700/50 flex items-center justify-between px-4 z-50 select-none">
      
      {/* Start Button & Active Window Tabs */}
      <div className="flex items-center gap-2 h-full py-1.5 overflow-hidden">
        
        {/* Fake Start Button */}
        <button className="h-full px-4 bg-os-accent text-slate-900 font-bold rounded-md shadow flex items-center gap-2 hover:bg-sky-300 transition-colors flex-shrink-0">
          <span>{`{ }`}</span>
          <span className="hidden sm:inline">Start</span>
        </button>

        <div className="w-px h-full bg-slate-700 mx-1 flex-shrink-0" />

        {/* Minimized / Active Window Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pr-2">
          {openApps.map((app) => {
            const isFocused = focusedWindowId === app.id && !app.isMinimized;
            return (
              <button
                key={app.id}
                onClick={() => {
                  if (app.isMinimized) {
                    restoreWindow(app.id);
                  } else if (!isFocused) {
                    focusWindow(app.id);
                  }
                }}
                className={`
                  flex items-center gap-2 px-3 py-1.5 h-full rounded-md max-w-[150px] flex-shrink-0 text-xs transition-colors
                  ${isFocused 
                    ? 'bg-slate-700 text-slate-100 shadow-inner border-b-2 border-os-accent' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700/70 border-b-2 border-transparent'}
                `}
              >
                <span className="truncate">{app.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Tray (Status & Clock) */}
      <div className="flex items-center gap-4 text-xs font-medium text-slate-300 h-full py-1.5 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-3 px-3 h-full bg-slate-800/50 rounded-md">
          <span>🌐</span>
          <span>🔋 100%</span>
        </div>
        <div className="px-3 h-full flex items-center bg-slate-800/50 rounded-md min-w-[70px] justify-center">
          {time}
        </div>
      </div>
    </div>
  );
}
