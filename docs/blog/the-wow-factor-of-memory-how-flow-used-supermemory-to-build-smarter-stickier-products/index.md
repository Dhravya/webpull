---
title: "The Wow Factor of Memory - How Flow Used Supermemory To Build Smarter, Stickier Products"
url: "https://supermemory.ai/blog/the-wow-factor-of-memory-how-flow-used-supermemory-to-build-smarter-stickier-products/"
---

**Overview:** [Flow](https://flowapp.so/?ref=blog.supermemory.ai) is a note-taking app built around a bold vision: to create a more *personal, context-aware* writing experience powered by AI. At the heart of this mission is memory. Flow uses Supermemory as a persistent memory layer, enabling users to ask questions about any of their notes, retrieve key information, and generate writing suggestions, even across different documents. It creates a note-taking experience that feels tailored, contextual, and deeply personal.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfme7z94i9V0GLbRuJExpfBit8upCVicwsIsIX8V-yRkoHbhSWD4PUpcGY7apBOrfSXbG7VTwg3B8M3-lPb1fySsIOMLvY1tStUfPFybIDxb75wBwNSpHSzhPdZ7f3WorCv6EA0eA?key=SykFvh_Xii5PxwueaZNPPA)

Flow’s UI - Notes and Chat

There's a certain **"time to wow moment"** involved with every app. The higher it is, the higher users convert and use it more.  
Supermemory brings this "Time to wow moment" down - When LLMs magically know everything about you, the experience is more natural, and product more delightful.  
  
In this blog, we talk about how Flow uses supermemory to build better products, and how the "Wow factor of memory" is real.

---

When Daniel set out to build Flow, he knew memory would be at the core of his product.

*“Having a good memory layer or like having some sort of remembering system, is what I always wanted… memory was the only important part for the product to go public.”*

But actually getting that to work? Not easy.

Flow started out by integrating Mem0, a memory API that promised contextual recall. But it didn’t deliver. Daniel faced multiple issues:

1. **Existing memory tools couldn’t handle complex, high-volume input.** Flow users were pasting full documents, and existing solutions broke down when large chunks of text were involved, making it difficult to build a seamless writing experience.
2. **Multi-document context was essential, and missing.** Flow’s vision was to let users ask a question on one document and get an answer based on something they wrote somewhere else. That meant memory had to persist across documents, but existing systems lacked this capability. Daniel tried patching together solutions, but they just added latency, cost, and technical debt.
3. **API support was “poor”.** No explanations needed there, really.

Daniel’s vision finally came into focus when he first stumbled upon the open-source project behind Supermemory, where people were using it to store and retrieve Twitter threads with simple prompts. That small use case sparked a bigger realization: *what if Flow could give users the same kind of recall, not just within one note, but across everything they'd ever written?*

He decided to integrate Supermemory. It took him one day to implement it, and instantly, things felt different.

1. **Flow could finally handle massive, messy, real-world context.** With Supermemory, Flow’s customers could confidently pass large volumes of content like notes, PDFs, videos, and more, without breaking the experience. Everything just worked. This flexibility lets users bring their entire knowledge base into Flow, transforming it from a notes app to a second brain.
2. **A persistent memory layer that unlocked his product’s purpose.** Supermemory’s memory API created a persistent, reliable memory layer that carried context across chats, across notes, across time. Now, users could reference something they wrote days or weeks ago, even in different documents, and Flow would instantly recall it. That was the “holy shit” moment.

*“ **My users, they're like, ‘Oh wow! I can dump basically everything - videos, audios, images, etc. I would pay for this just because of how much context I can put in it!**’, and Supermemory’s been the cornerstone behind helping us achieve that.”*

3. **It’s the best support he’s ever seen.** Daniel was one of the earliest builders to integrate Supermemory’s API, and that meant a lot of debugging in the early days. But he never felt alone. From schema design to integration questions, the Supermemory team was in the loop every day, helping him ship a reliable experience.

*“Initially, it was a fair bit of debugging and calls, but with Supermemory, the support is the best I’ve ever seen.”*

<iframe src="https://player.vimeo.com/video/1093603806?app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="video-excerpt"></iframe>

Daniel's thoughts on how Supermemory has helped Flow

With Supermemory, Flow became a better product and a better business. Daniel saw results both in the backend and in the way users engaged with Flow.

- **User retention hit 40%.** Daniel’s favorite metric is “Users coming back for 3+ days consecutively”. Supermemory’s context layer helped make Flow feel sticky, and users kept returning to *continue conversations*. That sense of continuity drove Flow’s retention to 40%.
- **Lower token usage = significantly reduced infrastructure cost.** With Supermemory handling persistent context, token usage dropped dramatically. Users stopped pasting long documents and context, and the AI stopped reprocessing what it already knew. For Daniel, that meant a noticeable dip in infra bills.
- **60% reduction in backend requests.** Instead of stringing together five different API calls for memory retrieval, user context, document fetching, embeddings, and response generation, Flow just needs to call Supermemory’s API, and everything gets done.

The day Daniel announced the **Flow x Supermemory** partnership, signups jumped by 50%. But, perhaps, the most meaningful outcome wasn’t a number.

It was a shift in Daniel’s confidence.

Supermemory made Flow feel robust, smart, and valuable, giving Daniel the confidence to start thinking about monetization.

“I’m considering changing the model to pay-first *just* because of how good the memory is.”

And maybe, that is the ***wow factor of memory.*** It benefits everyone involved - customers get a much better UX, your developers aren’t left scratching their heads, and founders can create real value.

Daniel didn’t have to change his product to fit the limits of memory. Supermemory finally met the bar he had always had in mind.

Want to build like Flow? Check out [Supermemory’s docs](http://docs.supermemory.ai/?ref=blog.supermemory.ai) and start building with memory today.