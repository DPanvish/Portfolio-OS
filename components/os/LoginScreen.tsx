"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playRetroSound } from '@/lib/audio';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'visitor' || password === '') {
      setIsUnlocking(true);
      playRetroSound('open', true); // Play success sound
      setTimeout(() => onLogin(), 1200); // 1.2s unlock animation delay
    } else {
      setError(true);
      playRetroSound('close', true); // Play error sound
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isUnlocking ? 0 : 1, scale: isUnlocking ? 1.15 : 1 }}
      exit={{ opacity: 0, scale: 1.15 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Cinematic ease out
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Deep Glassmorphic Background with Moving Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-sky-500/20 rounded-full blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-indigo-500/20 rounded-full blur-[150px] mix-blend-screen" 
        />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        {/* Premium Profile Avatar */}
        <motion.div 
          initial={{ y: -30, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="w-32 h-32 rounded-full mb-6 border-[3px] border-white/10 overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.2)] bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center backdrop-blur-xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          <span className="text-5xl drop-shadow-lg">👤</span>
        </motion.div>

        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl sm:text-3xl font-light text-white mb-8 tracking-[0.2em] uppercase text-center"
        >
          Guest_Visitor
        </motion.h1>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onSubmit={handleLogin} 
          className="flex flex-col items-center w-full"
        >
          <motion.div 
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className={`w-full px-5 py-3.5 bg-white/5 border ${error ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10'} rounded-xl text-center text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-os-accent/50 focus:border-os-accent focus:bg-white/10 backdrop-blur-md transition-all shadow-inner tracking-widest`}
              autoFocus
              disabled={isUnlocking}
            />
            <button 
              type="submit" 
              disabled={isUnlocking}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </motion.div>

          <motion.p 
            animate={{ opacity: isUnlocking ? 0 : 1 }}
            className="mt-6 text-[10px] text-slate-500 font-mono tracking-widest uppercase"
          >
            Hint: Type 'visitor' or press enter
          </motion.p>
        </motion.form>

        {/* Cinematic Unlock Spinner */}
        <AnimatePresence>
          {isUnlocking && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-16 flex flex-col items-center"
            >
              <div className="w-6 h-6 border-2 border-os-accent border-t-transparent rounded-full animate-spin mb-3 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
              <span className="text-[10px] text-os-accent uppercase tracking-[0.3em] animate-pulse">Decrypting...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Ensure AnimatePresence is imported
import { AnimatePresence } from 'framer-motion';
