import { cva } from 'class-variance-authority';
import styles from './Input.module.css';

export const inputVariants = cva(styles.field, {
  variants: {
    size: {
      small:  styles.sm,
      medium: styles.md,
      large:  styles.lg,
    },
  },
  defaultVariants: { size: 'medium' },
});
