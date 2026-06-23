---
paths:
  - "tokens/**"
  - "src/tokens/**"
  - "sd.config.mjs"
---

# Rule: Token System

## Two-layer architecture — never bypass

Layer 1 — Foundation (`tokens/color/foundation.json`):
Raw brand values. Named by palette + scale: `color.orange.500`, `color.red.600`.
These MUST NOT appear in component CSS. They are source-of-truth for the brand
palette only.

Layer 2 — Semantic (`tokens/color/semantic.json`):
Named by role and intent: `color.primary`, `color.danger`, `color.text-muted`.
These reference foundation tokens via `{color.orange.500}` syntax.
These ARE the tokens components use via `var(--color-primary)`.

## Naming conventions

- Foundation: `{palette}.{scale}` → compiles to `--color-{palette}-{scale}`
- Semantic color: `color.{role}` → compiles to `--color-{role}`
- Spacing: `space.{n}` → compiles to `--space-{n}` (4px increments)
- Typography: `font.{property}.{scale}` → compiles to `--font-{property}-{scale}`
- Radius: `radius.{name}` → compiles to `--radius-{name}`
- Motion: `motion.{property}.{name}` → compiles to `--motion-{property}-{name}`
- Elevation: `shadow.{name}` → compiles to `--shadow-{name}`
- Text styles: `text-style.{name}` → compiles to `--text-style-{name}` (CSS font shorthand)
- Borders: `border.width.{name}` / `border.style.{name}`
- Z-index: `z-index.{name}` → compiles to `--z-index-{name}`
- Icon sizes: `icon.size.{scale}` → compiles to `--icon-size-{scale}`
- Breakpoints: `breakpoint.{scale}` → compiles to `--breakpoint-{scale}`

## Valid `$type` values

`color`, `dimension`, `fontFamily`, `fontWeight`, `number`, `duration`, `string`

## W3C DTCG format required

Every token entry MUST have `$value` and `$type`.
References use `{token.path}` syntax.
`sd.config.mjs` must have `usesDtcg: true`.

## Semantic token check (enforced by /review-pr Layer 4)

If a component CSS file contains `var(--color-{palette}-{scale})` (e.g.
`var(--color-orange-500)`, `var(--color-red-600)`), that is a violation.
Component CSS must use semantic tokens only: `var(--color-primary)`, `var(--color-danger)`.
