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
    fix: (_v: string) => 'Replace with var(--space-[n]) — scale: 4px=1, 8px=2, 12px=3, 16px=4, 20px=5, 24px=6, 32px=8',
    severity: 'fail',
  },
  {
    pattern: /font-family\s*:\s*(?!var\()(["'][^"']+["']|[\w-]+)/g,
    rule: 'Hardcoded font-family',
    fix: () => 'Replace with var(--font-display) or var(--font-body)',
    severity: 'fail',
  },
  {
    // border-radius that isn't 0, 50%, or a var()
    pattern: /border-radius\s*:\s*(?!var\(|0|50%)([0-9]+(?:px|rem|em|%))/g,
    rule: 'Hardcoded border-radius',
    fix: () => 'Replace with var(--radius-default) [8px] or var(--radius-pill) [100px]',
    severity: 'fail',
  },
  {
    // box-shadow — Protonic flat elevation contract: depth via border + bg shift, not shadows
    pattern: /box-shadow\s*:\s*(?!none|inset\s+0\s+0\s+0)([^;]+)/g,
    rule: 'box-shadow detected — flat elevation contract',
    fix: () => 'Protonic uses flat elevation. Use border + background shift for depth. See contracts.ts: flatElevation',
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
