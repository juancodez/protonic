export const HeroMetadata = {
  id: 'hero', name: 'Hero', version: '2.0.0', type: 'container', category: 'molecule',
  path: 'src/components/Hero', created: '2026-06-10', modified: '2026-06-24',
  description: 'Full-viewport layout shell. Composes with Hero.Content, Hero.Heading, Hero.Sub, Hero.Actions, Hero.Overline. Inverted variant for dark/video-overlay contexts.',
  variants: { inverted: [false, true] },
  useCases: [
    { label: 'Light hero', example: '<Hero><Hero.Content><Hero.Heading>Título</Hero.Heading><Hero.Sub>Subtítulo</Hero.Sub></Hero.Content></Hero>' },
    { label: 'Dark/video overlay hero', example: '<Hero inverted><video /><Hero.Content><Hero.Overline>Klaro</Hero.Overline><Hero.Heading>Al fin, claros</Hero.Heading></Hero.Content></Hero>' },
  ],
  antiPatterns: [
    { bad: 'Multiple Hero per page', good: 'One Hero at page top', reason: 'Hero owns 100dvh — stacking multiples breaks layout rhythm.' },
    { bad: 'Hardcoded font-size inside Hero.Heading', good: 'Use the slot — clamp is already in Hero.module.css', reason: 'The slot handles fluid type scaling; override breaks it.' },
  ],
  a11y: { inherited: [], owned: ['Hero renders as <section>. Hero.Heading renders as <h1> — one per page.'] },
  aiHints: [
    'inverted=true → use accent-light (var(--color-accent-light)) for overline, text-inverted-muted for body.',
    'Video element goes as a direct child before Hero.Content — z-index is handled by .content { z-index: 1 }.',
    'Hero.Actions wraps Button components — gap and flex-wrap are built in.',
  ],
  tokens: { background: ['--color-bg', '--color-text'], color: ['--color-text', '--color-bg', '--color-text-inverted-muted', '--color-accent-light'], radius: ['--radius-pill'] },
  figma: { fileKey: 'rRSxMj33ZtioxdrabH5rm6', component: 'Hero', properties: { Inverted: ['False', 'True'] } },
} as const;
