# Examples

Preview discovered URLs:

```bash
webpull https://docs.example.com --dry-run
```

Pull docs with conservative concurrency and pacing:

```bash
webpull https://docs.example.com --concurrency 4 --delay 250 --respect-robots
```

Pull only reference pages:

```bash
webpull https://docs.example.com --include "*/reference/*" --exclude "*/blog/*"
```

Write a manifest and combined output:

```bash
webpull https://docs.example.com \
  --manifest manifest.json \
  --single-file docs.md \
  --llms-txt llms.txt
```

Use private docs headers:

```bash
webpull https://docs.example.com --header "Authorization: Bearer $TOKEN"
```

Compare discovered URLs against a previous manifest:

```bash
webpull https://docs.example.com --manifest manifest.json --diff
```
