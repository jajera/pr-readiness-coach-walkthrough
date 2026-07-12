#!/usr/bin/env node
/**
 * Upstream / AWS docs link checker.
 * Enforces pinned ref (main). Existence checks use the GitHub HTTP API when
 * the upstream repo is readable; otherwise they are skipped (common in CI when
 * the default GITHUB_TOKEN cannot see a sibling private repo, or gh is absent).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UPSTREAM = 'jajera/pr-readiness-coach';

export function extractPinnedRef(landing) {
  const branch = landing.match(
    /(?:Upstream branch|Pinned to(?: the)?|upstream links pin to(?: the)?)\s*`?(main)`?/i,
  );
  if (branch) return branch[1];
  return 'main';
}

export function buildUpstreamPathLink(ref, filePath) {
  const cleaned = filePath.replace(/^\/+/, '');
  return `https://github.com/${UPSTREAM}/tree/${ref}/${cleaned}`;
}

export function extractUrls(content) {
  const urls = new Set();
  const md = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
  let m;
  while ((m = md.exec(content)) !== null) urls.add(m[2]);
  const bare = /https?:\/\/[^\s)`"'<>]+/g;
  while ((m = bare.exec(content)) !== null) {
    urls.add(m[0].replace(/[.,;:]+$/, ''));
  }
  return [...urls];
}

export function findWrongUpstreamRefs(content, pinnedRef, fileLabel = 'input') {
  const errors = [];
  for (const url of extractUrls(content)) {
    if (!url.includes(`github.com/${UPSTREAM}/`)) continue;
    const treeMatch = url.match(
      new RegExp(`github\\.com/${UPSTREAM}/(?:tree|blob)/([^/]+)/`),
    );
    if (treeMatch && treeMatch[1] !== pinnedRef) {
      errors.push(
        `Wrong upstream ref in ${fileLabel}: expected ${pinnedRef}, found ${treeMatch[1]} in ${url}`,
      );
    }
  }
  return errors;
}

function githubHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'pr-readiness-coach-walkthrough-link-check',
  };
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubGet(apiPath) {
  const res = await fetch(`https://api.github.com/${apiPath}`, {
    headers: githubHeaders(),
    redirect: 'follow',
  });
  return res;
}

async function headOk(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (res.ok) return { ok: true, status: res.status };
    const get = await fetch(url, { method: 'GET', redirect: 'follow' });
    return { ok: get.ok, status: get.status };
  } catch (err) {
    return { ok: false, status: 0, error: String(err.message || err) };
  }
}

export function parseUpstreamGithubUrl(url) {
  const m = url.match(
    new RegExp(`github\\.com/${UPSTREAM}/(tree|blob)/([^/]+)/(.*)$`),
  );
  if (!m) {
    const root = url.match(
      new RegExp(`github\\.com/${UPSTREAM}/(tree|blob)/([^/]+)/?$`),
    );
    if (!root) return null;
    return { kind: root[1], ref: root[2], filePath: '' };
  }
  return { kind: m[1], ref: m[2], filePath: m[3].replace(/\/$/, '') };
}

async function canAccessUpstream() {
  const res = await githubGet(`repos/${UPSTREAM}`);
  return res.ok;
}

async function upstreamPathExists(ref, filePath) {
  if (!filePath) {
    const res = await githubGet(`repos/${UPSTREAM}/commits/${encodeURIComponent(ref)}`);
    return res.ok;
  }
  const res = await githubGet(
    `repos/${UPSTREAM}/contents/${filePath}?ref=${encodeURIComponent(ref)}`,
  );
  return res.ok;
}

async function main() {
  const ROOT = path.resolve(import.meta.dirname, '..');
  const DOCS = path.join(ROOT, 'src/content/docs');
  const SKIP_NETWORK = process.env.SKIP_LINK_CHECK === '1';

  const landing = fs.readFileSync(path.join(DOCS, 'index.mdx'), 'utf8');
  const overviewPath = path.join(DOCS, 'walkthrough/overview.mdx');
  const overview = fs.existsSync(overviewPath)
    ? fs.readFileSync(overviewPath, 'utf8')
    : '';
  const pinnedRef = extractPinnedRef(overview) || extractPinnedRef(landing) || 'main';
  if (!pinnedRef) {
    console.error('Invalid upstream ref: could not determine expected branch or commit');
    process.exit(1);
  }

  const errors = [];
  const allUrls = new Set();

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry.name)) {
        const content = fs.readFileSync(full, 'utf8');
        const rel = path.relative(ROOT, full);
        for (const url of extractUrls(content)) allUrls.add(url);
        errors.push(...findWrongUpstreamRefs(content, pinnedRef, rel));
      }
    }
  }
  walk(DOCS);

  if (!SKIP_NETWORK) {
    const upstreamReadable = await canAccessUpstream();
    if (!upstreamReadable) {
      console.log(
        `check-links: upstream ${UPSTREAM} not readable via GitHub API — skipping path existence checks; still enforcing ref=${pinnedRef}`,
      );
    }

    for (const url of allUrls) {
      if (url.includes(`github.com/${UPSTREAM}/`)) {
        const parsed = parseUpstreamGithubUrl(url);
        if (!parsed) {
          errors.push(`Unrecognized upstream GitHub URL: ${url}`);
          continue;
        }
        if (upstreamReadable && !(await upstreamPathExists(parsed.ref, parsed.filePath))) {
          errors.push(`Broken upstream path: ${url}`);
        }
        continue;
      }
      if (url.includes('docs.aws.amazon.com')) {
        const result = await headOk(url);
        if (!result.ok) {
          errors.push(
            `Broken link: ${url} (HTTP ${result.status}${result.error ? `, ${result.error}` : ''})`,
          );
        }
      }
    }
  } else {
    console.log('check-links: SKIP_NETWORK=1 — skipping HTTP checks');
  }

  if (errors.length) {
    for (const e of errors) console.error(e);
    process.exit(1);
  }
  console.log(`check-links: OK (pinned ref ${pinnedRef})`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
