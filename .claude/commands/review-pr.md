# /review-pr

Governance gate. Run before any PR merge. Reviews all changed components for contract compliance across every layer of the Protonic system.

## Usage

```
/review-pr [component-path | --all]
```

Examples:
- `/review-pr src/components/Button` — review a single component
- `/review-pr --all` — review every component in the system
- `/review-pr` (no args) — ask which components to review

## What Gets Checked

Reviews are severity-ranked: **Blocker → Error → Warning → Info**

### Layer 1 — File Structure (Blocker if missing)

**[SKIPPED]**: Never skipped — always check file structure.

Every component MUST have all 8 files:
- `ComponentName.tsx`
- `ComponentName.types.ts`
- `ComponentName.styles.ts`
- `ComponentName.module.css`
- `ComponentName.metadata.ts`
- `ComponentName.stories.tsx`
- `ComponentName.test.tsx`
- `index.ts`

Missing any file = **Blocker**. PR cannot merge.

### Layer 2 — Axes Registry Compliance (Blocker)

**[SKIPPED]**: If neither `ComponentName.tsx` nor `ComponentName.types.ts` changed, emit `[SKIPPED] Axes registry — no .tsx/.types.ts in diff`

Read `src/tokens/axes.ts`. Every prop on every component must match exactly:

| If the component has... | It must use... | Not... |
|---|---|---|
| identity axis | `variant` | `type`, `kind`, `mode`, `style` |
| scale axis | `size` | `sizing`, `scale`, `dimension` |
| feedback axis | `status` | `state`, `color`, `tone` (when used as system feedback) |

Variant values must match the glossary:
- Variant: `primary`, `secondary`, `destructive` (never `outlined`, `outline`, `ghost`, `default`)
- Size: `small`, `medium`, `large` (never `sm`, `md`, `lg`, `xs`, `xl` unless documented as aliases)
- Status: `success`, `warning`, `error`, `info` (never `danger` standalone, `alert`)

Drift = **Blocker**.

### Layer 3 — React Aria Conventions (Blocker for interactive, skip for display-only)

**[SKIPPED]**: If `.types.ts` contains `// @protonic:display-only` emit `[SKIPPED] React Aria conventions — display-only component`

Check `.types.ts` for `// @protonic:display-only`. If NOT display-only:

- `onPress` not `onClick` — **Error** if violated
- `isDisabled` not `disabled` — **Error** if violated
- TypeScript interface extends a React Aria type (not `HTMLAttributes` directly) — **Blocker** if violated
- No custom ARIA overrides (`aria-expanded`, `aria-haspopup`, `aria-modal` added manually) — **Error** if violated (React Aria handles these)

### Layer 4 — Token Compliance (Error)

**[SKIPPED]**: If `ComponentName.module.css` was not changed in the diff, emit `[SKIPPED] Token compliance — no .module.css in diff`

Scan `ComponentName.module.css` for:

- Hardcoded hex color (`#xxx`, `#xxxxxx`) — **Error**
- Raw rgb/hsl color — **Error**
- Raw pixel spacing value (`8px`, `16px`) EXCEPT `1px` borders — **Error**
- Hardcoded `font-family` string — **Error**
- Hardcoded `border-radius` value — **Error**
- `box-shadow` with raw values (flat elevation contract violation) — **Warning**

Every visual value must resolve to `var(--token-name)`.

### Layer 5 — Metadata Conformance (Warning)

Check `ComponentName.metadata.ts`:

- `id` field exists and matches lowercase component name — **Warning** if missing
- `version` field is semver — **Warning** if missing
- `type` is one of: `interactive`, `display`, `container`, `input` — **Warning** if missing or invalid
- `category` is one of: `atom`, `molecule`, `organism`, `layout` — **Warning** if invalid
- `path` matches `src/components/<ComponentName>` — **Warning** if missing
- `created` is ISO 8601 date string — **Warning** if missing
- `modified` is ISO 8601 date string — **Warning** if missing
- `useCases` array has at least one entry — **Warning** if empty
- `antiPatterns` array has at least one entry — **Warning** if empty
- `a11y.inherited` is non-empty for interactive components — **Warning** if empty
- `aiHints` array has at least one entry — **Warning** if missing
- `figma.fileKey` matches `.figma/manifest.json` fileKey — **Warning** if mismatch

**[SKIPPED]**: If `ComponentName.metadata.ts` was not changed in the diff, emit `[SKIPPED] Metadata conformance — no .metadata.ts in diff`

### Layer 6 — Export Completeness (Error)

**[SKIPPED]**: If `index.ts` was not changed in the diff, emit `[SKIPPED] Export completeness — no index.ts in diff`

Check `index.ts`:

- Exports the component function — **Error** if missing
- Exports the props type (`Protonic<Name>Props`) — **Error** if missing
- Exports the metadata (`<Name>Metadata`) — **Warning** if missing

### Layer 7 — Storybook Coverage (Warning)

**[SKIPPED]**: If `ComponentName.stories.tsx` was not changed in the diff, emit `[SKIPPED] Storybook coverage — no .stories.tsx in diff`

Check `ComponentName.stories.tsx`:

- `AllVariants` story exists — **Warning** if missing
- Every variant value has at least one named story — **Warning** per missing variant
- `argTypes` block exists — **Warning** if missing
- `tags: ['autodocs']` present — **Info** if missing

---

## Output Format

```
/review-pr src/components/Button
─────────────────────────────────────────────────────
Layer 1 — File Structure         ✅ All 8 files present
Layer 2 — Axes Registry          ✅ No drift
Layer 3 — React Aria             ✅ onPress ✅ isDisabled ✅ extends AriaButton
Layer 4 — Token Compliance       [SKIPPED] no .module.css in diff
Layer 5 — Metadata               ⚠️  Warning: aiHints array empty
Layer 6 — Exports                ✅ All 3 exports present
Layer 7 — Storybook              [SKIPPED] no .stories.tsx in diff

Verdict: APPROVED WITH WARNINGS
Blockers:  0
Errors:    0
Warnings:  2
Info:      0

Fix before merge (optional but recommended):
  - Button.metadata.ts: add at least one aiHint
  - Button.stories.tsx: add AllSizes story
```

### Verdict levels:
- **APPROVED** — 0 blockers, 0 errors
- **APPROVED WITH WARNINGS** — 0 blockers, 0 errors, warnings exist
- **BLOCKED** — 1+ errors with no blockers
- **CANNOT MERGE** — 1+ blockers

---

## After Running

If blockers or errors exist, propose the exact fix for each one with the file and line reference. Do not just describe the problem — show the corrected code.

If approved, run `/codebase-index` to ensure the map is current before the PR is finalized.
