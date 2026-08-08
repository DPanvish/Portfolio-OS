"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const [cursorState, setCursorState] = useState<
    "default" | "pointer" | "text" | "grab" | "magnet" | 
    "resize-ew" | "resize-ns" | "resize-nwse" | "resize-nesw"
  >("default");
  
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
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
      
      // Robust attribute-based targeting
      const magnetTarget = target.closest('[data-cursor="magnet"]');
      const textTarget = target.closest('input, textarea, [data-cursor="text"], .cursor-text');
      const grabTarget = target.closest('.window-titlebar, [data-cursor="grab"]');
      const pointerTarget = target.closest('button, a, [data-cursor="pointer"]');
      
      // 1. Magnetic Pull
      if (magnetTarget && !reducedMotion) {
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
      // 3. Grab
      else if (grabTarget) {
        setCursorState("grab");
      } 
      // 4. Text
      else if (textTarget || window.getComputedStyle(target).cursor === 'text') {
        setCursorState("text");
      } 
      // 5. Pointer
      else if (pointerTarget || window.getComputedStyle(target).cursor === 'pointer') {
        setCursorState("pointer");
      } 
      // 6. Default
      else {
        setCursorState("default");
      }

      // INSTANT 1:1 hardware mapping (Zero lag)
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

  // Thematic Cyberpunk HUD Visual States
  const variants = {
    default: { width: 14, height: 14, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.8)", border: "0px solid transparent", boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)", mixBlendMode: "normal" as any },
    pointer: { width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.1)", border: "2px solid rgba(34, 211, 238, 0.8)", boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)", mixBlendMode: "normal" as any },
    grab: { width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.1)", border: "2px dashed rgba(34, 211, 238, 0.8)", boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)", mixBlendMode: "normal" as any },
    text: { width: 4, height: 20, borderRadius: "0px", backgroundColor: "rgba(34, 211, 238, 1)", border: "0px solid transparent", boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)", mixBlendMode: "normal" as any },
    magnet: { width: 64, height: 64, borderRadius: "16px", backgroundColor: "rgba(34, 211, 238, 0.05)", border: "2px solid rgba(34, 211, 238, 0.6)", boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)", mixBlendMode: "normal" as any },
    "resize-ew": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.2)", border: "2px solid rgba(34, 211, 238, 0.8)", mixBlendMode: "normal" as any },
    "resize-ns": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.2)", border: "2px solid rgba(34, 211, 238, 0.8)", mixBlendMode: "normal" as any },
    "resize-nwse": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.2)", border: "2px solid rgba(34, 211, 238, 0.8)", mixBlendMode: "normal" as any },
    "resize-nesw": { width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.2)", border: "2px solid rgba(34, 211, 238, 0.8)", mixBlendMode: "normal" as any },
  };

  return (
    <motion.div
      style={{
        x: cursorX, // 0 lag
        y: cursorY, // 0 lag
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
          ? { duration: 0 }
          : { type: "spring", stiffness: 400, damping: 28, mass: 0.5 }
      }
    >
      {cursorState === "text" && (
        <motion.div 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-os-accent"
        />
      )}
      {cursorState === "resize-ew" && <span className="text-white text-[10px] font-bold">↔</span>}
      {cursorState === "resize-ns" && <span className="text-white text-[10px] font-bold">↕</span>}
      {cursorState === "resize-nwse" && <span className="text-white text-[10px] font-bold">⤡</span>}
      {cursorState === "resize-nesw" && <span className="text-white text-[10px] font-bold">⤢</span>}
      {cursorState === "grab" && <span className="text-white text-[12px] drop-shadow-md">✋</span>}
    </motion.div>
  );
}
