export const TextareaMetadata = {
  id: 'textarea', name: 'Textarea', version: '1.0.0', type: 'interactive', category: 'atom',
  path: 'src/components/Textarea', created: '2026-06-26', modified: '2026-06-26',
  description: 'Multi-line text input with the same accessible label/description/error contract as Input. Height set by rows prop.',
  variants: {},
  useCases: [
    { label: 'Long-form text', when: 'Notes, descriptions, explanations — anything needing more than one line', example: '<Textarea label="Observaciones" rows={4} />' },
  ],
  antiPatterns: [
    { bad: '<textarea />',                         good: '<Textarea label="…" />',  reason: 'Bare textarea has no accessible label link.' },
    { bad: 'CSS height to control size',           good: 'rows prop',              reason: 'rows is the semantic height contract; CSS height overrides are not token-compliant.' },
  ],
  a11y: { inherited: ['aria-labelledby', 'aria-describedby', 'aria-invalid', 'aria-required', 'aria-disabled'], owned: [] },
  aiHints: ['Use Input for single-line; Textarea for anything where a newline is expected.', 'rows={4} is the default — 3 visible lines plus comfortable padding.'],
  tokens: { background: ['--color-surface', '--color-disabled-bg'], border: ['--color-primary-subtle-hover', '--color-focus-ring', '--color-danger'], color: ['--color-text', '--color-text-muted', '--color-danger'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Textarea' },
} as const;
