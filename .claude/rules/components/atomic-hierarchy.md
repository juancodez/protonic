---
paths:
  - "src/components/**"
---

# Rule: Atomic Hierarchy

## Category definitions

**atom** — smallest indivisible unit. Cannot compose other Protonic components.
Examples: Button, Badge, Chip

**molecule** — composed of 2–3 atoms. Adds behavior by combining simpler parts.
Examples: Modal (Button + overlay), Select (Button + ListBox)

**organism** — complex UI section. May compose molecules and atoms.
Examples: Table (rows + cells + pagination)

**layout** — full-viewport or section shell. Provides structure, not content.
Examples: Hero, ClaraPanel

## Composition rules

- Atoms: no Protonic component imports inside the component file
- Molecules: may import atoms from `../ComponentName`
- Organisms: may import atoms and molecules
- Layouts: may import any category

## Category in metadata

`category` in `Component.metadata.ts` MUST match the component's actual
composition depth. `/review-pr` Layer 5 checks that a component declaring
`category: 'atom'` does not import other Protonic components in its TSX.

## Directory naming

Components live flat in `src/components/ComponentName/`. No subdirectory
nesting by category. Category is encoded in metadata, not the file path.
