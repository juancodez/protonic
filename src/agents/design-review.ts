#!/usr/bin/env node
/**
 * Design Review Agent — Protonic Phase 3
 *
 * Static CSS analysis: checks that all values reference CSS custom properties.
 * Run: npm run design-review -- src/components/Button
 *
 * Complements the AI-powered /design-review slash command.
 * This script catches hardcoded values fast (CI-friendly, zero AI cost).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const RESET  = '\x1b[0m';
const RED    = '\x1b[31m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';

interface Violation {
  file: string;
  line: number;
  rule: string;
  value: string;
  fix: string;
}

const violations: Violation[] = [];
const warnings: Violation[] = [];

function recordFail(file: string, line: number, rule: string, value: string, fix: string): void {
  violations.push({ file, line, rule, value, fix });
}

function recordWarn(file: string, line: number, rule: string, value: string, fix: string): void {
  warnings.push({ file, line, rule, value, fix });
}

interface CSSCheck {
  pattern: RegExp;
  rule: string;
  fix: (value: string) => string;
  severity: 'fail' | 'warn';
}

// Spacing scale for nearest-token resolver (ponytail: hardcoded, no JSON read needed)
const SPACING_SCALE: Array<{ px: number; token: string }> = [
  { px: 4,   token: '--space-1' },
  { px: 8,   token: '--space-2' },
  { px: 12,  token: '--space-3' },
  { px: 16,  token: '--space-4' },
  { px: 20,  token: '--space-5' },
  { px: 24,  token: '--space-6' },
  { px: 32,  token: '--space-8' },
  { px: 40,  token: '--space-10' },
  { px: 48,  token: '--space-12' },
  { px: 64,  token: '--space-16' },
  { px: 72,  token: '--space-18' },
  { px: 80,  token: '--space-20' },
  { px: 96,  token: '--space-24' },
  { px: 120, token: '--space-30' },
  { px: 160, token: '--space-40' },
];

function nearestSpacingTokens(pxValue: string): string {
  const n = parseInt(pxValue, 10);
  if (isNaN(n)) return 'check var(--space-*) scale';
  const sorted = [...SPACING_SCALE].sort((a, b) => Math.abs(a.px - n) - Math.abs(b.px - n));
  const [first, second] = sorted;
  return second
    ? `nearest: var(${first.token}) [${first.px}px] or var(${second.token}) [${second.px}px]`
    : `nearest: var(${first.token}) [${first.px}px]`;
}

// Foundation token palette names — these should NEVER appear in component CSS
const FOUNDATION_PALETTES = ['orange', 'navy', 'brown', 'taupe', 'cream', 'beige', 'amber', 'terracotta', 'green', 'red', 'white'];
const FOUNDATION_TOKEN_RE = new RegExp(
  `var\\(--color-(${FOUNDATION_PALETTES.join('|')})-?\\d*\\)`,
  'g'
);

// ponytail: regex-based — no CSS AST needed for these simple checks
const CHECKS: CSSCheck[] = [
  {
    pattern: /:\s*(#[0-9a-fA-F]{3,8})\b/g,
    rule: 'Hardcoded hex color',
    fix: () => 'Replace with var(--color-[semantic-name]) from theme.css',
    severity: 'fail',
  },
  {
    pattern: /:\s*(rgba?\([^)]+\))/g,
    rule: 'Hardcoded rgb/rgba color',
    fix: () => 'Replace with var(--color-[semantic-name]) from theme.css',
    severity: 'fail',
  },
  {
    pattern: /:\s*(hsl\([^)]+\))/g,
    rule: 'Hardcoded hsl color',
    fix: () => 'Replace with var(--color-[semantic-name]) from theme.css',
    severity: 'fail',
  },
  {
    // px spacing > 1px — 1px border hairlines are acceptable, 0 needs no token
    pattern: /(?:padding|margin|gap|top|right|bottom|left|inset)(?:-\w+)?\s*:\s*([2-9]\d*px|\d{2,}px)/g,
    rule: 'Raw px spacing value',
    fix: (v: string) => nearestSpacingTokens(v),
    severity: 'fail',
  },
  {
    pattern: /font-family\s*:\s*(?!var\()(["'][^"']+["']|[\w-]+)/g,
    rule: 'Hardcoded font-family',
    fix: () => 'Replace with var(--font-family-display) or var(--font-family-body)',
    severity: 'fail',
  },
  {
    // border-radius that isn't 0, 50%, or a var()
    pattern: /border-radius\s*:\s*(?!var\(|0|50%)([0-9]+(?:px|rem|em|%))/g,
    rule: 'Hardcoded border-radius',
    fix: () => 'Replace with var(--radius-sm) [8px], var(--radius-md) [16px], or var(--radius-pill) [100px]',
    severity: 'fail',
  },
  {
    // Easing keywords — must use motion tokens
    pattern: /transition[^:]*:\s*[^;]*\s(ease(?:-in(?:-out)?|-out)?|linear)(?:\s|;|$)/g,
    rule: 'Hardcoded easing keyword',
    fix: () => 'Replace with var(--motion-easing-out), var(--motion-easing-in-out), or var(--motion-easing-spring)',
    severity: 'fail',
  },
  {
    // Foundation token used directly in component — must use semantic alias
    pattern: FOUNDATION_TOKEN_RE,
    rule: 'Foundation token in component CSS — use semantic alias',
    fix: (v: string) => {
      const map: Record<string, string> = {
        'var(--color-orange-500)': 'var(--color-primary)',
        'var(--color-orange-700)': 'var(--color-primary-dark)',
        'var(--color-red-600)':    'var(--color-danger)',
        'var(--color-green-600)':  'var(--color-success)',
        'var(--color-navy-900)':   'var(--color-text)',
        'var(--color-brown-700)':  'var(--color-text-body)',
        'var(--color-taupe-500)':  'var(--color-text-muted)',
        'var(--color-taupe-300)':  'var(--color-text-subtle)',
        'var(--color-cream-50)':   'var(--color-bg)',
        'var(--color-beige-100)':  'var(--color-bg-surface)',
        'var(--color-white)':      'var(--color-surface)',
        'var(--color-amber-400)':  'var(--color-accent)',
      };
      return map[v] ? `Use ${map[v]} instead` : 'Use the semantic alias from color/semantic.json';
    },
    severity: 'fail',
  },
  {
    // box-shadow — Protonic flat elevation contract: depth via border + bg shift, not shadows
    pattern: /box-shadow\s*:\s*(?!none|var\()([^;]+)/g,
    rule: 'box-shadow detected — flat elevation contract',
    fix: () => 'Protonic uses flat elevation. Use border + background shift, or var(--shadow-*) tokens. See contracts.ts: flatElevation',
    severity: 'warn',
  },
];

function auditCSSFile(filePath: string): void {
  const src = readFileSync(filePath, 'utf-8');
  const lines = src.split('\n');

  lines.forEach((lineContent: string, idx: number): void => {
    const lineNum = idx + 1;
    if (lineContent.trim().startsWith('/*') || lineContent.trim().startsWith('//')) return;
    if (lineContent.trim().startsWith('--')) return; // CSS custom property definition

    for (const cssCheck of CHECKS) {
      const regex = new RegExp(cssCheck.pattern.source, cssCheck.pattern.flags);
      let match: RegExpExecArray | null;
      while ((match = regex.exec(lineContent)) !== null) {
        const value = match[1] ?? match[0];
        if (cssCheck.severity === 'fail') {
          recordFail(filePath, lineNum, cssCheck.rule, value, cssCheck.fix(value));
        } else {
          recordWarn(filePath, lineNum, cssCheck.rule, value, cssCheck.fix(value));
        }
      }
    }
  });
}

function findCSSFiles(inputPath: string): string[] {
  const abs = resolve(process.cwd(), inputPath);
  if (!existsSync(abs)) return [];
  if (extname(abs) === '.css') return [abs];

  // ponytail: flat directory scan only — component dirs don't have nested CSS
  return readdirSync(abs)
    .filter((f: string) => f.endsWith('.css'))
    .map((f: string) => join(abs, f));
}

function run(inputPath: string): void {
  const cssFiles = findCSSFiles(inputPath);

  console.log(`\n${BOLD}DESIGN REVIEW AGENT — Protonic${RESET}`);
  console.log(`Path: ${resolve(process.cwd(), inputPath)}`);
  console.log('─'.repeat(50));

  if (cssFiles.length === 0) {
    console.log(`${YELLOW}No CSS files found at path${RESET}`);
    return;
  }

  for (const file of cssFiles) {
    console.log(`\nScanning: ${file}`);
    auditCSSFile(file);
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`${BOLD}TOKEN COMPLIANCE${RESET}`);

  if (violations.length === 0 && warnings.length === 0) {
    console.log(`${GREEN}✅ All values reference CSS custom properties${RESET}`);
  }

  for (const v of violations) {
    console.log(`\n${RED}❌ FAIL${RESET}  ${v.rule}`);
    console.log(`         File: ${v.file}:${v.line}`);
    console.log(`         Value: ${v.value}`);
    console.log(`         → ${v.fix}`);
  }

  for (const w of warnings) {
    console.log(`\n${YELLOW}⚠️  WARN${RESET}  ${w.rule}`);
    console.log(`         File: ${w.file}:${w.line}`);
    console.log(`         Value: ${w.value}`);
    console.log(`         → ${w.fix}`);
  }

  console.log('\n' + '─'.repeat(50));
  if (violations.length === 0) {
    console.log(`${GREEN}${BOLD}Result: PASS — ${warnings.length} warning${warnings.length !== 1 ? 's' : ''}${RESET}`);
  } else {
    console.log(`${RED}${BOLD}Result: FAIL — ${violations.length} violation${violations.length !== 1 ? 's' : ''}, ${warnings.length} warning${warnings.length !== 1 ? 's' : ''}${RESET}`);
    process.exitCode = 1;
  }
}

const target = process.argv[2];
if (!target) {
  console.error(`Usage: npm run design-review -- src/components/ComponentName`);
  process.exit(1);
}

run(target);
