import { Button } from './components/Button';

export default function App() {
  return (
    <main style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Protonic — Dev Sandbox</h1>

      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button variant="primary" onPress={() => console.log('primary pressed')}>Primary</Button>
        <Button variant="secondary" onPress={() => console.log('secondary pressed')}>Secondary</Button>
        <Button variant="destructive" onPress={() => console.log('destructive pressed')}>Destructive</Button>
        <Button variant="primary" isDisabled>Disabled</Button>
        <Button variant="primary" isLoading>Loading</Button>
      </section>
    </main>
  );
}
