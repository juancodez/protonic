import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicCheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.css';

/** Toggle between checked and unchecked. Indeterminate state supported via isIndeterminate prop. */
export function Checkbox({ label, description, children, className, ...props }: ProtonicCheckboxProps) {
  return (
    <AriaCheckbox {...props} className={cn(styles.root, className)}>
      <div className={styles.checkbox}>
        {/* CSS shows check or minus based on data-selected / data-indeterminate on root */}
        <svg className={styles.checkmark} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <polyline className={styles.checkIcon} points="2,6 5,9 10,3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line className={styles.minusIcon} x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {(label || description || children) && (
        <span className={styles.text}>
          {(label || children) && <span className={styles.label}>{label ?? children}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </AriaCheckbox>
  );
}
