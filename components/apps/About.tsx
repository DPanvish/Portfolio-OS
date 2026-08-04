import React from 'react';
import { portfolioData } from '@/lib/data';

export default function About() {
  return (
    <article className="h-full flex flex-col p-2 sm:p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">About Me</h1>
        <div className="w-12 h-1 bg-os-accent rounded"></div>
      </header>
      
      <section className="text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* We use semantic paragraphs to satisfy SEO parity rules */}
        <p>{portfolioData.about}</p>
      </section>
    </article>
  );
}
