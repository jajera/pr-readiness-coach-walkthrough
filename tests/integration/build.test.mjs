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
  'src/content/docs/reference/lessons.mdx',
  'src/content/docs/reference/links.mdx',
];

describe('Integration: build and structure', () => {
  it('all content pages exist', () => {
    expect(EXPECTED_PAGES).toHaveLength(19);
    for (const p of EXPECTED_PAGES) {
      expect(fs.existsSync(path.join(ROOT, p)), p).toBe(true);
    }
  });

  it('base path is configured correctly', () => {
    const cfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
    expect(cfg).toContain("base: '/pr-readiness-coach-walkthrough/'");
  });

  it('sidebar follows progressive walkthrough sections', () => {
    const cfg = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
    expect(cfg).toContain("label: 'Home'");
    const intro = cfg.indexOf("label: 'Introduction'");
    const arch = cfg.indexOf("label: 'Architecture'");
    const surfaces = cfg.indexOf("label: 'Surfaces'");
    const deploy = cfg.indexOf("label: 'Deploy'");
    const ops = cfg.indexOf("label: 'Operations'");
    const ref = cfg.indexOf("label: 'Reference'");
    expect(intro).toBeGreaterThan(-1);
    expect(arch).toBeGreaterThan(intro);
    expect(surfaces).toBeGreaterThan(arch);
    expect(deploy).toBeGreaterThan(surfaces);
    expect(ops).toBeGreaterThan(deploy);
    expect(ref).toBeGreaterThan(ops);
    expect(cfg).toContain('starlight-theme-vintage');
    expect(cfg).toContain('starlight-base-path');
    expect(cfg).not.toContain("slug: 'reference/glossary'");
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
});
