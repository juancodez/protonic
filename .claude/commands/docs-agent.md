# Documentation Agent — Protonic Phase 3 Agent

Generate or update the Storybook story for the component at `$ARGUMENTS`.

## What to do

1. Read the component file(s) at the path given in `$ARGUMENTS`.
2. Read `src/tokens/axes.ts` — to know all canonical variant and size values.
3. Read an existing story file for reference (e.g., `src/components/Button/Button.stories.tsx`) — to match the established pattern.
4. Check if a story file already exists for the target component.
   - If yes: identify what's missing or outdated and propose additions/corrections.
   - If no: generate a complete story file from scratch.
5. Output the full story file (or diff if updating).

## Story requirements

### Meta block
Every story file must have a meta object with:
- `title: 'Protonic/ComponentName'`
- `component: ComponentName`
- `tags: ['autodocs']`
- A `parameters.docs.description.component` string that explains:
  - What React Aria component(s) this wraps
  - The full compound pattern (e.g., `Select → Button → Popover → ListBox → ListBoxItem`)
  - **A11y inherited from React Aria (free):** — bulleted list of accessibility features provided for free

### ArgTypes (for components with variant/size axes)
For every prop that maps to an axis in `axes.ts`:
```ts
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'destructive'],
    description: 'Identity axis — what kind of action is this? (axes registry: variant)',
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
    description: 'Scale axis — one ordered scale (axes registry: size)',
  },
}
```

### Required stories
1. **Default** — minimal working example with `args`
2. One story per variant value (e.g., `Primary`, `Secondary`, `Destructive`)
3. One story per size value if `size` prop exists (e.g., `Small`, `Medium`, `Large`)
4. **Disabled** state story
5. Any component-specific states (e.g., `Loading` for Button, `WithDefaultValue` for Select)
6. **AllVariants** — a render story showing all variants side by side in a flex row
7. **AllSizes** — a render story showing all sizes side by side (if size axis exists)

### A11y description block
The `component` description string must include a section:

```
**A11y inherited from React Aria (free):**
- [bullet per React Aria guarantee]
```

Examples:
- Arrow keys navigate between cells
- `role="grid"`, `role="row"`, `role="columnheader"`, `role="gridcell"` set automatically
- `aria-sort` updates on sortable columns

### Story naming conventions
- Story export names: PascalCase (`Default`, `WithLongContent`, `SingleSelect`)
- `aria-label` in args: descriptive, includes component purpose

## Output format

If generating new:
Output the complete `ComponentName.stories.tsx` file contents, ready to paste.

If updating existing:
```
DOCS AGENT — Protonic
Component: [name]

MISSING STORIES
- [ ] [story name] — [reason it's needed]

OUTDATED CONTENT
- argTypes.variant.description doesn't reference axes registry → update to: "..."
- Missing a11y description for [feature]

ADDITIONS (new story blocks to append)
[code blocks for each missing story]
```
