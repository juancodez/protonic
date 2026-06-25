import type { HTMLAttributes } from 'react';
import type { Status } from '../../tokens/axes';

// @protonic:display-only — root is display-only; dismiss button uses AriaButton internally
export interface ProtonicToastProps extends HTMLAttributes<HTMLDivElement> {
  status:   Status;  // axes registry: 'success' | 'warning' | 'error' | 'info'
  title:    string;
  message?: string;
  onDismiss?: () => void;
}
