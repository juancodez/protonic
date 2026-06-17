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
import './Select.css';

export function Select<T extends SelectOption>({
  label,
  options,
  placeholder = 'Select an option',
  ...props
}: ProtonicSelectProps<T>) {
  return (
    <AriaSelect className="protonic-select" {...props}>
      <Label className="protonic-select__label">{label}</Label>
      <Button className="protonic-select__trigger">
        <SelectValue>
          {({ selectedText }) => selectedText || <span style={{ color: 'var(--color-text-muted)' }}>{placeholder}</span>}
        </SelectValue>
        <span aria-hidden className="protonic-select__arrow">▾</span>
      </Button>
      <Popover className="protonic-select__popover">
        <ListBox className="protonic-select__listbox" items={options}>
          {(option) => (
            <ListBoxItem className="protonic-select__option" id={option.id}>
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
