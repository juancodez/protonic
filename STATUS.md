# Protonic — Project Status

Last updated: 2026-06-18

---

## Where we are

All 3 phases are done.

```
Phase 1 ✅  4 base components (Button, Modal, Select, Table) — React Aria, accessible
Phase 2 ✅  Design layer — tokens from Klaro, CVA variants, CSS custom properties, Storybook
Phase 3 ✅  Agentic layer — Component Auditor + Design Review Agent (scripts + slash commands)
```

---

## What's next

**Build the Klaro design system on top of Protonic.**

Decided direction: **code → Figma** (not Figma-first).
Tokens are already seeded from Klaro. Protonic IS Klaro's base.

Klaro component progress:
- [x] Card ✅ — surface container, 10/10 audit, 0 design-review warnings
- [x] Badge ✅ — status axis, pill radius, 10/10 audit, 0 design-review warnings
- [x] Hero ✅ — full-viewport layout shell, light + inverted, 10/10 audit, 0 design-review warnings
- [x] ClaraPanel ✅ — chat layout shell, header/messages/input-dock, 10/10 audit, 0 design-review warnings
- [x] DraggableTicker ✅ — infinite drag marquee, RAF animation, 10/10 audit, 0 design-review warnings

After each component:
1. `npm run audit -- src/components/ComponentName` — structure + conventions
2. `npm run design-review -- src/components/ComponentName` — token compliance
3. `/figma-component-generator` — push to Klaro Figma file (key: `R4KIv7XKg8g1A1NR9R11cI`)

---

## Key commands

```bash
npm run dev              # Vite dev server
npm run storybook        # Storybook on :6006
npm run typecheck        # Main app TypeScript check
npm run audit -- src/components/ComponentName
npm run design-review -- src/components/ComponentName
```

Claude Code slash commands (inside a session):
```
/component-auditor src/components/ComponentName
/a11y-agent src/components/ComponentName
/design-review src/components/ComponentName
/docs-agent src/components/ComponentName
```

---

## Key files

| File | Purpose |
|------|---------|
| `src/tokens/axes.ts` | Canonical prop vocabulary — variant, size, status |
| `src/tokens/contracts.ts` | Articulated design chains (the WHY behind every value) |
| `src/tokens/theme.css` | CSS custom properties — all components reference these |
| `src/agents/component-auditor.ts` | Static analysis script |
| `src/agents/design-review.ts` | CSS token linter |
| `.claude/commands/` | 4 AI-powered slash commands |
| `AGENTS.md` | Agent contracts + how to run them |
| `NOTES.md` | React Aria findings log |
| `roadmap-protonic.md` | Original roadmap from Cristian |

---

## Repo

https://github.com/juancodez/protonic — branch: main
