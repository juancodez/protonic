# Protonic

A contract-first, agentic design system built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/).

> *"El que dice que no es necesario un design system porque existe shadcn, sigue pensando en librerías. Tu ya estás en otra abstracción donde la librería es un artefacto."*
> — Cristian Morales Achiardi

---

## The idea

shadcn/ui is opinionated. It ships with all its rules already decided, and those rules are hard to break. It only works on React web. It gives you atoms and molecules, nothing more.

Protonic is the opposite:

| | shadcn | Protonic |
|---|---|---|
| Approach | Library-first | Contract-first |
| Rules | Pre-decided, opinionated | You define them, agents enforce them |
| Platform | React web only | General contracts, any binding |
| Library | The product | An artifact |
| Agents | None | Built in from day 1 |

The library Protonic produces is a side effect of well-defined contracts — not the goal.

---

## Architecture

```
General contracts (Protonic core)
  What is this component for? What are its axes? What behavior does it guarantee?
  Portable across platforms. This layer doesn't care about brand or stack.
        ↓
Specific contracts (per-project theme)
  Klaro theme: orange #a43700, Bricolage Grotesque, warm premium visual language
  Bound to one product. Easy to swap for another.
        ↓
Components (the library — just an artifact)
  React + React Aria. Accessible, typed, variant API via CVA.
        ↓
Agents (Phase 3 — the enforcement layer)
  Component Auditor · A11y Agent · Docs Agent · Design Review Agent
  They read the contracts and verify the artifacts don't drift from them.
```

---

## Why React Aria as the base

Accessibility from scratch is hard. React Aria (by Adobe) already solved keyboard navigation, focus traps, ARIA roles, and screen reader behavior for every component. Protonic builds the design layer on top — tokens, variant API, visual polish — without reinventing what's already solved.

---

## Klaro — first consumer

[Klaro](https://github.com/juancodez/klaro-landing) is a fiscal assistant for Spanish-speaking freelancers in Germany. It's the first real product consuming Protonic. Its tokens seed the default theme:

| Token | Value |
|-------|-------|
| Primary | `#a43700` |
| Background | `#fff8f1` |
| Display font | Bricolage Grotesque |
| Body font | Plus Jakarta Sans |

This is a **theme**, not Protonic's identity. Any project can apply different values to the same contracts.

---

## Three phases

**Phase 1 — Accessible base components** ✅
Button · Modal · Select · Table — behavior only, no styles. React Aria foundation.

**Phase 2 — Design system layer** ← current
Axes registry · Design contracts · CVA variant API · CSS custom properties · Storybook · Figma sync

**Phase 3 — Agentic layer** ← north star
Agents that read the contracts and enforce them. Built from scratch so the rules are clean from day 1 — not retrofitted into something already running.

---

## Stack

| | |
|---|---|
| Framework | Vite + React 18 + TypeScript (strict) |
| Accessibility | `react-aria-components` |
| Variant API | `class-variance-authority` |
| Styling | CSS custom properties |
| Design sync | Figma CLI |
| Agents | Claude API + graphify |

---

## Getting started

```bash
npm install
npm run dev
```

---

Built by [Juan Gomez-Vara](https://github.com/juancodez) · Based on methodology by [Cristian Morales Achiardi](https://medium.com/@cristian.morales.achiardi)
