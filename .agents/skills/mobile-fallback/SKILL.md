---
name: mobile-fallback
description: Rules for the mobile responsive view
---
# Mobile Fallback
This skill dictates how the OS simulation degrades gracefully on small screens and touch devices.

## Guidelines
- **Different Paradigm:** Do NOT simply shrink the desktop UI. True window dragging and resizing is a terrible user experience on touch screens.
- **Mobile UI:** Design a genuinely different mobile mode: a single-window, full-screen, swipe-between-apps experience.
- **Terminal on Mobile:** Keep the terminal available on mobile (it is touch-friendly since it is just a text input), but strip away the complex window chrome.
- **Interactions:** Disable the custom interactive cursor entirely on touch devices. Fall back to system defaults.
