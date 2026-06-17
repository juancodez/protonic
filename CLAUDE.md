# CLAUDE.md — Protonic

## What is this

React design system built on React Aria Components. 3 phases, developed agile (sprint by sprint):

1. **Phase 1** — 4 accessible base components (no styles): Button, Modal, Select, Table
2. **Phase 2** — Design layer: tokens from Klaro, CVA variant API, Storybook
3. **Phase 3** — Agentic layer: Component Auditor, A11y Agent, Docs Agent, Design Review Agent ← North Star

## Stack

| | |
|---|---|
| Framework | Vite + React 18 + TypeScript (strict) |
| A11y layer | `react-aria-components` — DO NOT bypass |
| Variant API | `class-variance-authority` (CVA) — Phase 2 |
| Classnames | `clsx` via `src/lib/cn.ts` |
| Styling | CSS custom properties — no Tailwind, no CSS-in-JS |

## Token origin

Tokens ported from Klaro (`C:\Users\tn\klaro-landing-01`) actual implementation.  
**Source of truth:** `src/tokens/primitives.ts`  
Klaro's `CLAUDE.md` colors/fonts are outdated — always use primitives.ts values.

## Integrated tools (activate as needed)

| Tool | Phase | Use |
|------|-------|-----|
| Ponytail | Always | Enforce minimal components |
| Figma CLI (`C:/Users/tn/figma-cli`) | 2+ | Push/pull designs |
| figma-component-generator skill | 2+ | Generate components from Figma |
| graphify skill | 3 | Knowledge graph of component system |

## Current phase

**Phase 1** — building 4 base components, no brand styling yet.  
Active checklist:
- [ ] Button ✅ (scaffold done, no styles)
- [ ] Modal (Dialog in React Aria)
- [ ] Select
- [ ] Table

## Rules

- React Aria handles behavior + a11y — never replace with custom ARIA
- `onPress` not `onClick` (React Aria normalizes mouse/touch/keyboard)
- Phase 1: no styles, no tokens in components — data attributes only (`data-variant`, `data-size`)
- Phase 2: apply tokens via CSS custom properties + CVA
- Phase 3: agentic layer only — no agents before Phase 2 is done
- Mark simplifications with `// ponytail:` comment
- No new dependencies without asking

## Working style

- Agile, not waterfall — refine each phase as we go
- Short cycles: build → review → iterate
- NOTES.md for React Aria findings and quirks
- AGENTS.md for Phase 3 agent contracts (stubs now, detailed later)
