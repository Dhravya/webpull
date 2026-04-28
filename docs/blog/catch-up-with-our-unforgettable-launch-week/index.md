---
title: "Catch up with our UNFORGETTABLE Launch Week"
url: "https://supermemory.ai/blog/catch-up-with-our-unforgettable-launch-week/"
---

Over the last year, one belief has guided almost everything we’ve built at Supermemory

> AI becomes meaningfully useful only when it remembers.

Memory shouldn’t be something developers rebuild from scratch.  
It shouldn’t be fragile, expensive, or trapped inside a single tool.

So during Unforgettable Launch Week, we focused on one goal -

**Make memory simpler, faster, more accessible and available wherever AI lives.**

And instead of announcing ideas, we shipped things you can use today.

Below is a recap of what went live, and why it matters.

---

## memorybench - a standard way to evaluate AI memory

We kept building internal benchmarking rigs. So did our users.  
Everyone was duplicating effort, and still comparing incompatible results.

memorybench changes that.

> Introducing memorybench by [@supermemory](https://twitter.com/supermemory?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai) 🔬  
>   
> The standard, open source evaluation framework for all context systems, across any benchmark.  
>   
> Easily run and compare multiple memory providers. batteries included - comes with a Web UI, CLI, checkpoints and everything else. [pic.twitter.com/ORFEK23Shm](https://t.co/ORFEK23Shm?ref=blog.supermemory.ai)
> 
> — Dhravya Shah (@DhravyaShah) [December 24, 2025](https://twitter.com/DhravyaShah/status/2003961035204841722?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

GitHub: [https://github.com/supermemoryai/memorybench](https://github.com/supermemoryai/memorybench?ref=blog.supermemory.ai)

---

## New connectors: GitHub, S3, and Web Crawler

Your context doesn’t live in one place. Neither does Supermemory.

> Introducing new supermemory connectors 🔌  
>   
> \- Github: Sync with files and documentation  
> \- S3: Sync with all the buckets in an s3 system  
> \- Web Crawler: Keep a website indexed for instant answers [pic.twitter.com/g1ric0Eipd](https://t.co/g1ric0Eipd?ref=blog.supermemory.ai)
> 
> — supermemory (@supermemory) [December 25, 2025](https://twitter.com/supermemory/status/2004261846761853124?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

These sit alongside Notion, Google Drive, and OneDrive, which many of you already rely on.

Context shouldn’t be siloed. Now it isn’t.

Docs: [https://supermemory.ai/docs/connectors/overview](https://supermemory.ai/docs/connectors/overview?ref=blog.supermemory.ai)  
Access in console:[https://console.supermemory.ai/login](https://console.supermemory.ai/login?ref=blog.supermemory.ai)

---

## Conversations endpoint - cheaper, smarter conversations

Most LLM providers bill you for every token processed, even when nothing new is happening.

Our conversations endpoint now processes only the new tokens while keeping full context.

> Introducing the new [@supermemory](https://twitter.com/supermemory?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai) /conversations endpoint  
>   
> 1\. Better DX for conversational  
> 2\. Save cost by only processing the newer tokens  
> 3\. Better quality, as supermemory always keeps the conversations contextual  
>   
> Use it by simply updating the SDK to latest. No change needed. [pic.twitter.com/7cioifGpGu](https://t.co/7cioifGpGu?ref=blog.supermemory.ai)
> 
> — Dhravya Shah (@DhravyaShah) [December 26, 2025](https://twitter.com/DhravyaShah/status/2004692033378844796?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

That means:

- lower cost
- more consistent conversations
- fewer “I forgot” moments

Docs: [https://supermemory.ai/docs](https://supermemory.ai/docs?ref=blog.supermemory.ai)

---

## Hybrid Search - where memory meets retrieval

Memory alone isn’t always enough. Retrieval alone isn’t either.

Hybrid Search blends the two, improving context quality by 10–15 percent with a single toggle. No migrations or rewrites required, just better answers.

> sometimes you need memory. sometimes you need RAG.  
> Most of the times, you need both.  
>   
> Today, we are launching our hybrid search mode. a new way to bring context to your LLM.  
>   
> We have found this to improve LLM context by 10-15%. [pic.twitter.com/oC0t9VQduQ](https://t.co/oC0t9VQduQ?ref=blog.supermemory.ai)
> 
> — Dhravya Shah (@DhravyaShah) [December 26, 2025](https://twitter.com/DhravyaShah/status/2004702876074213425?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

Learn more:  
[https://supermemory.ai/docs/search/examples/memory-search#hybrid-search-mode](https://supermemory.ai/docs/search/examples/memory-search?ref=blog.supermemory.ai#hybrid-search-mode)

---

## Stateful coding agents (opencode plugin)

Traditional coding agents degrade over time. As threads grow, they forget earlier context and repeat themselves.

The Supermemory opencode plugin makes agents stateful. They learn in real time, maintain project awareness, and adapt across sessions.

> Your [@opencode](https://twitter.com/opencode?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai) agent is now stateful.  
> It can learn in real-time, update it's knowledge, and grow with you.  
>   
> Introducing the supermemory plugin for opencode. [pic.twitter.com/5tKzpJ47m1](https://t.co/5tKzpJ47m1?ref=blog.supermemory.ai)
> 
> — supermemory (@supermemory) [December 27, 2025](https://twitter.com/supermemory/status/2005030082063257765?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

For our own team, this changed the way we build software.

GitHub: [https://github.com/supermemoryai/opencode-supermemory](https://github.com/supermemoryai/opencode-supermemory?ref=blog.supermemory.ai)

---

## Embeddable Memory Graph

People like seeing how their knowledge connects.

We made the Supermemory graph embeddable so developers can include that same interactive visualization inside their own products. One component, fully customizable, integrated directly into the user experience.

> supermemory graph is now an embeddable react component  
>   
> you can customize & hack it to your own app designs too:) [https://t.co/mmPbe2UG88](https://t.co/mmPbe2UG88?ref=blog.supermemory.ai) [pic.twitter.com/D4cahG14cv](https://t.co/D4cahG14cv?ref=blog.supermemory.ai)
> 
> — supermemory (@supermemory) [December 29, 2025](https://twitter.com/supermemory/status/2005484719987970455?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

Docs: [https://supermemory.ai/docs/memory-graph/overview](https://supermemory.ai/docs/memory-graph/overview?ref=blog.supermemory.ai)

---

## code-chunk - chunking built for code

Most text splitters weren’t designed for code. They break logic, functions, and structure — which leads to poor recall.

code-chunk is AST-aware and splits at the right boundaries. In our evaluation, that improved recall by 28 points.

> Introducing code-chunk, an NPM package that excels at processing and preparing code for ingestion. [https://t.co/dLb5iZB2TR](https://t.co/dLb5iZB2TR?ref=blog.supermemory.ai)
> 
> — supermemory (@supermemory) [December 29, 2025](https://twitter.com/supermemory/status/2005743094600458467?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

Docs: [https://supermemory.ai/blog/building-code-chunk-ast-aware-code-chunking/](https://supermemory.ai/blog/building-code-chunk-ast-aware-code-chunking/?ref=blog.supermemory.ai)  
GitHub: [https://github.com/supermemoryai/code-chunk](https://github.com/supermemoryai/code-chunk?ref=blog.supermemory.ai)

---

## MCP 4 - memory that travels with you

We believe users should control their memory, not platforms.

MCP 4 allows Supermemory context to work across tools like ChatGPT, Claude, Windsurf, and others, using an open Model Context Protocol server.

> Install on [https://t.co/nqK0hNpWFE](https://t.co/nqK0hNpWFE?ref=blog.supermemory.ai)  
>   
> it's easy af [pic.twitter.com/JmV10TJVNl](https://t.co/JmV10TJVNl?ref=blog.supermemory.ai)
> 
> — Dhravya Shah (@DhravyaShah) [December 31, 2025](https://twitter.com/DhravyaShah/status/2006191872817987700?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

No lock-in. Memory that moves with you.

---

## The Supermemory Startup Program

We’ve benefited from communities and programs that supported us early. Now we want to extend that same support to the next wave of builders.

The Supermemory Startup Program offers:

- $1,000 in credits
- dedicated guidance from our team
- simple setup
- six months to build and iterate

We’ve already seen founders move from idea to working product dramatically faster once memory stops being the bottleneck.

Apply: [https://supermemory.link/startups](https://supermemory.link/startups?ref=blog.supermemory.ai)  
Read our blog: [https://supermemory.ai/blog/empowering-the-next-generation-of-founders-supermemory-startup-program/](https://supermemory.ai/blog/empowering-the-next-generation-of-founders-supermemory-startup-program/?ref=blog.supermemory.ai)

---

## Nova - our consumer app returns

We are bringing our VIRAL consumer app back! Say hello to NOVA.

A personal memory companion designed to help individuals organize, recall, and make sense of their knowledge across tools.

> supermemory started as a consumer app. You guys loved it. i was a user too.  
>   
> We are bringing it back - With a new identity, Nova. [pic.twitter.com/wFVwFkGDl7](https://t.co/wFVwFkGDl7?ref=blog.supermemory.ai)
> 
> — Dhravya Shah (@DhravyaShah) [December 31, 2025](https://twitter.com/DhravyaShah/status/2006509078093423020?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

Join the waitlist: [https://supermemory.ai/consumer](https://supermemory.ai/consumer?ref=blog.supermemory.ai)

---

## Where we’re headed

Every launch in Unforgettable Launch Week was built around these principle

> Memory should be reliable.  
> It should be accessible.  
> And it should exist everywhere AI operates.

Whether you’re experimenting, scaling, or building something entirely new, our goal is to give you memory infrastructure that stays out of the way - while quietly powering everything beneath it.

Thanks for being part of this journey. There is a lot more coming.