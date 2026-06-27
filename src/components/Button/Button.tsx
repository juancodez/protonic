import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicButtonProps } from './Button.types';
import { buttonVariants } from './Button.styles';

/** Interactive control for user-initiated actions. Keyboard, touch, and pointer normalized by React Aria. */
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
      isDisabled={props.isDisabled || isLoading}
      className={cn(buttonVariants({ variant, size }), className)}
      data-loading={isLoading || undefined}
    >
      {isLoading ? '…' : children}
    </AriaButton>
  );
}
