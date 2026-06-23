export const TableMetadata = {
  id: 'table', name: 'Table', version: '2.0.0', type: 'interactive', category: 'molecule',
  path: 'src/components/Table', created: '2026-06-01', modified: '2026-06-24',
  description: 'Accessible data table with sorting, row selection, and full grid keyboard navigation. Behavior owned by React Aria.',
  variants: { selectionMode: ['none', 'single', 'multiple'] },
  useCases: [
    { label: 'Read-only data', example: '<Table aria-label="Gastos" columns={cols} rows={rows} />' },
    { label: 'Sortable + selectable', example: '<Table aria-label="Facturas" columns={cols} rows={rows} selectionMode="multiple" onSortChange={handleSort} onSelectionChange={handleSelect} />' },
  ],
  antiPatterns: [
    { bad: '<table> native HTML for complex data', good: '<Table> Protonic component', reason: 'Native table lacks keyboard grid navigation, sort announcements, and row selection ARIA.' },
    { bad: 'Missing aria-label', good: 'Always pass aria-label', reason: 'Required for screen readers to announce the table context.' },
  ],
  a11y: {
    inherited: [
      'Grid keyboard navigation (arrows between cells)',
      'aria-sort on sortable columns',
      'aria-selected on selected rows',
      'Tab to enter/exit the grid',
      'Shift+click for range selection',
    ],
    owned: [],
  },
  aiHints: [
    'columns[0].id is used as rowHeader — the first column is always the accessible row name.',
    'allowsSorting on column triggers onSortChange — you must sort the rows array externally.',
    'selectionMode="none" (default) = no checkboxes, no row highlights.',
  ],
  tokens: { background: ['--color-bg-surface', '--color-primary-subtle', '--color-primary-subtle-select'], border: ['--color-bg-surface', '--color-primary'], radius: ['--radius-sm'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Table', properties: { SelectionMode: ['None', 'Single', 'Multiple'] } },
} as const;
