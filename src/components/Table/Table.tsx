import {
  Cell,
  Column,
  Row,
  Table as AriaTable,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import type { Key } from 'react-aria-components';
import type { ProtonicTableProps } from './Table.types';

// React Aria's Table gives us for free:
//   - Arrow key navigation between cells (←→↑↓)
//   - aria-sort on column headers when sorting is active
//   - role="grid", role="row", role="columnheader", role="gridcell" — all automatic
//   - Row selection with checkboxes (when selectionMode != "none")
//   - Screen reader announces selected rows and sort state

export function Table({
  columns,
  rows,
  selectionMode = 'none',
  onSelectionChange,
  onSortChange,
  'aria-label': ariaLabel,
}: ProtonicTableProps) {
  return (
    <AriaTable
      aria-label={ariaLabel}
      selectionMode={selectionMode}
      onSelectionChange={(keys) => {
        if (onSelectionChange && keys !== 'all') {
          onSelectionChange(keys as Set<Key>);
        }
      }}
      onSortChange={onSortChange}
    >
      <TableHeader columns={columns}>
        {(col) => (
          <Column id={col.id} allowsSorting={col.allowsSorting}>
            {col.label}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(row) => (
          <Row id={row.id}>
            {columns.map((col) => (
              <Cell key={col.id}>{String(row[col.id] ?? '')}</Cell>
            ))}
          </Row>
        )}
      </TableBody>
    </AriaTable>
  );
}
