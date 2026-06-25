import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title:     'Protonic/Input',
  component: Input,
  tags:      ['autodocs'],
  argTypes: {
    size: {
      control:     'select',
      options:     ['small', 'medium', 'large'],
      description: 'Scale axis (axes registry: size)',
    },
    isDisabled: { control: 'boolean' },
    isInvalid:  { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
  args: { label: 'Label', placeholder: 'Placeholder…' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Helper text beneath the field.' } };
export const Error: Story    = { args: { isInvalid: true, errorMessage: 'This field is required.' } };
export const Disabled: Story = { args: { isDisabled: true, value: 'Disabled value' } };
export const Small: Story    = { args: { size: 'small' } };
export const Large: Story    = { args: { size: 'large' } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <Input label="Default"   placeholder="Placeholder…" />
      <Input label="With help" placeholder="Placeholder…" description="Helpful context beneath." />
      <Input label="Error"     placeholder="Placeholder…" isInvalid errorMessage="Required field." />
      <Input label="Disabled"  value="Locked value" isDisabled />
    </div>
  ),
};
