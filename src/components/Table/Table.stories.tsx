import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title:     'Protonic/Table',
  component: Table,
  tags:      ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Table wraps React Aria's grid: Table → TableHeader → Column → TableBody → Row → Cell.

**A11y inherited from React Aria (free):**
- Arrow keys navigate between cells
- \`role="grid"\`, \`role="row"\`, \`role="columnheader"\`, \`role="gridcell"\` set automatically
- \`aria-sort\` updates on sortable columns
- Row selection announced to screen readers
- Keyboard selection with Space
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
  { id: 'name',    label: 'Name',    allowsSorting: true  },
  { id: 'role',    label: 'Role',    allowsSorting: true  },
  { id: 'country', label: 'Country', allowsSorting: false },
];

const rows = [
  { id: '1', name: 'Ana García',    role: 'Designer',  country: 'Spain'     },
  { id: '2', name: 'Juan Mora',     role: 'Developer', country: 'Colombia'  },
  { id: '3', name: 'Lena Müller',   role: 'PM',        country: 'Germany'   },
  { id: '4', name: 'Carlos Reyes',  role: 'Designer',  country: 'Mexico'    },
  { id: '5', name: 'Sofia Bianchi', role: 'Developer', country: 'Argentina' },
];

export const Default: Story = {
  args: {
    'aria-label':  'Team members',
    columns,
    rows,
    selectionMode: 'none',
  },
};

export const SingleSelect: Story = {
  args: {
    'aria-label':  'Team members — single select',
    columns,
    rows,
    selectionMode: 'single',
  },
};

export const MultiSelect: Story = {
  args: {
    'aria-label':  'Team members — multi select',
    columns,
    rows,
    selectionMode: 'multiple',
  },
};
