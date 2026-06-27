import { cn } from '../../lib/cn';
import type { ProtonicHeroProps } from './Hero.types';
import { heroVariants } from './Hero.styles';
import styles from './Hero.module.css';

/** Full-viewport section shell. Compound component — use Hero.Overline, .Heading, .Sub, .Actions sub-components. */
export function Hero({ inverted = false, className, children, ...props }: ProtonicHeroProps) {
  return (
    <section className={cn(heroVariants({ inverted }), className)} {...props}>
      {children}
    </section>
  );
}

Hero.Content  = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.content, className)} {...props}>{children}</div>
);
Hero.Overline = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(styles.overline, className)} {...props}>{children}</span>
);
Hero.Heading  = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn(styles.heading, className)} {...props}>{children}</h1>
);
Hero.Sub      = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(styles.sub, className)} {...props}>{children}</p>
);
Hero.Actions  = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.actions, className)} {...props}>{children}</div>
);
