# Design Review Agent — Protonic Phase 3 Agent

Review the design token compliance of the CSS at `$ARGUMENTS`.

## What to do

1. Read the CSS file at the path given in `$ARGUMENTS`. If a directory is given, read all `.css` files inside it.
2. Read `src/tokens/theme.css` — the canonical set of CSS custom properties available.
3. Read `src/tokens/contracts.ts` — the articulated design chains (articulation, standard, required behavior, contract).
4. Apply every rule below.
5. Output a token compliance report.

## Rules checklist

### Color — no hardcoded values
Every color value must reference a CSS custom property from `--color-*`.

Flag as FAIL any:
- Hex literals: `#a43700`, `#fff`, `#000`, etc.
- `rgb()` or `rgba()` literals (except `rgba(0,0,0,0)` for transparent)
- `hsl()` literals
- Named colors: `red`, `black`, `white`, `transparent` (exception: `transparent` is fine for borders/backgrounds)

Correct pattern: `var(--color-primary)`, `var(--color-bg)`, etc.

### Spacing — no magic numbers
Every spacing value (padding, margin, gap, top, right, bottom, left, width, height) must either:
- Reference a CSS custom property from `--space-*`
- Be `0` (zero needs no unit, no token)
- Be `auto`
- Be a percentage or viewport unit (`50%`, `100vw`) — these are layout, not spacing tokens

Flag as FAIL any:
- Raw `px` values for spacing that aren't 0: `padding: 8px`, `gap: 16px`, `margin: 24px`
- Exception: `1px` for borders is acceptable (border hairlines don't use the spacing scale)

Correct pattern: `padding: var(--space-4)`, `gap: var(--space-6)`, etc.

### Typography — no hardcoded fonts or sizes
- `font-family` must reference `var(--font-display)` or `var(--font-body)`
- `font-size` may use `rem` values (they're relative) but preferred to use tokens if defined
- No hardcoded `font-weight` values — define a weight token if needed

### Border radius — no hardcoded values
- `border-radius` must reference `var(--radius-default)` or `var(--radius-pill)`
- Exception: `50%` for circles is acceptable

### Design contracts compliance
For each value in the CSS, check if there's a contract in `contracts.ts` that governs it.
If a value falls outside the contracts (e.g., a component adds a shadow), flag it as a WARNING — it may be intentional but needs documentation.

## Output format

```
DESIGN REVIEW AGENT — Protonic
File: [path]

TOKEN COMPLIANCE
✅ PASS  All colors reference CSS custom properties
❌ FAIL  Hardcoded color at [file]:[line]
         Value: [the value]
         → Replace with: var(--color-[nearest semantic token])

✅ PASS  No magic spacing numbers
❌ FAIL  Raw px spacing at [file]:[line]
         Value: [the value]
         → Replace with: var(--space-[n]) — see theme.css for scale

⚠️  WARN  Value falls outside design contracts: [value at file:line]
          → Add a contract entry in contracts.ts if this is intentional

---
Result: PASS [n/n checks] | FAIL [n violations] | WARN [n warnings]
Token coverage: [n% of values reference tokens]
```
