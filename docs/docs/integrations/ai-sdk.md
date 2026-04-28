---
title: "Vercel AI SDK"
url: "https://supermemory.ai/docs/integrations/ai-sdk"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Vercel AI SDK

> Use Supermemory with Vercel AI SDK for seamless memory management

The Supermemory AI SDK provides native integration with Vercel's AI SDK through two approaches: **User Profiles** for automatic personalization and **Memory Tools** for agent-based interactions.

<Card title="@supermemory/tools on npm" icon="npm" href="https://www.npmjs.com/package/@supermemory/tools">
  Check out the NPM page for more details
</Card>

## Installation

```bash theme={null}
npm install @supermemory/tools
```

## Quick Comparison

| Approach      | Use Case                                               | Setup             |
| ------------- | ------------------------------------------------------ | ----------------- |
| User Profiles | Personalized LLM responses with automatic user context | Simple middleware |
| Memory Tools  | AI agents that need explicit memory control            | Tool definitions  |

***

## User Profiles with Middleware

Automatically inject user profiles into every LLM call for instant personalization.

```typescript theme={null}
import { generateText } from "ai"
import { withSupermemory } from "@supermemory/tools/ai-sdk"
import { openai } from "@ai-sdk/openai"

const modelWithMemory = withSupermemory(openai("gpt-5"), {
  containerTag: "user-123",
  customId: "conversation-456",
})

const result = await generateText({
  model: modelWithMemory,
  messages: [{ role: "user", content: "What do you know about me?" }]
})
```

<Note>
  **Memory saving is disabled by default.** The middleware only retrieves existing memories. To automatically save new memories:

  ```typescript theme={null}
  const modelWithMemory = withSupermemory(openai("gpt-5"), {
    containerTag: "user-123",
    customId: "conversation-456",
    addMemory: "always",
  })
  ```
</Note>

### Memory Search Modes

**Profile Mode (Default)** - Retrieves the user's complete profile:

```typescript theme={null}
const model = withSupermemory(openai("gpt-4"), { containerTag: "user-123", customId: "conv-1", mode: "profile" })
```

**Query Mode** - Searches memories based on the user's message:

```typescript theme={null}
const model = withSupermemory(openai("gpt-4"), { containerTag: "user-123", customId: "conv-1", mode: "query" })
```

**Full Mode** - Combines profile AND query-based search:

```typescript theme={null}
const model = withSupermemory(openai("gpt-4"), { containerTag: "user-123", customId: "conv-1", mode: "full" })
```

### Custom Prompt Templates

Customize how memories are formatted. The template receives `userMemories`, `generalSearchMemories`, and `searchResults` (raw array for filtering by metadata):

```typescript theme={null}
import { withSupermemory, type MemoryPromptData } from "@supermemory/tools/ai-sdk"

const claudePrompt = (data: MemoryPromptData) => `
<context>
  <user_profile>
    ${data.userMemories}
  </user_profile>
  <relevant_memories>
    ${data.generalSearchMemories}
  </relevant_memories>
</context>
`.trim()

const model = withSupermemory(anthropic("claude-3-sonnet"), {
  containerTag: "user-123",
  customId: "conv-1",
  mode: "full",
  promptTemplate: claudePrompt,
})
```

### Verbose Logging

```typescript theme={null}
const model = withSupermemory(openai("gpt-4"), {
  containerTag: "user-123",
  customId: "conv-1",
  verbose: true,
})
// Console output shows memory retrieval details
```

### When Supermemory errors (default: continue without memories)

If the Supermemory API returns an error, is unreachable, or retrieval hits the internal time limit, memory injection is skipped. **`skipMemoryOnError` defaults to `true`**, so the LLM call still runs with the **original** prompt (no injected memories). Use `verbose: true` if you want console output when that happens.

To **fail the call** when memory retrieval fails instead, set `skipMemoryOnError: false`:

```typescript theme={null}
const model = withSupermemory(openai("gpt-5"), {
  containerTag: "user-123",
  customId: "conv-1",
  skipMemoryOnError: false,
})
```

***

## Memory Tools

Add memory capabilities to AI agents with search, add, and fetch operations.

```typescript theme={null}
import { streamText } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { supermemoryTools } from "@supermemory/tools/ai-sdk"

const anthropic = createAnthropic({ apiKey: "YOUR_ANTHROPIC_KEY" })

const result = await streamText({
  model: anthropic("claude-3-sonnet"),
  prompt: "Remember that my name is Alice",
  tools: supermemoryTools("YOUR_SUPERMEMORY_KEY")
})
```

### Available Tools

**Search Memories** - Semantic search through user memories:

```typescript theme={null}
const result = await streamText({
  model: openai("gpt-5"),
  prompt: "What are my dietary preferences?",
  tools: supermemoryTools("API_KEY")
})
// AI will call: searchMemories({ informationToGet: "dietary preferences" })
```

**Add Memory** - Store new information:

```typescript theme={null}
const result = await streamText({
  model: anthropic("claude-3-sonnet"),
  prompt: "Remember that I'm allergic to peanuts",
  tools: supermemoryTools("API_KEY")
})
// AI will call: addMemory({ memory: "User is allergic to peanuts" })
```

### Using Individual Tools

For more control, import tools separately:

```typescript theme={null}
import {
  searchMemoriesTool,
  addMemoryTool
} from "@supermemory/tools/ai-sdk"

const result = await streamText({
  model: openai("gpt-5"),
  prompt: "What do you know about me?",
  tools: {
    searchMemories: searchMemoriesTool("API_KEY", { projectId: "personal" }),
    createEvent: yourCustomTool,
  }
})
```

### Tool Results

```typescript theme={null}
// searchMemories result
{ success: true, results: [...], count: 5 }

// addMemory result
{ success: true, memory: { id: "mem_123", ... } }
```
