# Protonic

A contract-first, agentic design system framework built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/).

> *"El que dice que no es necesario un design system porque existe shadcn, sigue pensando en librerías. Tu ya estás en otra abstracción donde la librería es un artefacto."*
> — Cristian Morales Achiardi

---

## The idea

shadcn/ui is a library. Protonic is a model.

The difference: in shadcn, the library IS the system. In Protonic, the library is an artifact produced by contracts. The contracts are the system. An AI agent (Claude Code) enforces them.

| | shadcn | Protonic |
|---|---|---|
| Approach | Library-first | Contract-first |
| Rules | Pre-decided, baked in | You define them — agents enforce them |
| Platform | React web only | General contracts, any binding |
| Library | The product | An artifact |
| Agents | None | Built in from day 1 |
| Adoption | Copy → paste → customize | Define your contracts → apply your theme → ship |

---

## Architecture: 5 Layers + 1 Loop

```
🟡 1. Tokenization Layer
   Design decisions as CSS custom properties.
   Style Dictionary compiles W3C-format source → variables.css
   One change = every component follows.

🟢 2. Intent Layer
   Components declare identity through contracts, not code.
   axes.ts   — canonical prop vocabulary (variant / size / status)
   contracts.ts — articulated WHY behind every visual decision
   Component.metadata.ts — AI-readable docs per component

🔵 3. Indexing Layer
   .ai/index.json — the agent's map. Load once. Navigate without crawling.
   /codebase-index — regenerate the map after any change (deterministic, no LLM)

🟣 4. Orchestration Layer
   CLAUDE.md — Agent Operating Protocol (how Claude Code runs this project)
   .claude/commands/ — all agentic skills (slash commands)
   The agent reads indexes, acts through skills, never improvises.

🩷 5. Figma Integration
   Code is the source. Figma is the render target.
   .figma/manifest.json — design identity (file key, fonts, conventions)
   /figma-component-generator — pushes component sets to Figma, bound to variables

🔴 6. Agentic Loop
   scaffold → audit → design-review → review-pr → (merge) → codebase-index
   The loop never opens. Violations are caught. Fixes are proposed with rationale.
```

---

## The Agentic Skills

All slash commands live in `.claude/commands/`:

| Command | What it does |
|---|---|
| `/scaffold-component <Name>` | Generate complete 8-file component anatomy |
| `/component-auditor <path>` | Audit file structure, props, React Aria conventions |
| `/a11y-agent <path>` | Full AT support audit (NVDA, JAWS, VoiceOver, TalkBack, Narrator, Orca) |
| `/design-review <path>` | CSS token compliance — no hardcoded values |
| `/docs-agent <path>` | Generate/update Storybook stories for full variant coverage |
| `/codebase-index` | Regenerate `.ai/index.json` after any component change |
| `/review-pr [path\|--all]` | Governance gate — runs all layers before merge |

Static scripts (CI-friendly, no LLM needed):

```bash
npm run audit -- src/components/<Name>
npm run design-review -- src/components/<Name>
```

---

## Why the Infrastructure Matters

Benchmark from Cristian Morales Achiardi's ARC study (11 trials, agent with/without pre-built infrastructure):

| Metric | Without infra | With infra | Δ |
|---|---|---|---|
| Accuracy | 65% | 100% | +54% |
| Speed | 4:26 | 1:52 | 58% faster |
| Consistency | 26.5% variance | 0.04% variance | 99.9% reduction |
| False negatives | 60% | 0% | Eliminated |

Infrastructure converts token spend from **exploration into analysis**. The agent reads a map. It doesn't wander the codebase.

---

## How to Adopt Protonic for Your Project

Protonic is designed to be forked, not installed. The framework is the contracts — you bring your brand.

**Step 1 — Define your general contracts** (portable, platform-agnostic)
```
src/tokens/axes.ts      — your prop vocabulary (variant / size / status axes)
src/tokens/contracts.ts — articulate WHY every design decision was made
```

**Step 2 — Apply your theme** (brand-specific)
```
src/tokens/primitives.ts  — your raw brand values (colors, fonts, radii)
src/tokens/theme.css      — CSS custom properties wiring tokens to the system
tokens/*.json             — Style Dictionary source (compiled → variables.css)
```

**Step 3 — Update the Figma manifest**
```
.figma/manifest.json — your Figma file key, font names, variable collection names
```

**Step 4 — Scaffold your first component**
```
/scaffold-component Button
```
The skill reads YOUR axes and generates the 8-file anatomy with YOUR token names.

**Step 5 — The loop runs itself**
```
scaffold → /component-auditor → /design-review → /review-pr → /codebase-index
```
Every time you add a component, the agents check it. Every contract violation is caught before it ships. Figma stays in sync because it's generated from code.

---

## Component Anatomy (8 files per component)

```
src/components/<Name>/
  <Name>.tsx           React Aria primitive + CVA + typed props
  <Name>.types.ts      TypeScript interface extending React Aria type
  <Name>.styles.ts     CVA variant configuration
  <Name>.module.css    Token-based CSS (NO hardcoded values)
  <Name>.metadata.ts   AI-readable: use cases, compositions, anti-patterns, a11y
  <Name>.stories.tsx   Storybook: all variants covered, ArgTypes from axes
  <Name>.test.tsx      Vitest browser tests (Playwright headless)
  index.ts             Barrel: component + types + metadata
```

---

## Klaro — Reference Consumer

[Klaro](https://github.com/juancodez/klaro-landing) is a fiscal assistant for Spanish-speaking freelancers in Germany. It's the first real product consuming Protonic. Its tokens are the default theme — NOT Protonic's identity.

Any project applies a different `theme.css` and `primitives.ts`. The 9 core components + all the agents work with any theme.

**9 components shipped — all at 10/10 audit, 0 design-review warnings:**

Phase 1 (React Aria base, accessible):
Button · Modal · Select · Table

Phase 2 (Klaro theme applied):
Badge · Card · Hero · ClaraPanel · DraggableTicker

---

## Getting Started

```bash
git clone https://github.com/juancodez/protonic
cd protonic
npm install
npm run dev        # Vite dev server
npm run storybook  # Storybook on :6006
```

Run agents:
```bash
# Static (no Claude needed)
npm run audit -- src/components/Button
npm run design-review -- src/components/Button

# AI agents (Claude Code slash commands)
/codebase-index
/component-auditor src/components/Button
/review-pr src/components/Button
```

---

## Stack

| | |
|---|---|
| Framework | Vite + React 18 + TypeScript (strict) |
| Accessibility | `react-aria-components` |
| Variant API | `class-variance-authority` |
| Styling | CSS custom properties (no Tailwind, no CSS-in-JS) |
| Tokens | Style Dictionary (W3C format) |
| Agents | Claude Code + 7 slash commands |
| Figma sync | figma-cli |

---

Built by [Juan Gomez-Vara](https://github.com/juancodez) · Based on methodology by [Cristian Morales Achiardi](https://medium.com/@cristian.morales.achiardi)
