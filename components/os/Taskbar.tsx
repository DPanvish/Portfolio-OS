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
    <div className="h-12 w-full bg-slate-950/40 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-4 z-50 select-none shadow-[0_-5px_30px_rgba(0,0,0,0.5)]">
      
      {/* Start Button & Active Window Tabs */}
      <div className="flex items-center gap-3 h-full py-1.5 overflow-hidden">
        
        {/* Next-Level Start Button */}
        <button className="h-full px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-2 hover:from-cyan-400 hover:to-blue-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all flex-shrink-0 group">
          <span className="text-xl drop-shadow-md group-active:scale-90 transition-transform">⚡</span>
          <span className="hidden sm:inline tracking-wider uppercase text-xs">Start</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1 flex-shrink-0" />

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
                  flex items-center gap-2 px-4 py-1.5 h-full rounded-md max-w-[150px] flex-shrink-0 text-xs font-semibold transition-all duration-300
                  ${isFocused 
                    ? 'bg-cyan-500/20 text-cyan-300 shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border-b-2 border-cyan-400' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border-b-2 border-transparent'}
                `}
              >
                <span className="truncate">{app.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Tray (Status & Clock) */}
      <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 h-full py-1.5 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-4 px-4 h-full bg-black/30 rounded-md border border-white/5 shadow-inner backdrop-blur-sm">
          {/* Sound Toggle */}
          <button 
            onClick={() => useWindowStore.getState().toggleSound()} 
            className="hover:text-cyan-400 focus:outline-none flex items-center transition-colors group"
            title={useWindowStore.getState().soundEnabled ? "Mute sound" : "Enable sound"}
          >
            <span className="group-active:scale-90 transition-transform text-sm drop-shadow-md">
              {useWindowStore.getState().soundEnabled ? '🔊' : '🔇'}
            </span>
          </button>
          <span className="drop-shadow-md">🌐</span>
          <span className="text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.6)]">🔋 100%</span>
        </div>
        
        {/* Futuristic Clock */}
        <div className="px-4 h-full flex items-center bg-black/30 rounded-md min-w-[80px] justify-center border border-white/5 shadow-inner backdrop-blur-sm">
          <span className="text-cyan-300 tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}
