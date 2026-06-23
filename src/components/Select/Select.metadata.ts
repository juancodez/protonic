export const SelectMetadata = {
  id: 'select', name: 'Select', version: '2.0.0', type: 'input', category: 'atom',
  path: 'src/components/Select', created: '2026-06-01', modified: '2026-06-24',
  description: 'Accessible dropdown with full keyboard navigation, typeahead, and ARIA. Behavior owned by React Aria.',
  variants: {},
  useCases: [
    { label: 'Country picker', example: '<Select label="País" options={countries} placeholder="Elige un país" onSelectionChange={setCountry} />' },
    { label: 'Category filter', example: '<Select label="Categoría" options={categories} onSelectionChange={setCategory} />' },
  ],
  antiPatterns: [
    { bad: '<select> native HTML', good: '<Select> Protonic component', reason: 'Native select has no cross-browser keyboard parity, no custom styling, limited ARIA support.' },
    { bad: 'options with duplicate id values', good: 'Unique id per option', reason: 'React Aria uses id as the selection key — duplicates cause selection bugs.' },
  ],
  a11y: {
    inherited: [
      'Arrow key navigation in listbox',
      'Typeahead (type a letter to jump)',
      'Escape closes without selecting',
      'aria-expanded on trigger',
      'role="option" + aria-selected on items',
      'Focus returns to trigger on close',
    ],
    owned: [],
  },
  aiHints: [
    'options must be Array<{ id: string; label: string }> — generic T extends SelectOption.',
    'onSelectionChange receives the selected id (string) — not the full option object.',
    'placeholder is optional — falls back to "Select an option".',
  ],
  tokens: { background: ['--color-bg', '--color-bg-surface', '--color-primary-subtle'], border: ['--color-bg-surface', '--color-primary'], radius: ['--radius-sm'], shadow: ['--shadow-md'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Select', properties: { State: ['Default', 'Open', 'Selected', 'Disabled'] } },
} as const;
