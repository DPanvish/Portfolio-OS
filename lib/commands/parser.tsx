import React from 'react';
import About from '@/components/apps/About';
import Experience from '@/components/apps/Experience';
import Projects from '@/components/apps/Projects';
import Skills from '@/components/apps/Skills';
import Contact from '@/components/apps/Contact';

export function parseCommand(commandStr: string): React.ReactNode {
  const cmd = commandStr.trim().toLowerCase();
  
  if (cmd === '') return null;

  switch (cmd) {
    case 'help':
      return (
        <div className="mb-4 bg-cyan-950/20 p-5 border-l-2 border-cyan-500 rounded-r-lg shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] backdrop-blur-sm">
          <p className="font-bold text-cyan-300 mb-3 border-b border-cyan-500/30 pb-2 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">System Commands</p>
          <ul className="list-none space-y-2 mt-3 text-cyan-100/80 font-mono text-sm">
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">about</strong> <span className="opacity-70 group-hover:opacity-100">// Decode operator profile</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">experience</strong> <span className="opacity-70 group-hover:opacity-100">// Access mission logs</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">projects</strong> <span className="opacity-70 group-hover:opacity-100">// Browse deployed prototypes</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">skills</strong> <span className="opacity-70 group-hover:opacity-100">// Initialize telemetry monitor</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">contact</strong> <span className="opacity-70 group-hover:opacity-100">// Establish secure comms link</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">clear</strong> <span className="opacity-70 group-hover:opacity-100">// Purge terminal buffer</span></li>
            <li className="flex group"><strong className="text-pink-400 w-28 group-hover:text-pink-200 transition-colors">sudo</strong> <span className="opacity-70 group-hover:opacity-100 text-pink-300/70">// [RESTRICTED] Override protocols</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">ls</strong> <span className="opacity-70 group-hover:opacity-100">// List neural directories</span></li>
            <li className="flex group"><strong className="text-cyan-400 w-28 group-hover:text-cyan-200 transition-colors">whoami</strong> <span className="opacity-70 group-hover:opacity-100">// Print active entity ID</span></li>
          </ul>
        </div>
      );
    
    // Core App Commands (Reusing the exact same components from the GUI)
    case 'about':
    case 'cat about.txt':
      return <div className="mb-4 border border-cyan-800/50 rounded-lg bg-slate-950/60 p-2 shadow-[0_0_15px_rgba(34,211,238,0.1)] overflow-hidden"><About /></div>;
    
    case 'experience':
    case 'cd experience':
      return <div className="mb-4 border border-cyan-800/50 rounded-lg bg-slate-950/60 max-h-96 overflow-y-auto custom-scrollbar shadow-[0_0_15px_rgba(34,211,238,0.1)]"><Experience /></div>;
    
    case 'projects':
    case 'cd projects':
      return <div className="mb-4 border border-cyan-800/50 rounded-lg bg-slate-950/60 max-h-96 overflow-y-auto custom-scrollbar shadow-[0_0_15px_rgba(34,211,238,0.1)]"><Projects /></div>;
    
    case 'skills':
    case 'top':
      return <div className="mb-4 border border-cyan-800/50 rounded-lg bg-slate-950/60 max-h-96 overflow-y-auto custom-scrollbar shadow-[0_0_15px_rgba(34,211,238,0.1)]"><Skills /></div>;
    
    case 'contact':
    case 'mail':
      return <div className="mb-4 border border-cyan-800/50 rounded-lg bg-slate-950/60 max-h-96 overflow-y-auto custom-scrollbar shadow-[0_0_15px_rgba(34,211,238,0.1)]"><Contact /></div>;
    
    // Unix / Easter Egg Commands
    case 'whoami':
      return <div className="mb-4 text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">guest_visitor@nexus_core</div>;
    
    case 'ls':
      return (
        <div className="mb-4 flex gap-6 font-bold text-sm">
          <span className="text-cyan-200 drop-shadow-[0_0_5px_rgba(165,243,252,0.8)]">about.txt</span>
          <span className="text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]">experience/</span>
          <span className="text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]">projects/</span>
          <span className="text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)] animate-pulse">contact.exe</span>
        </div>
      );
    
    case 'sudo hire-me':
      return (
        <div className="mb-4 p-4 bg-green-950/40 border-l-4 border-green-500 text-green-400 font-bold rounded-r shadow-[0_0_20px_rgba(34,197,94,0.2)]">
          <p className="animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
            [!] OVERRIDE ACCEPTED. INITIATING HIRE PROTOCOLS...
          </p>
          <p className="mt-2 text-green-300/80 text-sm font-normal">
            Please run the <code className="text-white bg-green-900/50 px-1 rounded">contact</code> command to establish a secure comms link.
          </p>
        </div>
      );
    
    case 'sudo':
      return <div className="mb-4 text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.6)]">PERMISSION DENIED. Usage: sudo [command]. Try: sudo hire-me</div>;
    
    case 'play snake':
      return <div className="mb-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]">WARN: Neural snake module not yet synchronized. Check back later!</div>;
    
    case 'clear':
      // 'clear' is intercepted and handled by the Terminal component state itself
      return null;
      
    default:
      return <div className="mb-4 text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.6)]">ERR_UNKNOWN_COMMAND: {cmd}. Type 'help' to access system registry.</div>;
  }
}
