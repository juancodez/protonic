// Axes registry — canonical prop vocabulary for all Protonic components
// Rule: if a prop exists on multiple components, it MUST use these exact names and values.
// Drift from these = contract violation. Phase 3 agents will enforce this file.

// VARIANT = identity axis. What KIND of thing is this?
// Answers: "primary action", "secondary action", "dangerous action"
export const VARIANT = ['primary', 'secondary', 'destructive'] as const;
export type Variant = typeof VARIANT[number];

// SIZE = scale axis. One ordered scale, every component exposes a contiguous subset.
export const SIZE = ['small', 'medium', 'large'] as const;
export type Size = typeof SIZE[number];

// STATUS = feedback axis. What is the SYSTEM signaling?
// ponytail: variant ≠ status — they answer different questions (Cristian article 3)
// variant = input identity, status = system feedback overlay
export const STATUS = ['success', 'warning', 'error', 'info'] as const;
export type Status = typeof STATUS[number];

// VALUE GLOSSARY — one spelling per concept (never "outlined", always "outline")
export const GLOSSARY = {
  variant:     VARIANT,
  size:        SIZE,
  status:      STATUS,
} as const;
