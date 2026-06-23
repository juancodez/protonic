---
paths:
  - "src/**"
---

# Rule: Best Practices

## React Aria conventions

- `onPress` not `onClick` — React Aria normalizes mouse/touch/keyboard into `onPress`
- `isDisabled` not `disabled` — `disabled` removes from tab order; `isDisabled` uses
  `aria-disabled` to keep the element accessible to AT users
- `isLoading` not `loading` or `busy`
- Never add custom ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-modal`)
  to components that extend React Aria primitives — React Aria handles these
- Non-interactive components (display-only) do NOT extend React Aria primitives;
  they extend `HTMLAttributes<HTMLDivElement>` or similar

## CSS rules

- NO hardcoded hex, rgb, hsl colors in component CSS
- NO hardcoded px spacing values (exception: `1px` for borders)
- NO hardcoded `font-family` strings
- NO hardcoded `border-radius` values
- NO `ease`, `linear`, `ease-in-out` keywords — use `var(--motion-easing-*)` tokens
- Foundation tokens (`var(--color-orange-500)`) must NOT appear in component CSS
  — use semantic aliases only (`var(--color-primary)`)
- `box-shadow` is a Warning — Protonic uses flat elevation (border + background shift)

## TypeScript rules

- CVA variant config lives in `Component.styles.ts`, NOT inlined in `Component.tsx`
- TypeScript interface in `Component.types.ts`, NOT defined in `Component.tsx`
- Interactive components: interface extends a React Aria type (e.g. `ButtonProps`)
- Display-only: interface extends `HTMLAttributes<HTMLDivElement>` + annotation

## File anatomy rules

All 8 files must exist per component. Missing any file = Blocker in `/review-pr`.
The barrel `index.ts` must export: component, types, metadata.

## Dependency rules

No new dependencies without explicit discussion. The current set is final unless
a specific component category (e.g., date picker) genuinely requires one.
