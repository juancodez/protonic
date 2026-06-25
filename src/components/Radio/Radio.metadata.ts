export const RadioMetadata = {
  id: 'radio', name: 'Radio', version: '1.0.0', type: 'interactive', category: 'atom',
  path: 'src/components/Radio', created: '2026-06-26', modified: '2026-06-26',
  description: 'Mutually exclusive option group via RadioGroup + Radio. Arrow keys move selection; React Aria handles roving tabindex.',
  variants: {},
  useCases: [
    { label: 'Mutually exclusive choice', when: 'Only one answer valid — tipo de autónomo, billing cycle, filing status', example: '<RadioGroup label="Régimen"><Radio value="general">Régimen general</Radio></RadioGroup>' },
  ],
  antiPatterns: [
    { bad: 'Radio for multiple simultaneous selections', good: 'Checkbox group', reason: 'Radios enforce single-selection semantically. Multiple simultaneous picks need Checkbox.' },
    { bad: 'Ungroup Radio components', good: 'Always wrap in RadioGroup', reason: 'RadioGroup provides the aria-radiogroup role and handles roving tabindex between options.' },
  ],
  a11y: { inherited: ['Arrow keys move between options (roving tabindex)', 'Space/Enter selects', 'aria-checked per option', 'aria-required and aria-invalid on group', 'aria-labelledby wired to Label'], owned: [] },
  aiHints: ['Always use RadioGroup as the wrapper — never Radio alone.', 'value prop on Radio must be a string, not a boolean or number.', 'defaultValue handles uncontrolled; value + onChange for controlled.'],
  tokens: { background: ['--color-surface', '--color-primary'], border: ['--color-primary-subtle-hover', '--color-focus-ring'], color: ['--color-on-primary', '--color-text-body', '--color-text-muted', '--color-danger'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Radio' },
} as const;
