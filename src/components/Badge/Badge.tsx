import { cn } from '../../lib/cn';
import { badgeStyles } from './Badge.styles';
import type { ProtonicBadgeProps } from './Badge.types';
import './Badge.css';

export function Badge({ status = 'info', className, children, ...props }: ProtonicBadgeProps) {
  return (
    <span className={cn(badgeStyles({ status }), className)} {...props}>
      {children}
    </span>
  );
}
