import { cva } from 'class-variance-authority';

export const heroStyles = cva(
  'protonic-hero',
  {
    variants: {
      inverted: {
        true:  'protonic-hero--inverted',
        false: '',
      },
    },
    defaultVariants: {
      inverted: false,
    },
  }
);
