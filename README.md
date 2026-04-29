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
  -o, --out <dir>           Output directory (default: ./<hostname>)
  -m, --max <n>             Max pages to pull (default: 500)
  -c, --concurrency <n>     Concurrent workers (default: 8)
  --timeout <ms>            Request/job timeout in ms (default: 10000)
  --dry-run                 Print discovered URLs without fetching pages
  --include <pattern>       Include only matching URLs (glob or /regex/)
  --exclude <pattern>       Exclude matching URLs (glob or /regex/)
  --max-depth <n>           Max fallback crawl depth
  --failures <file>         Write failed URLs and errors as JSON
  --header <name:value>     Add request header (repeatable)
  --user-agent <string>     Set request User-Agent
  --resume                  Skip output files that already exist
  --overwrite, --force      Overwrite existing files (default)
  --json                    Print final summary as JSON
  --quiet                   Suppress progress UI
  -V, --version             Print version
```

## Examples

```bash
# Pull React docs
webpull https://react.dev/reference

# Custom output dir, limit to 100 pages
webpull https://docs.python.org -o ./python-docs -m 100

# Pull only reference docs, skip existing files
webpull https://example.com/docs --include "*/reference/*" --resume

# Crawl private docs with a token and write failures
webpull https://docs.example.com --header "Authorization: Bearer $TOKEN" --failures failures.json

# Preview URLs without downloading
webpull https://docs.example.com --dry-run
```

## How it works

1. **Discovers pages** via sitemap.xml, nav link extraction, or link crawling
2. **Fetches in parallel** using a worker pool sized to your CPU cores
3. **Converts to markdown** using [Defuddle](https://github.com/nichochar/defuddle) for intelligent content extraction
4. **Writes to disk** preserving the URL path structure with YAML frontmatter

Each markdown file includes metadata:

```yaml
---
title: "Getting Started"
url: "https://docs.example.com/getting-started"
---
```

## Requirements

- [Bun](https://bun.sh) runtime

## License

MIT
