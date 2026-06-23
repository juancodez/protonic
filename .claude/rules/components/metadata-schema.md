---
paths:
  - "src/components/**/*.metadata.ts"
---

# Rule: Metadata Schema v2.0

Every `Component.metadata.ts` MUST conform to this schema.
`/scaffold-component` generates against it. `/review-pr` Layer 5 checks conformance.

## Required fields

```ts
export const ComponentMetadata = {
  id:          string,   // lowercase component name: 'button'
  name:        string,   // PascalCase: 'Button'
  version:     string,   // semver: '1.0.0'
  type:        string,   // 'interactive' | 'display' | 'container' | 'input'
  category:    string,   // 'atom' | 'molecule' | 'organism' | 'layout'
  description: string,   // 1–2 sentences, what is this for
  path:        string,   // 'src/components/ComponentName'
  created:     string,   // ISO 8601: '2026-06-18'
  modified:    string,   // ISO 8601: '2026-06-24'
}
```

## Strongly recommended fields

```ts
  variants:     Record<string, string[]>,  // axes this component exposes
  useCases:     Array<{ label, when, example }>,
  compositions: Array<{ label, code }>,
  antiPatterns: Array<{ bad, good, reason }>,
  a11y:         { inherited: string[], owned: string[] },
  aiHints:      string[],
  tokens:       Record<string, string[]>,  // CSS var names by category
  figma:        { fileKey, component, properties }
```

## Valid `type` values

| Value         | Meaning |
|---------------|---------|
| `interactive` | Extends a React Aria primitive, handles keyboard/pointer/touch |
| `display`     | Presentational only — no keyboard events, no focus management |
| `container`   | Wraps other components, provides layout or context |
| `input`       | Collects user input (text, selection, date) |

## Valid `category` values

| Value      | Meaning |
|------------|---------|
| `atom`     | Smallest indivisible UI unit |
| `molecule` | Composed of 2–3 atoms |
| `organism` | Complex UI section, may compose molecules |
| `layout`   | Full-viewport or section-level shell |

## Display-only annotation

Components with `type: 'display'` MUST also have `// @protonic:display-only`
as the first comment in `ComponentName.types.ts`.

## Export name convention

Export as `export const ComponentNameMetadata = {...} as const;`
NOT `export const componentMetadata = {...}` (too generic for tree-shaking).
