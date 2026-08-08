"use client";

import React, { useState, useRef, useEffect } from 'react';
import { parseCommand } from '@/lib/commands/parser';
import { motion } from 'framer-motion';
import { playRetroSound } from '@/lib/audio';
import { useWindowStore } from '@/store/useWindowStore';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const TERMINAL_HEADER = `
   ____  ____  ___  __  __ ____  _   __  ___    __ 
  |_   _|| __ || _ \\|  \\/  |_ _|| \\ | |/ _ \\  | | 
    | |  |  _||   /| |\\/| | | | |  \\| | |_| | | | 
    |_|  |___||_|\\_\\_|  |_||___||_| \\_|\\___/  |_| 
                                                  
> OS_NEXUS CORE [Version 2.4.9.1]
> ENCRYPTION: MILITARY_GRADE_AES256
> UPLINK: ESTABLISHED

Type 'help' to initialize.
`;

// A wrapper that simulates a high-tech "Decryption/Generation" phase before revealing the output
const DecodingOutput = ({ children }: { children: React.ReactNode }) => {
  const [isDecoding, setIsDecoding] = useState(true);
  const [gibberish, setGibberish] = useState('');

  useEffect(() => {
    // Generate rapid random hex code to simulate AI processing/decryption
    const interval = setInterval(() => {
      let str = '';
      const chars = '0123456789ABCDEF01';
      for(let i=0; i<32; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      setGibberish(`> DECRYPTING_BLOCK [0x${str}]...`);
    }, 40);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsDecoding(false);
      // Play a tiny blip when decoding finishes
      playRetroSound('click', true);
    }, 600); // Decodes for 600ms

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (isDecoding) {
    return (
      <div className="text-cyan-500 font-mono text-xs my-2 animate-pulse tracking-widest">
        {gibberish}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} // Wipe in from left to right
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
    >
      {children}
    </motion.div>
  );
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { 
      command: '', 
      output: (
        <DecodingOutput>
          <pre className="text-cyan-400 font-bold mb-6 text-[10px] sm:text-xs leading-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
            {TERMINAL_HEADER}
          </pre>
        </DecodingOutput>
      ) 
    }
  ]);
  const [input, setInput] = useState('');
  const { openWindow } = useWindowStore();
  
  // For Up/Down arrow history recall
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, input]);

  // Focus input when clicking anywhere on the terminal background
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Typing sound for every keystroke!
    if (e.key !== 'Enter' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      playRetroSound('type', true);
    }

    if (e.key === 'Enter') {
      playRetroSound('click', true);
      const cmd = input.trim();
      
      if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      if (cmd) {
        setCommandHistory(prev => [...prev, cmd]);
      }
      
      const lowerCmd = cmd.toLowerCase();
      if (lowerCmd === 'play snake' || lowerCmd === 'snake' || lowerCmd === './snake.bin') {
         openWindow('snake', 'Neural Snake', 'Snake');
         setHistory(prev => [...prev, {
            command: cmd,
            output: <div className="mb-4 text-green-400">Initializing neural snake module in new isolated window...</div>
         }]);
      } else {
        const output = parseCommand(cmd);
        setHistory(prev => [...prev, { 
          command: cmd, 
          output: <DecodingOutput>{output}</DecodingOutput> 
        }]);
      }
      
      setInput('');
      setHistoryIndex(-1);
    } 
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="relative h-full text-cyan-300 font-mono text-sm sm:text-base p-6 overflow-x-hidden overflow-y-auto custom-scrollbar cursor-text -m-4 rounded-b-lg shadow-inner bg-slate-950/30 backdrop-blur-3xl border-t border-cyan-500/20"
      onClick={handleTerminalClick}
    >
      {/* Intense Glassmorphic HUD overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10" />
      
      {/* Sweeping Scanner Line */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,1)] z-40 pointer-events-none"
      />
      
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Vignette effect - fixed to not overly dim the edges */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />

      <div className="flex flex-col relative z-10 w-full min-h-full">
        {history.map((item, index) => (
          <div key={index} className="mb-5 w-full">
            {item.command && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-500 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">guest@nexus:~$</span>
                <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">{item.command}</span>
              </div>
            )}
            {/* Removed the opacity class here so previous commands stay perfectly bright */}
            <div className="text-slate-100">{item.output}</div>
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-cyan-500 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] whitespace-nowrap">guest@nexus:~$</span>
          
          <div className="relative flex-1 flex items-center overflow-hidden">
            <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] whitespace-pre font-bold">{input}</span>
            
            {/* Custom glowing blinking caret */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block h-5 w-2.5 bg-cyan-400 ml-[2px] shadow-[0_0_15px_rgba(34,211,238,1)]"
            />
            
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                playRetroSound('type', true);
              }}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full opacity-0 cursor-text"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </div>
        
        {/* Invisible div to scroll to */}
        <div ref={bottomRef} className="h-16 w-full" />
      </div>
    </div>
  );
}
