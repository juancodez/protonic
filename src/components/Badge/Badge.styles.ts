import { cva } from 'class-variance-authority';

export const badgeStyles = cva(
  'protonic-badge',
  {
    variants: {
      status: {
        info:    'protonic-badge--info',
        success: 'protonic-badge--success',
        warning: 'protonic-badge--warning',
        error:   'protonic-badge--error',
      },
    },
    defaultVariants: {
      status: 'info',
    },
  }
);
