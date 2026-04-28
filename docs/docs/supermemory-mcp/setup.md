---
title: "Setup and Usage"
url: "https://supermemory.ai/docs/supermemory-mcp/setup"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Setup and Usage

> How to set up and use Supermemory MCP Server 4.0

## Quick Install (Recommended)

```bash theme={null}
npx -y install-mcp@latest https://mcp.supermemory.ai/mcp --client claude --oauth=yes
```

Replace `claude` with your MCP client: `cursor`, `windsurf`, `vscode`, etc.

## Manual Configuration

Add this to your MCP client config (Claude Desktop, Cursor, Windsurf, etc.):

```json theme={null}
{
  "mcpServers": {
    "supermemory": {
      "url": "https://mcp.supermemory.ai/mcp"
    }
  }
}
```

The server uses **OAuth authentication** by default. Your MCP client will automatically discover the authorization server via `/.well-known/oauth-protected-resource` and prompt you to authenticate.

## API Key Authentication (Alternative)

If you prefer to use an API key instead of OAuth, get one from [app.supermemory.ai](https://app.supermemory.ai) and pass it in the `Authorization` header:

```json theme={null}
{
  "mcpServers": {
    "supermemory": {
      "url": "https://mcp.supermemory.ai/mcp",
      "headers": {
        "Authorization": "Bearer sm_your_api_key_here"
      }
    }
  }
}
```

API keys start with `sm_` and are automatically detected. When an API key is provided, OAuth authentication is skipped.

## Project Scoping (Optional)

To scope all operations to a specific project, add the `x-sm-project` header:

```json theme={null}
{
  "mcpServers": {
    "supermemory": {
      "url": "https://mcp.supermemory.ai/mcp",
      "headers": {
        "x-sm-project": "your-project-id"
      }
    }
  }
}
```

This keeps memories organized by project, useful when working on multiple codebases or contexts.

## Client-Specific Setup

### Claude Desktop

For a screenshot-backed walkthrough (Developer → Edit Config, `claude_desktop_config.json`, Connectors), see **[Claude Desktop](/supermemory-mcp/claude-desktop)**. The recommended one-line install at the top of this page also supports Claude.

### Cursor

Add to `~/.cursor/mcp.json`:

```json theme={null}
{
  "mcpServers": {
    "supermemory": {
      "url": "https://mcp.supermemory.ai/mcp"
    }
  }
}
```

Or use the one-click install button at [app.supermemory.ai](https://app.supermemory.ai).

### Windsurf / VS Code

Configuration varies by extension. Generally, add the server URL (`https://mcp.supermemory.ai/mcp`) to your MCP settings.
