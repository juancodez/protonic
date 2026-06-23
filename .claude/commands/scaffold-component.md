# /scaffold-component

Generate the complete 8-file anatomy for a new Protonic component.

## Usage

```
/scaffold-component <ComponentName> [--aria <ReactAriaPrimitive>] [--display-only]
```

Examples:
- `/scaffold-component Tooltip --aria OverlayTrigger`
- `/scaffold-component Tag --display-only`
- `/scaffold-component Checkbox --aria Checkbox`

---

## How to Run This Skill

**Step 1 — Gather information** (if not provided via flags, ask the user):
1. What is the component name? (PascalCase)
2. What React Aria primitive does it extend? Or is it display-only (no interactive primitive)?
3. Which axes does it expose? Options from `src/tokens/axes.ts`:
   - `variant` → `'primary' | 'secondary' | 'destructive'`
   - `size` → `'small' | 'medium' | 'large'`
   - `status` → `'success' | 'warning' | 'error' | 'info'`
   - Custom axes (ask for values)
4. What category? `atom` | `molecule` | `organism` | `layout`

**Step 2 — Read the reference files** before generating anything:
- `src/tokens/axes.ts` — canonical prop vocabulary
- `src/tokens/contracts.ts` — design chains (for metadata rationale)
- `src/components/Button/Button.tsx` — interactive component reference
- `src/components/Badge/Badge.tsx` — display-only component reference (if --display-only)

**Step 3 — Generate all 8 files** in `src/components/<ComponentName>/`:

---

## File Templates

### 1. `<ComponentName>.types.ts`

```typescript
// For interactive components (extends React Aria):
import type { <ReactAriaPrimitive>Props } from 'react-aria-components';
import type { Variant, Size } from '../../tokens/axes'; // import only the axes this component uses

export interface Protonic<ComponentName>Props extends <ReactAriaPrimitive>Props {
  variant?: Variant;   // axes registry: 'primary' | 'secondary' | 'destructive'
  size?:    Size;      // axes registry: 'small' | 'medium' | 'large'
  // Add owned props below (not passthrough, not inherited from React Aria)
}

// For display-only components (no interactive primitive):
import type { HTMLAttributes } from 'react';
import type { Status } from '../../tokens/axes';

// @protonic:display-only — no keyboard events, no focus management, no onPress
export interface Protonic<ComponentName>Props extends HTMLAttributes<HTMLDivElement> {
  status?: Status;   // axes registry: 'success' | 'warning' | 'error' | 'info'
  // Add owned props below
}
```

### 2. `<ComponentName>.styles.ts`

**Only generate this file if the component has CVA variants (variant, size, or status axes).**
Skip for display-only components with no variant axes.

```typescript
import { cva } from 'class-variance-authority';
import styles from './<ComponentName>.module.css';

// Intent layer — maps axes values to CSS module classes.
// axes.ts → (this file) → <ComponentName>.module.css → variables.css
export const <componentName>Variants = cva(styles.root, {
  variants: {
    variant: {
      primary:     styles.primary,
      secondary:   styles.secondary,
      destructive: styles.destructive,
    },
    size: {
      small:  styles.sm,
      medium: styles.md,
      large:  styles.lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size:    'medium',
  },
});
```

### 3. `<ComponentName>.tsx`

```typescript
// Interactive pattern (with CVA variants):
import { <ReactAriaPrimitive> as Aria<ComponentName> } from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { Protonic<ComponentName>Props } from './<ComponentName>.types';
import { <componentName>Variants } from './<ComponentName>.styles';

export function <ComponentName>({
  variant = 'primary',
  size    = 'medium',
  className,
  children,
  ...props
}: Protonic<ComponentName>Props) {
  return (
    <Aria<ComponentName>
      {...props}
      className={cn(<componentName>Variants({ variant, size }), className)}
    >
      {children}
    </Aria<ComponentName>>
  );
}

// Display-only pattern (no CVA variants):
import { cn } from '../../lib/cn';
import type { Protonic<ComponentName>Props } from './<ComponentName>.types';
import styles from './<ComponentName>.module.css';

export function <ComponentName>({
  status    = 'info',
  className,
  children,
  ...props
}: Protonic<ComponentName>Props) {
  return (
    <div
      {...props}
      className={cn(styles.root, status && styles[status], className)}
    >
      {children}
    </div>
  );
}
```

### 4. `<ComponentName>.module.css`

```css
/* <ComponentName>.module.css — every value MUST be a token var(), NO hardcoded values */
/* Token reference: src/tokens/theme.css */

/* ── Base ──────────────────────────────────────────────── */
.root {
  font-family: var(--font-family-body);
  /* Add base styles using only var(--token-name) values */
}

/* ── Variants ──────────────────────────────────────────── */
.primary {
  background: var(--color-primary);
  color:      var(--color-on-primary);
}
.secondary {
  background: var(--color-surface);
  color:      var(--color-text-body);
  border:     1px solid var(--color-border);
}
.destructive {
  background: var(--color-danger-subtle);
  color:      var(--color-danger);
}

/* ── Sizes ─────────────────────────────────────────────── */
.sm { padding: var(--space-1) var(--space-3); font-size: var(--font-size-sm); }
.md { padding: var(--space-2) var(--space-4); font-size: var(--font-size-md); }
.lg { padding: var(--space-3) var(--space-6); font-size: var(--font-size-lg); }

/* ── React Aria state hooks (for interactive components) ─ */
.root[data-focus-visible] { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.root[data-disabled]      { opacity: 0.4; cursor: not-allowed; }
.root[data-pressed]       { transform: scale(0.97); }
.root[data-hovered]       { /* add hover state */ }
```

