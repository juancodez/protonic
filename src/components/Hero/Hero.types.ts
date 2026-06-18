import type { HTMLAttributes } from 'react';
// @protonic:display-only — Hero is a full-viewport layout shell.
// Video, overlays, and decorative elements are application-specific — compose inside.

export interface ProtonicHeroProps extends HTMLAttributes<HTMLElement> {
  /** Inverts the color scheme for dark-background contexts (e.g. Klaro's video hero) */
  inverted?: boolean;
}
