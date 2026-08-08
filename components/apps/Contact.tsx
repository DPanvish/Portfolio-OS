"use client";

import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    
    // Extract form data
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject') as string || "Let's work together!";
    const message = formData.get('message') as string || "";
    
    // Wire to real local mail client
    window.location.href = `mailto:hello@yourportfolio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    // Show success state
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 500);
  };

  return (
    // Note the light mode color scheme to mimic a classic mail client, standing out from the dark OS
    <div className="h-full flex flex-col bg-[#f5f5f5] text-slate-900 -m-4 rounded-b-lg overflow-hidden">
      
      {/* Mail Toolbar */}
      <div className="flex items-center gap-4 p-2 bg-[#e8e8e8] border-b border-[#d1d1d1] shadow-sm select-none">
        <button 
          onClick={() => {
            if (status !== 'sending') {
              // Programmatically trigger the form submit
              const form = document.getElementById("contact-form") as HTMLFormElement;
              if (form) form.requestSubmit();
            }
          }}
          disabled={status === 'sending'}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded hover:bg-[#d1d1d1] active:bg-[#c0c0c0] disabled:opacity-50 transition-colors focus:outline-none"
        >
          <span className="text-xl drop-shadow-sm">{status === 'sending' ? '⏳' : '✉️'}</span>
          <span className="text-[10px] font-medium text-slate-700">Send</span>
        </button>
        
        <div className="w-px h-8 bg-[#d1d1d1]"></div>
        
        <button className="flex flex-col items-center gap-1 px-3 py-1.5 rounded hover:bg-[#d1d1d1] active:bg-[#c0c0c0] transition-colors focus:outline-none">
          <span className="text-xl drop-shadow-sm">📎</span>
          <span className="text-[10px] font-medium text-slate-700">Attach</span>
        </button>
      </div>

      {/* Mail Form */}
      <form id="contact-form" onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 bg-white overflow-y-auto custom-scrollbar">
        
        {status === 'sent' && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded text-sm flex items-center gap-2 animate-in fade-in duration-300">
            <span>✅</span> Message sent successfully! I will get back to you soon.
          </div>
        )}

        <div className="flex items-center border-b border-slate-200 py-3">
          <label className="w-20 text-slate-400 font-semibold text-xs tracking-wider uppercase">To:</label>
          <input 
            type="email" 
            value="hello@yourportfolio.com"
            readOnly
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-500 font-medium cursor-default"
          />
        </div>
        
        <div className="flex items-center border-b border-slate-200 py-3 group">
          <label className="w-20 text-slate-400 font-semibold text-xs tracking-wider uppercase group-focus-within:text-os-accent transition-colors">From:</label>
          <input 
            type="email" 
            placeholder="your@email.com"
            required
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-900 placeholder:text-slate-300"
          />
        </div>

        <div className="flex items-center border-b border-slate-200 py-3 mb-4 group">
          <label className="w-20 text-slate-400 font-semibold text-xs tracking-wider uppercase group-focus-within:text-os-accent transition-colors">Subject:</label>
          <input 
            type="text" 
            name="subject"
            placeholder="Let's work together!"
            required
            className="flex-1 bg-transparent border-none focus:outline-none text-sm font-semibold text-slate-900 placeholder:text-slate-300"
          />
        </div>

        <textarea 
          name="message"
          placeholder="Write your message here..."
          required
          className="flex-1 w-full resize-none bg-transparent border-none focus:outline-none text-sm text-slate-700 leading-relaxed custom-scrollbar placeholder:text-slate-300"
        ></textarea>
      </form>
    </div>
  );
}
