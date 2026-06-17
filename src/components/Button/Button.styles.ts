import { cva } from 'class-variance-authority';

// CVA = Class Variance Authority
// It maps variant + size → the correct CSS class combination.
// This is the component's style contract — one place, no drift.

export const buttonStyles = cva(
  // Base styles — applied to every Button regardless of variant/size
  'protonic-btn',
  {
    variants: {
      variant: {
        primary:     'protonic-btn--primary',
        secondary:   'protonic-btn--secondary',
        destructive: 'protonic-btn--destructive',
      },
      size: {
        small:  'protonic-btn--sm',
        medium: 'protonic-btn--md',
        large:  'protonic-btn--lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'medium',
    },
  }
);
