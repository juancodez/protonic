// Read-only component indexer — outputs .ai/index.json + .ai/relationships/*.json
// DO NOT modify any component files.

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');
const OUTPUT = join(__dir, 'index.json');

const CORE = new Set(['Button', 'Modal', 'Select', 'Table']);

// Contract refs — which DESIGN_CONTRACTS keys each component uses.
// Maintained manually: add keys from src/tokens/contracts.ts
const CONTRACT_REFS = {
  Button:          ['primaryColor', 'borderRadius', 'spacingGrid'],
  Badge:           ['primaryColor'],
  Card:            ['flatElevation', 'surfaceColor', 'spacingGrid', 'borderRadius'],
  ClaraPanel:      ['primaryColor', 'surfaceColor', 'spacingGrid', 'borderRadius'],
  DraggableTicker: ['primaryColor', 'borderRadius', 'spacingGrid'],
  Hero:            ['primaryColor', 'displayFont', 'bodyFont', 'spacingGrid'],
  Modal:           ['surfaceColor', 'spacingGrid', 'borderRadius', 'bodyFont'],
  Select:          ['primaryColor', 'surfaceColor', 'spacingGrid', 'borderRadius'],
  Table:           ['primaryColor', 'surfaceColor', 'spacingGrid'],
};

// ── Helpers ────────────────────────────────────────────────────────────────

function read(p) {
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
}

/** Extract named imports from 'react-aria-components' */
function extractAriaFoundation(tsx) {
  const m = tsx.match(/import\s*\{([^}]+)\}\s*from\s*['"]react-aria-components['"]/g);
  if (!m) return 'none';
  const names = m
    .flatMap(line => {
      const inner = line.match(/\{([^}]+)\}/)?.[1] ?? '';
      return inner.split(',').map(s => s.trim().replace(/\s+as\s+\w+/, '').trim());
    })
    .filter(Boolean)
    .filter(n => n !== 'Key');
  return names.length ? names : 'none';
}

/** Extract CVA variant axes + values. Checks tsx and stylesTs. */
function extractVariants(tsx, stylesTs) {
  const variants = {};
  const sources = [tsx, stylesTs].filter(Boolean);
  for (const src of sources) {
    const variantsKeyword = 'variants:';
    let idx = 0;
    while ((idx = src.indexOf(variantsKeyword, idx)) !== -1) {
      idx += variantsKeyword.length;
      let start = src.indexOf('{', idx);
      if (start === -1) break;
      let depth = 0;
      let end = start;
      for (let i = start; i < src.length; i++) {
        if (src[i] === '{') depth++;
        else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
      }
      const block = src.slice(start + 1, end);
      const axisRe = /(\w+)\s*:\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
      let am;
      while ((am = axisRe.exec(block)) !== null) {
        const axis = am[1];
        const valueBlock = am[2];
        const valueRe = /(\w+)\s*:/g;
        const values = [];
        let vm;
        while ((vm = valueRe.exec(valueBlock)) !== null) values.push(vm[1]);
        if (values.length) variants[axis] = values;
      }
      idx = end + 1;
    }
  }
  return Object.keys(variants).length ? variants : null;
}

