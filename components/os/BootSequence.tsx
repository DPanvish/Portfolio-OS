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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono text-green-500 p-8 select-none"
      >
        <div className="w-full max-w-2xl flex flex-col items-start">
          <p className="mb-6 text-2xl font-bold tracking-widest text-white">TERMINAL OS v1.0.0</p>
          
          <div className="space-y-3 opacity-90 text-sm sm:text-base">
            <p>{`> Initializing kernel memory... [OK]`}</p>
            {step >= 1 && <p>{`> Loading UI/UX Pro Max modules... [OK]`}</p>}
            {step >= 2 && <p>{`> Establishing secure connection... [OK]`}</p>}
            {step >= 3 && <p className="animate-pulse">{`> Booting desktop environment...`}</p>}
          </div>

          {step < 3 && (
            <div className="mt-12 w-full h-1 bg-gray-900 overflow-hidden rounded">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: "0%" }}
                animate={{ width: step === 0 ? "30%" : step === 1 ? "70%" : "100%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          )}

          <button 
            onClick={() => {
              sessionStorage.setItem("hasBooted", "true");
              setIsVisible(false);
              setTimeout(onComplete, 500);
            }}
            className="mt-16 text-gray-600 hover:text-white transition-colors underline decoration-dashed underline-offset-4 text-xs"
          >
            Press here to skip boot sequence
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
