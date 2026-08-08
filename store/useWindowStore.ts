import { create } from 'zustand';
import { playRetroSound } from '@/lib/audio';

export interface OSWindow {
  id: string;
  title: string;
  isMinimized: boolean;
  isOpen: boolean;
  component: string; // Identifier for what content to render
}

interface WindowStore {
  windows: Record<string, OSWindow>;
  windowOrder: string[]; // Array of IDs. The last ID has the highest z-index.
  openWindow: (id: string, title: string, component: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  windowOrder: [],
  soundEnabled: true,
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  openWindow: (id, title, component) => set((state) => {
    playRetroSound('open', state.soundEnabled);
    // If the window is already open, just restore and focus it
    if (state.windows[id]) {
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false }
        },
        windowOrder: [...state.windowOrder.filter(wId => wId !== id), id]
      };
    }
    
    // Otherwise, create a new window and bring it to the front
    return {
      windows: {
        ...state.windows,
        [id]: { id, title, component, isOpen: true, isMinimized: false }
      },
      windowOrder: [...state.windowOrder, id]
    };
  }),
  
  closeWindow: (id) => set((state) => {
    playRetroSound('close', state.soundEnabled);
    const newWindows = { ...state.windows };
    delete newWindows[id];
    return {
      windows: newWindows,
      windowOrder: state.windowOrder.filter(wId => wId !== id)
    };
  }),
  
  minimizeWindow: (id) => set((state) => {
    playRetroSound('minimize', state.soundEnabled);
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true }
      }
    };
  }),
  
  restoreWindow: (id) => set((state) => {
    playRetroSound('open', state.soundEnabled);
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: false }
      },
      // Bring to front when restored
      windowOrder: [...state.windowOrder.filter(wId => wId !== id), id]
    };
  }),
  
  focusWindow: (id) => set((state) => ({
    // Bring the focused window to the end of the array (highest z-index)
    windowOrder: [...state.windowOrder.filter(wId => wId !== id), id]
  }))
}));
