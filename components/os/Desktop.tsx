"use client";

import React from "react";
import { useWindowStore } from "@/store/useWindowStore";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const desktopApps = [
  { id: "about", title: "About.txt", component: "About", icon: "📝" },
  { id: "experience", title: "Experience", component: "Experience", icon: "📁" },
  { id: "projects", title: "Projects", component: "Projects", icon: "📁" },
  { id: "skills", title: "Task Manager", component: "Skills", icon: "📊" },
  { id: "contact", title: "Mail", component: "Contact", icon: "✉️" },
  { id: "terminal", title: "Terminal", component: "Terminal", icon: ">_" }
];

const TiltIcon = ({ app, onOpen }: { app: any, onOpen: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      data-cursor="magnet"
      onDoubleClick={onOpen}
      onTouchEnd={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      // CRITICAL: Ensure the button receives pointer events since parent is pointer-events-none
      className="flex flex-col items-center gap-2 group focus:outline-none w-20 pointer-events-auto"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="w-16 h-16 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center group-hover:bg-cyan-950/80 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-700" />
        <span className="text-3xl text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
          {app.icon}
        </span>
      </div>
      
      <span 
        style={{ transform: "translateZ(15px)" }}
        className="text-xs font-mono font-semibold text-cyan-100 bg-slate-950/80 border border-cyan-900/50 px-2 py-0.5 rounded shadow-lg group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-colors pointer-events-none drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
      >
        {app.title}
      </span>
    </motion.button>
  );
};

export default function Desktop({ children }: { children: React.ReactNode }) {
  const { openWindow } = useWindowStore();

  return (
    <div className="relative w-full h-[calc(100vh-3rem)] flex flex-col p-6 perspective-[1500px] overflow-hidden">
      
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#020617]">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] mix-blend-screen" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #06b6d4 1px, transparent 1px),
              linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-20%)',
            transformOrigin: 'top center'
          }}
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
      </div>

      {/* Desktop Icons Grid */}
      <div className="flex flex-col flex-wrap h-full gap-8 w-24 align-start relative z-10 pointer-events-none">
        {desktopApps.map((app) => (
          <TiltIcon 
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
