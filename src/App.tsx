import { Button } from './components/Button';
import { Modal, ModalTrigger } from './components/Modal';
import { Select } from './components/Select';

const countries = [
  { id: 'de', label: 'Germany' },
  { id: 'es', label: 'Spain' },
  { id: 'mx', label: 'Mexico' },
  { id: 'ar', label: 'Argentina' },
  { id: 'co', label: 'Colombia' },
];

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--space-4)',
};

export default function App() {
  return (
    <main style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Protonic — Dev Sandbox</h1>

      {/* Button */}
      <section style={sectionStyle}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Button</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" isDisabled>Disabled</Button>
        </div>
      </section>

      {/* Modal */}
      <section style={sectionStyle}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Modal</h2>
        <div>
          <ModalTrigger>
            <Button variant="primary">Open modal</Button>
            <Modal title="Hello from Protonic">
              <p>Focus is trapped inside. Try pressing Tab — you cannot leave.</p>
              <p>Press Escape or Close to dismiss. Focus returns to the button.</p>
            </Modal>
          </ModalTrigger>
        </div>
      </section>

      {/* Select */}
      <section style={sectionStyle}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Select</h2>
        <Select
          label="Country"
          options={countries}
          placeholder="Choose a country"
          onSelectionChange={(key) => console.log('selected:', key)}
        />
      </section>
    </main>
  );
}
