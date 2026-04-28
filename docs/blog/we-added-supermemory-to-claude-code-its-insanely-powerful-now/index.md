---
title: "We added supermemory to Claude Code. It's INSANELY powerful now..."
url: "https://supermemory.ai/blog/we-added-supermemory-to-claude-code-its-insanely-powerful-now/"
---

Today, we are launching the Supermemory plugin for Claude Code!

> TLDR: You can use supermemory in claude code now. - [https://github.com/supermemoryai/claude-supermemory](https://github.com/supermemoryai/claude-supermemory?ref=blog.supermemory.ai)

Claude code has genuinely changed how I work. But there's this one thing that drives me crazy... Every day, I have to explain the same exact things to claude code. I have to keep repeating my coding style, preferences, etc."The user service connects to Postgres, not MySQL."  
"Don't refactor that function—I know it looks ugly but there's a reason it's like that."Claude writes great code. Then I close the session, and it forgets everything.Next day? Groundhog Day. Again. We have built all of these workarounds - Massive [CLAUDE.md](https://claude.md/?ref=blog.supermemory.ai) files, copy pasting the context at the start of every prompt, maintaining "memory" documents that feel like the agent is never looking at them..  
  
After our success with the [clawd bot plugin](https://x.com/DhravyaShah/status/2016308406701981731?s=20&ref=blog.supermemory.ai) and the [opencode plugins](https://x.com/supermemory/status/2005030082063257765?s=20&ref=blog.supermemory.ai), we knew that we're in the right spot to do something about it.

So we built something.

![](https://supermemory.ai/blog/content/images/2026/01/image-7.png)

At Supermemory, we've been working on memory infrastructure for AI agents for a while now. We power memory for tens of thousands of AI applications. And we kept hearing the same thing from developers: "I wish my coding agent actually remembered stuff."Today we're launching a Supermemory plugin for Claude Code.The idea is simple: Claude Code should know you. Not just for this session—forever. It should know your codebase, your preferences, your team's decisions, and the context from every tool you use.Here's what that actually looks like in practice:

## it remembers where you left off

We utilize user profiles in supermemory to create a profile of you, which contains both episodic content about you, as well as the "static" information. Claude knows that this week, your entire goal is to drive the costs down and migrate to another postgres provider.

## it learns your style

Instead of writing slop code just like everyone else, it will learn as you use it - like "Use less useEffects!!!". [https://x.com/DhravyaShah/status/2016027476787679598?s=20](https://x.com/DhravyaShah/status/2016027476787679598?s=20&ref=blog.supermemory.ai) Claude code will now remember exactly **how you fixed an error last time**, and this knowledge compounds into an agent that feels truly insanely customized for your use case... slowly.

## it knows YOU

It knows that you're a founder, or college student, or a system engineer, and will suggest tools and practices accordingly. Claude code learns your requirements, your style, your taste. Because taste is the #1 thing that differentiates good engineering vs bad.

```
Developer: "I need to add rate limiting to this endpoint"
Agent: "Based on the rate limiting you implemented in the payments-api 
last month (using sliding window with Redis), and your preference for 
the express-rate-limit middleware, here's an approach that matches 
your existing patterns..."
```

---

The technical piece that makes this work is what we call hybrid memory.

![](https://supermemory.ai/blog/content/images/2026/01/image-5.png)

Most "memory" solutions for AI are just RAG—retrieve some similar documents and stuff them in the context. That works for knowledge bases. It doesn't work for memory.Memory isn't just "find similar stuff." It's understanding that when you say "the auth bug," you mean the specific issue you've been debugging for three days. It's knowing that your preferences have evolved—you used to like classes, now you prefer functions. It's tracking that a decision was made, then revisited, then changed.We built a system that actually extracts facts, tracks how they change over time, builds a profile of you that's always current, and retrieves the right context at the right moment. Not just similar context—relevant context.The benchmark we use for this (LongMemEval) puts us at 81.6%. For comparison, most RAG systems score in the 40-60% range on memory-specific tasks.

## How is this different from the MCP?

The supermemory MCP is great for things like this, but comes with one big limitation: We cannot control when claude code chooses to run the tools. This means that we have no control / data point to learn things from, and a memory system is only good if there's things to recall later.This plugin adds:

- **Context Injection:** On session start, a User Profile is automatically injected into Claude's context
- **Automatic Capture**: Conversation turns are captured and stored for future context

Both of these things were not possible with the MCP before.So, go ahead and install it! Instructions here [https://github.com/supermemoryai/claude-supermemory](https://github.com/supermemoryai/claude-supermemory?ref=blog.supermemory.ai)

![](https://supermemory.ai/blog/content/images/2026/01/image-6.png)

Feel free to let us know if you like it, you can also join our community [https://supermemory.link/discord](https://supermemory.link/discord?ref=blog.supermemory.ai) for any feedback!