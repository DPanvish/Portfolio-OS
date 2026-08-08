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
          <p className="mt-4 pt-2 border-t border-cyan-500/10 text-cyan-600/60 text-xs italic">Tip: The system contains hidden Easter eggs. Try 'play snake', 'matrix', or 'hack'.</p>
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
          <span className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">snake.bin</span>
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
    case 'sudo su':
      return <div className="mb-4 text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.6)]">PERMISSION DENIED. This incident will be reported to the sysadmin. (Try: sudo hire-me)</div>;
      
    case 'matrix':
      return (
        <div className="mb-4 text-green-500 font-mono">
          <p className="animate-pulse">Wake up, Neo...</p>
          <p className="mt-1 opacity-80">The Matrix has you.</p>
          <p className="mt-1 opacity-60">Follow the white rabbit.</p>
          <p className="mt-4 text-xs opacity-50">Knock, knock, Neo.</p>
        </div>
      );
      
    case 'hack':
      return (
        <div className="mb-4 font-mono text-xs text-red-500">
          <p>INITIALIZING MAINFRAME BREACH...</p>
          <p className="animate-pulse">BYPASSING FIREWALL... SUCCESS.</p>
          <p>DOWNLOADING CLASSIFIED FILES...</p>
          <div className="w-full bg-red-950/50 h-2 mt-2 border border-red-500/30 rounded overflow-hidden">
             <div className="bg-red-500 h-full w-[85%] animate-pulse" />
          </div>
          <p className="mt-2 text-pink-400 font-bold">ERROR: HACK TRACED. DISCONNECTING IN 3... 2... 1...</p>
        </div>
      );
      
    case 'system info':
    case 'neofetch':
      return (
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start font-mono text-xs">
           <div className="text-cyan-500 whitespace-pre leading-tight">
{`   ____  ____  
  |_   _|| __ |
    | |  |  _| 
    |_|  |___| `}
           </div>
           <div className="text-cyan-100/80">
              <p><span className="text-cyan-400 font-bold">OS:</span> Nexus Core v2.4.9.1</p>
              <p><span className="text-cyan-400 font-bold">Kernel:</span> Quantum Linux 6.9.0</p>
              <p><span className="text-cyan-400 font-bold">Uptime:</span> 99.99%</p>
              <p><span className="text-cyan-400 font-bold">Shell:</span> bash</p>
              <p><span className="text-cyan-400 font-bold">Resolution:</span> 1920x1080</p>
              <p><span className="text-cyan-400 font-bold">DE:</span> UI/UX Pro Max</p>
              <p><span className="text-cyan-400 font-bold">Theme:</span> Cyber-Glass [Dark]</p>
              <p><span className="text-cyan-400 font-bold">Terminal:</span> Nexus_Term</p>
              <p><span className="text-cyan-400 font-bold">CPU:</span> Quantum Neural Processor</p>
           </div>
        </div>
      );

    case 'clear':
      // 'clear' is intercepted and handled by the Terminal component state itself
      return null;
      
    default:
      return <div className="mb-4 text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.6)]">ERR_UNKNOWN_COMMAND: {cmd}. Type 'help' to access system registry.</div>;
  }
}
