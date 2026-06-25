export const ToastMetadata = {
  id: 'toast', name: 'Toast', version: '1.0.0', type: 'display', category: 'atom',
  path: 'src/components/Toast', created: '2026-06-26', modified: '2026-06-26',
  description: 'Transient system feedback. Display-only — no React Aria primitive. Caller controls mount/unmount. Use role=status + aria-live for AT announcement.',
  variants: { status: ['success', 'warning', 'error', 'info'] },
  useCases: [
    { label: 'Action feedback', when: 'Confirm or report the outcome of a user action',          example: '<Toast status="success" title="Guardado" />' },
    { label: 'System alert',    when: 'Deadline approaching, background job completed, API error', example: '<Toast status="warning" title="Fecha límite mañana" message="Presenta tu IVA." />' },
  ],
  antiPatterns: [
    { bad: 'Persistent Toast for blocking errors', good: 'Inline FieldError inside the form', reason: 'Toast is transient. Validation errors that block submission belong next to the failing field.' },
    { bad: 'Toast without aria-live',              good: 'Toast component handles it',         reason: 'role=status + aria-live is set automatically — do not add it again or it doubles the AT announcement.' },
  ],
  a11y: { inherited: [], owned: ['role=status + aria-live="polite" (or assertive for error)', 'aria-atomic="true"', 'Dismiss button has accessible label'] },
  aiHints: ['Caller owns mount/unmount — setTimeout + state is the simplest pattern.', 'error status uses aria-live="assertive" (interrupts AT). All others use "polite".', 'onDismiss is optional — skip it for auto-dismissing toasts.'],
  tokens: { background: ['--color-primary-subtle', '--color-success-subtle', '--color-warning-subtle', '--color-danger-subtle'], border: ['--color-primary-border', '--color-danger-subtle-border'], color: ['--color-primary', '--color-success', '--color-warning-text', '--color-danger', '--color-text', '--color-text-body', '--color-text-muted'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Toast' },
} as const;
