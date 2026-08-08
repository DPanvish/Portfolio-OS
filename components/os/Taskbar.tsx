"use client";

import React, { useState, useEffect } from "react";
import { useWindowStore } from "@/store/useWindowStore";

export default function Taskbar() {
  const { windows, windowOrder, restoreWindow, focusWindow } = useWindowStore();
  const [time, setTime] = useState("");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [battery, setBattery] = useState({ level: 100, charging: false });

  // Live Clock & Battery effect for the system tray
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Read real battery status if supported
    if ((navigator as any).getBattery) {
      (navigator as any).getBattery().then((b: any) => {
        setBattery({ level: Math.round(b.level * 100), charging: b.charging });
        b.addEventListener('levelchange', () => setBattery(prev => ({ ...prev, level: Math.round(b.level * 100) })));
        b.addEventListener('chargingchange', () => setBattery(prev => ({ ...prev, charging: b.charging })));
      });
    }

    return () => clearInterval(interval);
  }, []);

  const openApps = Object.values(windows);
  const focusedWindowId = windowOrder.length > 0 ? windowOrder[windowOrder.length - 1] : null;

  // Apps for the start menu (hardcoded to match desktopApps for now)
  const menuApps = [
    { id: "about", title: "About.txt", component: "About", icon: "📝" },
    { id: "experience", title: "Experience", component: "Experience", icon: "💼" },
    { id: "projects", title: "Projects", component: "Projects", icon: "🚀" },
    { id: "skills", title: "System Info", component: "Skills", icon: "📊" },
    { id: "contact", title: "Mail", component: "Contact", icon: "✉️" },
    { id: "terminal", title: "Terminal", component: "Terminal", icon: "⌨️" }
  ];

  return (
    <div className="h-12 w-full bg-slate-950/40 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-4 z-[100] select-none shadow-[0_-5px_30px_rgba(0,0,0,0.5)] relative">
      
      {/* Start Menu Overlay */}
      {isStartOpen && (
        <div className="absolute bottom-14 left-4 w-64 bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2 z-[100] animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="p-3 mb-2 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              OS
            </div>
            <div>
              <div className="text-sm font-bold text-white">Guest User</div>
              <div className="text-[10px] text-cyan-400">Local Administrator</div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {menuApps.map(app => (
              <button 
                key={app.id}
                onClick={() => {
                  useWindowStore.getState().openWindow(app.id, app.title, app.component);
                  setIsStartOpen(false);
                }} 
                className="w-full flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
              >
                <span className="text-xl drop-shadow-md">{app.icon}</span>
                <span className="text-sm font-medium">{app.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Button & Active Window Tabs */}
      <div className="flex items-center gap-3 h-full py-1.5 overflow-hidden">
        
        {/* Next-Level Start Button */}
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`h-full px-4 font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-2 transition-all flex-shrink-0 group ${isStartOpen ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.8)]' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400'}`}
        >
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
        <div className="hidden sm:flex items-center gap-4 px-4 h-full bg-black/30 rounded-md border border-white/5 shadow-inner backdrop-blur-sm cursor-default">
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
          
          <span className="drop-shadow-md text-slate-300 hover:text-white transition-colors" title="Connected to highly secure matrix">🌐</span>
          
          {/* Real Device Battery API */}
          <span className={`drop-shadow-[0_0_5px_rgba(74,222,128,0.6)] ${battery.level <= 20 ? 'text-red-400' : 'text-green-400'}`} title={battery.charging ? 'Charging' : 'On Battery'}>
            {battery.charging ? '⚡' : '🔋'} {battery.level}%
          </span>
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
