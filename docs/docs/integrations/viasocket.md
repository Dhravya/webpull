---
title: "viaSocket"
url: "https://supermemory.ai/docs/integrations/viasocket"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# viaSocket

> Connect Supermemory with viaSocket to build automation flows using triggers, API tokens, and actions like Gmail.

Connect Supermemory to viaSocket to build powerful automation flows — search your memory, trigger actions, and wire up services like Gmail, all without writing code.

## Prerequisites

* A Supermemory API key ([get one here](https://console.supermemory.ai/settings))
* A viaSocket account

## Step-by-Step Tutorial

<Steps>
  <Step title="Generate Supermemory API Token">
    * Log in to your [Supermemory account](https://console.supermemory.ai).
    * Go to **Settings → API Key**.
    * Copy your Personal API key.
    * Keep the key secure — treat it like a password.
          <img src="https://mintcdn.com/supermemory/t3ab_XnI-LYl6bGw/images/viaSocket-supermemory-auth.png?fit=max&auto=format&n=t3ab_XnI-LYl6bGw&q=85&s=1c3a88fc0f13171149fa9aabf912076d" alt="make a zap - annotated" width="900" height="431" data-path="images/viaSocket-supermemory-auth.png" />
  </Step>

  <Step title="Create a New Flow in viaSocket">
    * Click **Create New Flow** in your viaSocket dashboard.
    * In the **Trigger** section, search for and select **Supermemory**.
    * Choose a trigger — **Search Memory** or **Search User Profile**.
          <img src="https://mintcdn.com/supermemory/t3ab_XnI-LYl6bGw/images/viasocket-supermemory-connection.png?fit=max&auto=format&n=t3ab_XnI-LYl6bGw&q=85&s=5c86c9b72ea0c8a9860ec7c0ad9527ae" alt="make a zap - annotated" width="900" height="419" data-path="images/viasocket-supermemory-connection.png" />
  </Step>

  <Step title="Connect Your Supermemory Account">
    * Click **Connect to Supermemory**.
    * Paste your Supermemory API key.
    * Click **Save** to store the connection.
    * Confirm the connection is successfully added before proceeding.
          <img src="https://mintcdn.com/supermemory/t3ab_XnI-LYl6bGw/images/viasocket-supermemory-connection.png?fit=max&auto=format&n=t3ab_XnI-LYl6bGw&q=85&s=5c86c9b72ea0c8a9860ec7c0ad9527ae" alt="make a zap - annotated" width="900" height="419" data-path="images/viasocket-supermemory-connection.png" />
  </Step>

  <Step title="Configure the Trigger">
    * Provide a **Query** — either a static value or a dynamic input from a previous step.
    * Click **TEST** to run a sample and verify the output.
    * Save the trigger once the test returns expected data.
          <img src="https://mintcdn.com/supermemory/t3ab_XnI-LYl6bGw/images/viasocket-supermemory-configured-trigger.png?fit=max&auto=format&n=t3ab_XnI-LYl6bGw&q=85&s=e0ffb4b97e6597780191e30816d1a5d3" alt="make a zap - annotated" width="900" height="586" data-path="images/viasocket-supermemory-configured-trigger.png" />
  </Step>

  <Step title="Add an Action (Example: Gmail Send Email)">
    * Click **Add Step**.
    * Select **Gmail → Send Email**.
    * Choose an existing Gmail connection or create a new one.
    * Map the required fields:
      * **To** — recipient email address
      * **Subject** — email subject line
      * **Message Body** — use the trigger's `body` object as dynamic input
    * Click **Test** to send a test email.
    * Confirm a **200** response status before saving.
          <img src="https://mintcdn.com/supermemory/t3ab_XnI-LYl6bGw/images/viasocket-supermemory-action.png?fit=max&auto=format&n=t3ab_XnI-LYl6bGw&q=85&s=0bff543348e7024d4d3163bfef9dc9de" alt="make a zap - annotated" width="900" height="1028" data-path="images/viasocket-supermemory-action.png" />
  </Step>

  <Step title="Go Live & Monitor">
    * Click **GO LIVE** to activate your flow.
    * Confirm the activation prompt.
    * Use **Flow View** to inspect the flow structure and **Log View** to monitor executions in real time.
    * If needed, re-run any execution from **Run History**.
          <img src="https://mintcdn.com/supermemory/t3ab_XnI-LYl6bGw/images/viasocket-supermemory-go-live.png?fit=max&auto=format&n=t3ab_XnI-LYl6bGw&q=85&s=ccc35b4ae24abcbab5f743d407b4501d" alt="make a zap - annotated" width="900" height="556" data-path="images/viasocket-supermemory-go-live.png" />
  </Step>
</Steps>

<Note>
  Make sure your Supermemory API key has the correct permissions before
  connecting. If the TEST step returns no data, double-check the query and
  ensure your Supermemory account has indexed content.
</Note>

You can extend this flow with other actions and services supported by viaSocket.
