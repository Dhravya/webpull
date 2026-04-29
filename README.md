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
  --convert-timeout <ms>    Defuddle timeout in ms, 0 disables (default: 0)
  --delay <ms>              Minimum delay between requests to the same host
  --timeout <ms>            Request/job timeout in ms (default: 10000)
  --dry-run                 Print discovered URLs without fetching pages
  --config <file>           Load config JSON
  --changed-only            Fetch only URLs missing from the manifest/output
  --diff                    Compare discovered URLs with the manifest and exit
  --manifest <file>         Manifest path (default: <out>/.webpull-manifest.json)
  --include <pattern>       Include only matching URLs (glob or /regex/)
  --exclude <pattern>       Exclude matching URLs (glob or /regex/)
  --max-depth <n>           Max fallback crawl depth
  --failures <file>         Write failed URLs and errors as JSON
  --header <name:value>     Add request header (repeatable)
  --user-agent <string>     Set request User-Agent
  --respect-robots          Respect robots.txt Disallow during fallback crawl
  --respect-noindex         Skip pages marked with robots noindex
  --resume                  Skip output files that already exist
  --overwrite, --force      Overwrite existing files (default)
  --json                    Print final summary as JSON
  --jsonl <file>            Write one JSON record per fetched page
  --single-file <file>      Write all fetched pages into one Markdown file
  --llms-txt <file>         Write an llms.txt-style bundle
  --quiet                   Suppress progress UI
  --verbose                 Print additional run details
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

# Generate a single bundle and manifest
webpull https://docs.example.com --single-file docs.md --manifest manifest.json

# Respect crawl policy and pace requests
webpull https://docs.example.com --respect-robots --delay 250
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
fetched_at: "2026-04-29T00:00:00.000Z"
status: 200
content_type: "text/html"
---
```

## Requirements

- [Bun](https://bun.sh) runtime

## License

MIT
