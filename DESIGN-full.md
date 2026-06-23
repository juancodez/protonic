# DESIGN.md -- Klaro Design System

<!-- extraction-meta
source: Figma file "Klaro Design System"
scope: 1 page(s)
date: 2026-06-20
nodes-scanned: 1
generator: figma-cli extract
-->

## 1. Identity

**In one line:** A design system using system fonts with 0 unique colors extracted directly from Figma.

**Signature Techniques:**
- Consistent auto-layout spacing system
- Component library with 0 variants across 0 component sets

## 2. Structure

High-level composition. Each entry: frame name, type, dimensions, auto-layout.

### Page: Page 1

_0 top-level frame(s)_


## 3. Color

### Palette

| Token | Hex | Usage count |
|---|---|---|

## 4. Variables

Real Figma variable collections — the authoritative tokens (names, modes, values). These come straight from the file, unlike the sampled palette above. `figma-cli import` can recreate them as variables.

### Collection: css variables  ·  27 variables  ·  modes: Mode 1

| Variable | Type | Mode 1 |
|---|---|---|
| color-primary | COLOR | `#a43700` |
| color-primary-dark | COLOR | `#8a2e00` |
| color-primary-subtle | COLOR | `#a43700` |
| color-primary-subtle-hover | COLOR | `#a43700` |
| color-on-primary | COLOR | `#ffffff` |
| color-bg | COLOR | `#fff8f1` |
| color-bg-surface | COLOR | `#f4ede5` |
| color-surface | COLOR | `#ffffff` |
| color-text | COLOR | `#1e1b17` |
| color-text-body | COLOR | `#594139` |
| color-text-muted | COLOR | `#8c7168` |
| color-accent | COLOR | `#ffb830` |
| color-success | COLOR | `#15803d` |
| color-success-subtle | COLOR | `#15803d` |
| color-warning-subtle | COLOR | `#ffb830` |
| color-warning-text | COLOR | `#7a5a00` |
| color-danger | COLOR | `#dc2626` |
| color-danger-subtle | COLOR | `#dc2626` |
| color-danger-subtle-border | COLOR | `#dc2626` |
| color-danger-subtle-hover | COLOR | `#dc2626` |
| color-primary-subtle-select | COLOR | `#a43700` |
| color-overlay | COLOR | `#1e1b17` |
| color-bg-inverted-subtle | COLOR | `#fff8f1` |
| color-text-inverted-muted | COLOR | `#fff8f1` |
| font-body);   background | COLOR | `#fff8f1` |
| radius | FLOAT | 8 |
| radius-pill | FLOAT | 100 |

### Collection: Protonic  ·  28 variables  ·  modes: Mode 1

| Variable | Type | Mode 1 |
|---|---|---|
| color-primary | COLOR | `#a43700` |
| color-primary-dark | COLOR | `#8a2e00` |
| color-primary-subtle | COLOR | `#a43700` |
| color-primary-subtle-hover | COLOR | `#a43700` |
| color-on-primary | COLOR | `#ffffff` |
| color-bg | COLOR | `#fff8f1` |
| color-bg-surface | COLOR | `#f4ede5` |
| color-surface | COLOR | `#ffffff` |
| color-text | COLOR | `#1e1b17` |
| color-text-body | COLOR | `#594139` |
| color-text-muted | COLOR | `#8c7168` |
| color-accent | COLOR | `#ffb830` |
| color-success | COLOR | `#15803d` |
| color-success-subtle | COLOR | `#15803d` |
| color-warning-subtle | COLOR | `#ffb830` |
| color-warning-text | COLOR | `#7a5a00` |
| color-danger | COLOR | `#dc2626` |
| color-danger-subtle | COLOR | `#dc2626` |
| color-danger-subtle-border | COLOR | `#dc2626` |
| color-danger-subtle-hover | COLOR | `#dc2626` |
| color-primary-subtle-select | COLOR | `#a43700` |
| color-overlay | COLOR | `#1e1b17` |
| color-bg-inverted-subtle | COLOR | `#fff8f1` |
| color-text-inverted-muted | COLOR | `#fff8f1` |
| font-body);   background | COLOR | `#fff8f1` |
| radius | FLOAT | 8 |
| radius-lg | FLOAT | 16 |
| radius-pill | FLOAT | 100 |

