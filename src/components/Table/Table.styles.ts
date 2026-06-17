// ponytail: Table has no CVA variants yet — stateful styles via data-*/aria-* attributes in CSS
// This file exists per the component contract; extend with cva() when Table gains a size or density axis.
export const tableStyles = {
  table:    'protonic-table',
  header:   'protonic-table__header',
  column:   'protonic-table__column',
  body:     'protonic-table__body',
  row:      'protonic-table__row',
  cell:     'protonic-table__cell',
} as const;
