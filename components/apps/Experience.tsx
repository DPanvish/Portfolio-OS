"use client";

import React, { useState } from 'react';
import { portfolioData } from '@/lib/data';

export default function Experience() {
  // Select the first job by default
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(
    portfolioData.experience[0]?.id
  );

  const selectedJob = portfolioData.experience.find(job => job.id === selectedJobId);

  return (
    <div className="flex h-full flex-col sm:flex-row bg-slate-950/50 -m-4"> 
      {/* 
        Note: The -m-4 offsets the padding of the parent Window component, 
        allowing this explorer UI to flush to the edges.
      */}

      {/* Left Pane - Folder List */}
      <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-slate-700/50 p-2 overflow-y-auto custom-scrollbar bg-slate-900/50">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2 pt-2">Directories</h2>
        <ul className="space-y-1">
          {portfolioData.experience.map((job) => (
            <li key={job.id}>
              <button
                onClick={() => setSelectedJobId(job.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition-colors focus:outline-none ${
                  selectedJobId === job.id 
                    ? 'bg-os-accent/20 text-os-accent shadow-inner' 
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span className="text-base">{selectedJobId === job.id ? '📂' : '📁'}</span>
                <span className="truncate font-medium">{job.company}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Pane - Detail View */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto custom-scrollbar">
        {selectedJob ? (
          <article className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <header className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">{selectedJob.title}</h1>
              <div className="flex items-center gap-3">
                <span className="text-os-accent font-semibold">{selectedJob.company}</span>
                <span className="text-slate-600 text-sm">•</span>
                <span className="text-slate-400 text-sm font-mono">{selectedJob.date}</span>
              </div>
            </header>
            
            <div className="w-full h-px bg-slate-700/50 my-6"></div>

            <section className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{selectedJob.description}</p>
            </section>
          </article>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
            Select a directory to view its contents
          </div>
        )}
      </div>
    </div>
  );
}
