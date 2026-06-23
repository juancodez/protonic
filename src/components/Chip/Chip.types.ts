import type { HTMLAttributes } from 'react';
import type { Status } from '../../tokens/axes';

// @protonic:display-only — chip itself is non-interactive; dismiss button is owned UI
export interface ProtonicChipProps extends HTMLAttributes<HTMLSpanElement> {
  status?:      Status;    // axes registry: 'success' | 'warning' | 'error' | 'info'
  dismissible?: boolean;   // owned — show × button
  onDismiss?:   () => void;
}
