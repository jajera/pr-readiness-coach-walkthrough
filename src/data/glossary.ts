export type GlossaryEntry =
  | string
  | {
      definition: string;
      url?: string;
      urlLabel?: string;
    };

export const glossary: Record<string, GlossaryEntry> = {
  'pr-readiness-coach':
    'AI coach that answers “is this branch ready for a PR?” via heuristics and optional Bedrock agents.',
  'pr-ready':
    'Local CLI entrypoint (`npm run pr-ready`) that runs the shared core against git, a path, or the remote API.',
  readyyml:
    'Optional root `ready.yml` Definition of Ready — test globs, forbidden paths, max diff size, custom regex blockers, and path allowlists.',
  heuristics:
    'Fast local pre-screen for secrets, TODOs, debug logs, and custom regex — no Bedrock cost; used by `--local`, save hooks, and CI fallback.',
  'diff-analyst':
    'First Bedrock agent — summarizes the diff and surfaces likely risk areas for the rest of the pipeline.',
  'risk-reviewer':
    'Second Bedrock agent — scores risks and blockers from context plus Diff Analyst output.',
  'ship-coach':
    'Final Bedrock agent — merges findings into a verdict, checklist, draft PR title/body, and top actions.',
  verdict:
    'Structured report outcome: READY, READY WITH WARNINGS, or NOT READY — with blockers, warnings, and checklist.',
  'api-key-auth':
    'Machine-client auth for `POST /analyze` — GitHub Actions and CLI send `x-api-key`; never bake the key into the SPA.',
  'cognito-jwt':
    'Owner UI auth — Cognito email/password → JWT `Authorization: Bearer` for `/runs` and `/ui/analyze`. Self-sign-up is disabled.',
  'amplify-zip':
    'SPA hosting path: CDK creates Amplify app/branch with auto-build off; a separate job zip-uploads the Vite build — no GitHub↔Amplify Git connection.',
  'warn-only':
    'CI and Kiro hooks always exit 0 — they coach with comments/reports but never hard-block merges in v1.',
  'upstream-main':
    'Upstream product links in this walkthrough pin to the `main` branch of jajera/pr-readiness-coach.',
  'upstream-product-repo':
    'jajera/pr-readiness-coach — TypeScript product (CLI, Lambda, hooks, web, CDK); this site is the docs companion only.',
  bedrock:
    'Amazon Bedrock Converse API used for Diff Analyst, Risk Reviewer, and Ship Coach — defaults target ap-southeast-2 (Nova Lite + Claude Haiku 4.5 AU profile).',
  oidc:
    'GitHub Actions OIDC assume-role for Deploy — no long-lived AWS access keys in the public product repo.',
  dynamodb:
    'Optional run-history table (`-c enableDynamo=true`) with ~30-day TTL and GSI byRepo — used by the owner UI.',
  placeholderid:
    'Synthetic identifier in docs (e.g. ACCOUNT_ID, you@example.com) instead of real account IDs, API keys, or emails.',
};

export function resolveGlossaryEntry(entry: GlossaryEntry | undefined) {
  if (!entry) return { definition: undefined, url: undefined, urlLabel: undefined };
  if (typeof entry === "string") {
    return { definition: entry, url: undefined, urlLabel: undefined };
  }
  return {
    definition: entry.definition,
    url: entry.url,
    urlLabel: entry.urlLabel ?? entry.url,
  };
}
