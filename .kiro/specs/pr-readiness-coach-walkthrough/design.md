# Design Document

## Overview

Companion documentation site for `jajera/pr-readiness-coach`. Mirrors the Astro + Starlight walkthrough pattern used by other jajera companion sites: progressive sidebar, required MDX `description`, validators before build, upstream links pinned to `main`, Tooltip glossary (no dedicated glossary page).

## Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-1 | Astro 7 + Starlight + Patina theme | Matches sister walkthrough sites; custom-domain Pages |
| AD-2 | `base: "/"` | Custom domain root (`pr-readiness-coach-walkthrough.johna.kiwi`) |
| AD-3 | Content from OPERATOR_WALKTHROUGH + ARTICLE + capture notes | Operator bible + narrative + pitfalls without copying product code |
| AD-4 | Pin upstream links to `main` | Link checker enforces the `main` branch ref |
| AD-5 | Tooltip + `glossary.ts` | Inline definitions; no `/reference/glossary` slug |
| AD-6 | Amplify zip + dual auth called out early | Highest operator confusion risk from capture notes |
| AD-7 | Validate placeholders / asides / links before build | Prevent secret leakage and broken upstream refs |
| AD-8 | Reuse actionsforge Astro workflows | Consistent CI with other docs companions |

## Component Map

```text
src/content/docs/          MDX pages (Starlight)
src/components/Tooltip.astro
src/data/glossary.ts
scripts/check-*.mjs        Quality gates
public/diagrams/           Architecture SVG from upstream
docs/inventory.md          Upstream → page mapping + pin
.kiro/                     Requirements / design / tasks + steering
```

## Content Information Architecture

1. Introduction — overview, quick start
2. Architecture — system SVG, pipeline Mermaid
3. Surfaces — CLI, ready.yml, owner UI, Kiro
4. Deploy — AWS, OIDC, PR comments, demo
5. Operations — destroy, troubleshooting
6. Reference — FAQ, secrets, lessons, links

## Testing Strategy

- Property tests for placeholder scanner, aside validator, upstream link builder
- Integration test for page inventory, sidebar order, base path, successful `npm run build`
- Network link checks skippable via `SKIP_LINK_CHECK=1` for offline runs

## Upstream Mapping

See `docs/inventory.md` for the authoritative file → page table. Upstream links use the `main` branch.
