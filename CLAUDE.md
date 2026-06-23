# CLAUDE.md — Protonic

## What is this

**Contract-first, agentic design system built on React Aria. NOT opinionated like shadcn.**
The library is an artifact. The contracts are the system.
Klaro is the first consumer — it applies a theme. Protonic itself is generic.

3 phases, developed agile (sprint by sprint):

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

## Token origin + scope

Two layers — keep them separate:
- **General contracts** (`src/tokens/axes.ts`, `src/tokens/contracts.ts`) — portable, platform-agnostic
- **Klaro theme** (`src/tokens/primitives.ts`, `src/tokens/theme.css`) — Klaro-specific brand values

Tokens ported from Klaro (`C:\Users\tn\klaro-landing-01`) actual implementation.  
**Source of truth for Klaro values:** `src/tokens/primitives.ts`  
Klaro's `CLAUDE.md` colors/fonts are outdated — always use primitives.ts values.

Any project can replace the theme layer without touching the general contracts.

## Integrated tools (activate as needed)

| Tool | Phase | Use |
|------|-------|-----|
| Ponytail | Always | Enforce minimal components |
| Figma CLI (`C:/Users/tn/figma-cli`) | 2+ | Push/pull designs |
| figma-component-generator skill | 2+ | Generate components from Figma |
| graphify skill | 3 | Knowledge graph of component system |

## Current state

**All 3 phases complete + 22-step agentic system audit closed.**

10 components — all 10/10 audit, 0 design-review warnings:
- Phase 1 (React Aria base): Button ✅ Modal ✅ Select ✅ Table ✅
- Phase 2 (Klaro theme): Badge ✅ Card ✅ Hero ✅ ClaraPanel ✅ DraggableTicker ✅ Chip ✅

See `AGENTIC-SYSTEM.md` for the full 22-node architecture reference.

## Rules

Full rules live in `.claude/rules/` (path-scoped, auto-load on file touch).
Quick reference:
- React Aria handles behavior + a11y — never replace with custom ARIA
- `onPress` not `onClick` | `isDisabled` not `disabled`
- Token-only CSS — no hardcoded hex, px, font-family, easing keywords
- Foundation tokens (`--color-orange-500`) must NOT appear in component CSS
- CVA in `.styles.ts`, types in `.types.ts` — not inlined in `.tsx`
- No new dependencies without asking

## Agent Operating Protocol

When Claude Code starts a session in this project, follow this sequence:

1. **Load** `.ai/index.json` — get the full map (summary + components). Do NOT crawl the codebase.
2. **Load** `.ai/relationships/` — component-usage, design-tokens, dependencies maps.
3. **Keep in context** — index + relationships stay loaded for the whole conversation.
4. **Fetch on demand** — load individual `Component.metadata.ts` only when working on that component.
5. **Act through skills** — never improvise component creation outside of `/scaffold-component`. Never write freehand CSS — always token vars.
6. **Let rules shape you** — `.claude/rules/` auto-loads by path (tokens-system, metadata-schema, atomic-hierarchy, etc.). Read them, follow them.
7. **Close the loop** — after scaffolding or modifying: `/component-auditor` → `/design-review` → `/review-pr` → `/codebase-index`.

The agentic loop: `scaffold → audit → design-review → review-pr → codebase-index → (figma-ds)`

---

## The Agentic Skills (Slash Commands)

All skills live in `.claude/commands/`:

| Skill | Purpose |
|---|---|
| `/scaffold-component <Name>` | Generate complete component (8-file anatomy) |
| `/component-auditor <path>` | Audit structure, props, React Aria conventions |
| `/a11y-agent <path>` | Full AT support audit (NVDA, JAWS, VoiceOver, etc.) |
| `/design-review <path>` | CSS token compliance — no hardcoded values |
| `/docs-agent <path>` | Generate/update Storybook stories |
| `/review-pr [path\|--all]` | Governance gate — 7-layer review, severity-ranked |
| `/codebase-index` | Regenerate `.ai/index.json` + `.ai/relationships/` |
| `/figma-ds <Name>` | Generate Figma component set from source (code → Figma) |

Static scripts (CI-friendly, no LLM):
```
npm run audit -- src/components/<Name>
npm run design-review -- src/components/<Name>
```

---

## Why Infrastructure Beats Improvisation

Benchmark from Cristian Morales Achiardi's ARC study (11 trials):

| Metric | Without infrastructure | With infrastructure | Δ |
|---|---|---|---|
| Accuracy | 65% | 100% | +54% |
| Speed | 4:26 | 1:52 | 58% faster |
| Consistency | 26.5% variance | 0.04% variance | 99.9% reduction |
| False negatives | 60% | 0% | Eliminated |

Infrastructure converts token spend from **exploration into analysis**.
The agent reads indexes, not files. Acts through skills, not improvisation.

---

## Working style

- Agile, not waterfall — refine each phase as we go
- Short cycles: scaffold → audit → review → iterate
- NOTES.md for React Aria findings and quirks
- AGENTS.md for Phase 3 agent contracts
