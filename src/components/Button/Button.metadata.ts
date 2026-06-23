export const ButtonMetadata = {
  id:          'button',
  name:        'Button',
  version:     '2.0.0',
  type:        'interactive',
  category:    'atom',
  path:        'src/components/Button',
  created:     '2026-06-01',
  modified:    '2026-06-24',
  description: 'Interactive control for user-initiated actions. Keyboard, touch, and pointer normalized by React Aria.',

  variants: {
    variant: ['primary', 'secondary', 'destructive'],
    size:    ['small', 'medium', 'large'],
  },

  useCases: [
    {
      label:   'Primary action',
      when:    'Single most important action on screen — form submit, confirm, CTA',
      example: '<Button variant="primary">Guardar</Button>',
    },
    {
      label:   'Secondary action',
      when:    'Paired with primary — cancel, go back, less critical path',
      example: '<Button variant="secondary">Cancelar</Button>',
    },
    {
      label:   'Destructive action',
      when:    'Irreversible operations — delete, revoke, permanently remove',
      example: '<Button variant="destructive">Eliminar cuenta</Button>',
    },
    {
      label:   'Loading state',
      when:    'Async action in progress — prevents double-submit automatically',
      example: '<Button variant="primary" isLoading>Guardando…</Button>',
    },
  ],

  compositions: [
    {
      label: 'Modal trigger (ModalTrigger wraps Button + Modal)',
      code: `
<ModalTrigger>
  <Button variant="primary">Abrir</Button>
  <Modal title="Confirmar">...</Modal>
</ModalTrigger>`,
    },
    {
      label: 'Hero CTA pair',
      code: `
<div style={{ display: 'flex', gap: 'var(--space-4)' }}>
  <Button variant="primary">Empezar gratis</Button>
  <Button variant="secondary">Ver demo</Button>
</div>`,
    },
  ],

  antiPatterns: [
    {
      bad:    '<button onClick={handler}>',
      good:   '<Button onPress={handler}>',
      reason: 'React Aria normalizes mouse/touch/keyboard into onPress. onClick misses touch and some keyboard paths.',
    },
    {
      bad:    'Two <Button variant="primary"> side by side',
      good:   'One primary + one secondary',
      reason: 'Two primary buttons compete for attention and signal unclear hierarchy.',
    },
    {
      bad:    '<Button style={{ background: "#ff0000" }}>',
      good:   'Add a new variant via tokens + Button.module.css',
      reason: 'Inline styles bypass the token audit and break design-system consistency. Every value must trace to a token.',
    },
    {
      bad:    '<Button disabled>',
      good:   '<Button isDisabled>',
      reason: 'HTML disabled removes the element from tab order. isDisabled keeps it accessible to screen readers via aria-disabled.',
    },
  ],

  a11y: {
    inherited: [
      'Keyboard activation (Enter + Space)',
      'Focus ring via data-focus-visible (keyboard-only — no ring on mouse click)',
      'aria-disabled (not HTML disabled — stays in tab order for AT users)',
      'onPress normalizes pointer + touch + keyboard into one event',
    ],
    owned: [
      'isLoading: disables interaction without removing from tab order',
    ],
  },

  aiHints: [
    'variant="primary" = one per view max. If you want two primaries, one of them is wrong.',
    'isLoading handles the disabled+spinner combo — no need to manage both manually.',
    'Pill border-radius is canonical for ALL Protonic/Klaro interactive controls (contracts.ts#borderRadius).',
    'The shimmer sweep on primary hover comes from Button.module.css ::after — do not add a second ::after.',
    'size="medium" is the default and covers 90% of cases.',
  ],

  tokens: {
    background:   ['--color-primary', '--color-danger-subtle'],
    color:        ['--color-on-primary', '--color-text-body', '--color-danger'],
    border:       ['--color-primary', '--color-danger-subtle-border'],
    shadow:       ['--shadow-btn', '--shadow-btn-hover'],
    radius:       ['--radius-pill'],
    motion:       ['--motion-duration-medium', '--motion-duration-long', '--motion-easing-spring'],
  },

  figma: {
    fileKey:    'rRSxMj33ZtioxdrabH5rm6',
    component:  'Button',
    properties: {
      Variant: ['Primary', 'Secondary', 'Destructive'],
      Size:    ['Small', 'Medium', 'Large'],
      State:   ['Default', 'Hover', 'Pressed', 'Disabled', 'Loading'],
    },
  },
} as const;
