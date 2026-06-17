# Component Auditor — Protonic Phase 3 Agent

Audit the component at `$ARGUMENTS` against Protonic's design contracts.

## What to do

1. Read the component file(s) at the path given in `$ARGUMENTS`. If a directory is given, read all `.tsx`, `.ts`, and `.css` files inside it.
2. Read `src/tokens/axes.ts` — this is the canonical axes registry. Every prop must trace back to an axis defined here.
3. Read `src/tokens/contracts.ts` — these are the articulated design chains. Every visual decision must have a chain.
4. Apply every rule in the checklist below.
5. Output a structured pass/fail report.

## Rules checklist

### File structure (required files)
- [ ] `ComponentName.tsx` — component implementation
- [ ] `ComponentName.types.ts` — TypeScript interface, extends a React Aria type
- [ ] `ComponentName.styles.ts` — CVA styles definition
- [ ] `ComponentName.css` — CSS custom property styles
- [ ] `ComponentName.stories.tsx` — Storybook stories
- [ ] `index.ts` — re-exports the component

### Props — axes registry compliance
Every prop must map to an axis in `axes.ts`. Flag any prop that:
- Uses `type` instead of `variant` (identity axis)
- Uses `flavor`, `kind`, `mode`, `appearance` instead of `variant`
- Uses `width` or `height` for the size axis instead of `size`
- Uses `disabled` instead of `isDisabled` (React Aria convention: boolean props start with `is`)
- Uses `loading` instead of `isLoading`
- Has no axis mapping in `axes.ts` and no documented reason

### Props — value glossary
Check that variant values match the canonical set from `axes.ts`:
- Variant axis: `primary | secondary | destructive` — flag any unlisted value
- Size axis: `small | medium | large` — flag any unlisted value
- Status axis (if used): `success | warning | error | info` — flag variant/status conflation

### React Aria conventions
- `onPress` must be used, NOT `onClick`. Flag any `onClick` on React Aria components.
- `isDisabled` must be passed to the React Aria component's prop, not as `disabled` attribute.
- No custom `aria-*` attributes should override what React Aria sets automatically. Exception: `aria-label`, `aria-describedby`, `aria-labelledby` are passthrough props and are fine.
- Component must `extend` a React Aria prop type in `ComponentName.types.ts`.

### CVA — variant coverage
- The `buttonStyles` (or equivalent) CVA definition must have an entry for every value in the variant axis.
- Default values must be set in both the CVA definition and the component's destructured props.

### CSS — data attribute selectors
Visual state must be driven by React Aria's `data-*` attributes, not JS. Check for:
- `[data-focus-visible]` for focus ring (not `:focus`)
- `[data-disabled]` for disabled state (not `:disabled`)
- `[data-pressed]` for active/pressed state (not `:active`)
- `[data-hovered]` for hover state (not `:hover` — though `:hover` is acceptable as fallback for non-pointer devices)

## Output format

```
COMPONENT AUDITOR — Protonic
Component: [name]
Path: [path]

✅ PASS  File structure complete
✅ PASS  Axes registry compliance
❌ FAIL  [specific rule violated]
         → [exact location: file:line]
         → [what to fix]
⚠️  WARN  [non-blocking concern]

---
Result: PASS [n/n checks] | FAIL [n violations]
```

Be specific. Point to the exact file and line. Explain what contract is violated and what the fix is.
