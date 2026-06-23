export const DraggableTickerMetadata = {
  id: 'draggable-ticker', name: 'DraggableTicker', version: '2.0.0', type: 'display', category: 'molecule',
  path: 'src/components/DraggableTicker', created: '2026-06-10', modified: '2026-06-24',
  description: 'Infinite drag marquee. Items scroll continuously; user can grab to drag and release with momentum. Fully aria-hidden — decorative only.',
  variants: {},
  useCases: [
    { label: 'Logo/feature strip', example: '<DraggableTicker items={["Impuestos claros", "Declaración en español", "Clara AI", "ELSTER integrado"]} height={60} />' },
    { label: 'Social proof strip', example: '<DraggableTicker items={["⭐⭐⭐⭐⭐ 4.9", "1.200 usuarios", "Berlín · Múnich · Hamburgo"]} height={48} gap={24} />' },
  ],
  antiPatterns: [
    { bad: 'Putting interactive content inside items', good: 'Items are text/decorative only', reason: 'The entire component is aria-hidden="true" — interactive children are invisible to AT.' },
    { bad: 'height below 36px', good: 'height={48} minimum for touch targets inside', reason: 'Items use padding but the outer clip needs room — below 36px content is cropped.' },
  ],
  a11y: { inherited: [], owned: ['aria-hidden="true" on root and both row copies — decorative. No keyboard interaction.'] },
  aiHints: [
    'items is string[] — odd-indexed items get square corners (.itemSquare) for visual rhythm.',
    'gap prop is passed as inline style gap on the row (not a CSS var) — the pixel value is used directly in the RAF animation offset.',
    'Drag momentum: pointer-up velocity is captured and decays toward SPEED=0.5px/frame.',
  ],
  tokens: { background: ['--color-bg', '--color-bg-surface'], border: ['--color-primary-subtle'], radius: ['--radius-pill', '--radius-sm'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'DraggableTicker', properties: {} },
} as const;
