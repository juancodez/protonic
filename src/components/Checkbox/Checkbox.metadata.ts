export const CheckboxMetadata = {
  id: 'checkbox', name: 'Checkbox', version: '1.0.0', type: 'interactive', category: 'atom',
  path: 'src/components/Checkbox', created: '2026-06-26', modified: '2026-06-26',
  description: 'Binary toggle — checked, unchecked, or indeterminate. Indeterminate supports select-all patterns.',
  variants: {},
  useCases: [
    { label: 'Form option',    when: 'Single opt-in — terms, newsletter, consent', example: '<Checkbox label="Acepto los términos" />' },
    { label: 'Select all',     when: 'Toggle all rows in a list/table',             example: '<Checkbox isIndeterminate label="Seleccionar todos" />' },
    { label: 'Multi-select',   when: 'Group of independent options — not mutually exclusive (use Radio for that)', example: '<Checkbox label="IVA incluido" />' },
  ],
  antiPatterns: [
    { bad: 'Checkbox for mutually exclusive options', good: 'Radio group', reason: 'If only one option can be true at a time, Radio enforces that semantically.' },
    { bad: '<input type="checkbox" />',               good: '<Checkbox label="…" />', reason: 'Bare input has no accessible label link. React Aria Checkbox wires aria-labelledby.' },
  ],
  a11y: { inherited: ['Space to toggle', 'aria-checked (including indeterminate)', 'aria-disabled', 'aria-required', 'Focus ring via data-focus-visible'], owned: [] },
  aiHints: ['Pass label not children for text — both work but label is the semantic slot.', 'isIndeterminate is visual-only when controlled externally; React Aria does not derive it automatically.'],
  tokens: { background: ['--color-surface', '--color-primary'], border: ['--color-primary-subtle-hover', '--color-focus-ring'], color: ['--color-on-primary', '--color-text-body', '--color-text-muted'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Checkbox' },
} as const;
