import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title:     'Protonic/Button',
  component: Button,
  tags:      ['autodocs'],
  argTypes: {
    variant: {
      control:     'select',
      options:     ['primary', 'secondary', 'destructive'],
      description: 'Identity axis — what kind of action is this? (axes registry: variant)',
    },
    size: {
      control:     'select',
      options:     ['small', 'medium', 'large'],
      description: 'Scale axis — one ordered scale (axes registry: size)',
    },
    isDisabled: {
      control:     'boolean',
      description: 'Inherited from React Aria — passes aria-disabled, removes from tab order',
    },
    isLoading: {
      control:     'boolean',
      description: 'Owned prop — shows loading indicator, disables interaction',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'small' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'large' },
};

export const Disabled: Story = {
  args: { variant: 'primary', isDisabled: true },
};

export const Loading: Story = {
  args: { variant: 'primary', isLoading: true },
};

// All variants side by side — the visual contract at a glance
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" isDisabled>Disabled</Button>
      <Button variant="primary" isLoading>Loading</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
    </div>
  ),
};
