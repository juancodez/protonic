import { Button } from './components/Button';
import { Modal, ModalTrigger } from './components/Modal';
import { Select } from './components/Select';
import { Table } from './components/Table';

const countries = [
  { id: 'de', label: 'Germany' },
  { id: 'es', label: 'Spain' },
  { id: 'mx', label: 'Mexico' },
  { id: 'ar', label: 'Argentina' },
  { id: 'co', label: 'Colombia' },
];

const tableColumns = [
  { id: 'name',     label: 'Name',    allowsSorting: true },
  { id: 'role',     label: 'Role',    allowsSorting: true },
  { id: 'country',  label: 'Country', allowsSorting: false },
];

const tableRows = [
  { id: '1', name: 'Ana García',     role: 'Designer',   country: 'Spain' },
  { id: '2', name: 'Juan Mora',      role: 'Developer',  country: 'Colombia' },
  { id: '3', name: 'Lena Müller',    role: 'PM',         country: 'Germany' },
  { id: '4', name: 'Carlos Reyes',   role: 'Designer',   country: 'Mexico' },
  { id: '5', name: 'Sofia Bianchi',  role: 'Developer',  country: 'Argentina' },
];

const section = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--space-4)',
};

const h2 = { fontFamily: 'var(--font-display)', margin: 0 };

export default function App() {
  return (
    <main style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Protonic — Dev Sandbox</h1>

      <section style={section}>
        <h2 style={h2}>Button</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" isDisabled>Disabled</Button>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Modal</h2>
        <div>
          <ModalTrigger>
            <Button variant="primary">Open modal</Button>
            <Modal title="Hello from Protonic">
              <p>Focus is trapped inside. Tab cannot leave. Escape closes it.</p>
            </Modal>
          </ModalTrigger>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Select</h2>
        <Select
          label="Country"
          options={countries}
          placeholder="Choose a country"
          onSelectionChange={(key) => console.log('selected:', key)}
        />
      </section>

      <section style={section}>
        <h2 style={h2}>Table</h2>
        <Table
          aria-label="Team members"
          columns={tableColumns}
          rows={tableRows}
          selectionMode="multiple"
          onSelectionChange={(keys) => console.log('selected rows:', keys)}
          onSortChange={(desc) => console.log('sort:', desc)}
        />
      </section>
    </main>
  );
}
