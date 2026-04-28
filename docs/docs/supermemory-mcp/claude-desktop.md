---
title: "Claude Desktop"
url: "https://supermemory.ai/docs/supermemory-mcp/claude-desktop"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Desktop

> Manual setup for supermemory MCP in Claude Desktop with step-by-step screenshots

This guide walks through the **manual** install for [Claude Desktop](https://claude.ai/download): edit `claude_desktop_config.json`, add the supermemory server, then finish in **Connectors**. For a one-line CLI install instead, see [Setup and Usage](/supermemory-mcp/setup).

<Note>
  Config file location: **macOS** `~/Library/Application Support/Claude/claude_desktop_config.json` · **Windows** `%APPDATA%\Claude\claude_desktop_config.json`
</Note>

## Step 1 — Copy the configuration

Copy the supermemory block below. You will paste it inside `mcpServers` in a later step.

```json theme={null}
{
  "mcpServers": {
    "supermemory": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://mcp.supermemory.ai/mcp"
      ]
    }
  }
}
```

This is the same configuration shown in the supermemory dashboard when you choose **Claude Desktop** for MCP setup.

## Step 2 — Open Developer settings and Edit Config

In Claude Desktop, open **Settings → Developer**, then click **Edit Config**.

<img src="https://mintcdn.com/supermemory/kWGMJPKPijuytce-/images/supermemory-mcp/claude-desktop/step-1.png?fit=max&auto=format&n=kWGMJPKPijuytce-&q=85&s=1e6dcd3ae7f5688cdab106f4623bd283" alt="Claude Desktop settings: Developer in the sidebar and Edit Config highlighted" width="2202" height="1598" data-path="images/supermemory-mcp/claude-desktop/step-1.png" />

## Step 3 — Open claude\_desktop\_config.json

When `claude_desktop_config.json` opens in your editor, keep it ready for the next step.

<img src="https://mintcdn.com/supermemory/kWGMJPKPijuytce-/images/supermemory-mcp/claude-desktop/step-2.png?fit=max&auto=format&n=kWGMJPKPijuytce-&q=85&s=be828f7cca74378154a8c5bf1fafd184" alt="File list with claude_desktop_config.json selected" width="474" height="76" data-path="images/supermemory-mcp/claude-desktop/step-2.png" />

## Step 4 — Paste under mcpServers and save

Paste what you copied under `mcpServers` (merge with existing servers if the file already has some), then save.

<img src="https://mintcdn.com/supermemory/kWGMJPKPijuytce-/images/supermemory-mcp/claude-desktop/step-3.png?fit=max&auto=format&n=kWGMJPKPijuytce-&q=85&s=f66cc5046729a6efbde6b051b2b7a764" alt="JSON editor showing supermemory mcpServers configuration" width="1064" height="442" data-path="images/supermemory-mcp/claude-desktop/step-3.png" />

## Step 5 — Restart and configure in Connectors

Restart Claude Desktop. Open **Settings → Connectors**, find **supermemory**, and click **Configure**.

<img src="https://mintcdn.com/supermemory/kWGMJPKPijuytce-/images/supermemory-mcp/claude-desktop/step-4.png?fit=max&auto=format&n=kWGMJPKPijuytce-&q=85&s=c93eb3e13a57dff1a570541626ae1063" alt="Claude Desktop Connectors settings with supermemory and Configure highlighted" width="2310" height="1700" data-path="images/supermemory-mcp/claude-desktop/step-4.png" />

## Step 6 — Done

supermemory is installed in your Claude Desktop and ready to use.

***

**See also:** [Overview](/supermemory-mcp/mcp) · [Setup and Usage](/supermemory-mcp/setup)
