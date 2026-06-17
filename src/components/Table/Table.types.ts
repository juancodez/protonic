import type { Key, SortDescriptor } from 'react-aria-components';

export interface TableColumn {
  id: string;
  label: string;
  allowsSorting?: boolean;
}

export interface TableRow {
  id: string;
  [key: string]: string | number;
}

export interface ProtonicTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  selectionMode?: 'none' | 'single' | 'multiple';
  onSelectionChange?: (keys: Set<Key>) => void;
  onSortChange?: (descriptor: SortDescriptor) => void;
  'aria-label': string;
}
