import type { RadioGroupProps, RadioProps } from 'react-aria-components';
import type { ReactNode } from 'react';

export interface ProtonicRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  label?:        string;
  description?:  string;
  errorMessage?: string;
  children?:     ReactNode;
}

export interface ProtonicRadioProps extends Omit<RadioProps, 'children'> {
  description?: string;
  children?:    ReactNode;
}
