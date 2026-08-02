---
name: terminal-engine
description: Architecture and rules for the custom terminal engine
---
# Terminal Engine
This skill defines how the command-line interface portion of the portfolio works.

## Guidelines
- **Custom Parser:** We use a custom command parser instead of heavy libraries like xterm.js.
- **Handler Map:** Input strings map to a handler function that returns a React output node.
- **Features:** The terminal must support command history (up/down arrow recall) and scrollback.
- **Content Reuse:** Terminal output for commands like `about`, `projects`, or `contact` MUST reuse the exact same React content components as the windowed versions (One source of truth, two renderings).
- **Adding Commands:** To add a new command or easter egg, register it in the main command handler map.
