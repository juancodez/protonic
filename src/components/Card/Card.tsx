import { cn } from '../../lib/cn';
import { cardStyles } from './Card.styles';
import type { ProtonicCardProps } from './Card.types';
import './Card.css';

export function Card({ className, children, ...props }: ProtonicCardProps) {
  return (
    <div className={cn(cardStyles(), className)} {...props}>
      {children}
    </div>
  );
}
