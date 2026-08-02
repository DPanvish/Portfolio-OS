# Terminal / OS Simulation Portfolio — Master Build Document

## 1. Concept

The portfolio simulates a desktop OS or command-line environment. A visitor "boots" the site, then either clicks around a desktop (icons → draggable app windows) or types real commands into a terminal to explore the same content. Both paths lead to the same underlying information — About, Experience, Projects, Contact — just through different interaction models.

**Core promise:** it should feel like a genuine, slightly nostalgic OS (think early macOS / Windows 95 / a BBS terminal), not a gimmick layered on top of a normal portfolio. The premium feeling comes from restraint — one polished interaction model, executed precisely, rather than five half-finished ones.

---

## 2. Experience Map

| Section | OS Metaphor | Interaction |
|---|---|---|
| Hero | Boot/login sequence → desktop wallpaper with icons, or a terminal with a blinking `> whoami` prompt | Auto-plays once, skippable |
| About | `about.txt` / Notes app window | Draggable, closable chrome |
| Experience | File Explorer | Folders per job → click to expand a detail pane |
| Projects | App icons on the desktop | Double-click opens a window with preview, description, links |
| Skills | Fake Task Manager / System Info panel | Skills listed as "processes" with animated usage bars |
| Contact | Mail app window, or `send-message --to=you` | Form inside a window, or a real terminal command |
| Bonus | A real, typeable terminal | `help`, `projects`, `contact`, `sudo hire-me`, `play snake` |

---

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSR/SSG keeps About/Projects/Experience content crawlable even though the "chrome" on top is a client-side simulation. Vite+React only makes sense if you're fully abandoning SEO. |
| Styling | **Tailwind CSS** + custom OS-chrome components | Utility-first for speed, hand-built title bars/buttons/icons for the bespoke look |
| Window management | **react-rnd** (drag + resize) | Battle-tested, handles resize handles and drag bounds out of the box; wrap it rather than reinvent it |
| Terminal engine | Custom command parser (input → handler map → output component) | Full control over commands, styling, and easter eggs. Consider **xterm.js** only if you want authentic ANSI/cursor-blink behavior — it's heavier and less necessary for a portfolio scope |
| Animation | **Framer Motion** | Window open/close/minimize transitions, boot sequence, cursor motion |
| State | **Zustand** | Open windows, z-index/focus order, terminal history, boot-complete flag |
| Custom cursor | Framer Motion `useMotionValue` + spring, or a small canvas layer | See Section 8 |
| Sound (optional) | Howler.js or native `Audio()` | Subtle click/open/close chimes, muted by default with a toggle |
| Testing | Playwright (e2e), Vitest/RTL (unit) | Drag/drop and terminal command parsing both deserve real test coverage |
| Analytics | Vercel Analytics / Plausible | Track which mode (desktop vs terminal) visitors actually use |
| Deployment | **Vercel** | Native Next.js support, previews per PR |

---

## 4. Detailed Step-by-Step Roadmap

### Phase 0 — Discovery & Design System (2–3 days)
1. Define one concrete "OS era/vibe" (retro 90s desktop? clean modern macOS-like? terminal-first BBS aesthetic?) — pick one, don't blend three.
2. In Figma: design the wallpaper, icon set (About/Projects/Contact/Terminal), window chrome (title bar, traffic-light or custom buttons), dock/taskbar, and cursor states.
3. Define type scale, color tokens, and the "signature" visual moment (e.g., a CRT scanline flicker on boot, or a satisfying window-open "pop").
4. Write real copy for About/Experience/Projects/Contact now — don't let placeholder text survive into build.

### Phase 1 — Foundation & Repo Setup (1–2 days)
5. Scaffold Next.js + TypeScript, install Tailwind, Framer Motion, Zustand, react-rnd.
6. Set up folder structure: `/app`, `/components/os` (chrome), `/components/apps` (About/Projects/etc.), `/lib/commands` (terminal), `/store` (Zustand).
7. Set up Playwright + Vitest scaffolding early so tests grow alongside features, not after.

