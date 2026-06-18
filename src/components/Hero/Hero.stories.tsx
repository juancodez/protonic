import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Hero> = {
  title:     'Protonic/Hero',
  component: Hero,
  tags:      ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-viewport layout shell. Provides typographic slots and spatial rhythm. ' +
          'Application supplies content (video, images, animations) via children.',
      },
    },
  },
  argTypes: {
    inverted: {
      control:     'boolean',
      description: 'Dark background — for video-overlay or dark-section contexts (e.g. Klaro landing)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

// Light — default Protonic aesthetic
export const Default: Story = {
  render: () => (
    <Hero>
      <div className="protonic-hero__content">
        <span className="protonic-hero__overline">Fiscal assistant · Alemania</span>
        <h1 className="protonic-hero__heading">
          Al fin, los impuestos <em style={{ fontStyle: 'italic', fontWeight: 300 }}>claros</em>
        </h1>
        <p className="protonic-hero__sub">
          Klaro ayuda a freelancers hispanohablantes en Alemania a entender y gestionar sus impuestos,
          con Clara, tu asesora fiscal en español.
        </p>
        <div className="protonic-hero__actions">
          <Button variant="primary" size="large">Empezar gratis</Button>
          <Button variant="secondary" size="large">Ver cómo funciona</Button>
        </div>
      </div>
    </Hero>
  ),
};

// Dark — simulates Klaro landing video-hero context
export const Inverted: Story = {
  render: () => (
    <Hero inverted>
      <div className="protonic-hero__content">
        <span className="protonic-hero__overline">Fiscal assistant · Alemania</span>
        <h1 className="protonic-hero__heading">
          Al fin, los impuestos <em style={{ fontStyle: 'italic', fontWeight: 300 }}>claros</em>
        </h1>
        <p className="protonic-hero__sub">
          Klaro ayuda a freelancers hispanohablantes en Alemania a entender y gestionar sus impuestos,
          con Clara, tu asesora fiscal en español.
        </p>
        <div className="protonic-hero__actions">
          <Button variant="primary" size="large">Empezar gratis</Button>
          <Button variant="secondary" size="large">Ver cómo funciona</Button>
        </div>
      </div>
    </Hero>
  ),
};

// With Badge — overline as a Badge instead of the hero__overline slot
export const WithBadge: Story = {
  render: () => (
    <Hero>
      <div className="protonic-hero__content">
        <Badge status="info">Beta · Alemania</Badge>
        <h1 className="protonic-hero__heading">
          Al fin, los impuestos <em style={{ fontStyle: 'italic', fontWeight: 300 }}>claros</em>
        </h1>
        <p className="protonic-hero__sub">
          Clara te guía paso a paso en tu declaración de impuestos, en tu idioma.
        </p>
        <div className="protonic-hero__actions">
          <Button variant="primary" size="large">Empezar gratis</Button>
        </div>
      </div>
    </Hero>
  ),
};
