import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title:     'Protonic/Checkbox',
  component: Checkbox,
  tags:      ['autodocs'],
  argTypes: {
    isDisabled:     { control: 'boolean' },
    isSelected:     { control: 'boolean' },
    isIndeterminate:{ control: 'boolean' },
    isRequired:     { control: 'boolean' },
  },
  args: { label: 'Acepto los términos y condiciones' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default:       Story = {};
export const Checked:       Story = { args: { isSelected: true } };
export const Indeterminate: Story = { args: { isIndeterminate: true } };
export const Disabled:      Story = { args: { isDisabled: true } };
export const WithDesc:      Story = { args: { description: 'Se aplicarán cargos adicionales.' } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" isSelected />
      <Checkbox label="Indeterminate" isIndeterminate />
      <Checkbox label="Disabled" isDisabled />
      <Checkbox label="With description" description="Texto de ayuda adicional." />
    </div>
  ),
};
