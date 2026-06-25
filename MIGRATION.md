# Migration Guide — Protonic

## v0.2 → v0.1 (current: v0.1)

No breaking changes yet. This file documents the upgrade path when they occur.

---

## Token renames

| Old token | New token | Version |
|---|---|---|
| `--color-warning-text` (was `color.brown.500`) | now `color.amber.900` (#78350f) | v0.1.1 |

**Action required:** If you were relying on `--color-warning-text` resolving to a brownish `#7a5a00`, update any custom overrides to `#78350f`. Components using `--color-warning-text` (Badge, Chip) update automatically.

---

## Component changes

None yet.

---

## How to upgrade

```bash
npm install protonic@latest
npm run build:tokens   # regenerate variables.css if you fork the token source
```

---

## Consuming Protonic in a project (Klaro setup)

Import once at your app root:
```tsx
import 'protonic/src/tokens/theme.css';
```

Then import components individually:
```tsx
import { Button } from 'protonic/src/components/Button';
import { Input }  from 'protonic/src/components/Input';
```

All interactive props use React Aria names — `onPress` not `onClick`, `isDisabled` not `disabled`.

## Token alias removals (v0.1 → v0.2)

These 4 CSS custom properties no longer exist:

| Removed | Use instead |
|---|---|
| `--font-display` | `--font-family-display` |
| `--font-body` | `--font-family-body` |
| `--radius` | `--radius-sm` |
| `--radius-lg` | `--radius-md` |
