---
title: "Authentication"
url: "https://supermemory.ai/docs/authentication"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> API keys, scoped keys, and connector branding.

## API Keys

All API requests require authentication using a Bearer token. Get your API key from the [Developer Platform](https://console.supermemory.ai).

<Snippet file="getting-api-key.mdx" />

Include your key in all requests:

<CodeGroup>
  ```bash cURL theme={null}
  curl https://api.supermemory.ai/v3/search \
    --header 'Authorization: Bearer YOUR_API_KEY' \
    --header 'Content-Type: application/json' \
    -d '{"q": "hello"}'
  ```

  ```typescript TypeScript theme={null}
  import Supermemory from "supermemory";

  const client = new Supermemory({ apiKey: "YOUR_API_KEY" });
  ```

  ```python Python theme={null}
  from supermemory import Supermemory

  client = Supermemory(api_key="YOUR_API_KEY")
  ```
</CodeGroup>

***

## Connector Branding

When users connect external services (Google Drive, Notion, OneDrive), they see a "Log in to **Supermemory**" prompt by default. You can replace this with your own app name by providing your own OAuth credentials via the settings endpoint.

```typescript theme={null}
await client.settings.update({
  googleDriveCustomKeyEnabled: true,
  googleDriveClientId: "your-client-id.apps.googleusercontent.com",
  googleDriveClientSecret: "your-client-secret"
});
```

This works for Google Drive, Notion, and OneDrive. See the full setup in [Customization](/concepts/customization).

***

## Scoped API Keys

<Accordion title="Container-scoped keys" icon="lock">
  Scoped keys are restricted to a single `containerTag`. They can only access documents and search within that container — useful for giving limited access to specific projects, users, or tenants without exposing your full API key.

  **Allowed endpoints:** `/v3/documents`, `/v3/memories`, `/v4/memories`, `/v3/search`, `/v4/search`, `/v4/profile`

  ### Create a scoped key

  ```bash theme={null}
  curl https://api.supermemory.ai/v3/auth/scoped-key \
    --request POST \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "containerTag": "my-project",
      "name": "my-key-name",
      "expiresInDays": 30
    }'
  ```

  ### Parameters

  | Parameter             | Required | Default                 | Description                                      |
  | --------------------- | -------- | ----------------------- | ------------------------------------------------ |
  | `containerTag`        | Yes      | —                       | Alphanumeric, hyphens, underscores, colons, dots |
  | `name`                | No       | `scoped_{containerTag}` | Display name for the key                         |
  | `expiresInDays`       | No       | —                       | 1–365 days                                       |
  | `rateLimitMax`        | No       | `500`                   | Max requests per window (1–10,000)               |
  | `rateLimitTimeWindow` | No       | `60000`                 | Window in milliseconds (1–3,600,000)             |

  ### Response

  ```json theme={null}
  {
    "key": "sm_orgId_...",
    "id": "key-id",
    "name": "scoped_my-project",
    "containerTag": "my-project",
    "expiresAt": "2026-03-08T00:00:00.000Z",
    "allowedEndpoints": ["/v3/documents", "/v3/memories", "/v4/memories", "/v3/search", "/v4/search", "/v4/profile"]
  }
  ```

  Use the returned key exactly like a normal API key — it just won't work outside its container scope.

  ### Disable a scoped key

  To revoke a scoped key, send a `DELETE` request with the `id` returned at creation time. This disables the key immediately — any subsequent requests using it will get a `401`. Memories and container tags are **not** affected.

  ```bash theme={null}
  curl https://api.supermemory.ai/v3/auth/scoped-key/KEY_ID \
    --request DELETE \
    --header 'Authorization: Bearer YOUR_API_KEY'
  ```

  **Response:**

  ```json theme={null}
  { "success": true }
  ```
</Accordion>
