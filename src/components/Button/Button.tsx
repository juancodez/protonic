import { Button as AriaButton } from 'react-aria-components';
import type { ProtonicButtonProps } from './Button.types';

export function Button({
  variant = 'primary',
  size = 'medium',
  isLoading,
  children,
  ...props
}: ProtonicButtonProps) {
  return (
    <AriaButton
      {...props}
      data-variant={variant}
      data-size={size}
      data-loading={isLoading || undefined}
    >
      {children}
    </AriaButton>
  );
}
