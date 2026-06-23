export const ModalMetadata = {
  id: 'modal', name: 'Modal', version: '2.0.0', type: 'interactive', category: 'molecule',
  path: 'src/components/Modal', created: '2026-06-01', modified: '2026-06-24',
  description: 'Accessible dialog with focus trap, escape-to-close, and overlay click-to-close. Behavior owned by React Aria.',
  variants: { role: ['dialog', 'alertdialog'] },
  useCases: [
    { label: 'Standard dialog', example: '<ModalTrigger><Button variant="primary">Abrir</Button><Modal title="Confirmar">Contenido</Modal></ModalTrigger>' },
    { label: 'Destructive confirm', example: '<Modal role="alertdialog" title="Eliminar cuenta">Esta acción no se puede deshacer.</Modal>' },
  ],
  antiPatterns: [
    { bad: 'role="alertdialog" for informational modals', good: 'role="alertdialog" for destructive/urgent only', reason: 'alertdialog announces immediately — interrupts AT flow unexpectedly for non-urgent content.' },
    { bad: 'Modal without title prop', good: 'Always provide title', reason: 'title provides aria-labelledby — required for dialog to be announced correctly by screen readers.' },
  ],
  a11y: {
    inherited: [
      'Focus trap via React Aria useModalOverlay',
      'Focus returns to trigger on close',
      'Escape key closes',
      'Overlay click closes',
      'aria-modal via inert on background elements (React Aria handles TalkBack/NVDA gap)',
      'alertdialog variant announces title immediately without waiting for focus',
    ],
    owned: [],
  },
  aiHints: [
    'ModalTrigger = DialogTrigger from react-aria-components. Always wrap Button + Modal together.',
    'Modal title is required — it becomes the accessible name of the dialog.',
    'Close button is built-in (secondary/small). Add extra footer actions by extending Modal.tsx if needed.',
  ],
  tokens: { background: ['--color-bg', '--color-overlay'], border: ['--color-bg-surface'], shadow: ['--shadow-xl'], radius: ['--radius-sm'], motion: ['--motion-duration-normal', '--motion-easing-spring'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Modal', properties: { Role: ['Dialog', 'Alertdialog'] } },
} as const;
