import type { Meta, StoryObj } from '@storybook/react-vite';
import { DraggableTicker } from './DraggableTicker';

const KLARO_ITEMS = [
  'Freiberufler in Deutschland',
  'Steuererklärung',
  'UStVA monatlich',
  'Kleinunternehmer',
  'EÜR Gewinn & Verlust',
  'Homeoffice-Pauschale',
  'ELSTER Portal',
  'Umsatzsteuer 19%',
  'Betriebsausgaben',
  'Steuerberater',
];

const meta: Meta<typeof DraggableTicker> = {
  title:     'Protonic/DraggableTicker',
  component: DraggableTicker,
  tags:      ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Infinite draggable marquee. Decorative — aria-hidden. ' +
          'Drag to scrub; releases with momentum. Items alternate pill and square shapes.',
      },
    },
  },
  args: {
    items: KLARO_ITEMS,
    height: 60,
    gap: 16,
  },
};

export default meta;
type Story = StoryObj<typeof DraggableTicker>;

export const Default: Story = {};

export const Taller: Story = {
  args: { height: 80 },
};

// In context — how it sits between Hero and content sections in Klaro
export const InContext: Story = {
  render: () => (
    <div style={{ background: 'var(--color-bg)', padding: 'var(--space-8) 0' }}>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
        Todo lo que manejas como Freiberufler en Alemania
      </p>
      <DraggableTicker items={KLARO_ITEMS} height={64} />
    </div>
  ),
};
