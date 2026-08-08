"use client";

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function InteractiveBackground() {
  const [init, setInit] = useState(false);

  // In tsParticles v3 for React, we must initialize the engine once globally
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#020617] pointer-events-none overflow-hidden">
      
      {/* tsParticles Cyber-Network */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "window",
              events: {
                onHover: {
                  enable: true,
                  mode: "grab", 
                },
                resize: {
                  enable: true,
                }
              },
              modes: {
                grab: {
                  distance: 250,
                  links: {
                    opacity: 0.8,
                    color: "#22d3ee" // Bright Cyan glowing grab lines
                  },
                },
              },
            },
            particles: {
              color: {
                value: ["#06b6d4", "#3b82f6", "#8b5cf6"], 
              },
              links: {
                color: "#38bdf8",
                distance: 180,
                enable: true,
                opacity: 0.15,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.6, 
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 1920,
                  height: 1080
                },
                value: 120,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 2.5 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
      )}
      
      {/* Deep Cyberpunk Vignette & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.95)_100%)]" />
      <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
    </div>
  );
}
