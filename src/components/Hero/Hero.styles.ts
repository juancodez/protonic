import { cva } from 'class-variance-authority';
import styles from './Hero.module.css';

// Intent layer — maps axes values to CSS module classes.
// axes.ts → (this file) → Hero.module.css → variables.css
export const heroVariants = cva(styles.hero, {
  variants: {
    inverted: {
      true:  styles.inverted,
      false: '',
    },
  },
  defaultVariants: { inverted: false },
});
