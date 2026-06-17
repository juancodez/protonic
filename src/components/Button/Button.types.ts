import type { ButtonProps } from 'react-aria-components';

export interface ProtonicButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}
