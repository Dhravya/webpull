# Architecture

`webpull` is organized as a small CLI pipeline:

1. `src/cli.ts` parses command-line flags and config files.
2. `src/discover.ts` discovers candidate URLs from sitemaps, navigation, or fallback crawling.
3. `src/filter.ts` applies include/exclude URL filters.
4. `src/pool.ts` schedules URLs across Bun workers.
5. `src/worker.ts` fetches and converts each page.
6. `src/convert.ts` builds frontmatter and fallback Markdown.
7. `src/path.ts` maps URLs to output paths and resolves collisions.
8. `src/write.ts` writes Markdown files.
9. `src/manifest.ts` records run state for resume, diff, and changed-only flows.
10. `src/ui.ts` renders terminal progress.

The CLI keeps discovery, fetching, conversion, output mapping, and reporting separate so crawler behavior can be tested without relying on live sites.
