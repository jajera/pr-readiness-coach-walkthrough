# pr-readiness-coach-walkthrough

Documentation companion site (Astro + Starlight) for deploying and using the PR Readiness Coach.

| What this is | What this is not |
| --- | --- |
| A static walkthrough and architecture reference site | The application / CLI / CDK source |
| Operational guidance for CLI, API, CI, Kiro hooks, and owner UI | A live AWS lab environment |
| Companion docs with upstream links pinned to `main` | The source of truth for product code |

**Upstream product:** [jajera/pr-readiness-coach](https://github.com/jajera/pr-readiness-coach)

**Deployed site:** <https://jajera.github.io/pr-readiness-coach-walkthrough/>

## Quick start

```bash
npm install
npm run dev
npm run build
```

## Surfaces covered

- Local CLI (`pr-ready`) — full Bedrock, heuristic-only, fixtures, remote API
- AWS API (API Gateway + Lambda) + Cognito owner UI on Amplify
- GitHub Actions — OIDC deploy and warn-only PR comments
- Kiro IDE hooks — save heuristics and on-demand full analysis
- `ready.yml` Definition of Ready configuration
