import { cva } from 'class-variance-authority';
import styles from './Checkbox.module.css';

// ponytail: no variant axis — checkboxes have one shape, state is handled by React Aria data attrs
export const checkboxVariants = cva(styles.checkbox);
