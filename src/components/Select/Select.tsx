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

// React Aria's Select is a compound component — each piece has a job:
//   Label      → accessible name, wired to the trigger via aria-labelledby automatically
//   Button     → the visible trigger (NOT our Protonic Button — this is React Aria's)
//   SelectValue → renders the current selection inside the trigger
//   Popover    → the floating dropdown, handles positioning + collision detection
//   ListBox    → the list container (role="listbox")
//   ListBoxItem → each option (role="option"), handles typeahead for free

export function Select<T extends SelectOption>({
  label,
  options,
  placeholder = 'Select an option',
  ...props
}: ProtonicSelectProps<T>) {
  return (
    <AriaSelect {...props}>
      <Label>{label}</Label>
      <Button>
        <SelectValue>{({ selectedText }) => selectedText || placeholder}</SelectValue>
        <span aria-hidden>▾</span>
      </Button>
      <Popover>
        <ListBox items={options}>
          {(option) => <ListBoxItem id={option.id}>{option.label}</ListBoxItem>}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
