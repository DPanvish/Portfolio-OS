"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playRetroSound } from '@/lib/audio';

const STARTUP_LOGS = [
  "BIOS Date 08/08/26 19:34:21 Ver 08.00.15",
  "CPU: Quantum Neural Processor @ 4.20GHz",
  "Speed: 4.20 GHz Count: 128",
  "Memory Test: 2097152K OK",
  "Initializing USB Controllers .. Done.",
  "Auto-Detecting Pri Master.. SSD-990 PRO 2TB",
  "Mounting root filesystem...",
  "Loading UI/UX Pro Max kernel modules...",
  "Checking filesystem integrity... clean.",
  "Starting network interface...",
  "Establishing secure connection to mainframe...",
  "Decrypting assets...",
  "Booting GUI environment..."
];

const ASCII_LOGO = `
 _________________________________________
/                                         \\
|  ___  ___  _   _  ___  ___  ___  ___    |
| | . ||_ _|| \\ | || __>| . \\|_ _|| __>   |
| |   | | | |   | || _> |   / | | | _>    |
| |_|_| |_| |_\\_|| |___>|_\\_\\ |_| |___>   |
\\_________________________________________/
`;

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [logIndex, setLogIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play the cinematic boot sound exactly once on mount
    playRetroSound('boot', true);
    
    // Rapid-fire BIOS logging effect
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < STARTUP_LOGS.length - 1) return prev + 1;
        clearInterval(logInterval);
        return prev;
      });
    }, 150); // fast scroll

    // Show ASCII logo after logs finish
    const logoTimeout = setTimeout(() => {
      setShowLogo(true);
      
      // Random glitch effect
      setTimeout(() => setGlitch(true), 1000);
      setTimeout(() => setGlitch(false), 1200);
      setTimeout(() => setGlitch(true), 2000);
      setTimeout(() => setGlitch(false), 2100);
      
    }, STARTUP_LOGS.length * 150 + 500);

    // Complete the boot sequence
    const completeTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, STARTUP_LOGS.length * 150 + 3500);

    return () => {
      clearInterval(logInterval);
      clearTimeout(logoTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Keep logs scrolled to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [logIndex]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "brightness(2) contrast(1.5)", scale: 1.1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="absolute inset-0 bg-black z-[9999] font-mono p-4 sm:p-8 select-none overflow-hidden"
        >
          {/* Intense CRT curvature and scanline overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute inset-0 pointer-events-none z-40 opacity-15"
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />
          
          <div className={`w-full h-full flex flex-col relative z-10 ${glitch ? 'animate-pulse translate-x-1' : ''}`}>
            
            {/* The rapid scrolling BIOS logs */}
            <div className="flex-1 overflow-hidden flex flex-col justify-end text-[#0f0] opacity-80 text-xs sm:text-sm tracking-wide">
              {STARTUP_LOGS.slice(0, logIndex + 1).map((log, i) => (
                <div key={i} className="mb-1">{log}</div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* The spectacular ASCII reveal */}
            {showLogo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
                className="flex-1 flex flex-col items-center justify-center text-[#0f0] drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]"
              >
                <pre className="text-[10px] sm:text-xs leading-tight font-bold mb-8">
                  {ASCII_LOGO}
                </pre>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-1 bg-[#0f0] shadow-[0_0_10px_#0f0] mb-4"
                />
                
                <p className="uppercase tracking-[0.4em] text-xs font-bold animate-pulse">
                  System Ready
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
