import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
  Label,
  Text,
  FieldError,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicRadioGroupProps, ProtonicRadioProps } from './Radio.types';
import styles from './Radio.module.css';

/** Mutually exclusive option group. Exactly one option is selected at a time. */
export function RadioGroup({ label, description, errorMessage, children, className, ...props }: ProtonicRadioGroupProps) {
  return (
    <AriaRadioGroup {...props} className={cn(styles.group, className)}>
      {label       ? <Label className={styles.groupLabel}>{label}</Label> : null}
      {description ? <Text slot="description" className={styles.groupDescription}>{description}</Text> : null}
      {children}
      <FieldError className={styles.groupError}>{errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}

/** Single option within a RadioGroup. */
export function Radio({ description, children, className, ...props }: ProtonicRadioProps) {
  return (
    <AriaRadio {...props} className={cn(styles.radio, className)}>
      <div className={styles.dot}><div className={styles.inner} /></div>
      <span className={styles.text}>
        <span className={styles.label}>{children}</span>
        {description ? <span className={styles.description}>{description}</span> : null}
      </span>
    </AriaRadio>
  );
}
