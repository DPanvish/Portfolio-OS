"use client";

import React, { useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function InteractiveBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // loadSlim is highly optimized and only loads the features we need
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#020617] pointer-events-none overflow-hidden">
      
      {/* 
        tsParticles Cyber-Network
        We use detectsOn: "window" so it tracks the mouse globally without 
        needing pointer-events-auto (which would block the desktop icons).
      */}
      <Particles
        id="tsparticles"
        init={particlesInit}
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
                mode: "grab", // Creates connecting laser lines to the mouse cursor
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
              value: ["#06b6d4", "#3b82f6", "#8b5cf6"], // Cyan, Blue, Purple nodes
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
              speed: 0.6, // Slow, premium floating speed
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
      
      {/* Deep Cyberpunk Vignette & Ambient Glows to anchor the particles */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.95)_100%)]" />
      <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
    </div>
  );
}
