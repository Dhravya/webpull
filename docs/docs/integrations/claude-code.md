---
title: "Claude Code"
url: "https://supermemory.ai/docs/integrations/claude-code"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Code

> Claude Code Supermemory Plugin — persistent memory across coding sessions

<div className="w-1/2">
  <img src="https://mintcdn.com/supermemory/6HwzudOPLAP67sR5/images/claude-code-supermemory.png?fit=max&auto=format&n=6HwzudOPLAP67sR5&q=85&s=3d8b5cd00244586ef748944d47b4308c" alt="Claude Code + Supermemory" className="rounded-lg shadow-lg" width="2044" height="1574" data-path="images/claude-code-supermemory.png" />
</div>

<Warning>
  This integration requires the **Supermemory Pro plan**. [Upgrade here](https://console.supermemory.ai/billing).
</Warning>

[Claude-Supermemory](https://github.com/supermemoryai/claude-supermemory) is a Claude Code plugin that gives your AI persistent memory across sessions. Your agent remembers what you worked on — across sessions, across projects.

## Get Your API Key

Create a Supermemory API key from the [API Keys](https://console.supermemory.ai/keys) page, then add it to your shell profile so it persists across sessions:

<Tabs>
  <Tab title="macOS / Linux (zsh)">
    ```bash theme={null}
    echo 'export SUPERMEMORY_CC_API_KEY="sm_..."' >> ~/.zshrc
    source ~/.zshrc
    ```
  </Tab>

  <Tab title="macOS / Linux (bash)">
    ```bash theme={null}
    echo 'export SUPERMEMORY_CC_API_KEY="sm_..."' >> ~/.bashrc
    source ~/.bashrc
    ```
  </Tab>

  <Tab title="Windows (PowerShell)">
    ```powershell theme={null}
    [System.Environment]::SetEnvironmentVariable("SUPERMEMORY_CC_API_KEY", "sm_...", "User")
    ```

    Restart your terminal after running this.
  </Tab>
</Tabs>

## Install the Plugin

```bash theme={null}
# Add the plugin marketplace
/plugin marketplace add supermemoryai/claude-supermemory

# Install the plugin
/plugin install claude-supermemory
```

## How It Works

Once installed, the plugin runs automatically:

* **Context Injection** — On session start, relevant memories are fetched and injected into Claude's context. This includes user preferences, project knowledge, and past interactions.
* **Auto-Capture** — Tool usage is captured and stored during the session for future context.

### What Gets Captured

| Tool  | Captured As                                         |
| ----- | --------------------------------------------------- |
| Edit  | `Edited src/auth.ts: "old code..." → "new code..."` |
| Write | `Created src/new-file.ts (500 chars)`               |
| Bash  | `Ran: npm test (SUCCESS/FAILED)`                    |
| Task  | `Spawned agent: explore codebase`                   |

## Commands

### /claude-supermemory:logout

Log out from Supermemory and clear saved credentials.

```
/claude-supermemory:logout
```

## Configuration

### Environment Variables

```bash theme={null}
SUPERMEMORY_CC_API_KEY=sm_...         # Required
SUPERMEMORY_SKIP_TOOLS=Read,Glob,Grep # Tools to not capture (optional)
SUPERMEMORY_DEBUG=true                # Enable debug logging (optional)
```

### Settings File

Create `~/.supermemory-claude/settings.json`:

```json theme={null}
{
  "skipTools": ["Read", "Glob", "Grep", "TodoWrite"],
  "captureTools": ["Edit", "Write", "Bash", "Task"],
  "maxContextMemories": 10,
  "maxProjectMemories": 20,
  "debug": false
}
```

## Next Steps

<CardGroup cols={2}>
  <Card title="GitHub Repository" icon="github" href="https://github.com/supermemoryai/claude-supermemory">
    Source code, issues, and detailed README.
  </Card>

  <Card title="OpenClaw Plugin" icon="messages-square" href="/integrations/openclaw">
    Multi-platform memory for Telegram, WhatsApp, Discord, and more.
  </Card>
</CardGroup>
