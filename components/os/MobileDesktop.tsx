"use client";

import React from 'react';
import { useWindowStore } from '@/store/useWindowStore';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';

const desktopApps = [
  { id: "about", title: "About", component: "About", icon: "📝" },
  { id: "experience", title: "Experience", component: "Experience", icon: "💼" },
  { id: "projects", title: "Projects", component: "Projects", icon: "🚀" },
  { id: "skills", title: "System Info", component: "Skills", icon: "📊" },
  { id: "contact", title: "Mail", component: "Contact", icon: "✉️" },
  { id: "terminal", title: "Terminal", component: "Terminal", icon: "⌨️" }
];

export default function MobileDesktop({ renderApp }: { renderApp: (app: any) => React.ReactNode }) {
  const { windows, openWindow, closeWindow } = useWindowStore();
  const openApps = Object.values(windows);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-slate-900">
      
      {/* Mobile-optimized background (no interactions needed) */}
      <InteractiveBackground />
      
      {/* iOS-Style Home Screen */}
      <AnimatePresence>
        {openApps.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 flex flex-col pt-16 px-6"
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-white drop-shadow-md">OS Mobile</h1>
              <p className="text-cyan-400 text-[10px] tracking-widest uppercase mt-1">System Online</p>
            </div>
            
            <div className="grid grid-cols-3 gap-x-4 gap-y-8 place-items-center">
              {desktopApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => openWindow(app.id, app.title, app.component)}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl flex items-center justify-center active:scale-90 transition-transform">
                    <span className="text-3xl drop-shadow-lg">{app.icon}</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 bg-black/40 px-2.5 py-0.5 rounded-full shadow-sm drop-shadow-sm">
                    {app.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Swipeable App Viewer */}
      <AnimatePresence>
        {openApps.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="absolute inset-0 z-50 bg-[#020617] flex flex-col"
          >
            {/* Horizontal Snap Scroll Container */}
            <div className="flex-1 flex overflow-x-auto snap-x snap-mandatory custom-scrollbar relative z-10">
              {openApps.map(app => (
                <div key={app.id} className="w-full h-full flex-shrink-0 snap-center flex flex-col">
                  
                  {/* App Header (Mobile Chrome) */}
                  <div className="h-14 flex items-center justify-center border-b border-white/10 bg-white/5 backdrop-blur-xl relative">
                    <span className="font-bold text-white tracking-wide text-sm">{app.title}</span>
                    <button 
                      onClick={() => closeWindow(app.id)}
                      className="absolute right-4 text-[10px] font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full hover:bg-red-500/20 active:scale-95 transition-all"
                    >
                      CLOSE
                    </button>
                  </div>
                  
                  {/* App Content */}
                  <div className="flex-1 overflow-y-auto bg-transparent text-slate-200 custom-scrollbar">
                    {/* Inject some padding at the bottom so content isn't hidden by the home bar */}
                    <div className="h-full pb-8">
                      {renderApp(app)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Persistent Mobile Home Bar Overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/50 backdrop-blur-md rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)] pointer-events-none z-50" />

            {/* Pagination Dots (Subtle indicator if multiple apps are open) */}
            {openApps.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50 pointer-events-none">
                {openApps.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-md" />
                ))}
              </div>
            )}
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
