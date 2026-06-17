import type { SelectProps } from 'react-aria-components';

export interface SelectOption {
  id: string;
  label: string;
}

export interface ProtonicSelectProps<T extends SelectOption>
  extends Omit<SelectProps<T>, 'children'> {
  label: string;
  options: T[];
  placeholder?: string;
}
