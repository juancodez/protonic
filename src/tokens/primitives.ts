// ponytail: raw values only, no semantics here — sourced from klaro-landing-01 actual impl
export const color = {
  orange500: '#a43700',
  orange100: 'rgba(164,55,0,0.1)',
  navy900:   '#1e1b17',
  brown700:  '#594139',
  taupe500:  '#8c7168',
  cream50:   '#fff8f1',
  beige100:  '#f4ede5',
  amber400:      '#FFB830',
  terracotta500: '#cc6040',
  green600:  '#15803d',
  red600:    '#dc2626',
} as const;

export const font = {
  display: '"Bricolage Grotesque", sans-serif',
  body:    '"Plus Jakarta Sans", sans-serif',
} as const;

export const radius = {
  sm:   '8px',
  full: '100px',
} as const;

export const space = {
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;
