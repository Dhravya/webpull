---
title: "Extend Provider"
url: "https://supermemory.ai/docs/memorybench/extend-provider"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Extend Provider

> Add a custom memory provider to MemoryBench

## Provider Interface

```typescript theme={null}
interface Provider {
  name: string
  prompts?: ProviderPrompts
  initialize(config: ProviderConfig): Promise<void>
  ingest(sessions: UnifiedSession[], options: IngestOptions): Promise<IngestResult>
  awaitIndexing(result: IngestResult, containerTag: string): Promise<void>
  search(query: string, options: SearchOptions): Promise<unknown[]>
  clear(containerTag: string): Promise<void>
}
```

***

## Adding a Custom Provider

### 1. Create the Provider

```typescript theme={null}
// src/providers/myprovider/index.ts
import type { Provider, ProviderConfig, UnifiedSession } from "../../types"

export class MyProvider implements Provider {
  name = "myprovider"
  private client: MyClient | null = null

  async initialize(config: ProviderConfig) {
    this.client = new MyClient({ apiKey: config.apiKey })
  }

  async ingest(sessions: UnifiedSession[], options: IngestOptions) {
    const documentIds: string[] = []
    for (const session of sessions) {
      const response = await this.client.add({
        content: JSON.stringify(session.messages),
        metadata: session.metadata
      })
      documentIds.push(response.id)
    }
    return { documentIds }
  }

  async awaitIndexing(result: IngestResult) {
    // Poll until indexing complete
  }

  async search(query: string, options: SearchOptions) {
    return await this.client.search({ q: query, limit: 10 })
  }

  async clear(containerTag: string) {
    await this.client.delete(containerTag)
  }
}
```

### 2. Register the Provider

```typescript theme={null}
// src/providers/index.ts
import { MyProvider } from "./myprovider"

export const providers = {
  supermemory: SupermemoryProvider,
  mem0: Mem0Provider,
  zep: ZepProvider,
  myprovider: MyProvider,  // Add here
}
```

### 3. Add Configuration

```typescript theme={null}
// src/utils/config.ts
case "myprovider":
  return {
    apiKey: process.env.MYPROVIDER_API_KEY!,
  }
```

***

## Custom Prompts

Providers can define custom answer and judge prompts for better results.

```typescript theme={null}
// src/providers/myprovider/prompts.ts
export const MY_PROMPTS: ProviderPrompts = {
  answerPrompt: (question, context, questionDate) => {
    return `Based on context:\n${context}\n\nAnswer: ${question}`
  },

  judgePrompt: (question, groundTruth, hypothesis) => ({
    default: "Compare answer to ground truth...",
    temporal: "Allow off-by-one for dates...",
    adversarial: "Check if model correctly abstained...",
  })
}
```

Then reference in your provider:

```typescript theme={null}
export class MyProvider implements Provider {
  name = "myprovider"
  prompts = MY_PROMPTS  // Custom prompts
  // ...
}
```
