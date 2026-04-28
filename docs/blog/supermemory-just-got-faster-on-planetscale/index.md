---
title: "Supermemory just got faster on PlanetScale"
url: "https://supermemory.ai/blog/supermemory-just-got-faster-on-planetscale/"
---

## What is Supermemory?

Supermemory completes the missing part of the LLM puzzle: memory. Just as memory is crucial for human intelligence, it's essential for truly intelligent AI systems. We've built a portable memory engine that works seamlessly across different LLMs through multiple interfaces, including an [API](https://supermemory.ai/docs/memory-api/introduction?ref=blog.supermemory.ai), [SDKs](https://supermemory.ai/docs/memory-api/sdks/typescript?ref=blog.supermemory.ai), [base URL swap (Infinite Chat)](https://supermemory.ai/docs/model-enhancement/context-extender?ref=blog.supermemory.ai), and [MCP](https://mcp.supermemory.ai/?ref=blog.supermemory.ai).

## Our Database Problems

Our previous database solution, TigerData (previously Timescale), worked okay for us, but there were a few issues that we encountered:

- No branching or forking made development and testing risky
- Performance was okay, but nothing exceptional, especially given the cost
- The dashboard experience was horrendous, making monitoring painful
- Logs were nearly impossible to navigate and often went missing entirely - When things went wrong, we were often dumbstruck and it took longer to debug critical errors.
- Analytics were fairly basic, with no query optimization suggestions to help us improve performance

These issues weren't just minor inconveniences. Supermemory works with vectors and massive amounts of user documents.

We're constantly ingesting and retrieving huge volumes of data. Every millisecond counts for our [Infinite Chat product](https://supermemory.ai/docs/model-enhancement/context-extender?ref=blog.supermemory.ai), where users expect instant responses. Meanwhile, our TigerData costs exploded as we scaled.

## Migrating to PlanetScale

PlanetScale didn't just provide a database; they provided a partnership.

We met their team in person at their office, where they worked with us closely and gave us hands-on support for a smooth migration. Beyond that, they provided amazing resources for a no downtime migration.

We used their [proxy script](https://github.com/planetscale/migration-scripts/tree/main/postgres-direct?ref=blog.supermemory.ai) to perform the migration from TigerData to PlanetScale with no interruption to our users, which is what mattered to us most.

## The Results Speak for Themselves

The impact was immediate and dramatic:

- Costs dropped from $900/mo to $90/mo (90% reduction!)
- **QPS jumped from 20 to 1000 (50x improvement!)**
- **Our p99 for the database is always less than 6ms - making our services much faster than before**
- Affordable and pre-validated backups that have already saved us once

Another huge win was PlanetScale’s Insights dashboard, which gave us an in-depth look at our query performance. This deep level of observability is crucial to us as we scale.

For a company building the future of AI memory, finding a database that could keep up with our ambitions was crucial. We’re excited that we no longer have to worry about handling scale as we grow. We can now focus on building more incredible features for our users, which is our top priority.