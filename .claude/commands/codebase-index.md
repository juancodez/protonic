# /codebase-index

Regenerate the codebase index after any component change. This is what keeps `.ai/index.json` accurate so the agent always navigates from a fresh map — never from memory.

## When to run

- After `/scaffold-component` creates a new component
- After modifying variants or tokens in an existing component
- After deleting a component
- At the start of any session where you're unsure if the index is current

## How to Run

**Step 1 — Regenerate the index:**

```bash
node .ai/index-components.mjs
```

This deterministic script:
- Walks every directory in `src/components/`
- Extracts: React Aria foundation, CVA variant axes + values, CSS token references, cross-component `usedBy` relationships
- Writes the result to `.ai/index.json`
- Same input = same output, every run (no LLM involved)

**Step 2 — Report the diff:**

After running, compare the new index to the previous one and report:
- How many components are indexed (total count)
- Any new components added
- Any components whose variants changed
- Any components whose token list changed
- Total unique tokens referenced across the system

**Step 3 — Load the fresh index into context:**

Read `.ai/index.json` and keep it in context for the rest of the session. The agent does NOT need to crawl `src/components/` anymore — the index IS the map.

## What the index contains (per component)

```json
{
  "name": "Button",
  "path": "src/components/Button/Button.tsx",
  "foundation": ["Button"],          // React Aria primitives (or "none")
  "variants": {
    "variant": ["primary", "secondary", "destructive"],
    "size": ["small", "medium", "large"]
  },
  "tokens": ["--color-primary", "--radius-pill", "..."],
  "usedBy": ["Modal"],               // components that import this one
  "category": "core"                 // core | klaro (or atom | molecule | organism | layout)
}
```

## Full system summary (what to report)

```
Index updated: <N> components, <N> tokens across system
New: [ComponentName, ...]  (if any)
Changed: [ComponentName, ...]  (if any)
Cross-references: Button is used by [Modal], ...
```
