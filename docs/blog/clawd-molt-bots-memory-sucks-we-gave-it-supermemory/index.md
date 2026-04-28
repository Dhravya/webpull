---
title: "Molt bot's memory SUCKS. We gave it supermemory."
url: "https://supermemory.ai/blog/clawd-molt-bots-memory-sucks-we-gave-it-supermemory/"
---

I'm the founder of supermemory. Clawd/Molt bot is blowing up right now, with many, many use cases. I set it up, too, and have been using it through telegram.

> TLDR: just go to [https://supermemory.ai/docs/integrations/clawdbot](https://supermemory.ai/docs/integrations/clawdbot?ref=blog.supermemory.ai) to set up supermemory for your clawd bot.

However, me and some other friends of mine noticed that it's memory is really bad. It almost feels like... it *never* wants to utilize it's memory to answer questions.

![](https://supermemory.ai/blog/content/images/2026/01/image-3.png)

For such a big and successful project, this sucks. but why? We instantly got to work... [@manthanguptaa](https://x.com/@manthanguptaa?ref=blog.supermemory.ai) did an awesome job breaking down their architecture - [https://x.com/manthanguptaa/status/2015780646770323543?s=42](https://x.com/manthanguptaa/status/2015780646770323543?s=42&ref=blog.supermemory.ai) and from that, we know that it heavily relies on *tools* to reference memory.  
  
**The problem with tools - The models aren't trained to use them all the time.**

![](https://supermemory.ai/blog/content/images/2026/01/image-4.png)

Memory needs to be something that the model can access any time, it should just be fed into the model on every run. However, the current architecture of Molt won't work at all because of this poor memory.

## The fix.

We integrated clawd bot with supermemory - with:

- Automatic recall at all time
- Tools to manually search, forget, get profile, etc.
- /remember and /recall commands

So now, you \_always\_ know that your clawd bot will have perfect memory.  
  
Now, i can have extremely long conversations with Molt, switch from telegram to whatsapp to slack, and it has all the context about me, synced with supermemory.This feels magical. You should try it.

If you want to learn more about supermemory, just read this - [https://supermemory.ai/blog/ais-next-big-thing-personalization-and-super-memory/](https://supermemory.ai/blog/ais-next-big-thing-personalization-and-super-memory/?ref=blog.supermemory.ai)  
  
To install supermemory for your clawd bot, go here [https://supermemory.ai/docs/integrations/clawdbot](https://supermemory.ai/docs/integrations/clawdbot?ref=blog.supermemory.ai)