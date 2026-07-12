#!/usr/bin/env node
/**
 * Upstream / AWS docs link checker.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const UPSTREAM = "jajera/pr-readiness-coach";

export function extractPinnedRef(landing) {
  const branch = landing.match(
    /(?:Upstream branch|Pinned to(?: the)?|upstream links pin to(?: the)?)\s*`?(main)`?/i,
  );
  if (branch) return branch[1];
  return "main";
}

export function buildUpstreamPathLink(ref, filePath) {
  const cleaned = filePath.replace(/^\/+/, "");
  return `https://github.com/${UPSTREAM}/tree/${ref}/${cleaned}`;
}

export function extractUrls(content) {
  const urls = new Set();
  const md = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
  let m;
  while ((m = md.exec(content)) !== null) urls.add(m[2]);
  const bare = /https?:\/\/[^\s)`"'<>]+/g;
  while ((m = bare.exec(content)) !== null) {
    urls.add(m[0].replace(/[.,;:]+$/, ""));
  }
  return [...urls];
}

export function findWrongUpstreamRefs(content, pinnedRef, fileLabel = "input") {
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

async function headOk(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.ok) return { ok: true, status: res.status };
    const get = await fetch(url, { method: "GET", redirect: "follow" });
    return { ok: get.ok, status: get.status };
  } catch (err) {
    return { ok: false, status: 0, error: String(err.message || err) };
  }
}

function parseUpstreamGithubUrl(url) {
  const m = url.match(
    new RegExp(`github\\.com/${UPSTREAM}/(tree|blob)/([^/]+)/(.*)$`),
  );
  if (!m) {
    const root = url.match(
      new RegExp(`github\\.com/${UPSTREAM}/(tree|blob)/([^/]+)/?$`),
    );
    if (!root) return null;
    return { kind: root[1], ref: root[2], filePath: "" };
  }
  return { kind: m[1], ref: m[2], filePath: m[3].replace(/\/$/, "") };
}

function ghPathExists(ref, filePath) {
  try {
    if (!filePath) {
      execFileSync(
        "gh",
        ["api", `repos/${UPSTREAM}/commits/${ref}`, "--jq", ".sha"],
        {
          stdio: ["ignore", "pipe", "ignore"],
        },
      );
      return true;
    }
    const apiPath = `repos/${UPSTREAM}/contents/${filePath}?ref=${encodeURIComponent(ref)}`;
    execFileSync(
      "gh",
      [
        "api",
        apiPath,
        "--jq",
        'if type == "array" then .[0].path else .path end',
      ],
      {
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const ROOT = path.resolve(import.meta.dirname, "..");
  const DOCS = path.join(ROOT, "src/content/docs");
  const SKIP_NETWORK = process.env.SKIP_LINK_CHECK === "1";

  const landing = fs.readFileSync(path.join(DOCS, "index.mdx"), "utf8");
  const overviewPath = path.join(DOCS, "walkthrough/overview.mdx");
  const overview = fs.existsSync(overviewPath)
    ? fs.readFileSync(overviewPath, "utf8")
    : "";
  const pinnedRef =
    extractPinnedRef(overview) || extractPinnedRef(landing) || "main";
  if (!pinnedRef) {
    console.error(
      "Invalid upstream ref: could not determine expected branch or commit",
    );
    process.exit(1);
  }

  const errors = [];
  const allUrls = new Set();

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry.name)) {
        const content = fs.readFileSync(full, "utf8");
        const rel = path.relative(ROOT, full);
        for (const url of extractUrls(content)) allUrls.add(url);
        errors.push(...findWrongUpstreamRefs(content, pinnedRef, rel));
      }
    }
  }
  walk(DOCS);

  if (!SKIP_NETWORK) {
    for (const url of allUrls) {
      if (url.includes(`github.com/${UPSTREAM}/`)) {
        const parsed = parseUpstreamGithubUrl(url);
        if (!parsed) {
          errors.push(`Unrecognized upstream GitHub URL: ${url}`);
          continue;
        }
        if (!ghPathExists(parsed.ref, parsed.filePath)) {
          errors.push(`Broken upstream path (gh): ${url}`);
        }
        continue;
      }
      if (url.includes("docs.aws.amazon.com")) {
        const result = await headOk(url);
        if (!result.ok) {
          errors.push(
            `Broken link: ${url} (HTTP ${result.status}${result.error ? `, ${result.error}` : ""})`,
          );
        }
      }
    }
  } else {
    console.log("check-links: SKIP_NETWORK=1 — skipping HTTP/gh checks");
  }

  if (errors.length) {
    for (const e of errors) console.error(e);
    process.exit(1);
  }
  console.log(`check-links: OK (pinned ref ${pinnedRef})`);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
