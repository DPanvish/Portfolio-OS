"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Motion values track raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Springs apply the premium "lag/drag" effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<
    "default" | "pointer" | "text" | "grab" | "magnet" | 
    "resize-ew" | "resize-ns" | "resize-nwse" | "resize-nesw"
  >("default");
  
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Detect touch device to disable custom cursor completely
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    
    // Respect user's OS preference for reduced motion
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
    
    if (!isTouch) {
      document.body.classList.add("custom-cursor-active");
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;
      const target = e.target as HTMLElement;
      
      // 1. Desktop icons (Magnetic Pull)
      const iconButton = target.closest('button.group');
      if (iconButton && !reducedMotion) {
        // Snap cursor mathematically to the center of the icon
        const rect = iconButton.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        setCursorState("magnet");
      } 
      // 2. React-Rnd Resize Handles
      else if (target.classList.contains('react-resizable-handle')) {
        if (target.classList.contains('react-resizable-handle-e') || target.classList.contains('react-resizable-handle-w')) {
          setCursorState("resize-ew");
        } else if (target.classList.contains('react-resizable-handle-n') || target.classList.contains('react-resizable-handle-s')) {
          setCursorState("resize-ns");
        } else if (target.classList.contains('react-resizable-handle-nw') || target.classList.contains('react-resizable-handle-se')) {
          setCursorState("resize-nwse");
        } else if (target.classList.contains('react-resizable-handle-ne') || target.classList.contains('react-resizable-handle-sw')) {
          setCursorState("resize-nesw");
        } else {
          setCursorState("pointer");
        }
      }
      // 3. Draggable window title bar
      else if (target.closest('.window-titlebar')) {
        setCursorState("grab");
      } 
      // 4. Terminal input or text areas
      else if (
        target.tagName.toLowerCase() === 'input' || 
        target.tagName.toLowerCase() === 'textarea' || 
        window.getComputedStyle(target).cursor === 'text' ||
        target.closest('.cursor-text')
      ) {
        setCursorState("text");
      } 
      // 5. Generic buttons or links
      else if (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('button') || 
        target.tagName.toLowerCase() === 'a'
      ) {
        setCursorState("pointer");
      } 
      // 6. Default fallback
      else {
        setCursorState("default");
      }

      // Update motion values
      cursorX.set(targetX);
      cursorY.set(targetY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isTouchDevice, cursorX, cursorY, reducedMotion]);

  if (isTouchDevice || !mounted) return null;

  // Visual states mapping
  const variants = {
    default: { width: 16, height: 16, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 1)", border: "0px solid transparent", mixBlendMode: "normal" as any },
    pointer: { width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 1)", border: "0px solid transparent", mixBlendMode: "difference" as any },
    grab: { width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.8)", mixBlendMode: "normal" as any },
    text: { width: 10, height: 20, borderRadius: "0px", backgroundColor: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.8)", mixBlendMode: "normal" as any },
    magnet: { width: 72, height: 72, borderRadius: "16px", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(56, 189, 248, 0.5)", mixBlendMode: "normal" as any },
    "resize-ew": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.8)", mixBlendMode: "normal" as any },
    "resize-ns": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.8)", mixBlendMode: "normal" as any },
    "resize-nwse": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.8)", mixBlendMode: "normal" as any },
    "resize-nesw": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.8)", mixBlendMode: "normal" as any },
  };

  return (
    <motion.div
      style={{
        x: reducedMotion ? cursorX : smoothX, // Bypass spring entirely if reduced motion is preferred
        y: reducedMotion ? cursorY : smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      animate={{
        ...variants[cursorState],
        scale: isClicked ? 0.7 : 1,
      }}
      transition={
        reducedMotion 
          ? { duration: 0 } // No animation if reduced motion
          : { type: "spring", stiffness: 400, damping: 28, mass: 0.5 }
      }
    >
      {/* Blinking-block text cursor style inside the bounding box */}
      {cursorState === "text" && (
        <motion.div 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-os-accent"
        />
      )}

      {/* Resize Glyphs */}
      {cursorState === "resize-ew" && <span className="text-white text-[10px] font-bold">↔</span>}
      {cursorState === "resize-ns" && <span className="text-white text-[10px] font-bold">↕</span>}
      {cursorState === "resize-nwse" && <span className="text-white text-[10px] font-bold">⤡</span>}
      {cursorState === "resize-nesw" && <span className="text-white text-[10px] font-bold">⤢</span>}
      
      {/* Grab Hand Glyph */}
      {cursorState === "grab" && <span className="text-white text-[12px] drop-shadow-md">✋</span>}

    </motion.div>
  );
}
