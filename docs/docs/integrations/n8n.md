---
title: "n8n"
url: "https://supermemory.ai/docs/integrations/n8n"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# n8n

> Automate knowledge management with Supermemory in n8n workflows

Connect Supermemory to your n8n workflows to build intelligent automation workflows and agents that leverage your full knowledge base.

## Quick Start

### Prerequisites

* n8n instance (self-hosted or cloud)
* Supermemory API key ([get one here](https://console.supermemory.com/settings))
* Basic understanding of n8n workflows

### Setting Up the HTTP Request Node

The Supermemory integration in n8n uses the HTTP Request node to interact with the Supermemory API. Here's how to configure it:

1. Add an **HTTP Request** node to your workflow (Core > HTTP Request)
   <img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/core-http-req.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=f68baf812a97bef62247144a2e14ee05" alt="" width="802" height="880" data-path="images/core-http-req.png" />
2. Set the **Method** to `POST`
3. Set the **URL** to the appropriate Supermemory API endpoint:
   * Add memory: `https://api.supermemory.ai/v3/documents`
   * Search memories: `https://api.supermemory.ai/v4/search`
4. For authentication, select **Generic Credential Type** and then **Bearer Auth**
5. Click on **Create New Credential** and paste the Supermemory API Key in the Bearer Token field.
   <img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/bearer-auth-add-n8n.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=52ee20cbb148326203ea0feba70d6e29" alt="" width="2444" height="1538" data-path="images/bearer-auth-add-n8n.png" />
6. Check **Send Body** and select **JSON** as the Body Content Type. The fields depend on what API endpoint you're sending the request to. You can find detailed step-by-step examples below.

## Step-by-Step Tutorial

In this tutorial, we'll create a workflow that automatically adds every email from Gmail to your Supermemory knowledge base. We'll use the HTTP Request node to send email data to Supermemory's API, creating a searchable archive of all your communications.

### Adding Gmail Emails to Supermemory

Follow these steps to build a workflow that captures and stores your Gmail messages:

#### Step 1: Set Up Gmail Trigger

<img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/gmail-trigger.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=c3bd4e8b668fd563568c8c08aaa63432" alt="" width="2806" height="1672" data-path="images/gmail-trigger.png" />

1. **Add a Gmail Trigger node** to your workflow
2. Configure your Gmail credentials (OAuth2 recommended)
3. Set the trigger to **Message Received**
4. Optional: Add labels or filters to process specific emails only

#### Step 2: Configure HTTP Request Node

1. **Add an HTTP Request node** after the Gmail Trigger
2. **Method**: `POST`
3. **URL**: `https://api.supermemory.ai/v3/documents`
4. Select your auth credentials you created with the Supermemory API Key.

#### Step 3: Format Email Data for Supermemory

In the HTTP Request node's **Body**, select **JSON** and **Using Fields Below**

And create 2 fields:

1. name: `content`, value: `{{ $json.snippet }}`
2. name: `containerTag`, value: gmail

<img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/gmail-content.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=3955ebcedf47b83403d4741c17b76573" alt="" width="2610" height="1450" data-path="images/gmail-content.png" />

#### Step 4: Handle Attachments (Optional)

If you want to process attachments:

1. **Add a Loop node** after the Gmail Trigger
2. Loop through `{{$json.attachments}}`
3. **Add a Gmail node** to download each attachment
4. **Add another HTTP Request node** to store attachment metadata

#### Step 5: Add Error Handling

1. **Add an Error Trigger node** connected to your workflow
2. Configure it to catch errors from the HTTP Request node
3. **Add a notification node** (Email, Slack, etc.) to alert you of failures
4. Optional: Add a **Wait node** with retry logic

#### Step 6: Test Your Workflow

1. **Activate the workflow** in test mode
2. Send a test email to your Gmail account
3. Check the execution to ensure the email was captured
4. Verify in Supermemory that the email appears in search results

Refer to the API Reference tab to learn more about other supermemory API endpoints.
