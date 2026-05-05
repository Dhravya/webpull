# webpull

Pull any public docs site into local markdown files.

```
$ webpull https://docs.example.com

  ⚡ webpull · 16 workers
  docs.example.com → ./docs.example.com

  ●●●·●●●●·●●●●●●●·
  ├─ ✓ getting-started/installation.md
  ├─ ✓ api/authentication.md
  ├─ ✓ guides/deployment.md
  █████████████░░░░░░░ 68% 102/150 · 6p/s · 17.2s
```

## Install

```bash
bun install -g webpull
```

## Usage

```
webpull <url> [options]

Options:
  -o, --out <dir>   Output directory (default: ./<hostname>)
  -m, --max <n>     Max pages to pull (default: 500)
```

## Examples

```bash
# Pull React docs
webpull https://react.dev/reference

# Custom output dir, limit to 100 pages
webpull https://docs.python.org -o ./python-docs -m 100
```

## How it works

1. **Discovers pages** via sitemap.xml, nav link extraction, JS bundle route parsing, or link crawling
2. **Fetches in parallel** using a worker pool sized to your CPU cores
3. **Renders SPAs** with headless Chromium when JavaScript-rendered content is detected
4. **Converts to markdown** using [Defuddle](https://github.com/nichochar/defuddle) for intelligent content extraction
5. **Writes to disk** preserving the URL path structure with YAML frontmatter

Each markdown file includes metadata:

```yaml
---
title: "Getting Started"
url: "https://docs.example.com/getting-started"
---
```

## Requirements

- [Bun](https://bun.sh) runtime
- [Playwright](https://playwright.dev) Chromium (auto-used for SPAs; install with `npx playwright install chromium`)

## License

MIT
