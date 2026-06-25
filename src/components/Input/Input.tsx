import {
  TextField,
  Label,
  Input as AriaInput,
  FieldError,
  Text,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicInputProps } from './Input.types';
import { inputVariants } from './Input.styles';
import styles from './Input.module.css';

/** Single-line text field. Label, description, and error message are built-in — no wrapper needed. */
export function Input({
  size = 'medium',
  label,
  description,
  errorMessage,
  placeholder,
  className,
  ...props
}: ProtonicInputProps) {
  return (
    <TextField {...props} className={cn(styles.root, className)}>
      {label && <Label className={styles.label}>{label}</Label>}
      <AriaInput
        placeholder={placeholder}
        className={inputVariants({ size })}
      />
      {description && <Text slot="description" className={styles.description}>{description}</Text>}
      <FieldError className={styles.error}>{errorMessage}</FieldError>
    </TextField>
  );
}
