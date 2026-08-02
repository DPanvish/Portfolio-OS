"use client";

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useWindowStore } from "@/store/useWindowStore";
import { motion, AnimatePresence } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Window({ id, title, children }: WindowProps) {
  const { windows, windowOrder, closeWindow, minimizeWindow, focusWindow } = useWindowStore();
  const windowState = windows[id];
  const [isMaximized, setIsMaximized] = useState(false);
  const orderIndex = windowOrder.indexOf(id);
  const [layout, setLayout] = useState({
    x: 100 + orderIndex * 30,
    y: 100 + orderIndex * 30,
    width: 650,
    height: 450,
  });

  // If the window is closed or doesn't exist in store, don't render it.
  if (!windowState) return null;

  // Determine z-index based on its position in the windowOrder array.
  // We add a base z-index of 10 so windows sit above desktop icons and the wallpaper.
  const zIndex = windowOrder.indexOf(id) + 10;

  // Framer Motion variants for minimize/restore animations
  const windowVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
    minimized: { opacity: 0, scale: 0.5, y: 200, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <Rnd
          position={{ x: layout.x, y: layout.y }}
          size={{ width: layout.width, height: layout.height }}
          onDragStop={(e, d) => setLayout((prev) => ({ ...prev, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, position) =>
            setLayout({
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
              ...position,
            })
          }
          minWidth={350}
          minHeight={250}
          bounds="parent" // Keeps the window from being dragged entirely off-screen
          dragHandleClassName="window-titlebar"
          onMouseDown={() => focusWindow(id)}
          onDragStart={() => focusWindow(id)}
          style={{ zIndex }}
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          // If maximized, we forcefully override the transform/dimensions applied by react-rnd
          className={isMaximized ? "!w-full !h-[calc(100%-3rem)] !transform-none !top-0 !left-0" : ""}
        >
          <motion.div 
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="minimized"
            className="w-full h-full flex flex-col bg-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden rounded-lg backdrop-blur-md bg-opacity-95"
          >
            {/* Title Bar (OS Chrome) */}
            <div className="window-titlebar flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 cursor-grab active:cursor-grabbing select-none">
              
              {/* Traffic Light Buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-400 focus:outline-none flex items-center justify-center transition-colors group"
                  aria-label="Close"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-[8px] text-red-900 leading-none">x</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400 focus:outline-none flex items-center justify-center transition-colors group"
                  aria-label="Minimize"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-[8px] text-yellow-900 leading-none">-</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                  className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-400 focus:outline-none flex items-center justify-center transition-colors group"
                  aria-label="Maximize"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-[8px] text-green-900 leading-none">+</span>
                </button>
              </div>

              {/* Window Title */}
              <div className="text-slate-300 text-xs font-semibold tracking-wide">
                {title}
              </div>

              {/* Empty space for flexbox balance */}
              <div className="w-12"></div>
            </div>

            {/* Application Content Area */}
            <div className="flex-1 overflow-auto bg-slate-950/80 text-slate-300 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}
