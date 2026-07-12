# Upstream Content Inventory

**Upstream repo:** `jajera/pr-readiness-coach`  
**Upstream branch:** `main` (all upstream links pin to this branch)  
**Tree URL:** https://github.com/jajera/pr-readiness-coach/tree/main

## File Mapping

| Upstream Source | Target Domain | Target Path |
|-----------------|---------------|-------------|
| `README.md` | Landing / Intro | `src/content/docs/index.mdx`, `walkthrough/overview.mdx`, `walkthrough/quick-start.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §1 | Surfaces | `walkthrough/cli.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §2 | Deploy | `walkthrough/deploy-aws.mdx`, `walkthrough/github-oidc.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §3 | Deploy | `walkthrough/demo.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §3b | Surfaces | `walkthrough/kiro-hooks.mdx` |
| `docs/OPERATOR_WALKTHROUGH.md` §4 | Ops | `walkthrough/destroy.mdx` |
| `docs/builder-center/ARTICLE.md` | Intro / Reference | `walkthrough/overview.mdx`, `reference/lessons.mdx` |
| `docs/builder-center/pr-readiness-architecture.svg` | Architecture | `public/diagrams/pr-readiness-architecture.svg` |
| `docs/builder-center/og-image.svg` | Branding | `public/og-image.svg` |
| `docs/capture/01-infra-cicd.md` | Deploy / Reference | `walkthrough/deploy-aws.mdx`, `walkthrough/github-oidc.mdx`, `reference/lessons.mdx` |
| `docs/capture/02-pr-demo-in-ci.md` | Deploy | `walkthrough/pr-comments.mdx` |
| `docs/capture/03-kiro-loop.md` | Surfaces | `walkthrough/kiro-hooks.mdx` |
| `ready.yml` | Surfaces | `walkthrough/ready-yml.mdx` |
| `.kiro/specs/pr-readiness-coach/design.md` | Architecture | `architecture/overview.mdx`, `architecture/pipeline.mdx` |

## Assets Copied

| Upstream file | Site path | Usage |
|---------------|-----------|-------|
| `docs/builder-center/pr-readiness-architecture.svg` | `public/diagrams/pr-readiness-architecture.svg` | Architecture overview |
| `docs/builder-center/pr-readiness-architecture.drawio` | `docs/pr-readiness-architecture.drawio` | Editable diagram source |
| `docs/builder-center/og-image.svg` | `public/og-image.svg` | Social / OG image |

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
