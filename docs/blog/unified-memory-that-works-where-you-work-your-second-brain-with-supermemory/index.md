---
title: "Unified Memory That Works Where You Work: Your Second Brain With Supermemory"
url: "https://supermemory.ai/blog/unified-memory-that-works-where-you-work-your-second-brain-with-supermemory/"
---

Hi everyone, I’m Dhravya, the founder of Supermemory.

I want to start with a little story behind why this product means so much to me. You can also skip straight to what it is and how it works below.

Anyways, when I started Supermemory one year ago, we were a consumer app that acted like a second brain. You could add your memories, documents, and notes, and chat with them.

We had a big community and a shit ton of users, but, frankly, our product’s retention was terrible. People stopped using it, and there were still several technological challenges I had to figure out.

So, we pivoted to B2B and set our heads down for one year.

Now, we have a lot of businesses using Supermemory to build memory into their apps, and in the process, we figured out some of the hardest underlying technological problems. You can look at our releases of the [MCP](https://supermemory.ai/blog/the-ux-and-technicalities-of-awesome-mcps/?ref=blog.supermemory.ai), [llm-bridge](https://supermemory.ai/blog/we-solved-ai-api-interoperability/?ref=blog.supermemory.ai), [infinite chat](https://supermemory.ai/blog/faster-smarter-reliable-infinite-chat-supermemory-is-context-engineering/), and more.

I was finally starting to see AI memory in the form I imagined it to be.

Although watching the revenue graph on my Stripe dashboard go berserk is very fun, I felt it was time to go after our initial vision: a memory engine that *automatically* (pay attention to this) stores information from all your apps, like Google Drive, Notion, Claude, ChatGPT, etc., organizes them into sexy graphs, and allows you to chat with them.

This launch has been a whole year in the making. And, I think the Dhravya of one year ago would be proud as hell.

This kind of memory has always been my real mission: bringing effortless knowledge capture to everyone, changing the way we live, work, and think. Selling B2B licenses is a noble pursuit, lol, but *this* is what I live for.

And today, I’m beyond excited to finally fulfill that promise.

Thanks for sticking around. I can’t wait for you to try it.

Best,

Dhravya

## What is unified memory, and how does it work?

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfFzD0j1ie-1TVHTV5H2EbTK7ov26xcVggQoqbeOQ20jk3F42UppYbDFtXgfE-8NLXCuOmaoWzoM-LdInZW1KPLotnvQoikZr3v-ohCZFp5vIRqE2S3r-kr0RkA1ub7Mx3SUacp3w?key=cM0AgtU4PqZfJJjReCqVcQ)

The app's dashboard

When I first launched Supermemory a year ago, the biggest flaw and the reason we saw so many people stop using it was that it relied entirely on manual input.

You literally had to open our app, manually add memories or documents, and then actively chat with them later.

Over the past year, I realized something crucial: memory only works when it’s automatic. When it lives quietly in the background, seamlessly integrated into the way you already work.

> Memory only works when it’s automatic. When it lives quietly in the background, seamlessly integrated into the way you already work.

Here’s what you can expect from our app:

- **Automatic, real-time memory updates:** The app now lives where your AI does. It automatically captures and updates your interactions from ChatGPT, Claude, Cursor, or any other AI client supporting MCP in real-time.
- **Effortless document integration:** Connect seamlessly to Google Drive, Notion, and OneDrive using our connectors, instantly importing your documents and making them available for immediate conversation. [Learn how.](https://supermemory.ai/blog/building-an-ai-compliance-chatbot-with-supermemory-and-google-drive/)
- **Intelligent knowledge graphs:** Automatically create intuitive, visual graphs of your knowledge, interactions, and memories, bringing clarity to the way you think and remember.
- **Project-based organization:** Easily segment your memories into different projects, securely isolating work from personal knowledge, or dividing topics clearly, however you see fit.

Unlike other apps, the Unified Memory Engine is designed to be accessible for normal everyday users like you and me, and not just developers. For instance, platforms like OpenMemory by mem0 require a complex Docker setup, familiarity with Python, and technical know-how to even get started.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXebLf7x4AjbjQIa8ZYzq0qUG-kkzOCV4lpsi1_fHVOGvHwnlF-4I3GwrIDyUM3tuOOOi1K_L4u2D08YmIE7AFyxkcf61eYmceF6WRPcVZXDCAWWuahXHIWKAqq-uVlJLaDSR-PPpw?key=cM0AgtU4PqZfJJjReCqVcQ)

A demo graph we created

Arguably, the graph feature is one of our coolest additions. Right now, for every raw document that is added, Supermemory not only understands and extracts things from the document to search through them, but also makes connections between two or three items.

It is also capable of making implicit connections - stuff that the user never explicitly said, but Supermemory understood.

For you, the benefit is that our system is MUCH smarter than everything else out there. You can move beyond surface-level questions like ‘when did xyz happen,’ and do actual complex analysis and querying.

The app also forgets memories that aren’t used very frequently, [based on how our brain works](https://supermemory.ai/blog/memory-engine/). Other memory systems don’t have that temporal understanding, and this intelligent understanding of when to overwrite and rewrite things makes for faster performance.

I also talked to the founder of [spawn.co](http://spawn.co/?ref=blog.supermemory.ai) and he told me they do this at their company. They’ve been racking every interaction on Slack and documents on Notion, adding it to the company’s knowledge graph.

## How to use the app?

We’re releasing the app to only a select few people right now. To sign up for the waitlist, head over to [app.supermemory.ai](http://app.supermemory.ai/?ref=blog.supermemory.ai)

Once you’re in, start by manually adding memories in the form of notes, links, files, or connections to Google Drive, Notion, or OneDrive.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdTBmu1SirZ340WfJ4xbtzg9nqpUahgw_OjJ6virNmqBatFxXvbU950DJZBv7ulcWWorK1Kml-BGy1XbyqWD_TUc9aSfESY__HTMz77eBgDNgcDlriLmM5cHhDS6ZrMyUf7d-RO8Q?key=cM0AgtU4PqZfJJjReCqVcQ)

You can also install it using the MCP for automatic syncing. For Claude Desktop, follow the following steps:

1. Open the **Claude Desktop app**.
2. Go to **Developer → Edit Config** to open or generate the file:
- macOS: ~/Library/Application Support/Claude/claude\_desktop\_config.json
- Windows: %APPDATA%\\Claude\\claude\_desktop\_config.json
3. Add the Supermemory MCP server entry under "mcpServers". For example:
```
"mcpServers": {
  "my-mcp": {
    "command": "npx",
    "args": [ "-y", "mcp-remote", "https://api.supermemory.ai/mcp" ]
  }
}
```
4. Save the file and restart Claude Desktop. After reboot, your MCP server should be available in the UI.

Here's how it works:

![](https://supermemory.ai/blog/content/images/2025/07/image-5.png)

You can also add it to Cursor with just one click.

## Pricing

The free plan allows you to create up to 10 memories and has basic search. For 500 memories, 10 connections, advanced search, and priority support, the price is $9/month for the first 100 users.

## What’s next?

This launch is just the beginning. Next up, we’re working on a browser extension to make capturing memories across the web feel super natural. You can carry your memory engine with you everywhere.

Feel free to send us your feedback or any ideas that you’d like to see implemented.

If you’ve made it this far, thank you. I genuinely can’t wait to see what you build, recall, and rediscover with it. [Sign up for a free account now!](https://app.supermemory.ai/?ref=blog.supermemory.ai)