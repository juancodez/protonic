import {
  TextField,
  Label,
  TextArea as AriaTextArea,
  FieldError,
  Text,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ProtonicTextareaProps } from './Textarea.types';
import styles from './Textarea.module.css';

/** Multi-line text field. Same accessible label/description/error contract as Input. */
export function Textarea({
  label,
  description,
  errorMessage,
  placeholder,
  rows = 4,
  textAreaProps,
  className,
  ...props
}: ProtonicTextareaProps) {
  return (
    <TextField {...props} className={cn(styles.root, className)}>
      {label && <Label className={styles.label}>{label}</Label>}
      <AriaTextArea
        {...textAreaProps}
        rows={rows}
        placeholder={placeholder}
        className={styles.field}
      />
      {description && <Text slot="description" className={styles.description}>{description}</Text>}
      <FieldError className={styles.error}>{errorMessage}</FieldError>
    </TextField>
  );
}
