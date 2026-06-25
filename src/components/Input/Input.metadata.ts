export const InputMetadata = {
  id:          'input',
  name:        'Input',
  version:     '1.0.0',
  type:        'interactive',
  category:    'atom',
  path:        'src/components/Input',
  created:     '2026-06-26',
  modified:    '2026-06-26',
  description: 'Single-line text field with built-in label, description, and error message. Keyboard and AT behavior handled by React Aria TextField.',

  variants: { size: ['small', 'medium', 'large'] },

  useCases: [
    { label: 'Form field',    when: 'Any single-line text input — name, email, amount, reference number', example: '<Input label="Email" placeholder="tu@email.com" />' },
    { label: 'Error state',   when: 'Validation failed — pass isInvalid + errorMessage',                 example: '<Input label="NIF" isInvalid errorMessage="Formato inválido." />' },
    { label: 'Required field', when: 'Field must be filled — pass isRequired for AT announcement',        example: '<Input label="Nombre" isRequired />' },
  ],

  antiPatterns: [
    { bad: '<input type="text" />',          good: '<Input label="…" />',          reason: 'Bare <input> has no accessible label or error-message link. React Aria TextField wires aria-labelledby and aria-describedby automatically.' },
    { bad: '<Input label="Email" disabled>', good: '<Input label="Email" isDisabled>', reason: 'HTML disabled removes the element from tab order. isDisabled uses aria-disabled — AT users can still discover the field.' },
    { bad: 'Inline style on the input',      good: 'Add a size variant via tokens',  reason: 'Token system enforced by /design-review. Inline styles bypass audit.' },
  ],

  a11y: {
    inherited: ['aria-labelledby wired to Label', 'aria-describedby wired to description + error slots', 'aria-invalid on error state', 'aria-required on isRequired', 'aria-disabled (not HTML disabled)'],
    owned: [],
  },

  aiHints: [
    'Always pass label — unlabelled inputs fail WCAG 1.3.1 regardless of placeholder.',
    'errorMessage only renders when isInvalid is true — pass both together.',
    'Use description for format hints (e.g. "DD/MM/YYYY") and errorMessage for validation failures.',
    'size="medium" (44px min-height) is the default and correct for most Klaro forms.',
  ],

  tokens: {
    background: ['--color-surface', '--color-disabled-bg'],
    border:     ['--color-primary-subtle-hover', '--color-focus-ring', '--color-danger'],
    shadow:     ['--color-primary-subtle', '--color-danger-subtle'],
    color:      ['--color-text', '--color-text-muted', '--color-danger'],
  },

  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Input' },
} as const;
