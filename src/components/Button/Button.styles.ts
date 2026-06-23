import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

// Intent layer — maps axes values to CSS module classes.
// axes.ts → (this file) → Button.module.css → variables.css
export const buttonVariants = cva(styles.btn, {
  variants: {
    variant: {
      primary:     styles.primary,
      secondary:   styles.secondary,
      destructive: styles.destructive,
    },
    size: {
      small:  styles.sm,
      medium: styles.md,
      large:  styles.lg,
    },
  },
  defaultVariants: { variant: 'primary', size: 'medium' },
});
