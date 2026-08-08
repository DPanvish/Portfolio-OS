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

      {/* Multi-Image Carousel Pane */}
      <div className="w-full h-48 sm:h-72 mb-6 rounded-lg overflow-hidden border border-white/10 shadow-inner group relative">
        {project.images && project.images.length > 0 ? (
          <>
            <div className="flex overflow-x-auto snap-x snap-mandatory h-full w-full custom-scrollbar scroll-smooth">
              {project.images.map((img: string, idx: number) => (
                <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Image Indicator Overlay */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] text-white font-medium border border-white/10 shadow-lg">
                    {idx + 1} / {project.images.length}
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll Hint (Only show if multiple images) */}
            {project.images.length > 1 && (
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white/90 font-bold tracking-widest pointer-events-none shadow-xl animate-pulse">
                SCROLL ➔
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-black"></div>
            <span className="text-slate-500 font-mono text-sm z-10 group-hover:scale-105 transition-transform">
              [Images Unavailable]
            </span>
          </div>
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
