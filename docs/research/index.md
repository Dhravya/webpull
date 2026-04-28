---
title: "Supermemory Research — State-of-the-Art Agent Memory"
url: "https://supermemory.ai/research/"
---

## Introduction

Large Language Models (LLMs) fundamentally suffer from "forgetting". They treat every interaction as a new, discrete event, lacking the persistent continuity required for personalized user experiences. While Context Windows are growing, LLMs are still prone to forgetting context in the middle of the context window as shown by Liu et al. [^1] and high latency.

In this report, we introduce **Supermemory**, a memory engine designed to solve the problem of long-term coherence. We demonstrate that Supermemory achieves State-of-the-Art (SOTA) results on **LongMemEval\_s** [^2], effectively solving the challenges of temporal reasoning and knowledge conflicts in high-noise environments (115k+ tokens).

## The Evaluation Landscape: Why LongMemEval?

Current benchmarks in the LLM memory space often fail to capture the chaos of real-world production environments. Benchmarks like LoCoMo [^3] are insufficient for modern models due to their limited context size and lack of knowledge updates (testing ability to overwrite or update old and obsolete information with newer information).

We utilized **LongMemEval** [^2] for validation because it represents the most rigorous approximation of real-world chat history. It challenges the retrieval system not just on recall, but on reasoning over time and filtering out noise. Unlike other benchmarks (which present human-human interaction), LongMemEval tests for human-assistant interactions, which is representative of real-world usage, as also highlighted by Rasmussen et al. [^4]

**LongMemEval\_s** spans 500 questions split into 6 categories and evaluates five core memory capabilities:

- **Information Extraction:** Accurately extracting and storing factual information from conversations.
	- *single-session-user:* Retrieving literal context mentioned by the user within a single session.
		- *single-session-assistant:* Retrieving literal context mentioned by the assistant within a single session.
		- *single-session-preference:* Extracting implicit user preferences to inform personalized responses.
- **Multi-Session Reasoning:** Synthesizing information scattered across multiple conversation sessions. *Categories: multi-session*
- **Knowledge Update:** Handling scenarios where newer information contradicts or supersedes older facts. *Categories: knowledge-update*
- **Temporal Reasoning:** Understanding the sequence of events, calculating time intervals, and reasoning about relative timestamps. *Categories: temporal-reasoning*
- **Abstaining on Unanswerable Questions:** Recognizing when sufficient information is not available and appropriately declining to answer. *Categories: all*

These capabilities cover a broad variety of general real-world use-cases.

## Methodology: Supermemory's Architecture

Supermemory outperforms existing solutions by minimizing semantic ambiguity, which is a big reason for context not being utilized effectively in LLMs as demonstrated by Keluskar et al. [^5] We achieve this by coupling memories with temporal metadata, relations, and raw chunks.

### 1\. Chunk-based Ingestion & Contextual Memories

Standard RAG (Retrieval Augmented Generation) [^6] often fails because it retrieves raw chunks that lack context when isolated from the conversation. [^7]

