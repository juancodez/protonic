import {
  Select as AriaSelect,
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
} from 'react-aria-components';
import type { ProtonicSelectProps, SelectOption } from './Select.types';
import styles from './Select.module.css';

/** Accessible dropdown select. Keyboard navigation, typeahead, and ARIA managed by React Aria. */
export function Select<T extends SelectOption>({
  label,
  options,
  placeholder = 'Select an option',
  ...props
}: ProtonicSelectProps<T>) {
  return (
    <AriaSelect className={styles.select} {...props}>
      <Label className={styles.label}>{label}</Label>
      <Button className={styles.trigger}>
        <SelectValue>
          {({ selectedText }) =>
            selectedText || <span style={{ color: 'var(--color-text-muted)' }}>{placeholder}</span>
          }
        </SelectValue>
        <span aria-hidden className={styles.arrow}>▾</span>
      </Button>
      <Popover className={styles.popover}>
        <ListBox className={styles.listbox} items={options}>
          {(option) => (
            <ListBoxItem className={styles.option} id={option.id}>
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
