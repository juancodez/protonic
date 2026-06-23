import { cva } from 'class-variance-authority';
import styles from './Chip.module.css';

// Intent layer — maps axes values to CSS module classes.
// axes.ts → (this file) → Chip.module.css → variables.css
export const chipVariants = cva(styles.chip, {
  variants: {
    status: {
      info:    styles.info,
      success: styles.success,
      warning: styles.warning,
      error:   styles.error,
    },
  },
  defaultVariants: { status: 'info' },
});
