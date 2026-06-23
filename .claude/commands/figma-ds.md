# /figma-ds

Generate a Figma component set from a Protonic component's source files.
Code is the source. Figma is the render target.

## Usage

```
/figma-ds <ComponentName>
```

Examples:
- `/figma-ds Button`
- `/figma-ds Badge`
- `/figma-ds Chip`

## Prerequisites

1. Figma Desktop app open
2. figma-cli daemon running:
   ```bash
   cd C:/Users/tn/figma-cli && node src/index.js daemon start
   ```
3. Target file open in Figma Desktop (key: from `.figma/manifest.json`)

## Generation flow (6 steps)

**Step 1 — Read `Component.tsx`**
Extract variant axes and their values:
- `variant: ['primary', 'secondary', 'destructive']`
- `size: ['small', 'medium', 'large']`
Map axis names to Figma property names using `.figma/manifest.json` `componentConventions`.

**Step 2 — Read `Component.module.css`**
Extract all `var(--token-name)` references. These will be bound to Figma variables.

**Step 3 — Read `.figma/manifest.json`**
Load design identity:
- `fonts` → text layer font families
- `iconSet.componentKey` → icon binding
- `componentConventions` → Figma property naming
- `variableCollections` → which collection each token belongs to

**Step 4 — Resolve `.figma/maps/tokens.json`**
Map each `var(--token-name)` found in Step 2 to its Figma variable key.
If a token has `"TBD"` key: warn and skip binding for that property.

**Step 5 — Generate via figma-cli daemon**
Use the external `/figma-component-generator` skill with the resolved data:
- Component name, variant axes, token-to-variable bindings
- Apply design identity from manifest
- Target page: `manifest.pageName` (default: "Components")

**Step 6 — Write back to `.figma/maps/components.json`**
After successful generation, update the component entry:
```json
{
  "Button": {
    "componentSetId": "<generated-id>",
    "componentKey": "<generated-key>"
  }
}
```

## After generation

Run `/component-auditor src/components/<Name>` to verify the Figma component
properties match the code component's axes.

## Token binding note

Until `.figma/maps/tokens.json` is populated with real Figma variable keys,
fills will use hardcoded values as fallback. To populate:
1. Open Figma file
2. Run the scan-variables flow (future: `scan-variables.mjs`)
3. Update tokens.json with real variable keys
