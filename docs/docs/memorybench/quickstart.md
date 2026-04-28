---
title: "Quick Start"
url: "https://supermemory.ai/docs/memorybench/quickstart"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Quick Start

> Run your first benchmark evaluation in 3 steps

## 1. Run Your First Benchmark

```bash theme={null}
bun run src/index.ts run -p supermemory -b longmemeval -j gpt-4o -r my-first-run
```

## 2. View Results

### Option A: Web UI

```bash theme={null}
bun run src/index.ts serve
```

Open [http://localhost:3000](http://localhost:3000) to see results visually.

### Option B: CLI

```bash theme={null}
# Check run status
bun run src/index.ts status -r my-first-run

# View failed questions for debugging
bun run src/index.ts show-failures -r my-first-run
```

## 3. Compare Providers

Run the same benchmark across multiple providers:

```bash theme={null}
bun run src/index.ts compare -p supermemory,mem0,zep -b locomo -j gpt-4o
```

## Sample Output

Each run produces a [MemScore](/memorybench/memscore) — a composite metric capturing quality, latency, and token efficiency:

```
SUMMARY:
  Total Questions: 50
  Correct: 36
  Accuracy: 72.00%

  Quality:  72%
  Latency:  1250ms (avg)
  Tokens:   1,823 (avg context sent to answering model)

  MemScore: 72% / 1250ms / 1823tok
```

Full results are saved to `data/runs/{runId}/report.json` with detailed breakdowns by question type, latency percentiles, and per-question token counts.

## What's Next

* [MemScore](/memorybench/memscore) — understand the composite metric and how to compare providers
* [CLI Reference](/memorybench/cli) — all available commands
* [Architecture](/memorybench/architecture) — how MemoryBench works under the hood
