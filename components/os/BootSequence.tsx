"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already seen the boot sequence this session
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Sequence timers
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => {
        sessionStorage.setItem("hasBooted", "true");
        setIsVisible(false);
        setTimeout(onComplete, 500); // Wait for the fade-out exit animation
      }, 4000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        key="boot-sequence"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="absolute inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono text-green-500 p-8 select-none overflow-hidden"
      >
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />

        {/* Vintage Monitor Glow */}
        <div className="absolute inset-0 radial-gradient(circle_at_center,transparent_50%,#000_100%) z-40 pointer-events-none" />

        <div className="w-full max-w-2xl flex flex-col items-start relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-12 border-2 border-green-500 flex items-center justify-center animate-pulse">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-[0.2em] text-white">TERMINAL_OS</p>
              <p className="text-xs text-green-600 tracking-widest mt-1">SYSTEM_VERSION_1.0.0_BETA</p>
            </div>
          </motion.div>
          
          <div className="space-y-3 opacity-90 text-sm sm:text-base font-medium text-green-400">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>{`> Initializing kernel memory... [OK]`}</motion.p>
            {step >= 1 && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{`> Loading GUI modules... [OK]`}</motion.p>}
            {step >= 2 && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{`> Establishing secure connection... [OK]`}</motion.p>}
            {step >= 3 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white mt-4">{`> Booting desktop environment...`}</motion.p>}
          </div>

          {step < 3 && (
            <div className="mt-12 w-full h-1 bg-green-900/30 overflow-hidden rounded relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                initial={{ width: "0%" }}
                animate={{ width: step === 0 ? "30%" : step === 1 ? "70%" : "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          )}

          <button 
            onClick={() => {
              sessionStorage.setItem("hasBooted", "true");
              setIsVisible(false);
              setTimeout(onComplete, 800);
            }}
            className="mt-16 text-green-800 hover:text-green-400 transition-colors uppercase tracking-widest text-[10px] focus:outline-none"
          >
            [ Press here to skip sequence ]
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
