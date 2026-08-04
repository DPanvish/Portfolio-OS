"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/data';

export default function Skills() {
  const [uptime, setUptime] = useState(0);

  // Fake uptime counter
  useEffect(() => {
    const interval = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col p-2 sm:p-4 text-xs sm:text-sm font-mono -m-4 bg-slate-950">
      
      {/* Header Stats (System Info) */}
      <div className="flex gap-6 mb-6 p-4 bg-slate-900 border-b border-slate-700/50 shadow-inner">
        <div>
          <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest">CPU Usage</div>
          <div className="text-os-accent font-bold text-lg">{(Math.random() * 10 + 15).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest">Memory</div>
          <div className="text-green-400 font-bold text-lg">2.4 / 16 GB</div>
        </div>
        <div className="hidden sm:block">
          <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest">Uptime</div>
          <div className="text-slate-300 font-bold text-lg">{formatUptime(uptime)}</div>
        </div>
      </div>

      <div className="px-4 flex-1 flex flex-col overflow-hidden">
        {/* Process Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-2 border-b border-slate-700 text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
          <div className="col-span-5 sm:col-span-4">Process Name</div>
          <div className="col-span-2 hidden sm:block">PID</div>
          <div className="col-span-7 sm:col-span-6">Resource Allocation</div>
        </div>

        {/* Process List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1">
          {portfolioData.skills.map((skill, i) => (
            <div key={skill.name} className="grid grid-cols-12 gap-4 py-2 px-2 items-center hover:bg-slate-800/50 rounded transition-colors group">
              <div className="col-span-5 sm:col-span-4 flex items-center gap-2 text-slate-200 font-semibold">
                <span className="text-[10px] text-slate-600 group-hover:text-os-accent transition-colors">▶</span>
                <span className="truncate">{skill.name.toLowerCase().replace(/[\s/]+/g, '_')}.exe</span>
              </div>
              
              <div className="col-span-2 hidden sm:block text-slate-500">
                {/* Fake static PID based on index string length so it doesn't jump around on render */}
                {1000 + (i * 427) % 9000}
              </div>
              
              <div className="col-span-7 sm:col-span-6 flex items-center gap-3">
                <div className="flex-1 h-2 sm:h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.usage}%` }}
                    transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
                    className="h-full bg-os-accent relative"
                  >
                    {/* Subtle shine effect for a premium feel */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20"></div>
                  </motion.div>
                </div>
                <div className="w-8 text-right text-slate-400 text-[10px] sm:text-xs">
                  {skill.usage}%
                </div>
              </div>
            </div>
          ))}
          
          {/* Fake System Idle Processes to fill out the table */}
          {[1, 2, 3].map(i => (
            <div key={`sys-${i}`} className="grid grid-cols-12 gap-4 py-2 px-2 items-center opacity-40">
              <div className="col-span-5 sm:col-span-4 flex items-center gap-2 text-slate-400">
                <span className="text-[10px] text-slate-700">▶</span>
                <span className="truncate">system_idle_{i}.dll</span>
              </div>
              <div className="col-span-2 hidden sm:block text-slate-600">
                {400 + i * 12}
              </div>
              <div className="col-span-7 sm:col-span-6 flex items-center gap-3">
                <div className="flex-1 h-2 sm:h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-700 w-[2%]"></div>
                </div>
                <div className="w-8 text-right text-slate-500 text-[10px] sm:text-xs">0%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
