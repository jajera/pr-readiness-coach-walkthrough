# Requirements Document

## Introduction

This document defines the requirements for a static documentation site that teaches developers and operators how to run, deploy, and integrate the PR Readiness Coach. The site is built with Astro + Starlight, deployed to GitHub Pages, and serves as an operational reference companion to the upstream product repository. The site contains no application or infrastructure-as-code itself; all product code lives in the upstream repo.

## Glossary

- **Site**: The Astro + Starlight static documentation site deployed to GitHub Pages at the repository base path `/pr-readiness-coach-walkthrough/`
- **Upstream_Product_Repo**: The GitHub repository `jajera/pr-readiness-coach` containing CLI, core, Lambda, hooks, web UI, and CDK
- **Upstream_Branch**: The `main` branch of Upstream_Product_Repo — all tree/blob links in the Site pin to this branch
- **Surface**: One product entrypoint documented by the Site — CLI, API, GitHub Actions PR comments, Kiro hooks, or owner UI
- **Starlight**: The Astro-based documentation theme used to build the Site
- **Aside**: A Starlight callout component supporting tip, caution, and danger variants
- **Placeholder_ID**: A synthetic identifier used in documentation instead of real AWS account IDs, API keys, or emails
- **Quality_Gate**: The `npm run build` command (including validators) that must pass without errors before merge or deploy

## Requirements

### Requirement 1: Landing and Scope

**User Story:** As a developer, I want a landing page that states purpose, audience, and scope, so that I know this is a docs companion and not the product repo.

#### Acceptance Criteria

1. THE Site SHALL display a splash landing page with purpose, CTAs to overview and upstream GitHub, and a short surface summary
2. THE Site SHALL state that upstream links pin to the `main` branch of Upstream_Product_Repo
3. THE Site SHALL present a “What this is / What this is not” comparison clarifying companion docs vs product code
4. THE README SHALL link Upstream_Product_Repo and the deployed GitHub Pages URL

### Requirement 2: Architecture Content

**User Story:** As an operator, I want architecture and pipeline pages, so that I understand how entrypoints share one core.

#### Acceptance Criteria

1. THE Site SHALL include an architecture overview page embedding the upstream architecture SVG with descriptive alt text
2. THE Site SHALL include a pipeline page describing context → heuristics → Diff Analyst → Risk Reviewer → Ship Coach → report
3. THE Site SHALL document dual auth: API key for machine clients and Cognito JWT for the owner UI
4. THE Site SHALL use Mermaid `graph TD` for at least one pipeline or data-flow diagram

### Requirement 3: Operator Walkthrough Surfaces

**User Story:** As a developer, I want progressive walkthrough pages for each surface, so that I can follow CLI, config, UI, and hooks without reading the entire operator markdown file.

#### Acceptance Criteria

1. THE Site SHALL document CLI modes, exit codes, and common commands
2. THE Site SHALL document `ready.yml` fields with examples adapted from upstream
3. THE Site SHALL document Cognito owner UI and Amplify zip deploy caveats
4. THE Site SHALL document Kiro IDE hooks (`when`/`then` schema) and warn-only exit behavior

### Requirement 4: Deploy and CI Guidance

**User Story:** As an operator, I want deploy, OIDC, and PR-comment pages, so that I can stand up AWS and GitHub integration safely.

#### Acceptance Criteria

1. THE Site SHALL document Bedrock model defaults for `ap-southeast-2`, CDK bootstrap/deploy, and stack outputs retrieval
2. THE Site SHALL document GitHub OIDC trust scoping to `main` and point to the minimum IAM policy in upstream
3. THE Site SHALL document warn-only `pr-ready.yml` secrets, comment marker, and heuristics fallback
4. THE Site SHALL document fixture demo commands and destroy steps

### Requirement 5: Reference and Quality Gates

**User Story:** As a maintainer, I want reference pages and automated quality gates, so that content stays accurate and safe.

#### Acceptance Criteria

1. THE Site SHALL include FAQ, secrets/outputs cheat sheet, lessons, and external links pages
2. THE Quality_Gate SHALL run placeholder, aside, and upstream-link validators before `astro build`
3. THE Site SHALL pin all Upstream_Product_Repo tree/blob links to the `main` branch
4. THE Site SHALL include integration and property tests covering page inventory, validators, and base path
5. THE Site SHALL reuse actionsforge Astro PR-check and Pages deploy workflows
