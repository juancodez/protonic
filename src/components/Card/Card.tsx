import { cn } from '../../lib/cn';
import type { ProtonicCardProps } from './Card.types';
import styles from './Card.module.css';

export function Card({ className, children, ...props }: ProtonicCardProps) {
  return (
    <div className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  );
}