### 5. `<ComponentName>.metadata.ts`

```typescript
export const <ComponentName>Metadata = {
  id:          '<componentName>',
  name:        '<ComponentName>',
  version:     '1.0.0',
  type:        'interactive', // interactive | display | container | input
  category:    'atom',        // atom | molecule | organism | layout
  description: 'One clear sentence: what is this component for?',
  path:        'src/components/<ComponentName>',
  created:     '<YYYY-MM-DD>',
  modified:    '<YYYY-MM-DD>',

  variants: {
    variant: ['primary', 'secondary', 'destructive'], // only the axes this component uses
  },

  useCases: [
    {
      label:   'Label for this use case',
      when:    'When to reach for this variant/state',
      example: '<ComponentName variant="primary">Label</ComponentName>',
    },
  ],

  compositions: [
    {
      label: 'Common composition with other Protonic components',
      code:  `<ParentComponent>\n  <<ComponentName> />\n</ParentComponent>`,
    },
  ],

  antiPatterns: [
    {
      bad:    'The wrong way to use this component',
      good:   'The right way',
      reason: 'Why — trace back to a token or contract',
    },
  ],

  a11y: {
    inherited: [
      // For interactive: list what React Aria provides automatically
      'Keyboard activation (Enter + Space)',
      'Focus ring via data-focus-visible',
    ],
    owned: [
      // What THIS component adds beyond the React Aria primitive
    ],
  },

  aiHints: [
    // Rules for Claude when deciding whether/how to use this component
    'One sentence rule that prevents the most common misuse',
  ],

  tokens: {
    // List of CSS custom properties this component references
    background: ['--color-primary'],
    color:      ['--color-on-primary'],
    radius:     ['--radius-pill'],
  },

  figma: {
    fileKey:    'R4KIv7XKg8g1A1NR9R11cI',
    component:  '<ComponentName>',
    properties: {
      Variant: ['Primary', 'Secondary', 'Destructive'],
      Size:    ['Small', 'Medium', 'Large'],
      State:   ['Default', 'Hover', 'Pressed', 'Disabled'],
    },
  },
} as const;
```

### 6. `<ComponentName>.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { <ComponentName> } from './<ComponentName>';

const meta: Meta<typeof <ComponentName>> = {
  title:     'Protonic/<ComponentName>',
  component: <ComponentName>,
  tags:      ['autodocs'],
  argTypes: {
    variant: {
      control:     'select',
      options:     ['primary', 'secondary', 'destructive'],
      description: 'Identity axis — what kind of action is this? (axes registry: variant)',
    },
    size: {
      control:     'select',
      options:     ['small', 'medium', 'large'],
      description: 'Scale axis — one ordered scale (axes registry: size)',
    },
  },
  args: {
    children: '<ComponentName>',
  },
};

export default meta;
type Story = StoryObj<typeof <ComponentName>>;

export const Primary: Story   = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="destructive">Destructive</ComponentName>
    </div>
  ),
};
```

### 7. `<ComponentName>.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { <ComponentName> } from './<ComponentName>';

describe('<ComponentName>', () => {
  it('renders with default variant', () => {
    render(<<ComponentName>>Test</<ComponentName>>);
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('applies variant class', () => {
    const { container } = render(<<ComponentName> variant="secondary" />);
    expect(container.firstChild).toBeTruthy();
  });
});
```

### 8. `index.ts`

```typescript
export { <ComponentName> } from './<ComponentName>';
export type { Protonic<ComponentName>Props } from './<ComponentName>.types';
export { <ComponentName>Metadata } from './<ComponentName>.metadata';
```

---

## After Generating All 8 Files

1. Run `/component-auditor src/components/<ComponentName>` — expect 10/10
2. Run `/design-review src/components/<ComponentName>` — expect 0 warnings
3. Add the component to `.ai/index.json` (append a new entry with name, path, variants, tokens, usedBy, category)
4. Report: component name, files created, audit score, any issues found

---

## Contracts to Enforce During Generation

- NO hardcoded hex, rgb, or pixel values in `.module.css` — every value must be `var(--token)`
- `onPress` not `onClick` (React Aria convention)
- `isDisabled` not `disabled` (React Aria convention)
- `variant` not `type` or `kind` (axes registry)
- Display-only components MUST have `// @protonic:display-only` in `.types.ts`
- Interactive components MUST extend a React Aria type, not `React.HTMLAttributes` directly
- CVA must be in `.styles.ts`, NOT inlined in `.tsx`
- All axes values must match `src/tokens/axes.ts` exactly — no drift
