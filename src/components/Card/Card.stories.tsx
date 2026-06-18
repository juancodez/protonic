import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title:     'Protonic/Card',
  component: Card,
  tags:      ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Surface container. One visual identity — no variants. Consumer manages internal layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>Total ingresos</p>
      <p style={{ margin: '4px 0 0', fontSize: '1.5rem', fontWeight: 700 }}>€ 2.400,00</p>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>Factura #001</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Cliente: Freelance GmbH — vence 30 jun 2026
        </p>
      </div>
      <Button variant="secondary" size="small">Ver detalle</Button>
    </Card>
  ),
};

export const AsGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {(['Ingresos', 'Gastos', 'IVA pendiente'] as const).map((label) => (
        <Card key={label}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</p>
          <p style={{ margin: '4px 0 0', fontWeight: 700, fontSize: '1.25rem' }}>€ 0,00</p>
        </Card>
      ))}
    </div>
  ),
};
