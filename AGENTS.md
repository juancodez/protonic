# AGENTS.md — Protonic Phase 3

> Phase 3 is live. Agents implemented as a two-layer system:
> - **Static scripts** (`src/agents/`) — deterministic, CI-friendly, fast
> - **Slash commands** (`.claude/commands/`) — AI-powered, developer workflow

---

## Architecture

```
Developer types a command           CI runs a script
       ↓                                  ↓
/component-auditor Button    npm run audit -- src/components/Button
/a11y-agent Modal            (no static equivalent — AI-only)
/docs-agent Select           (no static equivalent — AI-only)
/design-review Button        npm run design-review -- src/components/Button
       ↓                                  ↓
Claude reads component                 tsx script reads component
+ reads axes.ts / contracts.ts         + applies regex-based rules
+ applies intelligent rules            + outputs colored terminal report
+ explains WHY each violation matters
```

The scripts catch mechanical violations (zero AI cost, fast).
The commands catch nuanced contract drift (AI reasoning, richer output).

---

## Component Auditor Agent

**Slash command:** `/component-auditor <path>`
**Script:** `npm run audit -- <path>`
**Source:** `.claude/commands/component-auditor.md`, `src/agents/component-auditor.ts`

**What it checks:**
- File structure (all 6 required files present)
- Prop naming: `variant` not `type`/`kind`/`mode`, `isDisabled` not `disabled`
- Variant values match axes registry (`primary | secondary | destructive`)
- Size values match axes registry (`small | medium | large`)
- React Aria conventions: `onPress` not `onClick`, no manual `aria-expanded`/`aria-modal`/etc.
- TypeScript interface extends a React Aria type

**Input:** path to component directory (e.g., `src/components/Button`)
**Output:** pass/fail per check with exact file:line pointers and fix instructions

---

## A11y Agent

**Slash command:** `/a11y-agent <path>`
**Script:** none (requires AI reasoning — static regex insufficient)
**Source:** `.claude/commands/a11y-agent.md`

**What it checks:**
- React Aria guarantee preservation (nothing in wrapper breaks inherited a11y)
- No custom ARIA overrides on React Aria components
- Dialog role: `alertdialog` for destructive, `dialog` for standard
- AT support matrix coverage: NVDA, JAWS, VoiceOver, TalkBack, Narrator, Orca
- Focus management: no manual focus() calls competing with React Aria's

**Tools used:** reads `aria-patterns` skill reference files directly from `C:\Users\tn\.claude\skills\a11y-agents-kit\skills\aria-patterns\references\`

**Input:** path to component directory
**Output:** inherited guarantees list + AT support matrix per component

---

## Documentation Agent

**Slash command:** `/docs-agent <path>`
**Script:** none (requires generative AI — not a linting task)
**Source:** `.claude/commands/docs-agent.md`

**What it generates:**
- Complete Storybook story file if none exists
- Or: delta report of what's missing from an existing story file
- Enforces: all variant values covered, all size values covered, a11y description block, argTypes with axes registry descriptions, AllVariants render story

**Input:** path to component directory
**Output:** complete `.stories.tsx` file or diff

---

## Design Review Agent

**Slash command:** `/design-review <path>`
**Script:** `npm run design-review -- <path>`
**Source:** `.claude/commands/design-review.md`, `src/agents/design-review.ts`

**What it checks (CSS only):**
- No hardcoded hex/rgb/hsl colors (must use `var(--color-*)`)
- No raw `px` spacing values (must use `var(--space-*)`)
- No hardcoded `font-family` (must use `var(--font-*)`)
- No hardcoded `border-radius` (must use `var(--radius-*)`)
- `box-shadow` detected → warns about flat elevation contract violation

**Input:** path to component directory (scans all `.css` files inside)
**Output:** violation list with file:line, actual value, and correct replacement

---

## Running the agents

```bash
# Static analysis (fast, CI-friendly)
npm run audit -- src/components/Button
npm run design-review -- src/components/Button
npm run audit -- src/components/Modal
npm run design-review -- src/components/Modal

# AI-powered (inside a Claude Code session)
/component-auditor src/components/Button
/a11y-agent src/components/Modal
/docs-agent src/components/Select
/design-review src/components/Table
```

---

## Phase 3 roadmap

- [x] `npm run audit:all` — runs Component Auditor across all 9 components (`src/agents/audit-all.ts`)
- [x] figma-component-generator sync — all 9 components pushed to Figma (`.ai/figma-map.json` tracks state)
- [x] `.ai/index.json` — upgraded with `figma` field + `contractRefs` per component
- [ ] Pre-commit hook — auto-run scripts on staged `.tsx`/`.css` files
- [ ] graphify integration — generate knowledge graph of component relationships + dependencies
- [ ] Populate `figma-map.json` componentSetIds — run figma eval to capture actual node IDs
