# Prop Glossary — Protonic

Canonical prop vocabulary across all Protonic components.
Generated from `src/tokens/axes.ts`. The Figma manifest's `variantConventions`
mirrors this vocabulary — one contract, two surfaces.

---

## Axes Registry

| Axis      | Concept                   | Canonical values                          | Figma property |
|-----------|---------------------------|-------------------------------------------|----------------|
| `variant` | Component identity        | `primary / secondary / destructive`       | `Variant`      |
| `size`    | Ordered scale             | `small / medium / large`                  | `Size`         |
| `status`  | System feedback signal    | `success / warning / error / info`        | `Status`       |
| `state`   | Interaction state (React Aria) | `default / hover / pressed / disabled / loading` | `State` |

**Rule:** `variant` = what kind of thing is this? `status` = what is the system
signaling? These are different axes. Never collapse them into one prop.

---

## Value Glossary — anti-synonym list

| Use this       | Never this                         | Reason |
|----------------|------------------------------------|--------|
| `secondary`    | `outline / outlined / ghost / default / neutral` | Ambiguous visual meaning |
| `destructive`  | `danger / delete / warning`        | Warning ≠ destructive intent |
| `error`        | `danger` (as a prop value)         | `danger` is a token name, not a prop value |
| `info`         | `default / neutral / base`         | Neutral ≠ informational signal |
| `small`        | `sm / xs / mini / compact`         | Full words only in prop API |
| `medium`       | `md / base / default / normal`     | Full words only |
| `large`        | `lg / big / full`                  | Full words only |
| `isDisabled`   | `disabled`                         | React Aria convention; keeps element in tab order |
| `onPress`      | `onClick`                          | React Aria normalizes mouse/touch/keyboard |
| `isLoading`    | `loading / busy / pending`         | React Aria convention |

---

## Per-Component Prop Ownership

| Component       | variant | size | status | notes |
|-----------------|:-------:|:----:|:------:|-------|
| Button          | ✅      | ✅   | —      | `isLoading`, `isDisabled` inherited from React Aria |
| Badge           | —       | —    | ✅     | display-only, status axis only |
| Card            | —       | —    | —      | display-only, no axes |
| Chip            | —       | —    | ✅     | `dismissible` + `onDismiss` owned |
| ClaraPanel      | —       | —    | —      | display-only layout shell |
| DraggableTicker | —       | —    | —      | no variant API, physics-driven |
| Hero            | ✅      | —    | —      | `variant: default / inverted` |
| Modal           | —       | —    | —      | `isOpen`, `onOpenChange` from React Aria |
| Select          | —       | ✅   | —      | inherited React Aria Select |
| Table           | —       | —    | —      | inherited React Aria Table |

---

## Drift Flags

Drift = a prop name or value that diverges from this glossary.
`/review-pr` Layer 2 checks every component against this map.

Current drift flags: **0** (all components clean as of 2026-06-24)

To run a drift check:
```bash
npm run audit -- src/components/ComponentName
/review-pr src/components/ComponentName
```
