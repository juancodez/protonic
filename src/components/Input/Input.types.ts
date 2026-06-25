import type { TextFieldProps } from 'react-aria-components';
import type { Size } from '../../tokens/axes';

export interface ProtonicInputProps extends TextFieldProps {
  size?:        Size;     // axes registry: 'small' | 'medium' | 'large'
  label?:       string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
}
