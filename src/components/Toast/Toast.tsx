import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicToastProps } from './Toast.types';
import { toastVariants } from './Toast.styles';
import styles from './Toast.module.css';

const ICONS: Record<string, string> = {
  info: 'ℹ', success: '✓', warning: '⚠', error: '✕',
};

/** Transient feedback for system events. Display-only — caller controls mounting/unmounting. */
export function Toast({ status, title, message, onDismiss, className, ...props }: ProtonicToastProps) {
  return (
    <div
      {...props}
      role="status"
      aria-live={status === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn(toastVariants({ status }), className)}
    >
      <span className={styles.icon} aria-hidden="true">{ICONS[status]}</span>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        {message && <span className={styles.message}>{message}</span>}
      </div>
      {onDismiss && (
        <AriaButton className={styles.dismiss} onPress={() => onDismiss()} aria-label="Cerrar notificación">✕</AriaButton>
      )}
    </div>
  );
}