### Phase 2 — Desktop Shell (4–5 days)
8. Build the boot/login sequence: fake loading bars, ASCII-art name reveal, or a startup-chime visual. Make it skippable after ~1 viewing (store a flag so repeat visitors don't sit through it).
9. Build the desktop shell: icon grid, taskbar/dock, click-to-open behavior.
10. Build the generic `Window` component: draggable, resizable, minimize/maximize/close, focus-to-front on click, respecting drag bounds so windows can't get lost off-screen.
11. Wire Zustand store for window state: open/closed, position, z-index/focus order, minimized list for the dock.

### Phase 3 — Content Windows (5–6 days)
12. Build About, Experience, Projects, Contact as **plain, semantic components first** — real headings, real paragraphs, real links — before dropping them into window chrome. This is the SEO safety net (see Section 6).
13. Experience: File-Explorer-style list of folders (one per job), click to expand a detail pane.
14. Projects: each is an app icon; double-click opens a window with preview image, description, and live/repo links.
15. Skills: fake Task Manager panel — skills as "processes" with animated usage bars (Framer Motion width transitions).
16. Contact: Mail-app window with a real form (or route through `send-message --to=you` in the terminal), wired to a real backend (Resend/Formspree/API route).

### Phase 4 — Terminal Engine (4–5 days)
17. Build the terminal component: input box, command history (up/down arrow recall), scrollback.
18. Build the `commands` object: string → handler function returning a React output node.
19. Wire real commands: `help`, `about`, `projects`, `skills`, `contact`, `clear`.
20. Add easter eggs: `sudo hire-me`, `play snake` (a tiny canvas/DOM snake game), maybe `whoami`, `ls`, `cat resume.pdf`.
21. Make sure terminal output for `about`/`projects`/`contact` reuses the same content components as the windowed versions — one source of truth, two renderings.

### Phase 5 — Custom Cursor & Motion Polish (2 days)
22. Build the premium interactive cursor (see Section 8 for full spec).
23. Pass over every window transition, dock hover, and icon interaction for consistent easing/duration.
24. Add subtle sound design if desired, muted by default with a visible toggle.

### Phase 6 — Mobile Fallback (3–4 days)
25. Design a **genuinely different** mobile mode: single window, full-screen, swipe-between-apps (don't just shrink the desktop UI — true drag/resize is a bad fit for touch).
26. Keep the terminal available on mobile (it's actually touch-friendly — it's just a text input) but simplify window chrome away entirely.
27. Test on real devices, not just responsive-mode-in-devtools.

### Phase 7 — SEO, Accessibility & Performance QA (2–3 days)
28. Confirm all About/Projects/Experience content is real DOM (view page source, not just rendered canvas) — see Section 6.
29. Add meta tags, OpenGraph image, sitemap, and a hidden/static fallback route for crawlers and quick-skimming recruiters.
30. Keyboard-only pass: can someone tab through icons, open/close windows, and use the terminal without a mouse?
31. `prefers-reduced-motion` pass — disable boot animation, cursor trail, and window-transition flourishes for users who request it.
32. Lighthouse pass (performance, accessibility, SEO) on both desktop and mobile.

### Phase 8 — Deployment (1 day)
33. Deploy to Vercel, verify preview deploys, connect custom domain, verify OpenGraph/meta render correctly when shared.

**Total: ~3.5–4.5 weeks** for one person working solo, focused effort.

---

## 5. Roadmap at a Glance

| Phase | Duration | Focus |
|---|---|---|
| 0. Discovery & design system | 2–3 days | Vibe, wireframes, icon/window design, real copy |
| 1. Foundation | 1–2 days | Repo, Tailwind, state, test scaffolding |
| 2. Desktop shell | 4–5 days | Boot sequence, icon grid, dock, window component |
| 3. Content windows | 5–6 days | About/Experience/Projects/Contact inside windows |
| 4. Terminal | 4–5 days | Command parser, real commands, easter eggs |
| 5. Custom cursor & polish | 2 days | Cursor, sound, motion consistency |
| 6. Mobile fallback | 3–4 days | Simplified single-window/swipe mode |
| 7. SEO/accessibility/QA | 2–3 days | Crawlability, keyboard nav, reduced motion, Lighthouse |
| 8. Deploy | 1 day | Vercel, domain, OG verification |

---

## 6. Watch-outs

- **Recruiters skim fast.** Always show a visible "Skip to normal view →" link or a static résumé PDF/link on the boot screen itself — don't make anyone play a game to see your work history.
- **Mobile needs a different model, not a shrunk one.** True window-dragging fails on touch. Design the swipe/single-window mode as its own thing from the start.
- **SEO is the real risk of this concept.** Google can't meaningfully index a canvas or a game-engine-rendered scene. Every real piece of content (About, Experience, Projects) must exist as actual DOM text underneath the visual chrome — the window is a wrapper, not the content's only home. Consider server-rendering a plain fallback page at each route (`/about`, `/projects`) for crawlers and non-JS users.
- **Sound defaults to off.** Never auto-play audio; use a visible mute/unmute toggle.
- **Don't over-animate.** One well-orchestrated boot sequence beats five scattered micro-animations everywhere. Cut anything that doesn't serve the "this is a real OS" illusion.

---

## 7. Custom Interactive Cursor — Spec

A stock `cursor: pointer` will undercut the "premium OS" feeling immediately, so this deserves its own mini-spec:

**Behavior**
- A small dot or glyph follows the real cursor with a slight spring-lag (Framer Motion `useSpring` on `useMotionValue`, not a 1:1 follow — the lag is what reads as "premium").
- **State changes on context**, the same way a real OS cursor changes:
  - Over a window edge/corner → resize cursor (↔ / ↕ / ⤡ glyph)
  - Over a draggable title bar → a "grab" hand or four-way arrow
  - Over a dock/desktop icon → subtle magnetic pull toward the icon center, icon scales up slightly (a soft nod to macOS dock magnification)
  - Over terminal input → a blinking-block text cursor style
  - Over a normal link/button → cursor grows and inverts color (mix-blend-mode: difference) for a tactile "this is clickable" cue
- Click gives a quick scale-down "press" pulse.

**Implementation notes**
- Keep it to Framer Motion (already in the stack) — no need to add GSAP just for this.
- Render as a fixed-position `div`/SVG at the root layout, above all windows, `pointer-events: none`.
- **Disable entirely on touch devices** (no mouse = no custom cursor; fall back to system default).
- **Respect `prefers-reduced-motion`**: drop the spring-lag and magnetic pull, keep only the state-based shape change, or disable entirely.
- Hide the native OS cursor only once the custom one has confirmed mount, to avoid a flash of the real cursor on load.

---

## 8. Best AI Skills / Tooling for Building This (Claude & Antigravity)

Both Claude and Google's Antigravity IDE now support the same open **Agent Skills** standard — a folder with a `SKILL.md` file that an agent reads when it recognizes a relevant task. <cite index="10-1">A skill is a folder containing a SKILL.md file with instructions that the agent can follow when working on specific tasks</cite>, and <cite index="10-1">the agent decides on its own when a skill is relevant based on context, without needing to be told explicitly</cite>. In Antigravity specifically, skills can live at a global scope for cross-project utilities or <cite index="7-1">at a project/workspace scope for project-specific scripts, deployment steps, or boilerplate for a proprietary framework</cite> — which maps well onto a project like this one.

### Skills to lean on (already built into Claude)
- **`frontend-design`** — the single most relevant skill for this brief. It pushes toward a deliberate token system (a named 4–6 color palette, a real type pairing, a layout concept, and one "signature" element) instead of the generic AI-design defaults (cream + serif + terracotta; near-black + one acid accent; broadsheet hairlines). For an OS-simulation portfolio, the signature element is an obvious fit for the boot sequence or the cursor — pick one, execute it precisely, and keep everything else quiet.
- **`skill-creator`** — useful if you want to *codify* your own project conventions as you build, so an agent stays consistent across sessions instead of re-deriving your window-chrome rules every time.

### Project-specific skills worth authoring (for Claude Code *or* Antigravity — same format works in both)
Since <cite index="1-1">Antigravity's skills adopt the open Agent Skills standard</cite>, a `SKILL.md` you write for this project is portable between the two tools. Worth creating one per recurring concern so an agent doesn't reinvent your patterns each session:

| Skill folder | Encodes |
|---|---|
| `os-chrome-design` | Your locked palette, type scale, title-bar/button anatomy, and icon style — so every new window or icon matches without re-explaining it |
| `window-manager` | The react-rnd + Zustand pattern for drag/resize/focus/z-index, so new windows plug into the existing store correctly |
| `terminal-engine` | The command-handler map convention, history/scrollback behavior, and how to add a new command or easter egg |
| `content-seo-parity` | The rule that every windowed/terminal content piece must also exist as real, crawlable DOM — prevents an agent from quietly moving content into canvas-only rendering |
| `mobile-fallback` | The swipe/single-window interaction model, kept explicitly separate from the desktop drag model |

**Where to put them**
- Claude Code: project-level under a skills directory in your repo, or use the `skill-creator` skill to scaffold one.
- Antigravity: <cite index="7-1">project skills go under `<project-root>/.agents/skills/`, while general-purpose utilities go in the global `~/.gemini/config/skills/` scope</cite>.

### Practical workflow tip
Run the `frontend-design` process (brainstorm → token plan → self-critique → build) *before* writing any component code — locking the palette/type/signature first prevents the classic AI-portfolio failure mode of a technically impressive window manager wrapped in a visually generic shell.

---

## 9. Pre-Launch Checklist

- [ ] Boot sequence is skippable and doesn't replay on every visit
- [ ] Static résumé link or "skip to normal view" visible on first screen
- [ ] All About/Experience/Projects content readable in page source (view-source test)
- [ ] Keyboard-only pass: can tab to every icon, open/close every window, use the terminal
- [ ] `prefers-reduced-motion` disables boot animation, cursor trail, magnetic hover
- [ ] Sound off by default, with a visible toggle
- [ ] Mobile uses the simplified swipe/single-window mode, not a shrunk desktop
- [ ] Custom cursor disabled on touch devices
- [ ] Lighthouse: performance, accessibility, SEO all checked on desktop + mobile
- [ ] OpenGraph/meta image renders correctly when the link is shared
