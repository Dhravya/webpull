---
title: "Faster, smarter, reliable infinite chat: Supermemory IS context engineering."
url: "https://supermemory.ai/blog/faster-smarter-reliable-infinite-chat-supermemory-is-context-engineering/"
---

People are obsessed with prompts and prompt engineering. Sure, what you say is important, but *what the model know* s when you say it is the difference between a stateless text generator and an intelligent AI system.

In short, context is the most crucial component. Karpathy’s viral tweet called it out:

> +1 for "context engineering" over "prompt engineering".  
>   
> People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window… [https://t.co/Ne65F6vFcf](https://t.co/Ne65F6vFcf?ref=blog.supermemory.ai)
> 
> — Andrej Karpathy (@karpathy) [June 25, 2025](https://twitter.com/karpathy/status/1937902205765607626?ref_src=twsrc%5Etfw&ref=blog.supermemory.ai)

We thought to ourselves: our current infinite chat *is* context engineering! However, it had its fair share of issues. It didn’t work with all AI providers like Gemini and Anthropic, couldn’t support multi-modal memory, didn’t have tool call support, and more.

So, we fixed it.

With today’s release, our **Infinite Chat** becomes a full-blown context engineering engine.

The TL;DR is: it’s faster, smarter, and more reliable.

Here’s everything that’s new:

- Multi-modal memory support (images, audio, structured data, etc.)
- Works with all LLMs like Gemini and Anthropic, not just OpenAI.
- Tool calls awareness and memory
- Higher context limits
- Long-context RAG
- Implicit few-shot learning
- Smarter summarization and pruning to avoid context pollution
- A new architecture for better reliability and response quality
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc4COBeYcr8MqTMJLnbpSf-Y-eHyxZJPp0c_yZsprSzkUigYnzHTTpAj4l1_Qrv0R0Hm3iQ-ZLNK76nm7zu_w-nNVz-q0tqE39ONnH0kNn6NirH3eLopQsmvFMrUN-N1jFI4lbAvg?key=vzthXSB6B4ZCgX8Pt04FZw)

[**Source**](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md?ref=blog.supermemory.ai)

## Multi-step agent support

Agents are a bit messy. Sometimes, they stop mid-task and need to pick up where they left off, without getting confused or forgetting everything.

Say you're building a coding co-pilot. You tell it: “Edit 100 files and add 1 new feature.”

It gets through 50, then the call times out or the model hits a limit. Now what? All 50 interactions would be polluting the context.

Our new infrastructure solves it.

If you provide the conversation-id, Infinite Chat removes the unnecessary context and automatically backfills it, making the network requests much faster, even on extremely long contexts:

```
// if you provide conversation ID, You do not need to send all the messages every single time. Supermemory automatically backfills it. 
const client = new OpenAI({
    baseURL:
"https://api.supermemory.ai/v3/https://api.openai.com/v1",
    defaultHeaders: {
        "x-supermemory-api-key":
            "",
        "x-sm-user-id": \`dhravya\`,
        "x-sm-conversation-id": "conversation-id"
    },
})

const messages = [
{"role" : "user", "text": "SOme long thing"},
// .... 50 other messages
{"role" : "user", "text": "new message"},
]

const client.generateText(messages)

// Next time, you dont need to send more.
const messages2 = [{"role" : "user", "text": "What did we talk about in this conversation, and the one we did last year?"}]

const client.generateText(messages2)
```

That includes:

- A summary of what was done. For instance, “50 files were changed to add feature XYZ.”
- A diff of what’s pending: “These 12 are still left.”
- And even implicit few-shot grounding from earlier turns: “Here’s how you’ve answered similar requests before.”

It’s also cheaper, cleaner, and easier to reason about than long chat dumps.

## Works with all LLM providers

Initially, Infinite Chat only supported the OpenAI API format. But, our customers asked for more - Gemini, Anthropic, Langchain, AI SDK, etc.

It was a pain in the ass to implement a system with multiple different providers, each provider having different ways to do multi-modal, tool call chains, calculating token counts, etc. for all their different models.

So, [we built llm-bridge](https://supermemory.ai/blog/we-solved-ai-api-interoperability/?ref=blog.supermemory.ai), an open-source package, to solve this issue, and used it in Infinite Chat. This makes adoption seamless: all you have to do as a developer is prepend your provider's base URL with our API's URL, add your Supermemory API key, and we take care of the rest. That is, there is no change to the client interface. You can keep using your SDK of choice no matter what!

```
const client = new OpenAI({
    baseURL:
"https://api.supermemory.ai/v3/https://api.openai.com/v1",
    defaultHeaders: {
        "x-supermemory-api-key":
            "",
        "x-sm-user-id": \`dhravya\`,
    },
})
/// or new Anthropic() or new GoogleGenAI()
```

Read about it in more detail [here.](https://supermemory.ai/blog/we-solved-ai-api-interoperability/?ref=blog.supermemory.ai)

## Smarter Memory Management

Beyond simple message history, the new Infinite Chat lets your models remember more than just words and do more with them.

This includes:

- **Multimodal memory:** Images, audio, structured data, etc. Anything your agent sees can now persist across calls. A screenshot sent two messages ago? Still in context. A chart from last week? Still referenced.
- **Tool call tracking:** We store tool invocations and outputs as first-class context objects. The model knows what tools it has used, what the results were, and doesn’t blindly repeat actions.
- **Long-context RAG:** Instead of stuffing 10 retrieved passages into every prompt, Supermemory now decides what’s already been seen, summarizes it when needed, and surfaces *only* new or relevant chunks.

In essence, we’ve taken Karpathy’s point seriously:

*"Context engineering is the delicate art and science of filling the context window with just the right information for the next step."*

What you really want is:

- Just enough memory to make the next decision smart
- Just enough pruning to keep token usage efficient
- Just enough scaffolding to avoid re-teaching the model what it already knows

That’s what the new Infinite Chat does.

[Take it out for a spin today!](https://supermemory.ai/docs/model-enhancement/context-extender?ref=blog.supermemory.ai)