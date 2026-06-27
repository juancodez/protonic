import { color, font, radius } from './primitives';

export const semantic = {
  colorPrimary:    color.orange500,
  colorPrimarySubtle: color.orange100,
  colorBg:         color.cream50,
  colorBgSurface:  color.beige100,
  colorText:       color.navy900,
  colorTextBody:   color.brown700,
  colorTextMuted:  color.taupe500,
  colorAccent:     color.terracotta500,
  colorSuccess:    color.green600,
  colorWarning:    color.amber400,
  colorDanger:     color.red600,
  fontDisplay:     font.display,
  fontBody:        font.body,
  radiusDefault:   radius.sm,
  radiusPill:      radius.full,
} as const;
