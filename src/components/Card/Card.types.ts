import type { HTMLAttributes } from 'react';
// @protonic:display-only — Card is a surface container, not interactive.
// Interactive children (Button, Select, etc.) manage their own React Aria contracts.

export interface ProtonicCardProps extends HTMLAttributes<HTMLDivElement> {}
