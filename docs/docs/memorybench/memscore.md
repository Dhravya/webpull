---
title: "MemScore"
url: "https://supermemory.ai/docs/memorybench/memscore"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MemScore

> A composite metric for comparing memory providers across quality, latency, and token efficiency

## What is MemScore?

MemScore is a composite metric that captures three dimensions of memory provider performance in a single line:

```
accuracy% / latencyMs / contextTok
```

For example:

```
85% / 120ms / 1500tok
```

This tells you the provider achieved **85% accuracy**, with an average search latency of **120ms**, sending **1,500 tokens** of context to the answering model per question.

## Components

| Component   | What it measures                                   | Source                                                    |
| ----------- | -------------------------------------------------- | --------------------------------------------------------- |
| **Quality** | Answer accuracy as a percentage                    | `(correct / total) * 100` from judge evaluations          |
| **Latency** | Average search response time in milliseconds       | Mean of all search phase durations                        |
| **Tokens**  | Average context tokens sent to the answering model | Client-side token count of retrieved context per question |

<Note>
  MemScore is not a single number — it's a triple. This is intentional. Collapsing quality, latency, and cost into one score hides important tradeoffs. A provider with 90% accuracy at 5,000 tokens is very different from one with 90% accuracy at 500 tokens.
</Note>

## How token counting works

MemoryBench counts tokens client-side using provider-specific tokenizers:

| Model provider | Tokenizer                 | Method                                                   |
| -------------- | ------------------------- | -------------------------------------------------------- |
| **OpenAI**     | `js-tiktoken`             | Exact count using `o200k_base` or `cl100k_base` encoding |
| **Anthropic**  | `@anthropic-ai/tokenizer` | Exact count using Anthropic's tokenizer                  |
| **Google**     | Approximation             | `Math.ceil(text.length / 4)`                             |

Three token values are tracked per question:

* **`promptTokens`** — Total tokens in the full prompt (instructions + context + question)
* **`basePromptTokens`** — Tokens in the prompt without any retrieved context
* **`contextTokens`** — Tokens in just the retrieved context string

The MemScore uses `contextTokens` because it isolates what the memory provider actually contributed.

## Where MemScore appears

### CLI output

After a benchmark run completes, MemScore is printed in the summary:

```
SUMMARY:
  Total Questions: 50
  Correct: 43
  Accuracy: 86.00%

  Quality:  86%
  Latency:  145ms (avg)
  Tokens:   1,823 (avg context sent to answering model)

  MemScore: 86% / 145ms / 1823tok
```

### Web UI

The MemScore card appears at the top of the run overview page. Per-question token counts are shown next to each model answer in both the question list and detail views.

### Report JSON

The `report.json` file includes both a display string and structured components:

```json theme={null}
{
  "memscore": "86% / 145ms / 1823tok",
  "memscoreComponents": {
    "quality": 86,
    "latencyMs": 145,
    "contextTokens": 1823
  },
  "tokens": {
    "totalTokens": 142500,
    "basePromptTokens": 21000,
    "contextTokens": 91150,
    "avgTokensPerQuestion": 2850,
    "avgBasePromptTokens": 420,
    "avgContextTokens": 1823
  }
}
```

Use `memscoreComponents` for programmatic comparisons — it avoids parsing the display string.

## Comparing providers

MemScore is most useful when comparing providers on the same benchmark:

```bash theme={null}
bun run src/index.ts compare -p supermemory,mem0,zep -b locomo -j gpt-4o
```

Each provider's report will include its own MemScore, making it easy to see tradeoffs at a glance:

| Provider   | MemScore                |
| ---------- | ----------------------- |
| Provider A | `88% / 145ms / 1200tok` |
| Provider B | `82% / 80ms / 2400tok`  |
| Provider C | `85% / 110ms / 1800tok` |

In this example, Provider A has the highest accuracy but the slowest search. Provider B is the fastest but sends the most context without achieving the best accuracy — suggesting its retrieval may be less precise. Provider C lands in the middle on all three axes. There's no single "winner" — the right choice depends on whether you prioritize quality, speed, or token efficiency.

## Backward compatibility

Runs from before MemScore was added will still work. If token data is not present in the checkpoint, the `memscore`, `memscoreComponents`, and `tokens` fields will be `undefined` in the report. The CLI and web UI gracefully skip the MemScore display when data is unavailable.
