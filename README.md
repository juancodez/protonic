# Protonic

A React design system built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/), with an agentic layer as the final phase.

---

## What is this

Protonic is a component library built in three phases:

**Phase 1 — Accessible base components**
Four components wrapped around React Aria: `Button`, `Modal`, `Select`, `Table`. No styles yet — only behavior and accessibility. React Aria handles keyboard navigation, focus management, screen readers, and ARIA attributes out of the box.

**Phase 2 — Design system layer**
Design tokens (colors, typography, spacing) applied via CSS custom properties. Variant API built with [Class Variance Authority](https://cva.style/docs). Visual documentation with Storybook. Component designs pushed to Figma via Figma CLI.

**Phase 3 — Agentic layer**
AI agents that maintain and scale the design system:
- **Component Auditor** — enforces naming conventions and API contracts
- **A11y Agent** — verifies React Aria accessibility guarantees aren't broken
- **Documentation Agent** — auto-updates Storybook when an API changes
- **Design Review Agent** — flags hardcoded values and token inconsistencies

---

## Why this architecture

Accessibility from scratch is hard. React Aria (by Adobe) already solves keyboard navigation, focus traps, ARIA roles, and screen reader behavior. Protonic builds the design layer on top — tokens, variant API, visual polish — without reinventing what's already solved.

The agentic layer only makes sense once the design system has solid contracts to enforce. That's why it's Phase 3.

```
React Aria (behavior + accessibility)
    ↓
Protonic Design System (tokens, variants, visual design)
    ↓
Figma (design ↔ code sync via Figma CLI)
    ↓
Agentic Layer (auditors, docs, review agents)
    ↓
Real applications
```

---

## Stack

| | |
|---|---|
| Framework | Vite + React 18 + TypeScript (strict) |
| Accessibility | `react-aria-components` |
| Variant API | `class-variance-authority` |
| Styling | CSS custom properties — no Tailwind, no CSS-in-JS |
| Design sync | Figma CLI |
| Agentic tools | Claude API + graphify |

---

## Token origin

Design tokens are seeded from [Klaro](https://github.com/juancodez/klaro-landing), a fiscal assistant app for Spanish-speaking freelancers in Germany. The warm, premium visual language carries over into Protonic.

| Token | Value |
|-------|-------|
| Primary | `#a43700` |
| Background | `#fff8f1` |
| Surface | `#f4ede5` |
| Text | `#1e1b17` |
| Display font | Bricolage Grotesque |
| Body font | Plus Jakarta Sans |

---

## Current status

- [x] Phase 0 — Scaffold, tokens, CLAUDE.md, AGENTS.md
- [x] Button (Phase 1 stub — accessible, no styles)
- [ ] Modal
- [ ] Select
- [ ] Table
- [ ] Phase 2 — Design layer
- [ ] Phase 3 — Agentic layer

---

## Getting started

```bash
npm install
npm run dev
```

---

Built by [Juan Gomez-Vara](https://github.com/juancodez) · Ponytail-mode active
