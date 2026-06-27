import { cn } from '../../lib/cn';
import type { ProtonicBadgeProps } from './Badge.types';
import { badgeVariants } from './Badge.styles';

/** Status indicator pill. Use for info, success, warning, or error states. Display-only — no interaction. */
export function Badge({ status = 'info', className, children, ...props }: ProtonicBadgeProps) {
  return (
    <span className={cn(badgeVariants({ status }), className)} {...props}>
      {children}
    </span>
  );
}
