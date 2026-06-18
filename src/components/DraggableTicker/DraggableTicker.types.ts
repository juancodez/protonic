// @protonic:display-only — DraggableTicker is a decorative gesture component.
// Pointer-drag interaction is cosmetic (no semantic action). aria-hidden on the root.

export interface ProtonicDraggableTickerProps {
  items: string[];
  /** Height of the ticker strip in px. Default: 60 */
  height?: number;
  /** Gap between items in px. Default: 16 (≈ --space-4) */
  gap?: number;
  className?: string;
}