## 5. Typography

### Fonts


### Scale

| Token | Family | Size | Weight | Line height |
|---|---|---|---|---|

## 6. Spacing & Layout

### Base Unit

8px

### Border Radius

| Token | Value |
|---|---|

## 7. Depth & Motion

### Elevation

_no shadow effects found_

## 8. Components

_no component sets found_

## 9. States

State tokens should be derived from the base palette above. Recommended mappings:

| State | Treatment |
|-------|-----------|
| Hover | Lighten/darken accent by 10% |
| Focus | 2px ring using accent color with 30% opacity |
| Disabled | 40% opacity, no pointer events |
| Error | Use danger color for border and text |

## 10. Rules

### Do

- Use the 8px base unit for all spacing decisions
- Bind colors to the tokens below instead of hardcoding hex values

### Don't

- Introduce new colors without adding them to the palette
- Mix corner radii outside the radius scale

## 11. Extending this system

### How to reuse this DESIGN.md

Import into Figma with `figma-cli import <this file>` — colors, radii and typography become variables.

### When to add a new token vs reuse

Reuse the closest existing token; add a new one only when a new semantic role appears.

## 12. Machine-readable tokens

The block below is the canonical token map. It mirrors the tables above but is unambiguous and parseable.

```json design-tokens
{
  "$schema": "design-tokens.v1",
  "meta": {
    "source": "Klaro Design System",
    "generated": "2026-06-20"
  },
  "color": {},
  "typography": {},
  "spacing": {
    "base-unit": 8
  },
  "radius": {},
  "shadow": {},
  "fonts": [],
  "variables": {
    "css variables": {
      "modes": [
        "Mode 1"
      ],
      "variables": {
        "color-primary": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-primary-dark": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#8a2e00"
          }
        },
        "color-primary-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-primary-subtle-hover": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-on-primary": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffffff"
          }
        },
        "color-bg": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "color-bg-surface": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#f4ede5"
          }
        },
        "color-surface": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffffff"
          }
        },
        "color-text": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#1e1b17"
          }
        },
        "color-text-body": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#594139"
          }
        },
        "color-text-muted": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#8c7168"
          }
        },
        "color-accent": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffb830"
          }
        },
        "color-success": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#15803d"
          }
        },
        "color-success-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#15803d"
          }
        },
        "color-warning-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffb830"
          }
        },
        "color-warning-text": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#7a5a00"
          }
        },
        "color-danger": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-danger-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-danger-subtle-border": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-danger-subtle-hover": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-primary-subtle-select": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-overlay": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#1e1b17"
          }
        },
        "color-bg-inverted-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "color-text-inverted-muted": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "font-body);\n  background": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "radius": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 8
          }
        },
        "radius-pill": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 100
          }
        }
      }
    },
    "Protonic": {
      "modes": [
        "Mode 1"
      ],
      "variables": {
        "color-primary": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-primary-dark": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#8a2e00"
          }
        },
        "color-primary-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-primary-subtle-hover": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-on-primary": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffffff"
          }
        },
        "color-bg": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "color-bg-surface": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#f4ede5"
          }
        },
        "color-surface": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffffff"
          }
        },
        "color-text": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#1e1b17"
          }
        },
        "color-text-body": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#594139"
          }
        },
        "color-text-muted": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#8c7168"
          }
        },
        "color-accent": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffb830"
          }
        },
        "color-success": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#15803d"
          }
        },
        "color-success-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#15803d"
          }
        },
        "color-warning-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ffb830"
          }
        },
        "color-warning-text": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#7a5a00"
          }
        },
        "color-danger": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-danger-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-danger-subtle-border": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-danger-subtle-hover": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#dc2626"
          }
        },
        "color-primary-subtle-select": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#a43700"
          }
        },
        "color-overlay": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#1e1b17"
          }
        },
        "color-bg-inverted-subtle": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "color-text-inverted-muted": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "font-body);\n  background": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fff8f1"
          }
        },
        "radius": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 8
          }
        },
        "radius-lg": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 16
          }
        },
        "radius-pill": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 100
          }
        }
      }
    }
  }
}
```
