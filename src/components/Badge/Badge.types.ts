import type { HTMLAttributes } from 'react';
import type { Status } from '../../tokens/axes';
// @protonic:display-only — Badge is a non-interactive status label.
// Uses pill radius per contracts.ts#borderRadius — the only component that does.

export interface ProtonicBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: Status; // axes registry: feedback axis — what is the system signaling?
}
