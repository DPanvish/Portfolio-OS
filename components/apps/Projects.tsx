"use client";

import React from 'react';
import { portfolioData } from '@/lib/data';
import { useWindowStore } from '@/store/useWindowStore';

export default function Projects() {
  const { openWindow } = useWindowStore();

  return (
    <div className="flex flex-wrap gap-8 p-4">
      {portfolioData.projects.map((proj) => (
        <button
          key={proj.id}
          // Double click opens the specific project details window
          onDoubleClick={() => openWindow(proj.id, proj.title, 'ProjectDetail')}
          // Mobile fallback
          onTouchEnd={() => openWindow(proj.id, proj.title, 'ProjectDetail')}
          className="flex flex-col items-center gap-2 group focus:outline-none w-20 sm:w-24"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/80 border border-slate-600/50 rounded-2xl shadow-lg flex items-center justify-center group-hover:bg-slate-700 group-hover:border-os-accent/80 transition-all group-active:scale-95 group-focus-visible:ring-2 ring-os-accent">
            <span className="text-3xl group-hover:scale-110 transition-transform drop-shadow-md">
              🚀
            </span>
          </div>
          <span className="text-[11px] sm:text-xs text-center font-medium text-slate-200 line-clamp-2 px-1 group-hover:text-os-accent transition-colors">
            {proj.title}
          </span>
        </button>
      ))}
    </div>
  );
}
