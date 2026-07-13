# Editor Tooling — Content Authoring Conventions

Conventions for MDX content in this walkthrough site. Mirror these when adding or editing pages under `src/content/docs/`.

## Placeholder IDs

Use only approved Placeholder_IDs in fenced code blocks, command examples, and output samples:

| Kind | Allowed values |
|------|----------------|
| Account IDs | `123456789012` (examples only) — prefer the text token `ACCOUNT_ID` |
| ARNs | Must use an allowed account ID or the literal `ACCOUNT_ID`, and suffix resource names with `EXAMPLE` where practical |
| Emails | `you@example.com` only |
| Secrets | Never paste real API keys; use `...` or `$PR_READY_API_KEY` |
| DNS | Hostnames must include `EXAMPLE`, or be an allowlisted public service endpoint (`sts.amazonaws.com`, `lambda.amazonaws.com`, `cloudformation.amazonaws.com`, `token.actions.githubusercontent.com`) |
| Regions | Prefer `REGION` or documented defaults like `ap-southeast-2` |

The quality gate (`scripts/check-placeholders.mjs`) rejects other 12-digit IDs and non-placeholder AWS DNS inside fenced code blocks. Prose outside code blocks is not scanned for account IDs.

## Aside types

Allowed Starlight asides only:

- `:::tip` — suggestions and recommended practices
- `:::caution` — careful steps / misconfiguration risk
- `:::danger` — cost, data loss, or security exposure

Do not use `:::note`, `:::warning`, or `:::info`. Enforced by `scripts/check-asides.mjs`.

## Mermaid diagrams

- Use `graph TD` (top-down) for architecture and pipeline diagrams
- Include a short legend subgraph when shapes would otherwise be ambiguous
- Prefer the static SVG under `public/diagrams/` for the primary architecture view; Mermaid for data-flow / pipeline detail

## Upstream links

Pin every upstream link to the **`main`** branch.

Format:

```text
https://github.com/jajera/pr-readiness-coach/tree/main/<path>
```

Common path mapping:

| Topic | Upstream path |
|-------|---------------|
| Operator walkthrough | `docs/OPERATOR_WALKTHROUGH.md` |
| Architecture diagram | `docs/builder-center/pr-readiness-architecture.svg` |
| ready.yml | `ready.yml` |
| CLI | `src/cli/` |
| Core | `src/core/` |
| Lambda | `src/lambda/` |
| Hook | `src/hook/` |
| Web | `web/` |
| Infra | `infra/` |
| Fixtures | `fixtures/demo-app/` |
| Kiro hooks | `.kiro/hooks/` |

## Auth framing

When documenting auth, keep the dual-path model clear:

- **API key** (`x-api-key`) for machine clients on `POST /analyze`
- **Cognito JWT** for the Amplify SPA on `/runs` and `/ui/analyze`

Never instruct authors to put `VITE_API_KEY` or the API key value into the browser bundle.
