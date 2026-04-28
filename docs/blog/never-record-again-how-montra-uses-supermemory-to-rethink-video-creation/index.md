---
title: "Never Record Again: How Montra Uses Supermemory to Rethink Video Creation"
url: "https://supermemory.ai/blog/never-record-again-how-montra-uses-supermemory-to-rethink-video-creation/"
---

Campbell Baron, the founder of [Montra](http://montra.com/?ref=blog.supermemory.ai), has been making videos since he was twelve. By thirteen, he was already doing brand work. Today, he’s betting on a very different future for creators: a world where recording is the exception, and most videos are generated from scratch.

Montra’s vision is bold: in the future, most videos won’t be recorded. Instead, they’ll be generated. Recording will become the minority use case, replaced by AI tools that can produce entire videos from scratch.

That’s why Montra was built as a *generative-only* video editor. Instead of forcing users to stitch eight-second clips in another app, Montra lets you generate multiple related clips, arrange them as scenes, and finish the story inside one simple editor. Their unofficial slogan sums it up well: *never record again.*

![](https://supermemory.ai/blog/content/images/size/w2400/2025/08/Screenshot-2025-08-21-at-11.47.49.png)

## The Problem

But building a tool around that vision exposed a critical problem: if you’re asking people to generate endlessly instead of record, how do you make sure they can actually find and reuse what they’ve created?

Basically, Montra needed a solid, searchable media library. Users needed to come back weeks later, type *“the sailing clip I made”*, and instantly pull it up.

In the ideal world, this meant having a search system smart enough to:

- Analyze every clip as it was generated.
- Index those clips in a way that captures meaning, not just filenames.
- Let users query naturally in plain language.
- Deliver results instantly, without friction.

The obvious solution? A vector database. Store every clip’s embedding, query later, and serve it back.

Simple in theory, but in practice, every option Montra tried introduced more complexity than it solved:

- **Postgres ML**
	- A solid product, but “strenuous in setup.”
		- Gave more control than Montra needed.
		- Added extra engineering overhead
- **Supabase vectors**
	- More pieces to configure and maintain.
		- Long-term infra burden.
- **Pinecone**
	- Powerful, but only one piece of the puzzle.
		- Still needed Montra to glue together media analysis, storage, embeddings, and search logic.
		- Ended up fragmenting the stack instead of simplifying it.

For Campbell and his six-person team, this was a non-starter. They were already handling complex engineering where it was unavoidable, like their transcoding pipelines, but search wasn’t supposed to be one of those things.

As he put it:

*“Users don’t care about complexity, and neither should we. It’s 2025, there should be some service provider that just does this for us.”*

## The Turning Point

That service provider did exist; Montra just hadn’t found it yet.

Campbell first stumbled on Supermemory through X. The landing page felt obvious: clean, straightforward, and unlike the alternatives, it didn’t look like a second product his team would have to manage. He passed it to one of his engineers, who put together a proof of concept in half an hour.

It worked. From there, integration into Montra’s existing pipeline took about a week of part-time work. And then came the moment that mattered most: *“As soon as we ran our first search and it came back lightning fast, we were like holy shit*. *This works.*”

It wasn’t a fluke. They tried it again with different queries, and the results were just as fast. For the first time, recall felt instant and effortless, exactly what Montra had envisioned from the start.

For Montra, Supermemory wasn’t just “another vector database.” It was the first tool that actually matched their needs: fast to set up, effortless to run, and powerful enough to handle their generative media at scale.

Campbell breaks it down simply: *“It was at least **five times faster** to implement than the second-best alternative, and **two to three times faster in performance**. But the best part was not having to maintain it.”*

Here’s what stood out to the team:

- **5x faster to implement** compared to the next-best alternativeTheir devs could spin up a proof of concept in 30 minutes and have the full integration done within a week. No other solution even came close.
- **2-3x faster search results with natural language.**Users don’t need to remember file names or scroll endlessly. They just describe what they want, and the system surfaces it in seconds.
- **Zero ongoing maintenance.** Unlike self-hosted or stitched-together vector DBs, Supermemory required no day-to-day babysitting. Campbell called this one of the biggest selling points: *“The lack of ongoing maintenance is huge.”*
- **Every clip became searchable.**Montra now stores each media ID alongside an AI description in Supermemory. That means a user can type *“the sailing clip from last week”* and immediately get the right result.
- **Developer focus preserved** The six-person team could keep working on the core product instead of spending scarce engineering cycles managing infrastructure.
- **Actually useful support** Anytime they ran into issues, Campbell got replies in minutes. *“I figured he \[Dhravya\] must be 19 or 20. No one else replies that fast.”*

For Campbell, the biggest takeaway was that Supermemory felt like Montra itself: abstracting away complexity so the end-user experience stays simple. Just as Montra hides recording complexity from creators, Supermemory hides infra complexity from builders.

## From Search to Memory: What’s Next?

Supermemory solved Montra’s immediate pain: turning a broken library into a lightning-fast, natural language search. But Campbell doesn’t see it as just search infrastructure. For him, the bigger play is memory. He wants to make the media library intelligent, not just indexed.

With memory, Montra isn’t limited to *reacting* when users type a query. It can start anticipating what they’ll need:

- When a user adds a new scene, Montra could suggest related clips that they generated a month ago.
- When arranging transitions, it could surface presets that worked well in past projects.
- When credits are running low, it could recommend reusing older clips instead of regenerating.
- When finishing a draft, it could push users to add music or polish based on patterns in their past work.

*“All editors today just react. We want to anticipate,”* Campbell says. *“Supermemory makes that possible.”*

Memory helps Montra deliver an opinionated workflow by nudging users toward better videos, faster. A traditional video editor can’t do that, because it doesn’t remember what you’ve created before. Supermemory gives Montra that long-term, persistent context.

And this is where Supermemory shows its range. For [Flow](https://supermemory.ai/blog/the-wow-factor-of-memory-how-flow-used-supermemory-to-build-smarter-stickier-products/?ref=blog.supermemory.ai), it powers contextual writing across notes. For Montra, it underpins an intelligent media library for generative video. Different use cases, same principle: add memory to your product, and it becomes smarter, stickier, and more valuable.

Even in Campbell’s words, *“I think of Supermemory as like Play-Doh, and we can use it however we want. But more importantly, the Play-Doh doesn't come with like a multi-paragraph instruction manual that we have to learn. The simpler it is, the better from my perspective.”*

That’s the point. We’ve built the Play-Doh, and we can’t wait to see what you build with it. Interested in adding Supermemory to your product? [Read the docs](http://supermemory.ai/docs?ref=blog.supermemory.ai) and get started now.