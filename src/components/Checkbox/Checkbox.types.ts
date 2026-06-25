import type { CheckboxProps } from 'react-aria-components';
import type { ReactNode } from 'react';

export interface ProtonicCheckboxProps extends Omit<CheckboxProps, 'children'> {
  label?:       string;
  description?: string;
  children?:    ReactNode;
}
