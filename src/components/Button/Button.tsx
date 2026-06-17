import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { buttonStyles } from './Button.styles';
import type { ProtonicButtonProps } from './Button.types';
import './Button.css';

export function Button({
  variant = 'primary',
  size    = 'medium',
  isLoading,
  className,
  children,
  ...props
}: ProtonicButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cn(buttonStyles({ variant, size }), className)}
      data-loading={isLoading || undefined}
    >
      {isLoading ? '…' : children}
    </AriaButton>
  );
}
