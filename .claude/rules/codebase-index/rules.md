---
paths:
  - ".ai/**"
  - ".ai/index-components.mjs"
---

# Rule: Codebase Index

## When to regenerate

Run `node .ai/index-components.mjs` (or `/codebase-index`) after:
- Scaffolding a new component
- Modifying variant axes or token references in an existing component
- Deleting a component
- At the start of any session where you're unsure if the index is current

## What the index must contain

### `.ai/index.json` — top-level structure

```json
{
  "summary": {
    "totalComponents": <n>,
    "componentsWithMetadata": <n>,
    "totalTokens": <n>,
    "tokenCategories": <n>,
    "relationshipsMapped": <n>,
    "generatedAt": "<ISO 8601 timestamp>"
  },
  "usage": {
    "loadOnce": "Read index and relationships/* once at session start",
    "keepInContext": "Maintain loaded data for the conversation",
    "loadMetadataOnDemand": "Read *.metadata.ts only when working on that component"
  },
  "components": [...]
}
```

### Per-component entry (in `components` array)

```json
{
  "name": "Button",
  "path": "src/components/Button/Button.tsx",
  "foundation": ["Button"],        // React Aria primitives, or "none"
  "variants": { "variant": [...], "size": [...] },
  "tokens": ["--color-primary", "..."],
  "usedBy": [],
  "category": "atom",
  "figma": { "fileKey": "...", "component": "Button" },
  "contractRefs": ["primaryColor", "borderRadius"]
}
```

### `.ai/relationships/component-usage.json`

Map of component → which components use it:
```json
{ "Button": { "usedBy": ["Modal"] }, "Modal": { "usedBy": [] } }
```

### `.ai/relationships/design-tokens.json`

Map of token → which components consume it:
```json
{ "--color-primary": ["Button", "Badge", "Chip"] }
```

### `.ai/relationships/dependencies.json`

Map of component → external packages it imports:
```json
{ "Button": ["react-aria-components"], "Card": [] }
```

## Determinism requirement

The indexer is a pure scanner — no LLM, no randomness.
Same component files → same output, every run.
The LLM decides WHEN to index. The script decides WHAT the index contains.