![Example of where standard RAG fails due to ambiguity](https://framerusercontent.com/images/WTZiDWRV932kWfMLHxKuJnhyo.webp?width=1359&height=1845)

Example of where standard RAG fails due to ambiguity.

- **Chunking:** We decompose large sessions into manageable semantic blocks.
- **Memory Generation:** As we index the chunk, we also generate memories — single (atomic) pieces of information that resolve ambiguous references within the chunk using a modified version of Contextual Retrieval. [^8]

### 2\. Relational Versioning & Knowledge Chains

Supermemory also defines semantic relationships between new and existing memories. This allows us to map evolution of facts:

- `updates` **(State Mutation):** Handles contradictions or corrections (e.g., "My favorite color is now Green" updates "My favorite color is Blue"), creating a version history of sorts.
- `extends` **(Refinement):** Supplements existing nodes with new details without contradiction (e.g., adding a job title to an existing employment memory).
- `derives` **(Inference):** Captures second-order logic inferred from combining multiple distinct memories.
![Example of relational versioning in Supermemory](https://framerusercontent.com/images/IG3YIHOHBVQcLZiQW23H9Nl0IY.webp?width=1359&height=1163)

Example of relational versioning in Supermemory.

### 3\. Temporal Grounding

A core differentiator in our architecture is the dual-layer time-stamping approach, which drove our high scores in the *temporal-reasoning*, *knowledge-update*, and *multi-session* categories. For every memory, we extract:

- `documentDate`: The time the conversation took place.
- `eventDate`: The extracted timestamp of when the event described in the conversation actually occurred.
![Example of temporal grounding in Supermemory](https://framerusercontent.com/images/6DlMjgyjiJoXLwznwcy7N9VseI.webp?width=1359&height=605)

Example of temporal grounding in Supermemory.

### 5\. Session-Based Ingestion

Unlike the evaluation methodology described in the LongMemEval [^2] paper, which processes conversation history round-by-round (one user message followed by one assistant response), we choose to ingest the dataset session-by-session.

## Performance Results

Supermemory demonstrates superior performance across all categories on LongMemEval\_s. The system shows particular strength in **Multi Session (71.43%)** and **Temporal Reasoning (76.69%)**, areas where standard vector-store approaches historically struggle.

### LLM-as-Judge Evaluation

| Categories | SSU | SSA | SSP | KU | TR | MS | Overall |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Full-context (gpt-4o) | 81.4% | 94.6% | 20.0% | 78.2% | 45.1% | 44.3% | 60.2% |
| Zep (gpt-4o) | 92.9% | 80.4% | 56.7% | 83.3% | 62.4% | 57.9% | 71.2% |
| Supermemory (gpt-4o) | 97.14% | 96.43% | 70.00% | 88.46% | 76.69% | 71.43% | 81.6% |
| Supermemory (gpt-5) | 97.14% | 100% | 76.67% | 87.18% | 81.20% | 75.19% | 84.6% |
| Supermemory (gemini-3-pro) | 98.57% | 98.21% | 70.00% | 89.74% | 81.95% | 76.69% | 85.2% |
| Delta (gpt-4o) | ↑4.56% | ↑19.94% | ↑23.46% | ↑6.19% | ↑22.90% | ↑23.37% | ↑14.61% |

## How to reproduce these results

We believe in transparency and rigorous cross-validation.

- **Data & Prompts:** The full prompt used for answering is provided in our [appendix](#appendix). For answer evaluation, we used gpt-4o with the question-specific prompts provided in the LongMemEval paper. [^2]
- **Codebase:** The ingestion pipeline, search logic, and evaluation scripts are available in our [GitHub repository](https://github.com/supermemoryai).

## Conclusion

The ability to accurately recall user details, respect temporal sequences, and update knowledge over time is not a "feature" — it is a **prerequisite for Agentic AI**.

By moving beyond simple vector similarity and implementing this form of disambiguation, Supermemory provides a robust backend for enterprise applications. It transforms the LLM from a stateless processor into a **stateful assistant**, capable of maintaining long-term, personalized user narratives with high fidelity.

## Citations

## Appendix

Answering Prompt

```
You are a question-answering system. Based on the retrieved context below, answer the question.

Question: ${question}
Question Date: ${questionDate}

Retrieved Context:
${retrievedContext}

Understanding the Context:
The context contains search results from a memory system. Each result has multiple components you can use:

Memory: A high-level summary/atomic fact (e.g., "Alex loves hiking in mountains", "John reports to Maria")
  This is the searchable title/summary of what was stored

Chunks: The actual detailed raw content where the memory was extracted from
  Contains conversations, documents, messages, or text excerpts
  This is your primary source for detailed information and facts
  Look here for specifics, context, quotes, and evidence

Temporal Context (if present):
  Question Date: The date when the question was asked (provided above). Use this to understand the temporal perspective of the question.
  documentDate: ISO date string for when the content was originally authored/written/said by the user (NOT the system createdAt timestamp).
  eventDate: Array of ISO date strings for when the event/fact being referenced actually occurred or will occur.

Profile Data (if present):
  Static Profile: Permanent user characteristics (name, preferences, core identity)
  Dynamic Profile: Contains a subset of the recently added memories
  Version: Shows if a memory has been updated/extended over time

How to Answer:
  Start by scanning memory titles to find relevant results
  Read the chunks carefully - they contain the actual details you need
  Use temporal context to understand when things happened
  Use profile data for background about the user
  Synthesize information from multiple results if needed

Instructions:
  If the context contains enough information to answer the question, provide a clear, concise answer
  If the context does not contain enough information, respond with "I don't know" or explain what information is missing
  Base your answer ONLY on the provided context
  Prioritize information from chunks - they're the raw source material

Answer:
```

Results for Zep were taken from their paper. [^4]

[^1]: Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the middle: How language models use long contexts. *Transactions of the Association for Computational Linguistics*, 12, 157-173.

[^2]: Wu, D., Wang, H., Yu, W., Zhang, Y., Chang, K. W., & Yu, D. (2024). Longmemeval: Benchmarking chat assistants on long-term interactive memory. *arXiv preprint arXiv:2410.10813*

[^3]: Maharana, A., Lee, D. H., Tulyakov, S., Bansal, M., Barbieri, F., & Fang, Y. (2024). Evaluating very long-term conversational memory of llm agents. *arXiv preprint arXiv:2402.17753*

[^4]: Rasmussen, P., Paliychuk, P., Beauvais, T., Ryan, J., & Chalef, D. (2025). Zep: a temporal knowledge graph architecture for agent memory. *arXiv preprint arXiv:2501.13956*

[^5]: Keluskar, A., Bhattacharjee, A., & Liu, H. (2024, December). Do llms understand ambiguity in text? A case study in open-world question answering. In *2024 IEEE International Conference on Big Data (BigData)* (pp. 7485-7490). IEEE.

[^6]: Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N.,... & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive nlp tasks. *Advances in neural information processing systems*, 33, 9459-9474.

[^7]: Barnett, S., Kurniawan, S., Thudumu, S., Brannelly, Z., & Abdelrazek, M. (2024, April). Seven failure points when engineering a retrieval augmented generation system. In *Proceedings of the IEEE/ACM 3rd International Conference on AI Engineering* (pp. 194-199).

[^8]: Ford, D. (2024, September). Introducing Contextual Retrieval. In *Anthropic Engineering Blog*. [↗](https://www.anthropic.com/engineering/contextual-retrieval)

[^9]: Doval, Y., Vilares, J., & Gómez-Rodríguez, C. (2020). Towards robust word embeddings for noisy texts. *Applied Sciences*, 10(19), 6893.

[^10]: Shah P. (2024, August). The Effects of Data Noise on the Efficiency of Vector Search Algorithms. In *LinkedIn Pulse*. [↗](https://www.linkedin.com/pulse/effects-data-noise-efficiency-vector-search-algorithms-pankil-shah-4pwfe/)