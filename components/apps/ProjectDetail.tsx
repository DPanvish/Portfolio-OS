"use client";

import React from 'react';
import { portfolioData } from '@/lib/data';

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const project = portfolioData.projects.find(p => p.id === projectId);

  if (!project) return <div className="p-4 text-red-400">Project not found.</div>;

  return (
    <article className="h-full flex flex-col p-2 sm:p-4 animate-in fade-in duration-300">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">{project.title}</h1>
        <div className="w-12 h-1 bg-os-accent rounded mb-4"></div>
      </header>

      {/* Mock Image Preview Pane */}
      <div className="w-full h-40 sm:h-64 bg-slate-900 border border-slate-700/50 rounded-lg flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group">
        {/* We use a pattern to simulate a real image placeholder */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-black"></div>
        <span className="text-slate-500 font-mono text-sm z-10 group-hover:scale-105 transition-transform">
          [Image Preview: {project.title}]
        </span>
      </div>
      
      <section className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 flex-1">
        <p>{project.description}</p>
      </section>

      {/* Action Footer */}
      <div className="mt-auto border-t border-slate-700/50 pt-4 flex justify-end">
        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-os-accent text-slate-900 font-bold text-sm rounded hover:bg-sky-300 transition-colors focus:ring-2 ring-white ring-offset-2 ring-offset-slate-900"
        >
          <span>View Live App</span>
          <span className="text-lg">↗</span>
        </a>
      </div>
    </article>
  );
}
