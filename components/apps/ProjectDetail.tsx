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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">{project.title}</h1>
        
        {/* Tech Stack Pills */}
        {project.techStack && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech: string) => (
              <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="w-12 h-1 bg-os-accent rounded mb-4 mt-2"></div>
      </header>

      {/* Image Preview Pane */}
      <div className="w-full h-40 sm:h-64 bg-slate-900 border border-slate-700/50 rounded-lg flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group">
        {project.image ? (
          // Use standard img tag for simplicity, Next.js Image component would be better for prod
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-black"></div>
            <span className="text-slate-500 font-mono text-sm z-10 group-hover:scale-105 transition-transform">
              [Image Preview Unavailable]
            </span>
          </>
        )}
      </div>
      
      <section className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 flex-1">
        <p>{project.description}</p>
      </section>

      {/* Action Footer */}
      <div className="mt-auto border-t border-slate-700/50 pt-4 flex gap-4 justify-end">
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white border border-slate-600 font-medium text-sm rounded hover:bg-slate-700 transition-colors focus:ring-2 ring-white ring-offset-2 ring-offset-slate-900"
          >
            <span>GitHub Repo</span>
            <span className="text-lg">⌨️</span>
          </a>
        )}
        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-os-accent text-slate-900 font-bold text-sm rounded hover:bg-sky-300 transition-colors focus:ring-2 ring-white ring-offset-2 ring-offset-slate-900"
        >
          <span>Live Demo</span>
          <span className="text-lg">↗</span>
        </a>
      </div>
    </article>
  );
}
