import type { HTMLAttributes } from 'react';
// @protonic:display-only — ClaraPanel is a chat layout shell.
// Messages, input state, and streaming logic are consumer responsibility.
// Interactive children (Button for send) are separate Protonic components.

export interface ProtonicClaraPanelProps extends HTMLAttributes<HTMLDivElement> {}
