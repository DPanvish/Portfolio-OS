"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playRetroSound } from '@/lib/audio';

const BOOT_PHASES = [
  "Initializing core systems...",
  "Loading neural network weights...",
  "Establishing secure connection...",
  "Decrypting portfolio assets...",
  "System Ready."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Play the cinematic boot sound exactly once on mount
    playRetroSound('boot', true);

    // Slowly increment progress bar and phases over 5 seconds
    const totalDuration = 5000;
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);

      // Map progress to boot phases
      const newPhaseIndex = Math.min(
        Math.floor((currentProgress / 100) * BOOT_PHASES.length),
        BOOT_PHASES.length - 1
      );
      setPhaseIndex(newPhaseIndex);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    // Complete the boot sequence after it finishes loading
    const completeTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200); // Wait for exit animation
    }, totalDuration + 1000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle glowing animated background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-8">
            
            {/* Animated OS Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-24 h-24 mb-12 flex items-center justify-center"
            >
              {/* Outer spinning ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-slate-800 border-t-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
              {/* Inner glowing core */}
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse" />
            </motion.div>

            {/* Slow, Sleek Loading Bar */}
            <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden mb-6 relative shadow-inner backdrop-blur-sm border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 relative"
                style={{ width: `${progress}%` }}
              >
                {/* Shine effect on the progress bar */}
                <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50" />
              </motion.div>
            </div>

            {/* Dynamic Status Text */}
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phaseIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-cyan-400/80 font-mono text-xs tracking-widest uppercase"
                >
                  {BOOT_PHASES[phaseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            
            {/* Percentage Display */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-16 text-slate-600 font-mono text-[10px] tracking-widest"
            >
              SYS.BOOT // {Math.floor(progress)}%
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
