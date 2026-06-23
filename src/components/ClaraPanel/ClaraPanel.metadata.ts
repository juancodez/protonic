export const ClaraPanelMetadata = {
  id: 'clara-panel', name: 'ClaraPanel', version: '2.0.0', type: 'container', category: 'molecule',
  path: 'src/components/ClaraPanel', created: '2026-06-10', modified: '2026-06-24',
  description: 'Chat layout shell for Clara, the Klaro AI tax assistant. Compound component: Panel > Header > Messages > BubbleRow > Bubble + InputDock > InputRow > Textarea.',
  variants: {},
  useCases: [
    {
      label: 'Full chat UI',
      example: `
<ClaraPanel>
  <ClaraPanel.Header>
    <ClaraPanel.Identity>
      <ClaraPanel.Avatar>C</ClaraPanel.Avatar>
      <div>
        <ClaraPanel.Name>Clara</ClaraPanel.Name>
        <ClaraPanel.Tagline>Tu asesora fiscal</ClaraPanel.Tagline>
      </div>
    </ClaraPanel.Identity>
  </ClaraPanel.Header>
  <ClaraPanel.Messages>
    <ClaraPanel.BubbleRow><ClaraPanel.Bubble>Hola, soy Clara.</ClaraPanel.Bubble></ClaraPanel.BubbleRow>
    <ClaraPanel.BubbleRow user><ClaraPanel.Bubble user>¿Puedo deducir el home office?</ClaraPanel.Bubble></ClaraPanel.BubbleRow>
  </ClaraPanel.Messages>
  <ClaraPanel.InputDock>
    <ClaraPanel.InputRow>
      <ClaraPanel.Textarea placeholder="Escribe tu pregunta…" />
    </ClaraPanel.InputRow>
  </ClaraPanel.InputDock>
</ClaraPanel>`,
    },
  ],
  antiPatterns: [
    { bad: 'ClaraPanel.Bubble user={false} for system messages', good: 'ClaraPanel.Bubble (no user prop) for system, user={true} for user messages', reason: 'user prop flips alignment (row-reverse) and color (primary bg) — wrong value inverts the conversation.' },
  ],
  a11y: { inherited: [], owned: ['Not interactive itself. Textarea needs an aria-label if used without a visible label.', 'BubbleRow sets aria-hidden="true" is NOT present — bubbles are readable by AT.'] },
  aiHints: [
    'All slots are optional — compose only what you need.',
    'ClaraPanel.Messages has overflow-y: auto with thin scrollbar.',
    'Bubble user={true} = primary orange bg + right-aligned. Bubble default = white + left-aligned.',
  ],
  tokens: { background: ['--color-bg', '--color-bg-surface', '--color-surface', '--color-primary'], border: ['--color-primary-subtle'], radius: ['--radius-sm'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'ClaraPanel', properties: {} },
} as const;
