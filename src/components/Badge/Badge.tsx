import { cn } from '../../lib/cn';
import type { ProtonicBadgeProps } from './Badge.types';
import { badgeVariants } from './Badge.styles';

export function Badge({ status = 'info', className, children, ...props }: ProtonicBadgeProps) {
  return (
    <span className={cn(badgeVariants({ status }), className)} {...props}>
      {children}
    </span>
  );
}
