import { cn } from '../../lib/cn';
import { heroStyles } from './Hero.styles';
import type { ProtonicHeroProps } from './Hero.types';
import './Hero.css';

export function Hero({ inverted = false, className, children, ...props }: ProtonicHeroProps) {
  return (
    <section
      className={cn(heroStyles({ inverted }), className)}
      {...props}
    >
      {children}
    </section>
  );
}
