"use client";

import React from "react";
import { useWindowStore } from "@/store/useWindowStore";
import { motion } from "framer-motion";
import InteractiveBackground from "./InteractiveBackground";
import { playRetroSound } from "@/lib/audio";

const desktopApps = [
  { id: "about", title: "About.txt", component: "About", icon: "📝" },
  { id: "experience", title: "Experience", component: "Experience", icon: "💼" },
  { id: "projects", title: "Projects", component: "Projects", icon: "🚀" },
  { id: "skills", title: "System Info", component: "Skills", icon: "📊" },
  { id: "contact", title: "Mail", component: "Contact", icon: "✉️" },
  { id: "terminal", title: "Terminal", component: "Terminal", icon: "⌨️" }
];

const DesktopIcon = ({ app, onOpen }: { app: any, onOpen: () => void }) => {
  return (
    <motion.button
      data-cursor="magnet"
      onDoubleClick={onOpen}
      onTouchEnd={onOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-3 group focus:outline-none w-24 pointer-events-auto"
    >
      <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 relative overflow-hidden">
        {/* Subtle, premium diagonal shine on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
        <span className="text-3xl text-slate-200 group-hover:text-white drop-shadow-lg transition-colors">
          {app.icon}
        </span>
      </div>
      
      <span className="text-xs font-medium tracking-wide text-slate-300 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors border border-transparent group-hover:border-white/10 drop-shadow-md">
        {app.title}
      </span>
    </motion.button>
  );
};

export default function Desktop({ children }: { children: React.ReactNode }) {
  const { openWindow, soundEnabled } = useWindowStore();

  return (
    <div className="relative w-full h-[calc(100vh-3rem)] flex flex-col p-6 overflow-hidden">
      
      {/* Premium Interactive Animated Background */}
      <InteractiveBackground />

      {/* Desktop Icons Grid */}
      <div className="flex flex-col flex-wrap h-full gap-8 w-24 align-start relative z-10 pointer-events-none">
        {desktopApps.map((app) => (
          <DesktopIcon 
            key={app.id} 
            app={app} 
            onOpen={() => openWindow(app.id, app.title, app.component)} 
          />
        ))}
      </div>

      {/* Render open windows here */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {children}
      </div>
    </div>
  );
}
