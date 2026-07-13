# Upstream Content Inventory

**Upstream repo:** `jajera/pr-readiness-coach`  
**Upstream branch:** `main` (all upstream links pin to this branch)  
**Tree URL:** https://github.com/jajera/pr-readiness-coach/tree/main

## File Mapping

| Upstream Source | Target Domain | Target Path |
|-----------------|---------------|-------------|
| `README.md` | Landing / Intro | `src/content/docs/index.mdx`, `walkthrough/overview.mdx`, `walkthrough/quick-start.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §1 | Surfaces | `walkthrough/cli.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §2 | Deploy | `walkthrough/deploy-aws.mdx`, `walkthrough/github-oidc.mdx`, `reference/deploy-iam-policy.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §3 | Intro | `walkthrough/demo.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §3b | Surfaces | `walkthrough/kiro-hooks.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §4 | Ops | `walkthrough/destroy.mdx` |
| `docs/builder-center/ARTICLE.md` | Intro / Reference | `walkthrough/overview.mdx`, `reference/lessons.mdx` |
| `docs/builder-center/pr-readiness-architecture.svg` | Architecture | `public/diagrams/pr-readiness-architecture.svg` |
| `docs/builder-center/pr-readiness-architecture.png` | Architecture | `public/diagrams/pr-readiness-architecture.png` |
| `docs/builder-center/og-image.png` | Branding | `public/og-image.png` |
| `docs/capture/01-*.png` | Deploy / Surfaces | `public/screenshots/` → OIDC, Owner UI |
| `docs/capture/02-*.png` | Deploy | `public/screenshots/` → PR Comments |
| `docs/capture/03-*.png` | Surfaces | `public/screenshots/` → Kiro Hooks |
| `docs/capture/01-infra-cicd.md` | Deploy | `walkthrough/deploy-aws.mdx`, `walkthrough/github-oidc.mdx` |
| `docs/capture/02-pr-demo-in-ci.md` | Deploy | `walkthrough/pr-comments.mdx` |
| `docs/capture/03-kiro-loop.md` | Surfaces | `walkthrough/kiro-hooks.mdx` |
| `ready.yml` | Surfaces | `walkthrough/ready-yml.mdx` |

## Assets Copied

| Upstream file | Site path | Usage |
|---------------|-----------|-------|
| `docs/builder-center/pr-readiness-architecture.svg` | `public/diagrams/pr-readiness-architecture.svg` | Architecture overview |
| `docs/builder-center/pr-readiness-architecture.png` | `public/diagrams/pr-readiness-architecture.png` | PNG fallback |
| `docs/builder-center/pr-readiness-architecture.drawio` | `docs/pr-readiness-architecture.drawio` | Editable diagram source |
| `docs/builder-center/og-image.png` | `public/og-image.png` | Social / OG image |
| `docs/builder-center/og-image.svg` | `public/og-image.svg` | SVG variant |
| `docs/capture/01-deploy-actions.png` | `public/screenshots/` | GitHub OIDC |
| `docs/capture/01-amplify-ui.png` | `public/screenshots/` | Owner UI |
| `docs/capture/01-amplify-try-it.png` | `public/screenshots/` | Owner UI |
| `docs/capture/02-pr-comment-ready.png` | `public/screenshots/` | PR Comments |
| `docs/capture/02-pr-comment-warnings.png` | `public/screenshots/` | PR Comments |
| `docs/capture/03-kiro-hooks-panel.png` | `public/screenshots/` | Kiro Hooks |
| `docs/capture/03-hook-run.png` | `public/screenshots/` | Kiro Hooks |
| IAM JSON from OPERATOR §2 | `docs/deploy-iam-policy.json` + `reference/deploy-iam-policy.mdx` | OIDC deploy role |

## Upstream Paths (`main` branch)

Link format:

```text
https://github.com/jajera/pr-readiness-coach/tree/main/<path>
```

| Topic | Upstream path |
|-------|---------------|
| Operator walkthrough | `docs/OPERATOR_WALKTHROUGH.md` |
| Architecture SVG | `docs/builder-center/pr-readiness-architecture.svg` |
| Capture: infra | `docs/capture/01-infra-cicd.md` |
| Capture: PR CI | `docs/capture/02-pr-demo-in-ci.md` |
| Capture: Kiro | `docs/capture/03-kiro-loop.md` |
| ready.yml | `ready.yml` |
| CLI | `src/cli/` |
| Core pipeline | `src/core/` |
| Lambda | `src/lambda/` |
| Hook | `src/hook/` |
| Web UI | `web/` |
| CDK infra | `infra/` |
| Fixtures | `fixtures/demo-app/` |
| Kiro hooks | `.kiro/hooks/` |
