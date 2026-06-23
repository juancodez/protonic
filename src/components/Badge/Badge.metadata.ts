export const BadgeMetadata = {
  id: 'badge', name: 'Badge', version: '2.0.0', type: 'display', category: 'atom',
  path: 'src/components/Badge', created: '2026-06-10', modified: '2026-06-24',
  description: 'Non-interactive status label. Communicates system feedback via the status axis.',
  variants: { status: ['info', 'success', 'warning', 'error'] },
  useCases: [
    { label: 'Status indicator', example: '<Badge status="success">Verificado</Badge>' },
    { label: 'Warning tag', example: '<Badge status="warning">Pendiente</Badge>' },
    { label: 'Error flag', example: '<Badge status="error">Rechazado</Badge>' },
  ],
  antiPatterns: [
    { bad: 'status="info" for every badge', good: 'Match status to actual system signal', reason: 'Status is a semantic axis — wrong value misleads AT users and breaks visual grammar.' },
    { bad: '<Badge onClick={...}>', good: 'Use a Button variant instead', reason: 'Badge is display-only. Interactive status chips need button role + keyboard handling.' },
  ],
  a11y: { inherited: [], owned: ['Non-interactive <span>. Screen readers announce children as inline text.'] },
  aiHints: [
    'status axis answers "what is the SYSTEM signaling?" — not what the UI variant looks like.',
    'Pill radius is canonical for Badge — never override border-radius.',
  ],
  tokens: { background: ['--color-primary-subtle', '--color-success-subtle', '--color-warning-subtle', '--color-danger-subtle'], color: ['--color-primary', '--color-success', '--color-warning-text', '--color-danger'], radius: ['--radius-pill'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Badge', properties: { Status: ['Info', 'Success', 'Warning', 'Error'] } },
} as const;
