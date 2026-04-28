---
title: "Extend Benchmark"
url: "https://supermemory.ai/docs/memorybench/extend-benchmark"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Extend Benchmark

> Add a custom benchmark dataset to MemoryBench

## Benchmark Interface

```typescript theme={null}
interface Benchmark {
  name: string
  load(config?: BenchmarkConfig): Promise<void>
  getQuestions(filter?: QuestionFilter): UnifiedQuestion[]
  getHaystackSessions(questionId: string): UnifiedSession[]
  getGroundTruth(questionId: string): string
  getQuestionTypes(): QuestionTypeRegistry
}
```

***

## Adding a Custom Benchmark

### 1. Create the Benchmark

```typescript theme={null}
// src/benchmarks/mybenchmark/index.ts
import type { Benchmark, UnifiedQuestion, UnifiedSession } from "../../types"

export class MyBenchmark implements Benchmark {
  name = "mybenchmark"
  private questions: UnifiedQuestion[] = []
  private sessions: Map<string, UnifiedSession[]> = new Map()

  async load() {
    const data = await this.loadDataset()
    this.processData(data)
  }

  getQuestions(filter?: QuestionFilter) {
    let result = [...this.questions]
    if (filter?.limit) result = result.slice(0, filter.limit)
    return result
  }

  getHaystackSessions(questionId: string) {
    return this.sessions.get(questionId) || []
  }

  getGroundTruth(questionId: string) {
    return this.questions.find(q => q.questionId === questionId)?.groundTruth || ""
  }

  getQuestionTypes() {
    return {
      "type1": { id: "type1", description: "Type 1 questions" },
      "type2": { id: "type2", description: "Type 2 questions" },
    }
  }
}
```

### 2. Register the Benchmark

```typescript theme={null}
// src/benchmarks/index.ts
import { MyBenchmark } from "./mybenchmark"

export const benchmarks = {
  locomo: LoComoBenchmark,
  longmemeval: LongMemEvalBenchmark,
  convomem: ConvoMemBenchmark,
  mybenchmark: MyBenchmark,  // Add here
}
```
