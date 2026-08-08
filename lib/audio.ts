"use client";

// A zero-dependency Web Audio API synthesizer for retro UI sounds.
// This prevents us from needing actual .mp3/.wav files in the /public folder.
export const playRetroSound = (type: 'click' | 'open' | 'close' | 'minimize' | 'boot' | 'login' | 'type' | 'spawn', enabled: boolean) => {
  if (!enabled || typeof window === 'undefined') return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    // Resume context in case it was suspended by browser autoplay policy
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'boot') {
      // Cinematic deep bass sweep
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, now);
      osc.frequency.linearRampToValueAtTime(120, now + 2);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 4);
      osc.start(now);
      osc.stop(now + 4);

      // Ethereal high chord overlay
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(880, now + 2);
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.05, now + 1.5);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 4);
      osc2.start(now);
      osc2.stop(now + 4);
    }
    else if (type === 'login') {
      // Pleasant majestic login chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc.start(now);
      osc.stop(now + 1.5);
    }
    else if (type === 'type') {
      // Soft high-tech mechanical keyboard click
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, now); // randomized pitch for realism
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.start(now);
      osc.stop(now + 0.02);
    }
    else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } 
    else if (type === 'open') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
    else if (type === 'close') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
    else if (type === 'minimize') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Silently fail if audio context is blocked by browser policies
  }
};
