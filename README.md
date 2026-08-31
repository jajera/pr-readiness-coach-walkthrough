# PR Readiness Coach Walkthrough

Documentation companion for deploying and using the **PR Readiness Coach** — CLI, API, GitHub Actions, Kiro hooks, and owner UI.

**Site:** https://pr-readiness-coach-walkthrough.johna.kiwi/

Upstream product: [jajera/pr-readiness-coach](https://github.com/jajera/pr-readiness-coach).

## Quick start

```bash
npm install
npm run dev
```

Open the local preview URL (usually http://localhost:4321/).

## Structure

```text
src/content/docs/     Walkthrough (Astro Starlight)
public/               Favicon, CNAME, OG image, diagrams, screenshots
```

## Surfaces covered

- Local CLI (`pr-ready`) — full Bedrock, heuristic-only, fixtures, remote API
- AWS API (API Gateway + Lambda) + Cognito owner UI on Amplify
- GitHub Actions — OIDC deploy and warn-only PR comments
- Kiro IDE hooks — save heuristics and on-demand full analysis
- `ready.yml` Definition of Ready configuration
