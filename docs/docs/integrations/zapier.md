---
title: "Zapier"
url: "https://supermemory.ai/docs/integrations/zapier"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Zapier

> Automate memory management with Supermemory in Zapier workflows

With Supermemory you can now easily add memory to your Zapier workflow steps. Here's how:

## Prerequisites

* A Supermemory API Key. Get yours [here](https://console.supermemory.ai)

## Step-by-step tutorial

For this tutorial, we're building a simple flow that adds incoming emails in Gmail to Supermemory.

<Steps>
  <Step title="Make a flow">
    Open your Zapier account and click on 'Zap' to make a new automation.

    <img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/make-zap.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=11d0dcce6b4bf13260c94c77906a5b16" alt="make a zap - annotated" width="2840" height="1353" data-path="images/make-zap.png" />
  </Step>

  <Step title="Add Gmail node">
    Add a new Gmail node that gets triggered on every new email. Connect to your Google account.

    <img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/add-gmail-node-zapier.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=9b91c17c3d3f6c6096a1b5ee5779f347" alt="add gmail" width="2064" height="658" data-path="images/add-gmail-node-zapier.png" />
  </Step>

  <Step title="Add code block">
    Now, add a new 'Code by Zapier' block. Set it up to run Python.

    In the **Input Data** section, map the content field to the Gmail raw snippet.

    <img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/map-content-to-gmail.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=ffa354d03ab4583972d5769f97717af7" alt="" width="818" height="520" data-path="images/map-content-to-gmail.png" />
  </Step>

  <Step title="Integrate Supermemory">
    Since we're ingesting data here, we'll use the add documents endpoint.

    Add the following code block:

    ```python theme={null}
        import requests

        url = "https://api.supermemory.ai/v3/documents"

        payload = { "content": inputData['content'], "containerTag": "gmail" }
        headers = {
            "Authorization": "Bearer YOUR_SM_API_KEY",
            "Content-Type": "application/json"
        }

        response = requests.post(url, json=payload, headers=headers)

        print(response.json())
    ```

    The `inputData['content']` field maps to the Gmail content fetched from Zapier.

    <img src="https://mintcdn.com/supermemory/HCdbQgzdKyG9ks22/images/zapier-output.png?fit=max&auto=format&n=HCdbQgzdKyG9ks22&q=85&s=bf50327a2e3851aeb18758e28cb780cf" alt="" width="888" height="802" data-path="images/zapier-output.png" />
  </Step>
</Steps>

<Note>
  Sometimes Zapier might show an error on the first test run. It usually works right after. Weird bug, we know.
</Note>

You can perform other operations like search, filtering, user profiles, etc., by using other Supermemory API endpoints which can be found in our API Reference tab.
