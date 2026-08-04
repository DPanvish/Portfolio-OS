"use client";

import React, { useState, useRef, useEffect } from 'react';
import { parseCommand } from '@/lib/commands/parser';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: '', output: <div className="text-os-accent mb-4 font-bold">Welcome to Terminal OS v1.0.0.<br/>Type 'help' to see available commands.</div> }
  ]);
  const [input, setInput] = useState('');
  
  // For Up/Down arrow history recall
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when clicking anywhere on the terminal background
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      
      if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      if (cmd) {
        // Save to command recall history (only if it's not empty)
        setCommandHistory(prev => [...prev, cmd]);
      }
      
      const output = parseCommand(cmd);
      setHistory(prev => [...prev, { command: cmd, output }]);
      setInput('');
      setHistoryIndex(-1); // reset history index
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
      className="h-full bg-slate-950 text-slate-300 font-mono text-sm sm:text-base p-4 overflow-y-auto custom-scrollbar cursor-text -m-4 rounded-b-lg shadow-inner"
      onClick={handleTerminalClick}
    >
      <div className="flex flex-col">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400 font-bold">visitor@portfolio-os:~$</span>
                <span className="text-slate-100">{item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-bold">visitor@portfolio-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-700"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        
        {/* Invisible div to scroll to */}
        <div ref={bottomRef} className="h-4 w-full" />
      </div>
    </div>
  );
}
