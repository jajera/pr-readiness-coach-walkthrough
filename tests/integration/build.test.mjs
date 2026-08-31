import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const EXPECTED_PAGES = [
  'src/content/docs/index.mdx',
  'src/content/docs/architecture/overview.mdx',
  'src/content/docs/architecture/pipeline.mdx',
  'src/content/docs/walkthrough/overview.mdx',
  'src/content/docs/walkthrough/quick-start.mdx',
  'src/content/docs/walkthrough/cli.mdx',
  'src/content/docs/walkthrough/ready-yml.mdx',
  'src/content/docs/walkthrough/owner-ui.mdx',
  'src/content/docs/walkthrough/kiro-hooks.mdx',
  'src/content/docs/walkthrough/deploy-aws.mdx',
  'src/content/docs/walkthrough/github-oidc.mdx',
  'src/content/docs/walkthrough/pr-comments.mdx',
  'src/content/docs/walkthrough/demo.mdx',
  'src/content/docs/walkthrough/destroy.mdx',
  'src/content/docs/walkthrough/troubleshooting.mdx',
  'src/content/docs/reference/faq.mdx',
  'src/content/docs/reference/secrets.mdx',
  'src/content/docs/reference/deploy-iam-policy.mdx',
  'src/content/docs/reference/lessons.mdx',
  'src/content/docs/reference/links.mdx',
];

describe('Integration: build and structure', () => {
  it('all content pages exist', () => {
    expect(EXPECTED_PAGES).toHaveLength(20);
    for (const p of EXPECTED_PAGES) {
      expect(fs.existsSync(path.join(ROOT, p)), p).toBe(true);
    }
  });

  it('base path is configured correctly', () => {
    const cfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
    expect(cfg).toContain('base: "/"');
  });

  it('sidebar follows progressive walkthrough sections', () => {
    const cfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
    expect(cfg).toMatch(/label:\s*["']Home["']/);
    const intro = cfg.search(/label:\s*["']Introduction["']/);
    const arch = cfg.search(/label:\s*["']Architecture["']/);
    const surfaces = cfg.search(/label:\s*["']Surfaces["']/);
    const deploy = cfg.search(/label:\s*["']Deploy["']/);
    const ops = cfg.search(/label:\s*["']Operations["']/);
    const ref = cfg.search(/label:\s*["']Reference["']/);
    expect(intro).toBeGreaterThan(-1);
    expect(arch).toBeGreaterThan(intro);
    expect(surfaces).toBeGreaterThan(arch);
    expect(deploy).toBeGreaterThan(surfaces);
    expect(ops).toBeGreaterThan(deploy);
    expect(ref).toBeGreaterThan(ops);
    expect(cfg).toMatch(/slug:\s*["']walkthrough\/demo["']/);
    expect(cfg).toMatch(/slug:\s*["']reference\/deploy-iam-policy["']/);
    expect(cfg).toContain('patina-tokens.css');
    expect(cfg).toContain('ThemeSelect');
    expect(cfg).not.toContain('starlight-theme-vintage');
    expect(cfg).not.toContain('starlight-base-path');
    expect(cfg).not.toContain("slug: 'reference/glossary'");
  });

  it('capture screenshots are present', () => {
    const shots = [
      'public/screenshots/01-deploy-actions.png',
      'public/screenshots/01-amplify-ui.png',
      'public/screenshots/01-amplify-try-it.png',
      'public/screenshots/02-pr-comment-ready.png',
      'public/screenshots/02-pr-comment-warnings.png',
      'public/screenshots/03-kiro-hooks-panel.png',
      'public/screenshots/03-hook-run.png',
    ];
    for (const p of shots) {
      expect(fs.existsSync(path.join(ROOT, p)), p).toBe(true);
    }
  });

  it('overview links to the upstream product repo', () => {
    const page = fs.readFileSync(
      path.join(ROOT, 'src/content/docs/walkthrough/overview.mdx'),
      'utf8',
    );
    expect(page).toContain('github.com/jajera/pr-readiness-coach');
  });

  it('npm run build exits 0', () => {
    execSync('npm run build', {
      cwd: ROOT,
      stdio: 'pipe',
      env: { ...process.env, SKIP_LINK_CHECK: '1' },
    });
  }, 180_000);

  it('built pages use root-relative screenshot paths', () => {
    const html = fs.readFileSync(
      path.join(ROOT, 'dist/walkthrough/github-oidc/index.html'),
      'utf8',
    );
    expect(html).toContain('src="/screenshots/01-deploy-actions.png"');
    expect(html).not.toContain('/pr-readiness-coach-walkthrough/screenshots/');
  });
});
