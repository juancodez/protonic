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
import styles from './Table.module.css';

/** Data table with optional row selection and column sorting. Keyboard navigation managed by React Aria. */
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
      className={styles.table}
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
          <Column
            id={col.id}
            className={styles.column}
            allowsSorting={col.allowsSorting}
            isRowHeader={col.id === columns[0].id}
          >
            {col.label}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(row) => (
          <Row id={row.id} className={styles.row}>
            {columns.map((col) => (
              <Cell key={col.id} className={styles.cell}>
                {String(row[col.id] ?? '')}
              </Cell>
            ))}
          </Row>
        )}
      </TableBody>
    </AriaTable>
  );
}
