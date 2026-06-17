# AGENTS.md — Protonic Phase 3 Contracts

> Agents implemented after Phase 2 is complete. Contracts defined here upfront so Phase 1–2 decisions stay compatible.

---

## Component Auditor Agent

**Input:** new/modified component file  
**Output:** pass/fail report vs naming conventions and API contracts established in Phase 2  
**Checks:** prop naming consistency, variant coverage, TypeScript interface shape

---

## A11y Agent

**Input:** component file  
**Output:** confirms React Aria a11y guarantees are not broken  
**Checks:** no custom ARIA overrides, `onPress` used not `onClick`, focus management intact

---

## Documentation Agent

**Input:** component API change (diff)  
**Output:** updated or generated Storybook story  
**Checks:** all variants documented, props table accurate, a11y notes present

---

## Design Review Agent

**Input:** component styles (Phase 2 CSS)  
**Output:** token compliance report — flags hardcoded values, off-scale spacing, undefined colors  
**Checks:** all values reference CSS custom properties, no magic numbers

---

## Tool integrations (Phase 3)

- graphify → knowledge graph of component graph + dependency map  
- figma-component-generator → reverse-sync: component → Figma
