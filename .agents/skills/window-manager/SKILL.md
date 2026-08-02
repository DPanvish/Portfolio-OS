---
name: window-manager
description: Window management pattern using react-rnd and Zustand
---
# Window Manager
This skill defines the architecture for the draggable and resizable OS windows.

## Guidelines
- **UI Component:** Use `react-rnd` to handle dragging and resizing.
- **Constraints:** Always set drag bounds so windows cannot be dragged off-screen and lost.
- **State Management:** Use `Zustand` to manage the global window state.
- **State Values:** The store must track:
  - Which windows are open/closed
  - X/Y positions and dimensions
  - Z-index and focus order (clicking a window brings it to the front)
  - Minimized state (for rendering in the dock/taskbar)
- **Adding Windows:** Any newly created app window must plug into this existing Zustand store pattern.
