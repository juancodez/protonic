#!/usr/bin/env node
/**
 * audit-all — run Component Auditor across every component in src/components/
 * Usage: npm run audit:all
 * Writes audit-report.md to project root after run.
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const RESET  = '\x1b[0m';
const RED    = '\x1b[31m';
const GREEN  = '\x1b[32m';
const BOLD   = '\x1b[1m';
const YELLOW = '\x1b[33m';

const root       = resolve(process.cwd());
const components = resolve(root, 'src', 'components');

const dirs = readdirSync(components, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`\n${BOLD}AUDIT ALL — Protonic${RESET}`);
console.log(`Components: ${dirs.join(', ')}`);
console.log('═'.repeat(50));

interface AuditResult {
  name: string;
  pass: boolean;
  violations: string[];
}

const results: AuditResult[] = [];

for (const name of dirs) {
  const path = join('src', 'components', name);
  const result = spawnSync('tsx', ['src/agents/component-auditor.ts', path], {
    cwd:      root,
    encoding: 'utf-8',
    shell:    true,
  });
  const passed = result.status === 0;
  const violations = result.stdout
    ? result.stdout.split('\n').filter(l => l.includes('FAIL')).map(l => l.trim())
    : [];
  results.push({ name, pass: passed, violations });
  const icon = passed ? `${GREEN}✅${RESET}` : `${RED}❌${RESET}`;
  console.log(`${icon}  ${name}`);
  for (const v of violations) console.log(`   ${YELLOW}→${RESET} ${v}`);
}

console.log('\n' + '═'.repeat(50));
const passedCount = results.filter(r => r.pass).length;
const total       = results.length;
const allPass     = passedCount === total;
const color       = allPass ? GREEN : RED;
console.log(`${color}${BOLD}${passedCount}/${total} components passed${RESET}`);

// Write audit-report.md
const now      = new Date().toISOString().split('T')[0];
const tableRows = results
  .map(r => `| ${r.name} | ${r.pass ? '✅ PASS' : '❌ FAIL'} | ${r.violations.length} |`)
  .join('\n');

const violationDetails = results
  .filter(r => !r.pass)
  .map(r => `### ${r.name}\n${r.violations.map(v => `- ${v}`).join('\n') || '- (run npm run audit -- src/components/' + r.name + ' for details)'}`)
  .join('\n\n');

const report = `# Audit Report — Protonic
Generated: ${now}

## Summary

| Component | Status | Violations |
|-----------|--------|------------|
${tableRows}

**${passedCount}/${total} components passed**

${violationDetails ? `## Violations\n\n${violationDetails}` : '## No violations — all components pass ✅'}
`;

writeFileSync(join(root, 'audit-report.md'), report);
console.log(`\nReport written → audit-report.md`);

if (!allPass) process.exitCode = 1;
