---
title: "Infinitely running stateful coding agents"
url: "https://supermemory.ai/blog/infinitely-running-stateful-coding-agents/"
---

We built a plugin for Claude Code and OpenCode that gives your coding agent persistent memory. It remembers your preferences, learns your codebase, and never loses context mid-conversation. The result is an agent you can run for months without starting over.

Here's how it works, in the order you'll experience it.

## Teaching the agent your codebase

The first thing you do after installing the plugin is run `/supermemory-init`. This kicks off a deep research session where the agent explores your project: reading package files, scanning directory structure, checking commit history, understanding conventions.

The command doesn't just dump files into context. It teaches the agent what to look for: implicit style rules that never made it to a linter config, architecture patterns that only show up in the diff history, pain points revealed by bug fix frequency. The research takes fifty or more tool calls, but it only happens once. Everything learned gets saved to project memory.

After initialization, the agent knows your codebase the way a teammate who's been around for six months does.

## Starting a session

Every time you open a new terminal and start chatting, the plugin injects relevant context before your first message reaches the model. Three things get pulled in parallel:

1. **User profile**: cross-project preferences stored under your git email. Things like "prefers functional components" or "uses pnpm, not npm" follow you everywhere.
2. **Project memories**: everything the agent learned during init, plus anything it's picked up since. Tech stack, build commands, architecture decisions, past bugs and their fixes.
3. **Semantic search results**: memories that match what you're asking about, ranked by similarity. If you open with "fix the auth bug," it surfaces previous auth-related work.

The injection happens invisibly. You type your message, the plugin fetches context, prepends it, and forwards the enriched prompt. The model sees a conversation that starts with knowledge instead of starting from scratch.

## Remembering things as you work

As you work, the agent can save new information. This happens two ways.

### Automatic capture

The plugin watches for natural language triggers: "remember this," "don't forget," "note that," "keep in mind." When it detects one, it nudges the agent to save the information with the appropriate type and scope.

The pattern list is configurable. If your team says "log this" instead of "remember this," add it to your config. The regex runs on every message, so capture happens without changing how you talk to the agent.

### The supermemory tool

Sometimes you want to save something specific, or search for something you saved before. The plugin exposes a tool the agent can call directly:

- **add**: store a memory with a type (architecture, error-solution, preference, etc.) and scope (user or project)
- **search**: find memories matching a query
- **list**: browse recent memories
- **forget**: delete something that's no longer true
- **profile**: view or query your cross-project preferences

Memory types matter for retrieval. An `error-solution` memory surfaces when the agent hits a similar error. A `project-config` memory gets injected when discussing build setup. The taxonomy isn't just for organization; it shapes what context appears when.

## User vs project scope

Not all knowledge belongs everywhere. Your preference for tabs over spaces should follow you. The fact that this repo uses a weird monorepo structure should not.

Memories are tagged with cryptographic hashes: one derived from your git email, one from the working directory. User-scoped memories attach to your email hash and appear in every project. Project-scoped memories attach to the directory hash and stay local.

The scoping is automatic. When the agent saves a coding style preference, it goes to user scope. When it saves a build command, it goes to project scope. You can override this, but the defaults are right most of the time.

## When context fills up

You've been working for an hour. The conversation is long. Context usage is climbing toward the limit.

Most tools wait until you hit `context_length_exceeded`, then squeeze the thread into a summary. This is reactive compaction, and it's broken. By the time the error arrives, the model is already degraded: truncating system prompts, garbling tool outputs, hallucinating constraints you never stated. The summary gets generated from that corrupted state, so what survives is whatever the model happens to remember under pressure. Usually the what, rarely the why not.

### Preemptive compaction

The plugin compacts earlier. At 80% context usage (configurable), it generates a summary while the model still has breathing room. We inject a system message that structures what to preserve:

```
You are about to be summarized. Retain:
- The user's literal request (do not paraphrase)
- The end goal
- Files touched, tests added, commits made
- Work remaining: next steps, blockers
- Negative constraints: things explicitly forbidden or that failed
```

Negative constraints matter more than achievements. A refactor that must not pull Redux into the bundle is useless if the summary only records "discussed state management." The structured prompt forces the model to preserve vetoes verbatim.

Once the summary returns, we push it into Supermemory under a project-scoped tag, truncate the conversation to the last exchange, and append an automatic "continue" so the session keeps flowing. Even though compaction is lossy, it rarely feels so when using the plugin.

## Coming back tomorrow

You close the terminal. Come back the next day. Run `opencode --continue`.

The new session starts with yesterday's summary already in context, plus your profile, plus project memories, plus anything semantically relevant to what you're working on. There's no manual checkpoint. No copying notes to a doc. No re-explaining what you were doing.

Because every compaction summary gets saved to Supermemory, the agent can also search past sessions. "What did we decide about the auth flow last week?" just works.

## Privacy

Some things shouldn't leave your machine. Wrap content in `<private>` tags and the plugin redacts it before storage. API keys, credentials, personal notes: anything marked private gets replaced with `[REDACTED]` in the memory system.

The redaction happens transparently. You can tell the agent "remember that the API key is in.env" without the actual key ever hitting Supermemory's servers. The memory stores the location, not the secret.

## Configuration

Defaults work for most setups, but everything can be tuned in `~/.config/opencode/supermemory.jsonc`:

```
{
  "compactionThreshold": 0.80,    // when to compact (0-1)
  "similarityThreshold": 0.6,     // minimum relevance for search results
  "maxMemories": 5,               // memories per semantic search
  "maxProjectMemories": 10,       // project memories injected at start
  "maxProfileItems": 5,           // profile facts injected at start
  "injectProfile": true,          // include cross-project preferences
  "keywordPatterns": []           // additional trigger patterns
}
```

Lower the compaction threshold if you want more aggressive summarization. Raise the similarity threshold if irrelevant memories keep appearing. Add keyword patterns if your team uses non-standard phrases for saving information.

## The result

This is what we mean by infinitely running. Not that the context window is infinite, but that the limits stop mattering.

The agent learns your codebase once and remembers it forever. Your preferences follow you across projects. Context gets compacted before it degrades. Summaries become searchable history. Sessions pick up where they left off.

The conversation can run for months if you want it to. This is the power of the supermemory plugin in opencode.