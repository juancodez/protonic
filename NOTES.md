# NOTES.md — React Aria Findings (Phase 1)

> Log quirks, gotchas, and non-obvious behaviors discovered while building Phase 1 components. These feed into Phase 2 styling decisions and Phase 3 agent rules.

---

## Button



---

## Modal (Dialog)

**`aria-modal` AT support gap — verified resolved by React Aria**

The `aria-patterns` skill audit flagged that `aria-modal="true"` is ignored by TalkBack, Narrator, and Orca. Verified that React Aria v1.18.0 already handles this correctly:

- `useModalOverlay` calls `ariaHideOutside([ref.current], { shouldUseInert: true })`
- `ariaHideOutside` sets `element.inert = true` on all background siblings (modern browsers)
- Falls back to `aria-hidden="true"` on browsers where `'inert' in HTMLElement.prototype` is false
- `useOverlayFocusContain` handles focus trap independently

Conclusion: no code change needed on our side. React Aria owns the AT isolation.

**`role="alertdialog"` for destructive modals**

Per aria-patterns audit: destructive/urgent dialogs should use `role="alertdialog"` so the title is announced immediately by AT without waiting for focus. Standard dialogs use `role="dialog"` (default).

Added `role` prop to `ProtonicModalProps` (`'dialog' | 'alertdialog'`, defaults to `'dialog'`). The Destructive story passes `role="alertdialog"`.

---

## Select



---

## Table


