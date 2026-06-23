// Design contracts — the articulated chain behind every visual decision in Protonic
// Format per Cristian article 1: Purpose → Standards → Required Behavior → Contract → Component
// Before adding any style, it must trace back here.

export const DESIGN_CONTRACTS = {

  // ─── COLOR ────────────────────────────────────────────────────────────────
  primaryColor: {
    value: '#a43700',
    chain: [
      'Protonic serves developers building product interfaces',
      'Developers need confidence that the component is production-ready and opinionated',
      'Warmth signals human craft, not cold tooling — this is a designed system, not a utility dump',
      'Orange communicates energy and precision without aggression',
      'Seeded from Klaro — intentional continuity between the two systems',
    ],
    contract: 'Primary color is reserved for primary-variant components and focus rings only. Never decorative.',
  },

  flatElevation: {
    value: 'no box-shadow',
    chain: [
      'Developer interfaces benefit from spatial clarity over visual depth',
      'Shadows create ambiguity about what is interactive vs decorative',
      'Borders + background shifts communicate elevation without noise',
    ],
    contract: 'No box-shadow on any component. Use border + background token shifts for elevation.',
  },

  // ─── TYPOGRAPHY ───────────────────────────────────────────────────────────
  displayFont: {
    value: 'Bricolage Grotesque',
    chain: [
      'Headings need personality — they set the tone for the system',
      'Bricolage Grotesque is humanist but structured: warm precision',
      'Continuity with Klaro — same display font across both systems',
    ],
    contract: 'Bricolage Grotesque is used only for headings (h1–h3) and component labels at display scale.',
  },

  bodyFont: {
    value: 'Plus Jakarta Sans',
    chain: [
      'Body text must be highly legible at small sizes',
      'Plus Jakarta Sans is neutral, clean, and works well at 14px in UI contexts',
    ],
    contract: 'Plus Jakarta Sans for all body text, labels, helper text, and UI copy.',
  },

  // ─── SHAPE ────────────────────────────────────────────────────────────────
  borderRadius: {
    value: '8px default, 16px surface, 100px pill',
    chain: [
      'Sharp corners feel unfinished; large radii feel playful/informal',
      '8px for internal UI elements (inputs, dropdowns, modals)',
      'Pill (100px) for interactive controls — buttons and nav items — matches Klaro brand language',
      '16px for surface containers — cards, panels — warm and approachable at component scale',
    ],
    contract: 'Buttons use pill (100px). Cards/panels use --radius-lg (16px). Internal elements use --radius (8px).',
  },

  // ─── SPACING ──────────────────────────────────────────────────────────────
  surfaceColor: {
    value: '#f4ede5 (--color-bg-surface)',
    chain: [
      'Klaro users are anxious about taxes — the interface must feel warm and grounded',
      'Page background (#fff8f1 cream) needs a visually distinct "lifted" surface for cards',
      'Beige (#f4ede5) is one step warmer/darker — same palette family, clear hierarchy without shadows',
      'No shadow allowed (flatElevation contract) → background shift is the only elevation signal',
    ],
    contract: 'Cards and surface containers use --color-bg-surface. Page background uses --color-bg. Never invert.',
  },

  spacingGrid: {
    value: '4px base grid',
    chain: [
      'Consistent spatial rhythm improves scanability',
      '4px aligns to most display pixel grids',
      'Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64',
    ],
    contract: 'All spacing values must be multiples of 4px from the scale. No arbitrary values.',
  },

} as const;
