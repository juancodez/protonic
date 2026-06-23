import { cva } from 'class-variance-authority';
import styles from './Badge.module.css';

// Intent layer — maps axes values to CSS module classes.
// axes.ts → (this file) → Badge.module.css → variables.css
export const badgeVariants = cva(styles.badge, {
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
