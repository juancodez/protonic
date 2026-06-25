import { cva } from 'class-variance-authority';
import styles from './Toast.module.css';

export const toastVariants = cva(styles.toast, {
  variants: {
    status: {
      success: styles.success,
      warning: styles.warning,
      error:   styles.error,
      info:    styles.info,
    },
  },
  defaultVariants: { status: 'info' },
});
