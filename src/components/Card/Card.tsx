import { cn } from '../../lib/cn';
import type { ProtonicCardProps } from './Card.types';
import styles from './Card.module.css';

/** Surface container. Lifts content off page background using border + shadow. Not interactive — wrap with a button if clickable. */
export function Card({ className, children, ...props }: ProtonicCardProps) {
  return (
    <div className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  );
}
