import { cva } from 'class-variance-authority';
import styles from './Radio.module.css';

// ponytail: no variant/size axes — radio is display-stable; group orientation is a layout concern
export const radioVariants     = cva(styles.radio);
export const radioGroupVariants = cva(styles.group);
