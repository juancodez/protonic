import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClaraPanel } from './ClaraPanel';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof ClaraPanel> = {
  title:     'Protonic/ClaraPanel',
  component: ClaraPanel,
  tags:      ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'AI chat layout shell. Provides header, messages area, bubble slots, and input dock. ' +
          'Application supplies messages, streaming logic, and send handler.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClaraPanel>;

// Chat icon SVG — used in stories only (application supplies its own)
const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <ClaraPanel style={{ width: 420, height: 520 }}>
      {/* Header */}
      <div className="protonic-clara__header">
        <div className="protonic-clara__identity">
          <div className="protonic-clara__avatar"><ChatIcon /></div>
          <div>
            <p className="protonic-clara__name">Clara</p>
            <p className="protonic-clara__tagline">Asesora fiscal · Klaro</p>
          </div>
        </div>
        <Badge status="success">En línea</Badge>
      </div>

      {/* Messages */}
      <div className="protonic-clara__messages">
        <div className="protonic-clara__bubble-row">
          <div className="protonic-clara__avatar" style={{ flexShrink: 0 }}><ChatIcon /></div>
          <div className="protonic-clara__bubble">
            <strong>¡Hola! 👋</strong>
            <br />
            Soy Clara, tu asesora fiscal para Alemania. ¿Por dónde empezamos?
          </div>
        </div>

        <div className="protonic-clara__bubble-row protonic-clara__bubble-row--user">
          <div className="protonic-clara__bubble protonic-clara__bubble--user">
            ¿Cuándo vence mi UStVA del primer trimestre?
          </div>
        </div>

        <div className="protonic-clara__bubble-row">
          <div className="protonic-clara__avatar" style={{ flexShrink: 0 }}><ChatIcon /></div>
          <div className="protonic-clara__bubble">
            La UStVA del T1 vence el <strong>10 de mayo</strong>. Si tienes la prórroga permanente (Dauerfristverlängerung), el plazo se extiende un mes más.
          </div>
        </div>
      </div>

      {/* Input dock */}
      <div className="protonic-clara__input-dock">
        <div className="protonic-clara__input-row">
          <textarea
            className="protonic-clara__textarea"
            placeholder="Escribe tu pregunta fiscal…"
            rows={1}
          />
          <Button variant="primary" size="small" aria-label="Enviar">
            <SendIcon />
          </Button>
        </div>
        <p className="protonic-clara__disclaimer">
          Orientación informativa · no asesoría oficial · Klaro 2026
        </p>
      </div>
    </ClaraPanel>
  ),
};

export const Empty: Story = {
  render: () => (
    <ClaraPanel style={{ width: 420, height: 520 }}>
      <div className="protonic-clara__header">
        <div className="protonic-clara__identity">
          <div className="protonic-clara__avatar"><ChatIcon /></div>
          <div>
            <p className="protonic-clara__name">Clara</p>
            <p className="protonic-clara__tagline">Asesora fiscal · Klaro</p>
          </div>
        </div>
      </div>
      <div className="protonic-clara__messages" />
      <div className="protonic-clara__input-dock">
        <div className="protonic-clara__input-row">
          <textarea className="protonic-clara__textarea" placeholder="Escribe tu pregunta fiscal…" rows={1} />
          <Button variant="primary" size="small" aria-label="Enviar"><SendIcon /></Button>
        </div>
        <p className="protonic-clara__disclaimer">Orientación informativa · no asesoría oficial · Klaro 2026</p>
      </div>
    </ClaraPanel>
  ),
};
