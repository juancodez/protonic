import { cva } from 'class-variance-authority';
import styles from './Textarea.module.css';

// ponytail: no size axis — textarea height is set by rows prop; width is always 100%
export const textareaVariants = cva(styles.field);
