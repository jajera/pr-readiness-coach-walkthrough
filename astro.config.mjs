import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";
import mermaid from "astro-mermaid";

export default defineConfig({
  site: "https://pr-readiness-coach-walkthrough.johna.kiwi",
  base: "/",
  // starlight-image-zoom and astro-mermaid need the remark/rehype pipeline.
  markdown: {
    processor: unified(),
  },
  integrations: [
    mermaid(),
    starlight({
      title: "PR Readiness Coach Walkthrough",
      favicon: "/favicon.svg",
      description:
        "Walkthrough companion for deploying and using the PR Readiness Coach — CLI, API, GitHub Actions, Kiro hooks, and owner UI.",
      customCss: [
        "./src/styles/patina-tokens.css",
        "./src/styles/splash-overrides.css",
      ],
      components: {
        ThemeSelect: "./src/components/ThemeSelect.astro",
        Head: "./src/components/Head.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content:
              "https://pr-readiness-coach-walkthrough.johna.kiwi/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content:
              "PR Readiness Coach Walkthrough — CLI, API, GitHub Actions, Kiro hooks, owner UI",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content:
              "https://pr-readiness-coach-walkthrough.johna.kiwi/og-image.png",
          },
        },
      ],
      plugins: [starlightImageZoom()],
      social: [
        {
          icon: "github",
          label: "Source Repository",
          href: "https://github.com/jajera/pr-readiness-coach-walkthrough",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/jajera/pr-readiness-coach-walkthrough/edit/main/",
      },
      lastUpdated: true,
      pagination: true,
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Introduction",
          items: [
            { label: "Overview", slug: "walkthrough/overview" },
            { label: "Quick Start", slug: "walkthrough/quick-start" },
            { label: "Demo", slug: "walkthrough/demo" },
          ],
        },
        {
          label: "Architecture",
          items: [
            { label: "System Overview", slug: "architecture/overview" },
            { label: "Pipeline", slug: "architecture/pipeline" },
          ],
        },
        {
          label: "Surfaces",
          items: [
            { label: "CLI", slug: "walkthrough/cli" },
            { label: "ready.yml", slug: "walkthrough/ready-yml" },
            { label: "Owner UI", slug: "walkthrough/owner-ui" },
            { label: "Kiro Hooks", slug: "walkthrough/kiro-hooks" },
          ],
        },
        {
          label: "Deploy",
          items: [
            { label: "AWS Deploy", slug: "walkthrough/deploy-aws" },
            { label: "GitHub OIDC", slug: "walkthrough/github-oidc" },
            { label: "PR Comments", slug: "walkthrough/pr-comments" },
          ],
        },
        {
          label: "Operations",
          items: [
            { label: "Destroy", slug: "walkthrough/destroy" },
            { label: "Troubleshooting", slug: "walkthrough/troubleshooting" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "FAQ", slug: "reference/faq" },
            { label: "Secrets & Outputs", slug: "reference/secrets" },
            { label: "Deploy IAM Policy", slug: "reference/deploy-iam-policy" },
            { label: "Lessons", slug: "reference/lessons" },
            { label: "Links", slug: "reference/links" },
          ],
        },
      ],
    }),
  ],
});
