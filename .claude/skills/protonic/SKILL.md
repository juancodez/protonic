# Protonic — Agent Instructions

Contract-first agentic design system built on React Aria.
Components: Button, Badge, Chip, Card, Select, Modal, Table, Hero, ClaraPanel, DraggableTicker.

## Token system
- Foundation tokens: `tokens/color/foundation.json` — raw palette values, never use in components
- Semantic tokens: `tokens/color/semantic.json` — role-based aliases (`--color-primary`, `--color-danger`)
- Compiled output: `src/tokens/variables.css` — regenerate with `npm run build:tokens`

## Component anatomy (8 files per component)
`Component.tsx` · `Component.module.css` · `Component.styles.ts` (CVA) · `Component.types.ts`
`Component.stories.tsx` · `Component.metadata.ts` · `index.ts`

## Variant axes
- `variant`: primary | secondary | destructive
- `size`: small | medium | large
- `status`: success | warning | error | info
- `state`: default | hover | active | disabled | focused

## Rules
- `onPress` not `onClick` — React Aria convention
- `isDisabled` not `disabled` — keeps element accessible to AT
- CSS: token vars only — no hardcoded hex, px spacing, font-family, border-radius, easing keywords
- Foundation tokens must NOT appear in component CSS — use semantic aliases only

## Agent loop
```
scaffold → audit → design-review → review-pr → codebase-index → figma-ds
```

## Key scripts
```bash
npm run audit:all          # audit all 10 components
npm run design-review -- src/components/<Name>
npm run lyse               # health score (0-100)
npm run build:tokens       # regenerate variables.css from DTCG sources
```
