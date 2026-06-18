#!/usr/bin/env node
/**
 * Component Auditor — Protonic Phase 3
 *
 * Static analysis script: deterministic checks against Protonic's design contracts.
 * Run: npm run audit -- src/components/Button
 *
 * Complements the AI-powered /component-auditor slash command.
 * This script catches mechanical violations fast (CI-friendly, zero AI cost).
 * The slash command catches nuanced contract drift.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';

const RESET  = '\x1b[0m';
const RED    = '\x1b[31m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';

const pass = (msg: string): void => console.log(`${GREEN}✅ PASS${RESET}  ${msg}`);
const fail = (msg: string, detail?: string): void => {
  console.log(`${RED}❌ FAIL${RESET}  ${msg}`);
  if (detail) console.log(`         → ${detail}`);
};
const warn = (msg: string, detail?: string): void => {
  console.log(`${YELLOW}⚠️  WARN${RESET}  ${msg}`);
  if (detail) console.log(`         → ${detail}`);
};

// ponytail: canonical values hardcoded — they're the contract, not config
const VALID_VARIANTS = ['primary', 'secondary', 'destructive'];
const VALID_SIZES    = ['small', 'medium', 'large'];

function auditComponent(inputPath: string): void {
  const absPath = resolve(process.cwd(), inputPath);
  const componentName = basename(absPath);

  console.log(`\n${BOLD}COMPONENT AUDITOR — Protonic${RESET}`);
  console.log(`Component: ${componentName}`);
  console.log(`Path: ${absPath}`);
  console.log('─'.repeat(50));

  let passes = 0;
  let failures = 0;

  function check(label: string, ok: boolean, detail?: string): void {
    if (ok) { pass(label); passes++; }
    else    { fail(label, detail); failures++; }
  }

  // ── File structure ──────────────────────────────────────────────
  console.log(`\n${BOLD}FILE STRUCTURE${RESET}`);

  const required = [
    `${componentName}.tsx`,
    `${componentName}.types.ts`,
    `${componentName}.styles.ts`,
    `${componentName}.css`,
    `${componentName}.stories.tsx`,
    'index.ts',
  ];

  for (const file of required) {
    const exists = existsSync(join(absPath, file));
    check(`${file} exists`, exists, `Create ${join(inputPath, file)}`);
  }

  // ── Source analysis ──────────────────────────────────────────────
  const tsxPath = join(absPath, `${componentName}.tsx`);
  if (!existsSync(tsxPath)) {
    warn(`Skipping source analysis — ${componentName}.tsx not found`);
  } else {
    const src = readFileSync(tsxPath, 'utf-8');
    const lines = src.split('\n');

    console.log(`\n${BOLD}REACT ARIA CONVENTIONS${RESET}`);

    type LineEntry = { line: number; content: string };

    const onClickLines: LineEntry[] = lines
      .map((content: string, i: number): LineEntry => ({ line: i + 1, content }))
      .filter(({ content }: LineEntry) => /onClick\s*=/.test(content) && !content.trim().startsWith('//'));

    check(
      'Uses onPress not onClick',
      onClickLines.length === 0,
      onClickLines.map(({ line, content }: LineEntry) => `${tsxPath}:${line} — ${content.trim()}`).join('\n         → '),
    );

    const rawDisabledLines: LineEntry[] = lines
      .map((content: string, i: number): LineEntry => ({ line: i + 1, content }))
      .filter(({ content }: LineEntry) => /\bdisabled\s*=/.test(content) && !/isDisabled/.test(content) && !content.trim().startsWith('//'));

    check(
      'Uses isDisabled not disabled',
      rawDisabledLines.length === 0,
      rawDisabledLines.map(({ line, content }: LineEntry) => `${tsxPath}:${line} — ${content.trim()}`).join('\n         → '),
    );

    const badAriaLines: LineEntry[] = lines
      .map((content: string, i: number): LineEntry => ({ line: i + 1, content }))
      .filter(({ content }: LineEntry) => {
        if (content.trim().startsWith('//')) return false;
        return /aria-(expanded|modal|selected|checked|haspopup|controls|owns|activedescendant)\s*=/.test(content);
      });

    check(
      'No custom ARIA attribute overrides',
      badAriaLines.length === 0,
      badAriaLines.map(({ line, content }: LineEntry) => `${tsxPath}:${line} — ${content.trim()} (React Aria sets this)`).join('\n         → '),
    );
  }

  // ── Types analysis ───────────────────────────────────────────────
  const typesPath = join(absPath, `${componentName}.types.ts`);
  if (existsSync(typesPath)) {
    const types = readFileSync(typesPath, 'utf-8');

    console.log(`\n${BOLD}AXES REGISTRY${RESET}`);

    const variantMatches = [...types.matchAll(/variant\?\s*:\s*([^;]+)/g)];
    for (const match of variantMatches) {
      const values = match[1].match(/'([^']+)'/g)?.map((v: string) => v.replace(/'/g, '')) ?? [];
      const invalid = values.filter((v: string) => !VALID_VARIANTS.includes(v));
      check(
        `Variant values match axes registry`,
        invalid.length === 0,
        invalid.length > 0 ? `Invalid values: ${invalid.join(', ')} — must be one of: ${VALID_VARIANTS.join(' | ')}` : undefined,
      );
    }

    const sizeMatches = [...types.matchAll(/size\?\s*:\s*([^;]+)/g)];
    for (const match of sizeMatches) {
      const values = match[1].match(/'([^']+)'/g)?.map((v: string) => v.replace(/'/g, '')) ?? [];
      const invalid = values.filter((v: string) => !VALID_SIZES.includes(v));
      check(
        `Size values match axes registry`,
        invalid.length === 0,
        invalid.length > 0 ? `Invalid values: ${invalid.join(', ')} — must be one of: ${VALID_SIZES.join(' | ')}` : undefined,
      );
    }

    // Three valid patterns:
    // 1. extends directly: extends FooProps / extends Omit<FooProps<T>, '...'>
    // 2. data-component pattern: imports types from react-aria-components without extending
    //    (e.g., Table uses columns/rows API instead of React Aria's render-props TableProps)
    // 3. display-only: annotated with // @protonic:display-only — pure HTML container,
    //    no React Aria primitive exists for it (e.g., Card, Badge)
    const extendsAriaType =
      /extends\s+(?:Omit|Pick|Partial)?<?[^>]*?(Props|ButtonProps|SelectProps|DialogProps|TableProps|ModalOverlayProps)/.test(types) ||
      /from\s+['"]react-aria-components['"]/.test(types) ||
      /\/\/\s*@protonic:display-only/.test(types);
    check(
      'Interface extends or imports from react-aria-components (or @protonic:display-only)',
      extendsAriaType,
      `Import or extend a type from react-aria-components, or annotate with // @protonic:display-only`,
    );
  }

  // ── CSS (deferred to design-review script) ───────────────────────
  console.log(`\n${BOLD}CSS${RESET}`);
  warn('Token compliance not checked here', `Run: npm run design-review -- ${inputPath}`);

  // ── Summary ──────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(50));
  const total = passes + failures;
  if (failures === 0) {
    console.log(`${GREEN}${BOLD}Result: PASS ${passes}/${total} checks${RESET}`);
  } else {
    console.log(`${RED}${BOLD}Result: FAIL — ${failures} violation${failures > 1 ? 's' : ''} (${passes}/${total} passed)${RESET}`);
    process.exitCode = 1;
  }
}

const target = process.argv[2];
if (!target) {
  console.error(`Usage: npm run audit -- src/components/ComponentName`);
  process.exit(1);
}

auditComponent(target);
