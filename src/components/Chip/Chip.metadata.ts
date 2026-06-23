// Chip.metadata.ts — Protonic contract + Cristian's ai-component-metadata schema (merged)

export const ChipMetadata = {
  // ── Protonic contract fields ──────────────────────────────────────────
  id:          'chip',
  name:        'Chip',
  version:     '1.0.0',
  type:        'display',
  category:    'atom',
  path:        'src/components/Chip',
  created:     '2026-06-18',
  modified:    '2026-06-24',
  description: 'Status label with optional dismiss. Signals system feedback states inline with content.',

  variants: {
    status: ['info', 'success', 'warning', 'error'],
  },

  useCases: [
    {
      label:   'Status indicator',
      when:    'Show system feedback inline — file uploaded, error detected, warning active',
      example: '<Chip status="success">Guardado</Chip>',
    },
    {
      label:   'Dismissible filter tag',
      when:    'Active filter or selection the user can remove',
      example: '<Chip status="info" dismissible onDismiss={removeFilter}>Impuesto 2024</Chip>',
    },
  ],

  antiPatterns: [
    {
      bad:    '<Chip variant="primary">',
      good:   '<Chip status="info">',
      reason: 'Chip uses status axis (system feedback), not variant axis (identity). Cristian article 3: variant ≠ status.',
    },
    {
      bad:    'Using Chip for navigation or primary actions',
      good:   'Use Button or a nav element',
      reason: 'Chip is display/feedback only. It does not initiate primary actions.',
    },
    {
      bad:    'More than 3 Chips in a row without grouping',
      good:   'Wrap in a flex container with var(--space-2) gap',
      reason: 'Ungrouped chips break visual rhythm. Use a flex row as wrapper.',
    },
  ],

  a11y: {
    inherited: ['// @protonic:display-only — no inherited React Aria behavior'],
    owned: [
      'dismissible button: labeled "Dismiss", focusable, focus ring via :focus-visible',
      'span container is aria-neutral (no role override needed for status labels)',
    ],
  },

  tokens: {
    background: ['--color-primary-subtle', '--color-success-subtle', '--color-warning-subtle', '--color-danger-subtle'],
    color:      ['--color-primary', '--color-success', '--color-warning-text', '--color-danger'],
    radius:     ['--radius-pill'],
    spacing:    ['--space-1', '--space-3'],
    typography: ['--font-family-body', '--font-size-xs', '--font-weight-semibold'],
  },

  figma: {
    fileKey:    'rRSxMj33ZtioxdrabH5rm6',
    component:  'Chip',
    properties: {
      Status:      ['Info', 'Success', 'Warning', 'Error'],
      Dismissible: ['True', 'False'],
    },
  },

  // ── Cristian's ai-component-metadata schema ───────────────────────────
  // Adds composition + behavior context that generic AI consumers need.
  aiMetadata: {
    component: {
      name:        'Chip',
      category:    'atoms',
      description: 'Status label with optional dismiss button. Communicates system feedback inline.',
      type:        'display',
    },

    usage: {
      useCases: [
        'inline-status-label',
        'dismissible-filter-tag',
        'feedback-indicator',
      ],
      requiredProps: [],
      commonPatterns: [
        {
          name:        'status-label',
          description: 'Show system feedback state inline with text content',
          composition: '<Chip status="success">Guardado</Chip>',
        },
        {
          name:        'dismissible-filter',
          description: 'Active filter the user can remove',
          composition: '<Chip status="info" dismissible onDismiss={fn}>Filtro activo</Chip>',
        },
        {
          name:        'chip-row',
          description: 'Multiple chips with consistent spacing',
          composition: `
<div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
  <Chip status="success">Subido</Chip>
  <Chip status="warning">Pendiente</Chip>
  <Chip status="error">Error</Chip>
</div>`,
        },
      ],
      antiPatterns: [
        {
          scenario:    'Using variant prop instead of status',
          reason:      'Chip has no variant axis — status axis only (Cristian article 3)',
          alternative: 'Use status="info|success|warning|error"',
        },
        {
          scenario:    'Using Chip for primary actions',
          reason:      'Chip is display-only; no onPress, no navigation',
          alternative: 'Use Button for actions',
        },
      ],
    },

    composition: {
      slots: {},
      nestedComponents: [],
      commonPartners: ['Badge', 'Table', 'Card'],
      parentConstraints: ['flex container recommended for multiple chips'],
    },

    behavior: {
      states:       ['default', 'dismissible'],
      interactions: { click: 'dismiss button only — fires onDismiss callback' },
      responsive:   { mobile: 'same as desktop', desktop: 'inline-flex, pill shape' },
    },

    accessibility: {
      role:            'generic (span)',
      keyboardSupport: 'dismiss button: Tab to focus, Enter/Space to activate',
      screenReader:    'reads chip text + "Dismiss" button label separately',
      focusManagement: 'dismiss button has :focus-visible ring via currentColor outline',
      wcag:            'AA',
    },

    aiHints: {
      priority: 'medium',
      keywords: ['chip', 'tag', 'label', 'status', 'filter', 'badge', 'pill', 'dismiss'],
      context:  'Use when you need to show a removable label, active filter, or inline status that is part of content flow — not a standalone notification.',
    },
  },
} as const;
