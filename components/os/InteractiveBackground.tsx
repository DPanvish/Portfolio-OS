"use client";

import React, { useMemo } from 'react';
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function InteractiveBackground() {
  const init = async (engine: Engine) => {
    // loadSlim is highly optimized and only loads the features we need
    await loadSlim(engine);
  };

  const options = useMemo(() => ({
    fullScreen: { enable: false, zIndex: 0 },
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 60,
      interactivity: {
      detectsOn: "window" as const,
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: ["grab", "bubble"], // Connects lasers AND makes nodes glow/grow
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
        bubble: {
          distance: 250,
          size: 6,
          duration: 0.4,
          opacity: 1
        },
        push: {
          quantity: 3, // Spawns 3 new nodes per click
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
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
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
        type: "circle" as const,
      },
      size: {
        value: { min: 1, max: 2.5 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <ParticlesProvider init={init}>
      <div className="absolute inset-0 z-0 bg-[#020617] pointer-events-none overflow-hidden">
        
        {/* tsParticles Cyber-Network */}
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0"
        />
        
        {/* Deep Cyberpunk Vignette & Ambient Glows to anchor the particles */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.95)_100%)]" />
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>
    </ParticlesProvider>
  );
}
