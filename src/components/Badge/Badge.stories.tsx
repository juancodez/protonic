import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title:     'Protonic/Badge',
  component: Badge,
  tags:      ['autodocs'],
  argTypes: {
    status: {
      control:     'select',
      options:     ['info', 'success', 'warning', 'error'],
      description: 'Status axis — what is the system signaling? (axes registry: status)',
    },
  },
  args: {
    children: 'Estado',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Info: Story    = { args: { status: 'info',    children: 'Pendiente' } };
export const Success: Story = { args: { status: 'success', children: 'Pagada' } };
export const Warning: Story = { args: { status: 'warning', children: 'Por vencer' } };
export const Error: Story   = { args: { status: 'error',   children: 'Vencida' } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Badge status="info">Pendiente</Badge>
      <Badge status="success">Pagada</Badge>
      <Badge status="warning">Por vencer</Badge>
      <Badge status="error">Vencida</Badge>
    </div>
  ),
};

// Realistic use: badge inline with a label — the primary Klaro pattern
export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {(
        [
          { label: 'Factura #001 — Freelance GmbH', status: 'success', text: 'Pagada' },
          { label: 'Factura #002 — Studio Berlin',  status: 'warning', text: 'Por vencer' },
          { label: 'Factura #003 — Klient AG',      status: 'error',   text: 'Vencida' },
        ] as const
      ).map(({ label, status, text }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '0.875rem', flex: 1 }}>{label}</span>
          <Badge status={status}>{text}</Badge>
        </div>
      ))}
    </div>
  ),
};
