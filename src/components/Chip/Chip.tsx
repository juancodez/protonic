import { Button } from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicChipProps } from './Chip.types';
import { chipVariants } from './Chip.styles';
import styles from './Chip.module.css';

export function Chip({
  status      = 'info',
  dismissible = false,
  onDismiss,
  className,
  children,
  ...props
}: ProtonicChipProps) {
  return (
    <span className={cn(chipVariants({ status }), className)} {...props}>
      {children}
      {dismissible && (
        <Button
          className={styles.dismiss}
          onPress={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </Button>
      )}
    </span>
  );
}
