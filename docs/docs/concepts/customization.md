---
title: "Customizing for Your Use Case"
url: "https://supermemory.ai/docs/concepts/customization"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Customizing for Your Use Case

> Configure Supermemory's behavior for your specific application

Configure how Supermemory processes and retrieves content for your specific use case.

## Filter Prompts

Tell Supermemory what content matters during ingestion. This helps filter and prioritize what gets indexed.

```typescript theme={null}
// Example: Brand guidelines assistant
await client.settings.update({
  shouldLLMFilter: true,
  filterPrompt: `You are ingesting content for Brand.ai's brand guidelines system.

    Index:
    - Official brand values and mission statements
    - Approved tone of voice guidelines
    - Logo usage and visual identity docs
    - Approved messaging and taglines

    Skip:
    - Draft documents and work-in-progress
    - Outdated brand materials (pre-2024)
    - Internal discussions about brand changes
    - Competitor analysis docs`
});
```

<AccordionGroup>
  <Accordion title="Personal Assistant">
    ```typescript theme={null}
    filterPrompt: `Personal AI assistant. Prioritize recent content, action items,
    and personal context. Exclude spam and duplicates.`
    ```
  </Accordion>

  <Accordion title="Customer Support">
    ```typescript theme={null}
    filterPrompt: `Customer support agent. Prioritize verified solutions, official docs,
    and resolved tickets. Exclude internal discussions and PII.`
    ```
  </Accordion>

  <Accordion title="Legal Assistant">
    ```typescript theme={null}
    filterPrompt: `Legal research assistant. Prioritize precedents, current regulations,
    and approved contract language. Exclude privileged communications.`
    ```
  </Accordion>

  <Accordion title="Finance Agent">
    ```typescript theme={null}
    filterPrompt: `Financial analysis assistant. Prioritize latest reports, verified data,
    and regulatory filings. Exclude speculative data and MNPI.`
    ```
  </Accordion>

  <Accordion title="Healthcare">
    ```typescript theme={null}
    filterPrompt: `Healthcare information assistant. Prioritize evidence-based guidelines
    and FDA-approved info. Exclude PHI and outdated recommendations.`
    ```
  </Accordion>

  <Accordion title="Developer Docs">
    ```typescript theme={null}
    filterPrompt: `Developer documentation assistant. Prioritize current APIs, working
    examples, and best practices. Exclude deprecated APIs and test fixtures.`
    ```
  </Accordion>
</AccordionGroup>

***

## Entity Context

Guide memory extraction for a specific container tag. Filter prompts are org-wide; entity context is per container.

```typescript theme={null}
await client.add({
  content: "User asked about logo variations for dark backgrounds...",
  containerTag: "session_abc123",
  entityContext: `Design exploration conversation between john@acme.com and Brand.ai assistant.
    Focus on John's design preferences and brand requirements.`
});
```

<Accordion title="Update entity context only">
  Update entity context for a container tag without uploading content.

  ```typescript theme={null}
  await client.containerTags.update("session_abc123", {
    entityContext: `Design exploration conversation between john@acme.com and Brand.ai assistant.
      Focus on John's design preferences and brand requirements.`
  });
  ```
</Accordion>

<Note>
  Entity context persists on the container tag and combines with org-level filter prompts.
</Note>

***

## Chunk Size

Control how documents are split into searchable pieces. Smaller chunks = more precise retrieval but less context per result.

```typescript theme={null}
await client.settings.update({
  chunkSize: 512  // -1 for default
});
```

| Use Case               | Chunk Size  | Why                             |
| ---------------------- | ----------- | ------------------------------- |
| Citations & references | `256-512`   | Precise source attribution      |
| Q\&A / Support         | `512-1024`  | Balanced context                |
| Long-form analysis     | `1024-2048` | More context per chunk          |
| Default                | `-1`        | Supermemory's optimized default |

<Note>
  Smaller chunks generate more memories per document. Larger chunks provide more context but may reduce precision.
</Note>

***

## Connector Branding

Show "Log in to **YourApp**" instead of "Log in to Supermemory" when users connect external services. See [Connectors Overview](/connectors/overview) for the full list of supported integrations.

<AccordionGroup>
  <Accordion title="Google Drive">
    1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
    2. Redirect URI: `https://api.supermemory.ai/v3/connections/google-drive/callback`

    ```typescript theme={null}
    await client.settings.update({
      googleDriveCustomKeyEnabled: true,
      googleDriveClientId: "your-client-id.apps.googleusercontent.com",
      googleDriveClientSecret: "your-client-secret"
    });
    ```
  </Accordion>

  <Accordion title="Notion">
    1. Create integration at [Notion Developers](https://developers.notion.com/)
    2. Redirect URI: `https://api.supermemory.ai/v3/connections/notion/callback`

    ```typescript theme={null}
    await client.settings.update({
      notionCustomKeyEnabled: true,
      notionClientId: "your-notion-client-id",
      notionClientSecret: "your-notion-client-secret"
    });
    ```
  </Accordion>

  <Accordion title="OneDrive">
    1. Register app in [Azure Portal](https://portal.azure.com/)
    2. Redirect URI: `https://api.supermemory.ai/v3/connections/onedrive/callback`

    ```typescript theme={null}
    await client.settings.update({
      onedriveCustomKeyEnabled: true,
      onedriveClientId: "your-azure-app-id",
      onedriveClientSecret: "your-azure-client-secret"
    });
    ```
  </Accordion>
</AccordionGroup>

***

## API Reference

```typescript theme={null}
// Get current settings
const settings = await client.settings.get();

// Update settings
await client.settings.update({
  shouldLLMFilter: true,
  filterPrompt: "...",
  chunkSize: 512
});
```

<Note>
  Settings are organization-wide. Changes apply to new content only—existing memories aren't reprocessed.
</Note>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Add Memories" icon="plus" href="/add-memories">
    See your custom settings in action
  </Card>

  <Card title="Connectors" icon="plug" href="/connectors/overview">
    Set up automatic syncing from external platforms
  </Card>
</CardGroup>
