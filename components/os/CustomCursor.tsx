"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Motion values track raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Springs apply the premium "lag/drag" effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<"default" | "pointer" | "text" | "grab" | "magnet">("default");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Detect touch device to disable custom cursor completely
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    setMounted(true);
    
    if (!isTouch) {
      document.body.classList.add("custom-cursor-active");
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      
      // 1. Hovering over a draggable window title bar
      if (target.closest('.window-titlebar')) {
        setCursorState("grab");
      } 
      // 2. Hovering over desktop icons (they have a specific group class)
      else if (target.closest('button.group')) {
        setCursorState("magnet");
      } 
      // 3. Hovering over terminal input or text areas
      else if (
        target.tagName.toLowerCase() === 'input' || 
        target.tagName.toLowerCase() === 'textarea' || 
        window.getComputedStyle(target).cursor === 'text' ||
        target.closest('.cursor-text')
      ) {
        setCursorState("text");
      } 
      // 4. Hovering over generic buttons or links
      else if (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('button') || 
        target.tagName.toLowerCase() === 'a'
      ) {
        setCursorState("pointer");
      } 
      // 5. Default state
      else {
        setCursorState("default");
      }
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
  }, [isTouchDevice, cursorX, cursorY]);

  if (isTouchDevice || !mounted) return null;

  // Visual states mapping
  const variants = {
    default: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "0px solid rgba(255, 255, 255, 0)",
      mixBlendMode: "normal" as any,
    },
    pointer: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "0px solid rgba(255, 255, 255, 0)",
      mixBlendMode: "difference" as any, // Inverts colors behind it
    },
    grab: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      mixBlendMode: "normal" as any,
    },
    text: {
      width: 4,
      height: 24,
      borderRadius: "2px",
      backgroundColor: "rgba(56, 189, 248, 1)", // Sky blue OS accent
      border: "0px solid rgba(255, 255, 255, 0)",
      mixBlendMode: "normal" as any,
    },
    magnet: {
      width: 64,
      height: 64,
      borderRadius: "16px", // Turns into a squircle wrapping the icon
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(56, 189, 248, 0.5)",
      mixBlendMode: "normal" as any,
    }
  };

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      animate={{
        ...variants[cursorState],
        scale: isClicked ? 0.7 : 1, // Compress when clicked
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    >
      {/* Inner dot for grab/magnet states to show precise center pixel */}
      {(cursorState === "grab" || cursorState === "magnet") && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-1.5 h-1.5 bg-white rounded-full"
        />
      )}
    </motion.div>
  );
}
