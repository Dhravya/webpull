---
title: "Supermemory vs Zep: Which is Better? (April 2026)"
url: "https://supermemory.ai/blog/supermemory-vs-zep/"
---

Fair warning: I'm the founder of Supermemory, so I'm obviously biased here. But I'm going to be as honest as I can.

We get asked about Zep a lot. It's a solid project, their Graphiti engine is genuinely interesting work. But every time someone comes to us after trying Zep, the story is the same: they started with chat memory, their use case grew, and suddenly they were building and maintaining a whole separate pipeline just to get documents and other data sources in.

So here's the breakdown.

**TLDR:**

- Supermemory delivers sub-300ms retrieval versus Zep's 4s with 85.4% accuracy on LongMemEval
- Zep requires custom builds for document extraction, connectors, and multi-modal data ingestion
- Supermemory includes memory graphs, user profiles, RAG, and connectors in one API at $0.01/1K tokens
- Zep's bitemporal graph suits compliance auditing; most teams need broader context infrastructure
- Supermemory provides a memory API that ranks first on LoCoMo and ConvoMem benchmarks

## What is Zep?

Zep positions itself as a context engineering solution for AI agents. The core idea: give agents the right information at the right time, pulling from chat history, business data, documents, and app events simultaneously. Sub-200ms latency is the headline claim.

The engine behind Zep is Graphiti, a temporally-aware knowledge graph that synthesizes both unstructured conversational data and structured business data. What makes Graphiti interesting is that it tracks historical relationships over time, so the system knows what happened, when it happened, and in what sequence.

Zep covers the basics well. You get user profiles, document retrieval, and partial connector support out of the box. Self-hosting is available. For teams building straightforward stateful agents, it's a reasonable starting point worth understanding before you compare.

## What is Supermemory?

We built Supermemory to solve a problem every AI developer hits eventually: memory infrastructure is a mess to build from scratch, and most solutions only solve part of the problem. Our answer is a single memory API that gives your agents the full context stack, with memory graphs, user profiles, RAG, connectors, and extractors all included.

The architecture is built around a five-layer system. Connectors pull from Notion, Slack, Google Drive, Gmail, and S3. Extractors process PDFs, audio, images, and video. Super-RAG handles hybrid vector and keyword retrieval with context-aware reranking. The memory graph tracks relationships between memories beyond simple similarity scores. User profiles combine static facts with evolving episodic context built automatically from behavior.

At scale, we process 100B+ tokens monthly with sub-300ms recall times. On benchmarks, we rank first on three benchmarks with 85.4% overall accuracy. The multi-session score of 76.7% versus 57.9% from competitors shows where the graph approach earns its keep.

Where Supermemory differs from Zep goes beyond feature count. The memory graph tracks knowledge evolution. Your agent retrieves context and understands how that context has evolved.

## Memory Graph Architecture

Both systems use graph-based memory, but the implementation decisions reveal very different philosophies about who should own the complexity.

### Zep's Graphiti Engine

Graphiti runs a three-tier hierarchy: an episode subgraph for raw conversational events, a semantic entity subgraph for extracted facts, and a community subgraph for higher-level relationships. Every node and edge carries both event time and ingestion time (bitemporal modeling), so you can ask "what did the system believe at time X?" separately from "when was this recorded?"

For compliance-heavy use cases, that's genuinely useful. Auditing past agent decisions, tracing when a fact was superseded. Where it gets harder is document extraction, multi-modal inputs, or broader connectors. Those sit outside Graphiti and require separate builds.

### Supermemory's Memory Graph

