import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title:     'Protonic/Select',
  component: Select,
  tags:      ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Select wraps React Aria's compound: Select → Button → Popover → ListBox → ListBoxItem.

**A11y inherited from React Aria (free):**
- \`aria-expanded\` toggles on open/close
- \`role="listbox"\` and \`role="option"\` set automatically
- Typeahead: type a letter to jump to matching option
- Arrow keys navigate options
- Escape closes without selecting
- Selected option announced to screen readers
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const countries = [
  { id: 'de', label: 'Germany' },
  { id: 'es', label: 'Spain' },
  { id: 'mx', label: 'Mexico' },
  { id: 'ar', label: 'Argentina' },
  { id: 'co', label: 'Colombia' },
];

const taxCategories = [
  { id: 'freelancer',   label: 'Freiberufler' },
  { id: 'trade',        label: 'Gewerbetreibender' },
  { id: 'employee',     label: 'Angestellter' },
  { id: 'smallbiz',     label: 'Kleinunternehmer' },
];

export const Default: Story = {
  args: {
    label:       'Country',
    options:     countries,
    placeholder: 'Choose a country',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label:            'Country',
    options:          countries,
    defaultSelectedKey: 'de',
  },
};

export const TaxCategories: Story = {
  args: {
    label:       'Tax category',
    options:     taxCategories,
    placeholder: 'Select category',
  },
};

export const Disabled: Story = {
  args: {
    label:      'Country',
    options:    countries,
    isDisabled: true,
  },
};
