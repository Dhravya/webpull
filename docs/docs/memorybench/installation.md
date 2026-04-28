---
title: "Installation"
url: "https://supermemory.ai/docs/memorybench/installation"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Installation

> Get MemoryBench up and running in your environment

## Prerequisites

* [Bun](https://bun.sh) runtime installed
* API keys for providers and LLM judges you want to use

## Install MemoryBench

```bash theme={null}
git clone https://github.com/supermemoryai/memorybench
cd memorybench
bun install
```

## Configure API Keys

Create a `.env.local` file in the root directory:

```bash theme={null}
# Memory Providers (add keys for providers you want to test)
SUPERMEMORY_API_KEY=your_key
MEM0_API_KEY=your_key
ZEP_API_KEY=your_key

# LLM Judges (at least one required)
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
GOOGLE_API_KEY=your_key
```

<Note>
  You only need API keys for the providers and judges you plan to use. For example, to benchmark Supermemory with GPT-4o as judge, you only need `SUPERMEMORY_API_KEY` and `OPENAI_API_KEY`.
</Note>

## Verify Installation

```bash theme={null}
bun run src/index.ts help
```

You should see the list of available commands.

## Start the Web Interface

```bash theme={null}
bun run src/index.ts serve
```

Opens at [http://localhost:3000](http://localhost:3000).

## Next Steps

* [CLI Reference](/memorybench/cli) - Play around with MemoryBench
* [Architecture](/memorybench/architecture) - Understand how MemoryBench works
* [Extend MemoryBench](/memorybench/extend-provider) - Add custom providers, benchmarks, and prompts
