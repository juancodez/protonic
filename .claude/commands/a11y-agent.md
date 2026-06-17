# A11y Agent — Protonic Phase 3 Agent

Audit the accessibility of the component at `$ARGUMENTS` against React Aria's AT support matrix.

## What to do

1. Read the component file(s) at the path given in `$ARGUMENTS`.
2. Read `C:\Users\tn\.claude\skills\a11y-agents-kit\skills\aria-patterns\references\dialog.md` if the component involves a modal/dialog. Read other reference files as relevant.
3. Read `C:\Users\tn\.claude\skills\a11y-agents-kit\skills\aria-patterns\references\at-support-gotchas.md` — always, for every component.
4. Apply every rule in the checklist below.
5. Output a structured AT support report.

## Rules checklist

### React Aria guarantee preservation
The #1 rule: React Aria already handles most a11y. This agent's job is to confirm nothing in our wrapper *breaks* what React Aria provides.

Flag any of the following as FAIL:
- Custom ARIA attributes that override React Aria's automatic ones (e.g., adding `aria-expanded` manually on a Select — React Aria sets this)
- Custom focus management (e.g., `ref.current.focus()` in a useEffect) when React Aria's focus management is already active
- `tabIndex` set manually on React Aria components that manage their own tab order
- `role` attribute set manually on a wrapper div when the React Aria component already sets the correct role on its own element

### Event handler conventions
- `onPress` used (not `onClick`) — React Aria normalizes across mouse, touch, keyboard
- `onKeyDown` for keyboard-specific interactions only when React Aria doesn't cover the case

### Dialog / Modal AT support
If the component is a Dialog or Modal:
- Is `role="alertdialog"` used for destructive/urgent dialogs? (Not `role="dialog"`)
- Does React Aria's `ModalOverlay` handle `inert` attribute on background siblings? (It does as of v1.18.0 — document this as a free guarantee)
- Is `aria-modal="true"` the ONLY mechanism for hiding background content? (FAIL — must also use inert or aria-hidden on siblings)
- Is there an `aria-labelledby` pointing to the dialog title? (React Aria's `Heading slot="title"` wires this automatically)
- Is there an `aria-describedby` for dialogs that have a description paragraph?

### Select / Combobox AT support
If the component is a Select:
- Does it use React Aria's `ListBox` pattern (not a custom `<ul>`)? 
- Is typeahead handled? (React Aria provides this free — document it)
- Does the trigger button announce the selected value to AT?

### Table AT support
If the component is a Table:
- Are sort states announced via `aria-sort`? (React Aria handles this on `Column`)
- Are selected rows announced? (React Aria handles `aria-selected`)
- Is the table navigable by arrow keys? (React Aria handles this)

### Focus management
- Focus trap works in Modal (React Aria ModalOverlay handles this)
- Focus returns to trigger on Modal close
- No `outline: none` without a custom `:focus-visible` replacement

## AT support matrix (from aria-patterns skill)
Report coverage across these AT combinations:
- NVDA + Chrome (Windows) — most common
- JAWS + Chrome/Edge (Windows) — enterprise
- VoiceOver + Safari (macOS)
- VoiceOver + Safari (iOS)
- TalkBack + Chrome (Android) — `aria-modal` broken here, `inert` required
- Narrator + Edge (Windows) — `aria-modal` broken here, `inert` required
- Orca + Firefox (Linux) — `aria-modal` broken here, `inert` required

## Output format

```
A11Y AGENT — Protonic
Component: [name]
Path: [path]

REACT ARIA GUARANTEES (free, inherited)
✅ [what React Aria provides for this component]
✅ [...]

CUSTOM CODE CHECKS
✅ PASS  [rule passed]
❌ FAIL  [rule violated]
         → [exact location: file:line]
         → [what React Aria already handles vs what's broken]
         → [fix]

AT SUPPORT COVERAGE
✅ NVDA + Chrome
✅ JAWS + Chrome/Edge
✅ VoiceOver + Safari (macOS/iOS)
⚠️  TalkBack + Chrome — [status + notes]
⚠️  Narrator + Edge — [status + notes]
⚠️  Orca + Firefox — [status + notes]

---
Result: PASS [n/n checks] | FAIL [n violations]
AT coverage: [n/7 combinations verified safe]
```
