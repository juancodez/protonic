// ponytail: Select has no CVA variants yet — stateful styles via data-* attributes in CSS
// This file exists per the component contract; extend with cva() when Select gains a size or variant axis.
export const selectStyles = {
  root:     'protonic-select',
  label:    'protonic-select__label',
  trigger:  'protonic-select__trigger',
  value:    'protonic-select__value',
  arrow:    'protonic-select__arrow',
  popover:  'protonic-select__popover',
  listbox:  'protonic-select__listbox',
  option:   'protonic-select__option',
} as const;
