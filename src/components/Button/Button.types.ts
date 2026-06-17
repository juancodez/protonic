import type { ButtonProps } from 'react-aria-components';
import type { Variant, Size } from '../../tokens/axes';

export interface ProtonicButtonProps extends ButtonProps {
  variant?: Variant;   // axes registry: 'primary' | 'secondary' | 'destructive'
  size?:    Size;      // axes registry: 'small' | 'medium' | 'large'
  isLoading?: boolean;
}