Our graph engine uses ontology-aware edges, meaning relationships carry semantic meaning over simple similarity scores. Knowledge updates, contradictions, merges, and inferences are handled without manual node management. The architecture builds on [temporal agent principles](https://medium.com/@aiwithakashgoyal/temporal-agents-in-graphos-building-time-aware-knowledge-graphs-with-multi-level-ingestion-ee448441929c?ref=blog.supermemory.ai) that let knowledge graphs track changes and prevent contradictions automatically.

On [LongMemEval-S](https://arxiv.org/abs/2501.13956?ref=blog.supermemory.ai), we hit 85.4% overall accuracy, with temporal reasoning at 82.0% versus 62.4% from other providers, and multi-session at 76.7% versus 57.9%. The graph connects directly to user profiles, connectors, and multi-modal extractors in one system. No separate infrastructure to wire together.

<table><tbody><tr><th colspan="1" rowspan="1"><p>Feature</p></th><th colspan="1" rowspan="1"><p>Supermemory</p></th><th colspan="1" rowspan="1"><p>Zep</p></th></tr><tr><td colspan="1" rowspan="1"><p>Memory Graph Architecture</p></td><td colspan="1" rowspan="1"><p>Ontology-aware edges with semantic relationships, automatic knowledge updates, contradictions, merges, and inferences without manual node management</p></td><td colspan="1" rowspan="1"><p>Three-tier hierarchy with bitemporal modeling (episode, semantic entity, and community subgraphs) tracking event time and ingestion time separately</p></td></tr><tr><td colspan="1" rowspan="1"><p>Retrieval Speed</p></td><td colspan="1" rowspan="1"><p>Sub-300ms consistently across 100B+ tokens monthly with hybrid vector and keyword search plus context-aware reranking</p></td><td colspan="1" rowspan="1"><p>Sub-200ms claimed latency, P95 around 300ms in practice, combines semantic embeddings, BM25 keyword search, and graph traversal</p></td></tr><tr><td colspan="1" rowspan="1"><p>Benchmark Accuracy</p></td><td colspan="1" rowspan="1"><p>85.4% overall on LongMemEval-S, 82.0% temporal reasoning, 76.7% multi-session, 59.7% P@1 on LoCoMo, 83.5% Recall@10</p></td><td colspan="1" rowspan="1"><p>62.4% temporal reasoning, 57.9% multi-session, 34.4% P@1 on LoCoMo, 69.3% Recall@10</p></td></tr><tr><td colspan="1" rowspan="1"><p>Data Ingestion and Connectors</p></td><td colspan="1" rowspan="1"><p>Pre-built connectors for Notion, Slack, Google Drive, Gmail, S3 with multi-modal extractors for PDFs, audio, video, images, web pages included across all tiers</p></td><td colspan="1" rowspan="1"><p>Built around conversational episodes (chat messages, meeting notes, business events), requires custom pipelines for documents, images, audio, and enterprise data repositories</p></td></tr><tr><td colspan="1" rowspan="1"><p>User Profiles</p></td><td colspan="1" rowspan="1"><p>Automatic two-layer profiles with static facts and evolving episodic context, updates without schema design or extraction logic, included in every API response</p></td><td colspan="1" rowspan="1"><p>Basic user profiles stored alongside temporal knowledge graph, requires manual configuration for profile extraction, update logic, and fact separation</p></td></tr><tr><td colspan="1" rowspan="1"><p>Cost Structure</p></td><td colspan="1" rowspan="1"><p>$0.01 per 1,000 tokens, $0.10 per 1,000 search queries, includes memory, RAG, user profiles, connectors, extractors, multi-modal processing, and plugins in one bill</p></td><td colspan="1" rowspan="1"><p>API pricing excludes extraction pipelines, embedding infrastructure, and connectors which require separate builds with separate costs and engineering maintenance</p></td></tr><tr><td colspan="1" rowspan="1"><p>Best For</p></td><td colspan="1" rowspan="1"><p>Engineering teams shipping AI products at scale needing complete memory stack with retrieval, connectors, extractors, and user profiles working together out of the box</p></td><td colspan="1" rowspan="1"><p>Conversational agents requiring bitemporal auditing for compliance with existing separate extraction pipelines and infrastructure already in place</p></td></tr></tbody></table>

## Retrieval Performance and Speed

Speed is where the gap between these two systems becomes concrete.

Zep claims sub-200ms latency by skipping LLM calls during retrieval, combining semantic embeddings, BM25 keyword search, and graph traversal. In practice, P95 latency sits around 300ms, and that number varies based on how well your embedding service is tuned. For on-premise deployments, that's another configuration layer your team owns.

Supermemory's retrieval comes in under 300ms consistently, across 100B+ tokens monthly. The LoCoMo benchmark puts this in perspective: 59.7% P@1 versus 34.4% for major providers, and 83.5% Recall@10 versus 69.3%. Faster and more accurate, because hybrid vector and keyword search runs with context-aware reranking and temporal filtering built in.

No separate embedding infrastructure to configure. No tradeoff between speed and quality at scale.

## Data Ingestion and Connectors

What your agent can remember depends entirely on what it can ingest. Narrow ingestion means narrow memory.

Zep's ingestion model is built around "episodes": chat messages, meeting notes, business events. For conversational agents, that's fine. For anything broader, documents, images, audio, enterprise data repositories, you're writing custom pipelines. Custom extraction logic, chunking strategy, embedding configuration, ongoing maintenance. Pre-built connectors for tools like Notion, Slack, or Google Drive simply aren't part of the package.

[Supermemory ships connectors](https://supermemory.ai/blog/faster-smarter-reliable-infinite-chat-supermemory-is-context-engineering/?ref=blog.supermemory.ai) for Notion, Slack, Google Drive, Gmail, and S3 out of the box, plus multi-modal extractors covering PDFs, audio, video, images, and web pages across every pricing tier, including free. Smart chunking preserves meaning at document boundaries automatically.

No embedding model to configure. No extraction pipeline to build. Your agent connects to existing data and starts building memory in minutes.

## User Profiles and Personalization

Zep includes user profiles stored alongside its temporal knowledge graph. The setup works for conversational agents needing basic user context, but profile extraction, update logic, and the separation between long-term and short-term facts all require manual configuration from your team.

Supermemory handles this automatically. Profiles split into two layers:

- Static facts the agent should always carry, like preferences, roles, and long-term goals
- Evolving episodic context built continuously from recent interactions

Both update without any schema design or extraction logic on your end. Every API response returns the relevant profile data alongside search results by default.

The practical result: your agents personalize from the first interaction and improve with every subsequent one. The built-in dashboard also gives product teams direct visibility into user personas, cutting down guesswork on feature decisions considerably.

## Cost Structure and Total Ownership

Zep's pricing excludes extraction pipelines, embedding infrastructure, and connectors. Those are separate builds with separate costs and separate engineering hours to maintain.

Supermemory's pricing is straightforward: $0.01 per 1,000 tokens and $0.10 per 1,000 search queries on Pro and Scale tiers. Memory, RAG, user profiles, connectors, extractors, multi-modal processing, and plugins all run on one bill. The free tier covers 1M tokens and 10K search queries monthly with unlimited storage and users.

The real savings come from consolidation. No vector database subscriptions. No embedding service fees. No engineer debugging a pipeline stitching three separate vendors together. For teams processing at scale, that maintenance overhead compounds faster than the service fees themselves.

## Why Supermemory is the Better Choice

Zep is a reasonable pick if bitemporal auditing is your exact requirement, compliance teams need to trace when facts changed, or your stack already handles extraction and connectors separately. For that narrow case, Graphiti delivers.

For most engineering teams, [the calculus is straightforward](https://supermemory.ai/blog/why-scira-ai-switched/?ref=blog.supermemory.ai). Supermemory ranks first on LoCoMo and ConvoMem, hits 85.4% on LongMemEval, and retrieves in under 300ms across real production volume. User profiles, multi-modal extractors, and data connectors ship included, not as separate infrastructure projects.

The honest tradeoff with Zep is time. Every capability outside conversational memory requires a custom build, another vendor, or both. For a VP of engineering at a startup, that's quarters you don't have.

Ship agents that remember. Build your product, not the memory layer.

## Final Thoughts on AI Memory Infrastructure

The [LLM memory comparison](https://supermemory.ai/?ref=blog.supermemory.ai) between Supermemory and Zep shows two different philosophies about complexity ownership. Zep gives you temporal graphs and leaves extraction, connectors, and scaling to your team. We built [Supermemory](https://supermemory.ai/?ref=blog.supermemory.ai) to handle the complete memory stack so you build features instead of infrastructure. At 85.4% accuracy with sub-300ms retrieval across 100B+ tokens monthly, your agents remember what matters. [Get started in console](https://console.supermemory.ai/?ref=blog.supermemory.ai) and ship stateful agents this week, not next quarter.

## FAQ

### How do I decide whether Zep or Supermemory fits my agent use case?

If your requirement is bitemporal auditing (tracing when facts changed for compliance), Zep's Graphiti engine handles that well. For everything else (multi-modal memory, connectors, user profiles that adapt automatically, and sub-300ms retrieval at scale), Supermemory delivers the complete stack without separate builds.

### What's the core difference between Zep's graph and Supermemory's memory graph?

Zep's Graphiti tracks temporal relationships at three layers (episodes, entities, communities) but requires manual configuration for extraction, connectors, and profile updates. Supermemory's graph handles knowledge updates, contradictions, and inferences automatically, with ontology-aware edges that connect to user profiles and multi-modal extractors in one system. No separate infrastructure to wire together.

### Who is Supermemory built for versus Zep?

Zep works for teams building conversational agents who need temporal auditing and already have separate extraction pipelines in place. Supermemory is built for engineering teams shipping AI products at scale who need memory, RAG, user profiles, connectors, and extractors working together out of the box (ranked first on LoCoMo and ConvoMem with 85.4% on LongMemEval).

### Can I migrate from Zep without rebuilding my entire memory layer?

Yes. Supermemory's API handles conversational history plus documents, images, audio, and enterprise data connectors immediately. You skip the custom extraction logic, embedding configuration, and connector builds Zep requires separately, cutting migration time from quarters to days while improving retrieval accuracy (59.7% P@1 versus 34.4% on benchmarks).

### What's the real cost difference beyond the API pricing?

Zep excludes extraction pipelines, embedding infrastructure, and connectors from pricing. Those are separate engineering projects with ongoing maintenance. Supermemory charges $0.01 per 1,000 tokens with memory, RAG, user profiles, connectors, extractors, and multi-modal processing on one bill, which means no vector database subscriptions or embedding service fees to track separately.