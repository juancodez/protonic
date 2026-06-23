export const CardMetadata = {
  id: 'card', name: 'Card', version: '2.0.0', type: 'display', category: 'atom',
  path: 'src/components/Card', created: '2026-06-10', modified: '2026-06-24',
  description: 'Surface container. Lifts content off the page bg using border + shadow. No interaction.',
  variants: {},
  useCases: [
    { label: 'Content grouping', example: '<Card><h3>Título</h3><p>Cuerpo</p></Card>' },
    { label: 'Feature tile', example: '<Card><Badge status="success">Nuevo</Badge><p>Descripción</p></Card>' },
  ],
  antiPatterns: [
    { bad: 'Nested Cards', good: 'Use padding/dividers inside one Card', reason: 'Double surface creates visual noise and breaks the elevation hierarchy.' },
    { bad: '<Card onClick={...}>', good: 'Wrap with a <button> or use a Link inside', reason: 'Card is display-only — interactive wrapper needs keyboard + ARIA support.' },
  ],
  a11y: { inherited: [], owned: ['Not interactive — no role needed. Interactive children own their own a11y.'] },
  aiHints: [
    'card = surface container. Use for grouping, not for interaction.',
    'Hover lift animation is decorative — do not use it to signal clickability without an interactive element inside.',
  ],
  tokens: { background: ['--color-bg'], border: ['rgba(164,55,0,0.07)'], shadow: ['--shadow-card', '--shadow-card-hover'], radius: ['--radius-md'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Card', properties: {} },
} as const;
