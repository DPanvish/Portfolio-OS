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
        <div className="text-slate-300 mb-4 bg-slate-900/50 p-4 border border-slate-700 rounded shadow-inner">
          <p className="font-bold text-white mb-2 border-b border-slate-700 pb-2">Available Commands:</p>
          <ul className="list-none space-y-1 mt-2 text-os-accent">
            <li><strong className="text-white w-24 inline-block">about</strong> - Learn more about me</li>
            <li><strong className="text-white w-24 inline-block">experience</strong> - View my work history</li>
            <li><strong className="text-white w-24 inline-block">projects</strong> - Browse my portfolio</li>
            <li><strong className="text-white w-24 inline-block">skills</strong> - System resource monitor (Task Manager)</li>
            <li><strong className="text-white w-24 inline-block">contact</strong> - Open mail composer</li>
            <li><strong className="text-white w-24 inline-block">clear</strong> - Clear terminal output</li>
            <li><strong className="text-white w-24 inline-block">sudo</strong> - [Restricted Access] Run administrative commands</li>
            <li><strong className="text-white w-24 inline-block">ls</strong> - List directory contents</li>
            <li><strong className="text-white w-24 inline-block">whoami</strong> - Print effective user ID</li>
          </ul>
        </div>
      );
    
    // Core App Commands (Reusing the exact same components from the GUI)
    case 'about':
    case 'cat about.txt':
      return <div className="mb-4 border border-slate-700 rounded bg-slate-900/50 p-2 shadow-inner"><About /></div>;
    
    case 'experience':
    case 'cd experience':
      return <div className="mb-4 border border-slate-700 rounded bg-slate-900/50 max-h-96 overflow-y-auto shadow-inner"><Experience /></div>;
    
    case 'projects':
    case 'cd projects':
      return <div className="mb-4 border border-slate-700 rounded bg-slate-900/50 shadow-inner"><Projects /></div>;
    
    case 'skills':
    case 'top':
      return <div className="mb-4 border border-slate-700 rounded bg-slate-900/50 max-h-96 overflow-y-auto shadow-inner"><Skills /></div>;
    
    case 'contact':
    case 'mail':
      return <div className="mb-4 border border-slate-700 rounded max-h-96 overflow-y-auto shadow-inner"><Contact /></div>;
    
    // Unix / Easter Egg Commands
    case 'whoami':
      return <div className="mb-4 text-slate-300">visitor@portfolio-os</div>;
    
    case 'ls':
      return <div className="mb-4 text-os-accent flex gap-4 font-bold"><span>about.txt</span><span>experience/</span><span>projects/</span><span>contact.exe</span></div>;
    
    case 'sudo hire-me':
      return <div className="mb-4 p-2 bg-green-900/30 border border-green-500/50 text-green-400 font-bold rounded animate-pulse">Access Granted. Initiating hire protocols... Please use the 'contact' command to reach out!</div>;
    
    case 'sudo':
      return <div className="mb-4 text-red-400">Usage: sudo [command]. Try: sudo hire-me</div>;
    
    case 'play snake':
      return <div className="mb-4 text-yellow-400">Snake game module not yet loaded. Check back later!</div>;
    
    case 'clear':
      // 'clear' is intercepted and handled by the Terminal component state itself
      return null;
      
    default:
      return <div className="mb-4 text-red-400">Command not found: {cmd}. Type 'help' for a list of commands.</div>;
  }
}
