---
paths:
  - ".claude/**"
  - "CLAUDE.md"
---

# Rule: Skills Integration

## The agentic loop (skill invocation order)

```
/scaffold-component <Name>
    ↓ generates 8 files
/component-auditor src/components/<Name>
    ↓ expect 10/10
/design-review src/components/<Name>
    ↓ expect 0 violations
/review-pr src/components/<Name>
    ↓ expect APPROVED or APPROVED WITH WARNINGS
/codebase-index
    ↓ updates .ai/index.json + .ai/relationships/*.json
/figma-ds <Name>           ← when ready for Figma push
```

Never skip steps. Never invoke `/figma-ds` before the component passes
`/component-auditor` and `/design-review`.

## What each skill produces

| Skill | Artifact |
|-------|---------|
| `/scaffold-component` | 8 files in `src/components/<Name>/` |
| `/component-auditor` | Console audit report (pass/fail per rule) |
| `/a11y-agent` | AT support audit across 6 screen readers |
| `/design-review` | Token compliance report; suggests nearest token |
| `/docs-agent` | Updated `Component.stories.tsx` |
| `/review-pr` | Severity-ranked verdict with exact fixes |
| `/codebase-index` | `.ai/index.json` + `.ai/relationships/*.json` |
| `/figma-ds` | Figma component set; writes to `.figma/maps/components.json` |

## Skills never improvise

If `/scaffold-component` is not used, the agent MUST NOT generate component
files freehand. The scaffold reads `axes.ts`, `contracts.ts`, and the reference
Button component before generating anything.

## Static scripts (CI-friendly, no LLM)

```bash
npm run audit -- src/components/<Name>         # component-auditor.ts
npm run design-review -- src/components/<Name>  # design-review.ts
npm run audit:all                               # all components, writes audit-report.md
```
