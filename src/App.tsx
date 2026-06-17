import { Button } from './components/Button';
import { Modal, ModalTrigger } from './components/Modal';

export default function App() {
  return (
    <main style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Protonic — Dev Sandbox</h1>

      {/* Button variants */}
      <section>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Button</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Button variant="primary" onPress={() => console.log('primary')}>Primary</Button>
          <Button variant="secondary" onPress={() => console.log('secondary')}>Secondary</Button>
          <Button variant="destructive" onPress={() => console.log('destructive')}>Destructive</Button>
          <Button variant="primary" isDisabled>Disabled</Button>
        </div>
      </section>

      {/* Modal */}
      <section>
        <h2 style={{ fontFamily: 'var(--font-display)' }}>Modal</h2>
        <ModalTrigger>
          <Button variant="primary">Open modal</Button>
          <Modal title="Hello from Protonic">
            <p>This modal traps focus automatically. Try pressing Tab — you cannot leave it.</p>
            <p>Press Escape or click Close to dismiss.</p>
          </Modal>
        </ModalTrigger>
      </section>
    </main>
  );
}