/** Extract all CSS custom property references from a CSS file */
function extractTokens(css) {
  const found = new Set();
  const re = /var\((--[\w-]+)/g;
  let m;
  while ((m = re.exec(css)) !== null) found.add(m[1]);
  return [...found].sort();
}

/** Extract figma metadata from .metadata.ts file */
function extractFigma(metadataTs) {
  if (!metadataTs) return null;
  const fileKeyMatch  = metadataTs.match(/fileKey\s*:\s*['"]([^'"]+)['"]/);
  const componentMatch = metadataTs.match(/component\s*:\s*['"]([^'"]+)['"]/);
  if (!fileKeyMatch || !componentMatch) return null;
  return {
    fileKey:   fileKeyMatch[1],
    component: componentMatch[1],
  };
}

/** Find which components import a given component name */
function findUsedBy(name, componentSources) {
  const usedBy = [];
  for (const [other, { tsx }] of Object.entries(componentSources)) {
    if (other === name) continue;
    if (tsx.includes(`'../${name}'`) || tsx.includes(`"../${name}"`)) usedBy.push(other);
  }
  return usedBy;
}

// ── Main ───────────────────────────────────────────────────────────────────

const componentDirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

// First pass: read all source files
const componentSources = {};
for (const name of componentDirs) {
  const base = join(COMPONENTS_DIR, name, name);
  componentSources[name] = {
    tsx:        read(`${base}.tsx`),
    stylesTs:   read(`${base}.styles.ts`),
    moduleCss:  read(`${base}.module.css`),
    metadataTs: read(`${base}.metadata.ts`),
  };
}

// Second pass: build index entries
const index = [];
for (const name of componentDirs) {
  const { tsx, stylesTs, moduleCss, metadataTs } = componentSources[name];

  index.push({
    name,
    path:         `src/components/${name}/${name}.tsx`,
    foundation:   extractAriaFoundation(tsx),
    variants:     extractVariants(tsx, stylesTs),
    tokens:       extractTokens(moduleCss),
    usedBy:       findUsedBy(name, componentSources),
    category:     CORE.has(name) ? 'core' : 'klaro',
    figma:        extractFigma(metadataTs),
    contractRefs: CONTRACT_REFS[name] ?? [],
  });
}

// Count unique tokens across all components
const allTokens = new Set(index.flatMap(c => c.tokens));
const allRelationships = index.reduce((n, c) => n + c.usedBy.length + c.tokens.length, 0);

// ── .ai/index.json — summary + usage + components ─────────────────────────
const output = {
  summary: {
    totalComponents:        index.length,
    componentsWithMetadata: index.filter(c => existsSync(join(COMPONENTS_DIR, c.name, `${c.name}.metadata.ts`))).length,
    totalTokens:            allTokens.size,
    tokenCategories:        12,
    relationshipsMapped:    allRelationships,
    generatedAt:            new Date().toISOString(),
  },
  usage: {
    loadOnce:             'Read .ai/index.json and .ai/relationships/* once at session start',
    keepInContext:        'Maintain loaded data for the full conversation',
    loadMetadataOnDemand: 'Read Component.metadata.ts only when working on that component',
  },
  components: index,
};
writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

// ── .ai/relationships/ — three relationship maps ───────────────────────────
const RELS = join(__dir, 'relationships');
mkdirSync(RELS, { recursive: true });

// component-usage.json — component → which components use it
const componentUsage = {};
for (const c of index) {
  componentUsage[c.name] = { usedBy: c.usedBy };
}
writeFileSync(join(RELS, 'component-usage.json'), JSON.stringify(componentUsage, null, 2));

// design-tokens.json — token → which components consume it
const tokenUsage = {};
for (const c of index) {
  for (const token of c.tokens) {
    if (!tokenUsage[token]) tokenUsage[token] = [];
    tokenUsage[token].push(c.name);
  }
}
writeFileSync(join(RELS, 'design-tokens.json'), JSON.stringify(tokenUsage, null, 2));

// dependencies.json — component → external packages imported
const depsUsage = {};
for (const name of componentDirs) {
  const tsx = componentSources[name].tsx;
  const externalImports = [...tsx.matchAll(/from\s+['"]([^./][^'"]+)['"]/g)]
    .map(m => m[1].split('/')[0])
    .filter((v, i, a) => a.indexOf(v) === i);
  depsUsage[name] = externalImports;
}
writeFileSync(join(RELS, 'dependencies.json'), JSON.stringify(depsUsage, null, 2));

console.log(`Written ${index.length} components → .ai/index.json`);
console.log(`  Tokens referenced: ${allTokens.size} | Relationships: ${allRelationships}`);
console.log(`  Relationships written → .ai/relationships/ (component-usage, design-tokens, dependencies)`);
