import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title:     'Protonic/Chip',
  component: Chip,
  tags:      ['autodocs'],
  argTypes: {
    status: {
      control:     'select',
      options:     ['info', 'success', 'warning', 'error'],
      description: 'Status axis — system feedback signal (axes registry: status)',
    },
    dismissible: {
      control:     'boolean',
      description: 'Show dismiss × button',
    },
  },
  args: {
    children: 'Chip label',
    status:   'info',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Info: Story    = { args: { status: 'info' } };
export const Success: Story = { args: { status: 'success', children: 'Guardado' } };
export const Warning: Story = { args: { status: 'warning', children: 'Pendiente' } };
export const Error: Story   = { args: { status: 'error',   children: 'Error' } };

export const Dismissible: Story = {
  args: { status: 'info', dismissible: true, children: 'Filtro: 2024' },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip status="info">Info</Chip>
      <Chip status="success">Guardado</Chip>
      <Chip status="warning">Pendiente</Chip>
      <Chip status="error">Error</Chip>
    </div>
  ),
};

export const DismissibleRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip status="info" dismissible>Impuesto 2024</Chip>
      <Chip status="success" dismissible>Verificado</Chip>
      <Chip status="warning" dismissible>Revisión pendiente</Chip>
    </div>
  ),
};
